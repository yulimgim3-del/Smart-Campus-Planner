/**
 * Smart Campus Planner - T3 (데이터 지속성)
 * -----------------------------------------
 * T1에서 만든 기능 (그대로 유지):
 *   1) 할 일 제목을 입력해서 목록에 추가하기
 *   2) 추가된 할 일들을 목록으로 보여주기
 *   3) 목록에서 원하는 할 일을 삭제하기
 *   4) 목록이 비어있을 때 안내 문구 보여주기
 *
 * T2에서 만든 기능 (그대로 유지):
 *   5) 할 일마다 카테고리(학과/아르바이트/개인) 지정하기
 *   6) 할 일마다 중요도(상/중/하) 지정하기
 *   7) 할 일마다 마감일 지정하기
 *   8) 할 일 완료 체크 / 체크 해제하기
 *   9) 전체 할 일 대비 완료율(%) 계산해서 보여주기
 *
 * 이번 단계(T3)에서 새로 추가한 기능:
 *   10) 할 일을 추가/체크/삭제할 때마다 브라우저(localStorage)에 자동 저장하기
 *   11) 페이지를 새로고침하거나 다시 열었을 때 저장된 목록을 그대로 불러오기
 */

// 브라우저에 할 일 목록을 저장할 때 사용하는 저장소 키(이름표) 입니다.
// 다른 데이터와 섞이지 않도록 이 앱만의 고유한 이름을 사용합니다.
const STORAGE_KEY = "smart-campus-planner-todos";

/**
 * 브라우저 저장소(localStorage)에서 저장되어 있던 할 일 목록을 불러옵니다.
 * 저장된 데이터가 없거나 형식이 올바르지 않으면 빈 목록([])을 반환합니다.
 * @returns {Array} 불러온 할 일 목록
 */
function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return []; // 저장된 데이터가 아예 없는 최초 실행 상태
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    // 저장된 값이 손상되어 있는 등 예상치 못한 경우, 안전하게 빈 목록으로 시작합니다.
    console.warn("저장된 할 일 목록을 불러오는 중 문제가 발생하여 빈 목록으로 시작합니다.", error);
    return [];
  }
}

/**
 * 현재 할 일 목록(todos 배열)을 브라우저 저장소(localStorage)에 저장합니다.
 * 할 일을 추가/삭제하거나 완료 상태를 바꿀 때마다 호출되어,
 * 새로고침하거나 다시 접속해도 데이터가 유지되도록 합니다.
 */
function saveTodos() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.warn("할 일 목록을 저장하는 중 문제가 발생했습니다.", error);
  }
}

// 할 일 목록을 담아두는 배열
// 페이지가 열릴 때 브라우저에 저장되어 있던 데이터를 먼저 불러옵니다.
let todos = loadTodos();

// 화면 요소 가져오기
const todoForm = document.getElementById("todo-form");
const todoTitleInput = document.getElementById("todo-title-input");
const todoCategorySelect = document.getElementById("todo-category-select");
const todoPrioritySelect = document.getElementById("todo-priority-select");
const todoDueDateInput = document.getElementById("todo-due-date-input");
const todoListEl = document.getElementById("todo-list");
const emptyStateEl = document.getElementById("empty-state");
const progressTextEl = document.getElementById("progress-text");
const progressBarFillEl = document.getElementById("progress-bar-fill");

/**
 * 할 일 목록(todos 배열)을 기준으로 화면(<ul id="todo-list">)을 새로 그립니다.
 * 화면을 다시 그릴 때마다 현재 목록을 브라우저 저장소에도 함께 저장하여,
 * 새로고침하거나 다시 접속해도 데이터가 유지되도록 합니다.
 */
function renderTodoList() {
  saveTodos();

  // 목록을 비우고 다시 그리기
  todoListEl.innerHTML = "";

  // 할 일이 하나도 없으면 안내 문구를 보여주고, 있으면 숨깁니다.
  if (todos.length === 0) {
    emptyStateEl.classList.remove("hidden");
  } else {
    emptyStateEl.classList.add("hidden");

    todos.forEach((todo) => {
      todoListEl.appendChild(createTodoItemElement(todo));
    });
  }

  renderProgress();
}

/**
 * 할 일 하나(todo)에 해당하는 <li> 요소를 만들어 반환합니다.
 * @param {object} todo 할 일 데이터
 */
function createTodoItemElement(todo) {
  const li = document.createElement("li");
  li.className = "todo-item" + (todo.completed ? " completed" : "");
  li.dataset.id = todo.id;

  // 왼쪽: 완료 체크박스 + 제목/뱃지 영역
  const mainWrap = document.createElement("div");
  mainWrap.className = "todo-item-main";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "todo-checkbox";
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () => toggleTodoCompleted(todo.id));

  const contentWrap = document.createElement("div");
  contentWrap.className = "todo-item-content";

  const titleSpan = document.createElement("span");
  titleSpan.className = "todo-item-title";
  titleSpan.textContent = todo.title;

  const metaWrap = document.createElement("div");
  metaWrap.className = "todo-item-meta";

  const categoryBadge = document.createElement("span");
  categoryBadge.className = "badge badge-category";
  categoryBadge.textContent = todo.category;
  metaWrap.appendChild(categoryBadge);

  const priorityBadge = document.createElement("span");
  priorityBadge.className = "badge badge-priority-" + todo.priority;
  priorityBadge.textContent = "중요도: " + todo.priority;
  metaWrap.appendChild(priorityBadge);

  if (todo.dueDate) {
    const dueDateBadge = document.createElement("span");
    dueDateBadge.className = "badge badge-due-date";
    dueDateBadge.textContent = "마감일: " + todo.dueDate;
    metaWrap.appendChild(dueDateBadge);
  }

  contentWrap.appendChild(titleSpan);
  contentWrap.appendChild(metaWrap);

  mainWrap.appendChild(checkbox);
  mainWrap.appendChild(contentWrap);

  // 오른쪽: 삭제 버튼
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "삭제";
  deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

  li.appendChild(mainWrap);
  li.appendChild(deleteBtn);

  return li;
}

/**
 * 전체 할 일 대비 완료된 할 일의 비율(완료율)을 계산해서 화면에 표시합니다.
 */
function renderProgress() {
  const total = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  const percentage = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  progressTextEl.textContent = `완료율: ${percentage}% (${completedCount}/${total})`;
  progressBarFillEl.style.width = percentage + "%";
}

/**
 * 새로운 할 일을 목록에 추가합니다.
 * @param {object} params 할 일 입력 정보
 * @param {string} params.title 할 일 제목
 * @param {string} params.category 카테고리 (학과 / 아르바이트 / 개인)
 * @param {string} params.priority 중요도 (상 / 중 / 하)
 * @param {string} params.dueDate 마감일 (YYYY-MM-DD 형식 문자열, 비어있을 수 있음)
 */
function addTodo({ title, category, priority, dueDate }) {
  const trimmedTitle = title.trim();
  if (trimmedTitle === "") {
    return; // 빈 값은 추가하지 않음
  }

  const newTodo = {
    id: Date.now().toString() + Math.random().toString(16).slice(2), // 간단한 고유 id 생성
    title: trimmedTitle,
    category,
    priority,
    dueDate: dueDate || "",
    completed: false,
  };

  todos.push(newTodo);
  renderTodoList();
}

/**
 * id에 해당하는 할 일을 목록에서 삭제합니다.
 * @param {string} id 삭제할 할 일의 id
 */
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodoList();
}

/**
 * id에 해당하는 할 일의 완료 상태를 반전(체크 ↔ 체크 해제)시킵니다.
 * @param {string} id 완료 상태를 변경할 할 일의 id
 */
function toggleTodoCompleted(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTodoList();
}

// 폼 제출(추가 버튼 클릭 또는 엔터) 시 할 일 추가
todoForm.addEventListener("submit", (event) => {
  event.preventDefault(); // 페이지가 새로고침되는 기본 동작 막기

  addTodo({
    title: todoTitleInput.value,
    category: todoCategorySelect.value,
    priority: todoPrioritySelect.value,
    dueDate: todoDueDateInput.value,
  });

  // 입력창 초기화 (카테고리/중요도는 마지막 선택값을 유지해 연속 입력을 편하게 함)
  todoTitleInput.value = "";
  todoDueDateInput.value = "";
  todoTitleInput.focus();
});

// 페이지가 처음 열렸을 때 화면 초기 상태 그리기 (현재는 빈 목록)
renderTodoList();
