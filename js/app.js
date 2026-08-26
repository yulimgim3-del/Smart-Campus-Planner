/**
 * Smart Campus Planner - T4 (과제/시험 전용 관리: 유형 + D-Day)
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
 * T3에서 만든 기능 (그대로 유지):
 *   10) 할 일을 추가/체크/삭제할 때마다 브라우저(localStorage)에 자동 저장하기
 *   11) 페이지를 새로고침하거나 다시 열었을 때 저장된 목록을 그대로 불러오기
 *
 * T4에서 만든 기능 (그대로 유지):
 *   12) 카테고리가 '학과'일 때만 유형(과제/시험/발표/팀플/기타)을 지정하기
 *   13) 마감일을 기준으로 D-Day(D-7, D-3, D-Day, 지남 등)를 계산해서 뱃지로 보여주기
 *
 * 이번 단계(T5)에서 새로 추가한 기능:
 *   14) 요일(월~금) x 교시(1~9교시) 기반 주간 시간표를 등록/삭제하기
 *   15) 과목마다 사용자가 직접 색상을 지정해서 시간표에서 구분하기
 *   16) 시간표 아래에 마감이 3일 이내로 임박한 학과 일정(할 일)을 요약 카드로 보여주기
 */

// 카테고리가 '학과'일 때만 선택 가능한 유형 목록
const SCHOOL_TYPES = ["과제", "시험", "발표", "팀플", "기타"];

// 시간표에서 사용하는 요일 목록 (월~금)
const SCHEDULE_DAYS = ["월", "화", "수", "목", "금"];
// 시간표에서 사용하는 교시 목록 (1~9교시)
const SCHEDULE_PERIODS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// 시간표 데이터를 저장할 때 사용하는 브라우저 저장소 키
const SCHEDULE_STORAGE_KEY = "smart-campus-planner-schedule";

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

/**
 * 브라우저 저장소(localStorage)에서 저장되어 있던 시간표 목록을 불러옵니다.
 * 저장된 데이터가 없거나 형식이 올바르지 않으면 빈 목록([])을 반환합니다.
 * @returns {Array} 불러온 시간표(수업) 목록
 */
function loadSchedule() {
  try {
    const raw = localStorage.getItem(SCHEDULE_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("저장된 시간표를 불러오는 중 문제가 발생하여 빈 시간표로 시작합니다.", error);
    return [];
  }
}

/**
 * 현재 시간표(schedule 배열)를 브라우저 저장소(localStorage)에 저장합니다.
 */
function saveSchedule() {
  try {
    localStorage.setItem(SCHEDULE_STORAGE_KEY, JSON.stringify(schedule));
  } catch (error) {
    console.warn("시간표를 저장하는 중 문제가 발생했습니다.", error);
  }
}

// 할 일 목록을 담아두는 배열
// 페이지가 열릴 때 브라우저에 저장되어 있던 데이터를 먼저 불러옵니다.
let todos = loadTodos();

// 시간표(수업) 목록을 담아두는 배열
// 페이지가 열릴 때 브라우저에 저장되어 있던 데이터를 먼저 불러옵니다.
let schedule = loadSchedule();

// 화면 요소 가져오기
const todoForm = document.getElementById("todo-form");
const todoTitleInput = document.getElementById("todo-title-input");
const todoCategorySelect = document.getElementById("todo-category-select");
const todoTypeField = document.getElementById("todo-type-field");
const todoTypeSelect = document.getElementById("todo-type-select");
const todoPrioritySelect = document.getElementById("todo-priority-select");
const todoDueDateInput = document.getElementById("todo-due-date-input");
const todoListEl = document.getElementById("todo-list");
const emptyStateEl = document.getElementById("empty-state");
const progressTextEl = document.getElementById("progress-text");
const progressBarFillEl = document.getElementById("progress-bar-fill");

// 시간표 관련 화면 요소 가져오기
const scheduleForm = document.getElementById("schedule-form");
const scheduleDaySelect = document.getElementById("schedule-day-select");
const schedulePeriodSelect = document.getElementById("schedule-period-select");
const scheduleSubjectInput = document.getElementById("schedule-subject-input");
const scheduleColorInput = document.getElementById("schedule-color-input");
const scheduleGridEl = document.getElementById("schedule-grid");
const scheduleEmptyStateEl = document.getElementById("schedule-empty-state");

// 마감 임박 학과 일정 요약 관련 화면 요소 가져오기
const upcomingListEl = document.getElementById("upcoming-list");
const upcomingEmptyStateEl = document.getElementById("upcoming-empty-state");

/**
 * 카테고리 선택값에 따라 '유형' 선택 필드를 보이거나 숨깁니다.
 * 카테고리가 '학과'일 때만 유형을 선택할 수 있습니다.
 */
function updateTypeFieldVisibility() {
  const isSchoolCategory = todoCategorySelect.value === "학과";
  todoTypeField.classList.toggle("hidden", !isSchoolCategory);
}

// 카테고리를 바꿀 때마다 유형 필드의 표시 여부를 갱신합니다.
todoCategorySelect.addEventListener("change", updateTypeFieldVisibility);

// 페이지가 처음 열렸을 때도 현재 선택된 카테고리 기준으로 유형 필드 표시 여부를 맞춰줍니다.
updateTypeFieldVisibility();

/**
 * 마감일(YYYY-MM-DD)을 기준으로 오늘까지 남은 일수를 계산해 D-Day 정보를 반환합니다.
 * @param {string} dueDate 마감일 문자열 (비어있을 수 있음)
 * @returns {{label: string, state: string} | null} D-Day 뱃지에 표시할 정보. 마감일이 없으면 null.
 */
function getDDayInfo(dueDate) {
  if (!dueDate) {
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate + "T00:00:00");
  if (Number.isNaN(due.getTime())) {
    return null;
  }

  const diffDays = Math.round((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    return { label: `D-${diffDays}`, state: diffDays <= 3 ? "urgent" : "normal", diffDays };
  }
  if (diffDays === 0) {
    return { label: "D-Day", state: "urgent", diffDays };
  }
  return { label: `D+${Math.abs(diffDays)} 지남`, state: "overdue", diffDays };
}

/**
 * 시간표(schedule 배열)를 요일 x 교시 그리드 형태(<div id="schedule-grid">)로 다시 그립니다.
 * 그릴 때마다 현재 시간표를 브라우저 저장소에도 함께 저장합니다.
 */
function renderSchedule() {
  saveSchedule();

  scheduleGridEl.innerHTML = "";

  if (schedule.length === 0) {
    scheduleEmptyStateEl.classList.remove("hidden");
    scheduleGridEl.classList.add("hidden");
    return;
  }

  scheduleEmptyStateEl.classList.add("hidden");
  scheduleGridEl.classList.remove("hidden");

  // 그리드의 첫 행: 빈 칸(교시 열 머리) + 요일(월~금)
  const cornerCell = document.createElement("div");
  cornerCell.className = "schedule-cell schedule-head";
  scheduleGridEl.appendChild(cornerCell);

  SCHEDULE_DAYS.forEach((day) => {
    const dayHead = document.createElement("div");
    dayHead.className = "schedule-cell schedule-head";
    dayHead.textContent = day;
    scheduleGridEl.appendChild(dayHead);
  });

  // 교시별로 한 행씩 그리기: 교시 라벨 + 요일별 수업 칸
  SCHEDULE_PERIODS.forEach((period) => {
    const periodHead = document.createElement("div");
    periodHead.className = "schedule-cell schedule-head";
    periodHead.textContent = period + "교시";
    scheduleGridEl.appendChild(periodHead);

    SCHEDULE_DAYS.forEach((day) => {
      const classInfo = schedule.find((item) => item.day === day && item.period === period);
      const cell = document.createElement("div");
      cell.className = "schedule-cell";

      if (classInfo) {
        cell.classList.add("schedule-cell-filled");
        cell.style.backgroundColor = classInfo.color;
        cell.textContent = classInfo.subject;
        cell.title = `${day}요일 ${period}교시 · ${classInfo.subject} (클릭하면 삭제)`;
        cell.addEventListener("click", () => deleteScheduleItem(classInfo.id));
      }

      scheduleGridEl.appendChild(cell);
    });
  });
}

/**
 * 새로운 수업을 시간표에 등록합니다. 같은 요일/교시에 이미 수업이 있으면 덮어씁니다.
 * @param {object} params 수업 입력 정보
 * @param {string} params.day 요일 (월/화/수/목/금)
 * @param {number} params.period 교시 (1~9)
 * @param {string} params.subject 과목명
 * @param {string} params.color 과목 색상 (hex 문자열)
 */
function addScheduleItem({ day, period, subject, color }) {
  const trimmedSubject = subject.trim();
  if (trimmedSubject === "") {
    return; // 빈 과목명은 등록하지 않음
  }

  // 같은 요일/교시에 이미 등록된 수업이 있으면 제거하고 새로 등록합니다.
  schedule = schedule.filter((item) => !(item.day === day && item.period === period));

  schedule.push({
    id: Date.now().toString() + Math.random().toString(16).slice(2),
    day,
    period,
    subject: trimmedSubject,
    color,
  });

  renderSchedule();
}

/**
 * id에 해당하는 수업을 시간표에서 삭제합니다.
 * @param {string} id 삭제할 수업의 id
 */
function deleteScheduleItem(id) {
  schedule = schedule.filter((item) => item.id !== id);
  renderSchedule();
}

/**
 * 카테고리가 '학과'이고 마감일이 3일 이내(오늘 포함, 지난 것 포함)로 임박한 할 일을 찾아
 * '마감 임박 학과 일정' 요약 카드로 화면에 보여줍니다.
 */
function renderUpcoming() {
  upcomingListEl.innerHTML = "";

  const upcomingItems = todos
    .filter((todo) => todo.category === "학과" && !todo.completed && todo.dueDate)
    .map((todo) => ({ todo, dDayInfo: getDDayInfo(todo.dueDate) }))
    .filter(({ dDayInfo }) => dDayInfo && dDayInfo.diffDays <= 3)
    .sort((a, b) => a.dDayInfo.diffDays - b.dDayInfo.diffDays);

  if (upcomingItems.length === 0) {
    upcomingEmptyStateEl.classList.remove("hidden");
    return;
  }

  upcomingEmptyStateEl.classList.add("hidden");

  upcomingItems.forEach(({ todo, dDayInfo }) => {
    const card = document.createElement("div");
    card.className = "upcoming-card upcoming-card-" + dDayInfo.state;

    const titleEl = document.createElement("span");
    titleEl.className = "upcoming-card-title";
    titleEl.textContent = (todo.type ? `[${todo.type}] ` : "") + todo.title;

    const dDayEl = document.createElement("span");
    dDayEl.className = "badge badge-dday-" + dDayInfo.state;
    dDayEl.textContent = dDayInfo.label;

    card.appendChild(titleEl);
    card.appendChild(dDayEl);
    upcomingListEl.appendChild(card);
  });
}

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
  renderUpcoming();
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

  // 카테고리가 '학과'이고 유형이 지정되어 있을 때만 유형 뱃지를 보여줍니다.
  if (todo.type) {
    const typeBadge = document.createElement("span");
    typeBadge.className = "badge badge-type";
    typeBadge.textContent = todo.type;
    metaWrap.appendChild(typeBadge);
  }

  const priorityBadge = document.createElement("span");
  priorityBadge.className = "badge badge-priority-" + todo.priority;
  priorityBadge.textContent = "중요도: " + todo.priority;
  metaWrap.appendChild(priorityBadge);

  if (todo.dueDate) {
    const dueDateBadge = document.createElement("span");
    dueDateBadge.className = "badge badge-due-date";
    dueDateBadge.textContent = "마감일: " + todo.dueDate;
    metaWrap.appendChild(dueDateBadge);

    // 마감일이 있으면 D-Day 뱃지도 함께 보여줍니다. (완료된 할 일은 D-Day를 강조하지 않음)
    const dDayInfo = getDDayInfo(todo.dueDate);
    if (dDayInfo && !todo.completed) {
      const dDayBadge = document.createElement("span");
      dDayBadge.className = "badge badge-dday-" + dDayInfo.state;
      dDayBadge.textContent = dDayInfo.label;
      metaWrap.appendChild(dDayBadge);
    }
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
 * @param {string} params.type 유형 (과제 / 시험 / 발표 / 팀플 / 기타, 카테고리가 '학과'일 때만 의미 있음)
 * @param {string} params.priority 중요도 (상 / 중 / 하)
 * @param {string} params.dueDate 마감일 (YYYY-MM-DD 형식 문자열, 비어있을 수 있음)
 */
function addTodo({ title, category, type, priority, dueDate }) {
  const trimmedTitle = title.trim();
  if (trimmedTitle === "") {
    return; // 빈 값은 추가하지 않음
  }

  // 카테고리가 '학과'가 아니면 유형은 저장하지 않습니다.
  const isSchoolCategory = category === "학과";
  const resolvedType = isSchoolCategory && SCHOOL_TYPES.includes(type) ? type : "";

  const newTodo = {
    id: Date.now().toString() + Math.random().toString(16).slice(2), // 간단한 고유 id 생성
    title: trimmedTitle,
    category,
    type: resolvedType,
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
    type: todoTypeSelect.value,
    priority: todoPrioritySelect.value,
    dueDate: todoDueDateInput.value,
  });

  // 입력창 초기화 (카테고리/중요도는 마지막 선택값을 유지해 연속 입력을 편하게 함)
  todoTitleInput.value = "";
  todoDueDateInput.value = "";
  todoTitleInput.focus();
});

// 시간표 등록 폼 제출 시 수업 추가
scheduleForm.addEventListener("submit", (event) => {
  event.preventDefault(); // 페이지가 새로고침되는 기본 동작 막기

  addScheduleItem({
    day: scheduleDaySelect.value,
    period: Number(schedulePeriodSelect.value),
    subject: scheduleSubjectInput.value,
    color: scheduleColorInput.value,
  });

  // 과목명만 초기화 (요일/교시/색상은 마지막 선택값을 유지해 연속 입력을 편하게 함)
  scheduleSubjectInput.value = "";
  scheduleSubjectInput.focus();
});

// 페이지가 처음 열렸을 때 화면 초기 상태 그리기 (저장된 데이터가 있으면 그대로 복원)
renderTodoList();
renderSchedule();
