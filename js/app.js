/**
 * Kitty Campus Planner (구 Smart Campus Planner)
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
 * T5에서 만든 기능 (그대로 유지):
 *   14) 요일(월~금) x 교시(1~9교시) 기반 주간 시간표를 등록/삭제하기
 *   15) 과목마다 사용자가 직접 색상을 지정해서 시간표에서 구분하기
 *   16) 시간표 아래에 마감이 3일 이내로 임박한 학과 일정(할 일)을 요약 카드로 보여주기
 *
 * T6에서 만든 기능 (그대로 유지):
 *   17) 카테고리가 '아르바이트'일 때는 마감일 대신 근무 요일(월~일, 중복 선택 가능)을 지정하기
 *
 * T7에서 만든 기능 (그대로 유지):
 *   18) 월간 캘린더 뷰에서 마감일이 있는 학과/개인 할 일과, 아르바이트 근무 요일에 해당하는
 *       날짜를 한 화면에서 함께 확인하기
 *   19) 이전 달 / 다음 달 버튼으로 캘린더를 넘겨가며 확인하기
 *
 * T8에서 만든 기능 (그대로 유지):
 *   20) 캘린더의 날짜 칸을 클릭하면 그 날의 상세 일정(마감일 할 일 + 근무 요일 아르바이트)을
 *       화면 아래쪽에 목록으로 보여주기
 *
 * T9에서 만든 기능 (그대로 유지):
 *   21) 할 일을 추가할 때 메모(선택 입력)를 함께 남기기
 *   22) 메모가 길면 카드에서는 일부만 보여주고, "더보기"를 누르면 전체 메모를 볼 수 있게 하기
 *   23) 메모가 없는 기존 할 일 데이터도 오류 없이 그대로 표시하기
 *
 * T10에서 개선한 내용 (그대로 유지):
 *   24) 주간 시간표에서 등록된 수업 칸을 클릭해도 삭제되지 않도록 수정하고,
 *       칸 안의 작은 X 버튼을 눌렀을 때만 삭제되도록 변경 (실수로 삭제되는 문제 방지)
 *
 * T11에서 만든 기능 (그대로 유지):
 *   25) 프로그램 이름을 'Kitty Campus Planner'로 변경하고 헬로키티 테마 디자인 적용
 *       (전체 테마 빨간색, 캘린더 영역만 청색, 페이지 배경/섹션 아이콘에 키티 이미지 배치)
 *
 * T12에서 만든 기능 (그대로 유지):
 *   26) 월간 캘린더의 날짜 칸마다 그 날의 일정 상태(마감 지남/마감 임박/여유 있음/일정 없음)에
 *       맞는 키티 표정 스티커(css/키티 표정 폴더)를 자동으로 보여주기
 *   27) 캘린더 위쪽 "캘린더 스티커 꾸미기" 영역에서 상태별로 원하는 키티 표정을 사용자가 직접
 *       골라 바꿀 수 있게 하고, 고른 설정을 브라우저 저장소에 저장해 새로고침해도 유지되게 하기
 *
 * T13에서 만든 기능 (그대로 유지):
 *   28) 캘린더 영역의 색상 테마를 청색에서 전체 테마와 동일한 빨간색 계열로 통일
 *       (css/style.css의 --color-blue* 변수 및 관련 스타일을 --color-red* 계열로 교체)
 *   29) 카테고리가 '아르바이트'일 때는 중요도(상/중/하)가 필요 없다고 판단하여
 *       중요도 선택 필드를 숨기고, 저장/뱃지 표시에서도 제외하기
 *
 * T14에서 만든 기능 (그대로 유지):
 *   30) D-Day 뱃지(D-7, D-Day 등)를 일반 텍스트 대신 "css/키티 숫자" 폴더의 숫자/문자 키티
 *       이미지를 글자별로 이어붙여 보여주기 (해당 폴더에 이미지가 없는 "+"나 "지남"이 포함된
 *       마감이 지난 경우는 기존처럼 텍스트로 표시)
 *
 * T15에서 만든 기능 (그대로 유지):
 *   31) 할 일 목록 카드(<ul id="todo-list">)에서는 마감일 뱃지만 보여주고, D-Day 뱃지는
 *       더 이상 표시하지 않기 (D-Day는 시간표 아래 "🍎 내 일정" 요약 카드에서만 확인)
 *
 * 이번 단계(T16)에서 새로 추가/개선한 내용:
 *   32) "⏰ 마감 임박 학과 일정" 섹션 제목을 "🍎 내 일정"으로 변경
 *   33) 일정 카드(.upcoming-list)를 세로 1열 목록에서 2열 그리드 레이아웃으로 변경해
 *       PC/태블릿에서는 카드 2개가 나란히, 모바일(700px 이하)에서는 1열로 보이게 하기
 *       (일정 데이터/추가/삭제/D-Day 계산 등 기존 기능과 렌더링 로직(renderUpcoming)은
 *       변경 없이 그대로 유지하고, css/style.css의 레이아웃만 수정)
 *   34) 일정 제목이 길어도 카드가 깨지지 않도록 최대 2줄까지만 보여주고 넘치면
 *       말줄임표(...)로 표시하며, D-Day 뱃지는 항상 카드 오른쪽에 고정 크기로 유지하기
 *
 * 이번 단계(T17)에서 새로 추가/개선한 내용:
 *   35) "🍎 내 일정" 카드에 표시하는 대상을 "카테고리가 학과이고 마감이 3일 이내인 것"에서
 *       "카테고리와 관계없이 완료하지 않았고 마감일이 있거나(학과/개인), 근무 요일이 있는
 *       (아르바이트) 모든 일정"으로 확장하기 (renderUpcoming)
 *   36) 마감일이 있는 일정은 기존처럼 D-Day 뱃지를, 근무 요일만 있는 아르바이트 일정은
 *       D-Day 대신 "근무: 월·수" 형태의 근무 요일 뱃지를 보여주기
 *   37) "🍎 내 일정" 카드 배경 색상을 카테고리별로 구분하기
 *       (학과: 빨간색 / 아르바이트: 노란색 / 개인: 데님 파란색)
 *
 * 이번 단계(T18)에서 새로 추가한 내용:
 *   38) Main Container 가장 아래쪽에 "📝 메모" 영역 추가: 메모 키티 이미지(css/메모 키티.png)
 *       속 흰색 종이 위에 실제 입력 가능한 textarea를 겹쳐서, 키티가 들고 있는 종이에 직접
 *       메모를 적는 것처럼 보이게 하기
 *   39) 메모 내용을 입력할 때마다 잠시 뒤(디바운스) 브라우저(localStorage)에 자동 저장하고,
 *       페이지를 새로고침하거나 다시 열었을 때 저장된 메모를 그대로 불러오기
 *
 * 이번 단계(T19)에서 개편한 내용:
 *   40) 캘린더 날짜 상태(마감 지남/마감 임박/여유 있음/일정 없음) 스티커를 사용자가 바꿀 수 없는
 *       고정 값으로 변경 (마감 지남: 우울 키티 / 마감 임박: 울음 키티 / 여유 있음: 안경 키티 /
 *       일정 없음: 잠자는 키티)
 *   41) "개인" 카테고리 일정 전용 스티커(냠냠/사랑/감기 키티)를 새로 추가하기. 완료하지 않은
 *       개인 일정이 있는 날짜는 마감 상태와 무관하게 이 개인 스티커가 항상 최우선으로 표시됨
 *
 * 이번 단계(T20)에서 개선한 내용:
 *   42) "개인" 일정 스티커를 캘린더 위쪽에서 한 번에 바꾸는 전역 설정에서, 할 일을 등록할 때
 *       일정마다 각각 지정하는 방식으로 변경 (todo.personalSticker 필드 추가). 카테고리가
 *       "개인"일 때만 할 일 등록 폼에 "캘린더 스티커" select가 나타나고, 완료하지 않은 개인
 *       일정이 여러 개 있는 날짜는 그중 먼저 등록된 일정의 스티커를 표시함
 *   43) 할 일 목록 카드에도 지정된 캘린더 스티커를 작은 이미지 뱃지로 함께 보여주기
 *
 * 이번 단계(T21)에서 추가한 내용:
 *   44) 할 일마다 시간을 함께 기입할 수 있게 하기
 *       - 카테고리가 학과/개인일 때: 마감일 옆에 "마감 시간"(선택 입력, HH:MM) 필드 추가
 *       - 카테고리가 아르바이트일 때: 근무 요일 옆에 "근무 시작~종료 시간"(선택 입력) 필드 추가
 *   45) 할 일 목록 카드의 마감일/근무 요일 뱃지, "🍎 내 일정" 요약 카드, 캘린더 날짜 클릭
 *       상세 일정에도 입력한 시간을 함께 표시하기 (시간을 입력하지 않은 기존 할 일도
 *       오류 없이 그대로 표시됨)
 *
 * 이번 단계(T22)에서 추가한 내용:
 *   46) 카테고리가 "개인"일 때 마감일 옆에 "시작 시간"(선택 입력) 필드를 추가해, 약속처럼
 *       시작~종료 시간을 함께 관리할 수 있게 하기 (todo.dueStartTime 필드 추가). 개인
 *       카테고리를 선택하면 기존 "마감 시간" 필드의 라벨이 "종료 시간"으로 바뀜
 *   47) 개인 일정에 시작 시간이 있으면 뱃지 라벨을 "마감일" 대신 "일정"으로 바꾸고
 *       "일정: 2025-01-10 15:00~17:00" 형태로 표시하기 (학과는 기존처럼 "마감일: ..." 유지).
 *       "🍎 내 일정" 요약 카드와 캘린더 상세 일정에도 동일하게 반영
 */

// 할 일 카드에서 메모를 기본으로 보여줄 최대 글자 수 (이보다 길면 "더보기"로 축약)
const MEMO_PREVIEW_LENGTH = 40;

// 사용자가 "더보기"를 눌러 전체 메모를 펼쳐본 할 일 id를 기억하는 집합.
// 화면을 다시 그릴 때(renderTodoList)도 펼친 상태가 유지되도록 사용합니다. (새로고침 시에는 초기화됩니다)
const expandedMemoTodoIds = new Set();

// 카테고리가 '학과'일 때만 선택 가능한 유형 목록
const SCHOOL_TYPES = ["과제", "시험", "발표", "팀플", "기타"];

// 카테고리가 '아르바이트'일 때 선택 가능한 근무 요일 목록 (월~일)
const WORK_DAYS = ["월", "화", "수", "목", "금", "토", "일"];

// 캘린더 요일 헤더에 사용하는 일~토 순서 목록 (Date.getDay()의 0~6 순서와 동일)
const CALENDAR_WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

// 시간표에서 사용하는 요일 목록 (월~금)
const SCHEDULE_DAYS = ["월", "화", "수", "목", "금"];
// 시간표에서 사용하는 교시 목록 (1~9교시)
const SCHEDULE_PERIODS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// 시간표 데이터를 저장할 때 사용하는 브라우저 저장소 키
const SCHEDULE_STORAGE_KEY = "smart-campus-planner-schedule";

// 브라우저에 할 일 목록을 저장할 때 사용하는 저장소 키(이름표) 입니다.
// 다른 데이터와 섞이지 않도록 이 앱만의 고유한 이름을 사용합니다.
const STORAGE_KEY = "smart-campus-planner-todos";

// 메모(T18) 내용을 저장할 때 사용하는 브라우저 저장소 키
const MEMO_STORAGE_KEY = "smart-campus-planner-memo";

// ===== 캘린더 스티커 (T12, T19에서 고정/개인 선택으로 개편) =====
// "css/키티 표정" 폴더에 있는 키티 표정 이미지들을 캘린더 날짜 칸의 스티커로 사용합니다.
const CALENDAR_STICKER_OPTIONS = [
  { value: "울음키티", src: "css/키티 표정/울음키티.png", label: "울음 키티" },
  { value: "우울키티", src: "css/키티 표정/우울키티.png", label: "우울 키티" },
  { value: "안경키티", src: "css/키티 표정/안경키티.png", label: "안경 키티" },
  { value: "잠자는 키티", src: "css/키티 표정/잠자는 키티.png", label: "잠자는 키티" },
  { value: "냠냠키티", src: "css/키티 표정/냠냠키티.png", label: "냠냠 키티" },
  { value: "사랑키티", src: "css/키티 표정/사랑키티.png", label: "사랑 키티" },
  { value: "감기키티", src: "css/키티 표정/감기키티.png", label: "감기 키티" },
];

// 날짜 상태(마감 지남/마감 임박/여유 있음/일정 없음)별 스티커는 이제 사용자가 바꿀 수 없는 고정 값입니다.
// - overdue(마감 지남): 우울키티 / urgent(마감 임박): 울음키티
// - normal(여유 있음): 안경키티 / none(일정 없음): 잠자는 키티
const FIXED_CALENDAR_STATE_STICKERS = {
  overdue: "우울키티",
  urgent: "울음키티",
  normal: "안경키티",
  none: "잠자는 키티",
};

// "개인" 카테고리 할 일마다 사용자가 직접 골라 쓸 수 있는 스티커 목록
// (냠냠/사랑/감기 키티 중에서 선택). 캘린더 위쪽에서 한 번에 바꾸는 전역 설정이 아니라,
// 할 일을 등록할 때 각 일정(todo.personalSticker)마다 개별적으로 지정됩니다.
const PERSONAL_STICKER_OPTIONS = [
  { value: "냠냠키티", src: "css/키티 표정/냠냠키티.png", label: "냠냠 키티" },
  { value: "사랑키티", src: "css/키티 표정/사랑키티.png", label: "사랑 키티" },
  { value: "감기키티", src: "css/키티 표정/감기키티.png", label: "감기 키티" },
];

// 개인 일정 스티커의 기본값 (사용자가 별도로 고르지 않았을 때 사용)
const DEFAULT_PERSONAL_STICKER = "냠냠키티";

/**
 * 스티커 값(value)에 해당하는 이미지 경로를 찾아 반환합니다.
 * @param {string} value 스티커 옵션의 value (예: "울음키티")
 * @returns {string} 이미지 경로. 일치하는 옵션이 없으면 빈 문자열.
 */
function getCalendarStickerSrc(value) {
  const option = CALENDAR_STICKER_OPTIONS.find((item) => item.value === value);
  return option ? option.src : "";
}

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

/**
 * 브라우저 저장소(localStorage)에서 저장되어 있던 메모(T18) 내용을 불러옵니다.
 * 저장된 데이터가 없거나 형식이 올바르지 않으면 빈 문자열("")을 반환합니다.
 * @returns {string} 불러온 메모 내용
 */
function loadMemo() {
  try {
    const raw = localStorage.getItem(MEMO_STORAGE_KEY);
    return typeof raw === "string" ? raw : "";
  } catch (error) {
    console.warn("저장된 메모를 불러오는 중 문제가 발생하여 빈 메모로 시작합니다.", error);
    return "";
  }
}

/**
 * 현재 메모 내용을 브라우저 저장소(localStorage)에 저장합니다.
 * @param {string} memoText 저장할 메모 내용
 */
function saveMemo(memoText) {
  try {
    localStorage.setItem(MEMO_STORAGE_KEY, memoText);
  } catch (error) {
    console.warn("메모를 저장하는 중 문제가 발생했습니다.", error);
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
const todoPriorityField = document.getElementById("todo-priority-field");
const todoPrioritySelect = document.getElementById("todo-priority-select");
const todoDueDateField = document.getElementById("todo-due-date-field");
const todoDueDateInput = document.getElementById("todo-due-date-input");
const todoDueStartTimeField = document.getElementById("todo-due-start-time-field");
const todoDueStartTimeInput = document.getElementById("todo-due-start-time-input");
const todoDueTimeField = document.getElementById("todo-due-time-field");
const todoDueTimeLabel = document.getElementById("todo-due-time-label");
const todoDueTimeInput = document.getElementById("todo-due-time-input");
const todoWorkdaysField = document.getElementById("todo-workdays-field");
const todoWorkdayCheckboxes = document.querySelectorAll(".todo-workday-checkbox");
const todoWorktimeField = document.getElementById("todo-worktime-field");
const todoWorkStartTimeInput = document.getElementById("todo-work-start-time-input");
const todoWorkEndTimeInput = document.getElementById("todo-work-end-time-input");
const todoPersonalStickerField = document.getElementById("todo-personal-sticker-field");
const todoPersonalStickerSelect = document.getElementById("todo-personal-sticker-select");
const todoMemoInput = document.getElementById("todo-memo-input");
const todoListEl = document.getElementById("todo-list");
const emptyStateEl = document.getElementById("empty-state");
const progressTextEl = document.getElementById("progress-text");
const progressBarFillEl = document.getElementById("progress-bar-fill");

// 메모(T18) 관련 화면 요소 가져오기
const memoInputEl = document.getElementById("memo-input");

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

// 월간 캘린더 관련 화면 요소 가져오기
const calendarTitleEl = document.getElementById("calendar-title");
const calendarGridEl = document.getElementById("calendar-grid");
const calendarPrevBtn = document.getElementById("calendar-prev-btn");
const calendarNextBtn = document.getElementById("calendar-next-btn");
const calendarDetailTitleEl = document.getElementById("calendar-detail-title");
const calendarDetailListEl = document.getElementById("calendar-detail-list");
const calendarDetailEmptyStateEl = document.getElementById("calendar-detail-empty-state");

// 캘린더 스티커 관련 화면 요소 가져오기
// (마감 지남/임박/여유/없음 4가지 상태 스티커는 고정 미리보기이고, 개인 일정 스티커는
// 캘린더 위쪽이 아니라 할 일 등록 폼에서 일정마다 따로 선택합니다)
const calendarFixedStickerPreviewEls = document.querySelectorAll(".calendar-fixed-sticker-preview");

// 현재 캘린더에 보여주고 있는 연/월 (0-indexed 월: 0=1월 ... 11=12월)
const now = new Date();
let calendarYear = now.getFullYear();
let calendarMonth = now.getMonth();

// 캘린더에서 사용자가 클릭해서 선택한 날짜 (YYYY-MM-DD 문자열). 아직 선택하지 않았으면 null.
let selectedCalendarDate = null;

/**
 * 카테고리 선택값에 따라 '유형' 선택 필드를 보이거나 숨깁니다.
 * 카테고리가 '학과'일 때만 유형을 선택할 수 있습니다.
 */
function updateTypeFieldVisibility() {
  const isSchoolCategory = todoCategorySelect.value === "학과";
  todoTypeField.classList.toggle("hidden", !isSchoolCategory);
}

/**
 * 카테고리 선택값에 따라 '중요도' 선택 필드를 보이거나 숨깁니다.
 * 카테고리가 '아르바이트'일 때는 중요도가 필요 없으므로 숨깁니다.
 */
function updatePriorityFieldVisibility() {
  const isPartTimeCategory = todoCategorySelect.value === "아르바이트";
  todoPriorityField.classList.toggle("hidden", isPartTimeCategory);
}

/**
 * 카테고리 선택값에 따라 '마감일(+시작/마감 시간)' 필드와 '근무 요일(+근무 시간)' 필드를
 * 서로 바꿔가며 보여줍니다.
 * - 카테고리가 '아르바이트'일 때는 마감일 대신 근무 요일(월~일, 중복 선택 가능)과
 *   근무 시작~종료 시간(선택 입력)을 지정합니다.
 * - 카테고리가 '개인'일 때는 약속처럼 시작~종료 시간이 함께 있는 경우가 많아,
 *   마감일 옆에 "시작 시간" 필드도 함께 보여주고, 마감 시간 필드의 라벨을
 *   "종료 시간"으로 바꿔서 시작~종료 시간 쌍으로 입력받습니다.
 * - 카테고리가 '학과'일 때는 기존처럼 "마감 시간" 하나만 보여줍니다.
 */
function updateDueDateOrWorkdaysVisibility() {
  const isPartTimeCategory = todoCategorySelect.value === "아르바이트";
  const isPersonalCategory = todoCategorySelect.value === "개인";

  todoDueDateField.classList.toggle("hidden", isPartTimeCategory);
  todoDueTimeField.classList.toggle("hidden", isPartTimeCategory);
  todoDueStartTimeField.classList.toggle("hidden", !isPersonalCategory);
  todoWorkdaysField.classList.toggle("hidden", !isPartTimeCategory);
  todoWorktimeField.classList.toggle("hidden", !isPartTimeCategory);

  // 카테고리가 '개인'일 때는 "마감 시간" 필드를 "종료 시간"으로, 그 외에는 원래대로 보여줍니다.
  todoDueTimeLabel.textContent = isPersonalCategory ? "종료 시간 (선택)" : "마감 시간 (선택)";

  // 마감일(+시간) 필드가 숨겨지면 입력값도 함께 초기화해, 다른 카테고리로 잘못 저장되지 않도록 합니다.
  if (isPartTimeCategory) {
    todoDueDateInput.value = "";
    todoDueTimeInput.value = "";
    todoDueStartTimeInput.value = "";
  } else {
    todoWorkdayCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    todoWorkStartTimeInput.value = "";
    todoWorkEndTimeInput.value = "";
    // 카테고리가 '학과'일 때는 시작 시간 필드가 보이지 않으므로 값도 함께 비워둡니다.
    if (!isPersonalCategory) {
      todoDueStartTimeInput.value = "";
    }
  }
}

/**
 * 카테고리 선택값에 따라 '캘린더 스티커' 선택 필드를 보이거나 숨깁니다.
 * 카테고리가 '개인'일 때만 일정마다 캘린더 스티커(냠냠/사랑/감기 키티)를 지정할 수 있습니다.
 * select 옵션 목록은 최초 1회만 PERSONAL_STICKER_OPTIONS를 기준으로 채워 넣습니다.
 */
function updatePersonalStickerFieldVisibility() {
  const isPersonalCategory = todoCategorySelect.value === "개인";
  todoPersonalStickerField.classList.toggle("hidden", !isPersonalCategory);

  if (todoPersonalStickerSelect.options.length === 0) {
    PERSONAL_STICKER_OPTIONS.forEach((option) => {
      const optionEl = document.createElement("option");
      optionEl.value = option.value;
      optionEl.textContent = option.label;
      todoPersonalStickerSelect.appendChild(optionEl);
    });
    todoPersonalStickerSelect.value = DEFAULT_PERSONAL_STICKER;
  }
}

// 카테고리를 바꿀 때마다 유형 필드 / 중요도 필드 / 마감일-근무 요일 필드 / 캘린더 스티커 필드의
// 표시 여부를 갱신합니다.
todoCategorySelect.addEventListener("change", () => {
  updateTypeFieldVisibility();
  updatePriorityFieldVisibility();
  updateDueDateOrWorkdaysVisibility();
  updatePersonalStickerFieldVisibility();
});

// 페이지가 처음 열렸을 때도 현재 선택된 카테고리 기준으로 필드 표시 여부를 맞춰줍니다.
updateTypeFieldVisibility();
updatePriorityFieldVisibility();
updateDueDateOrWorkdaysVisibility();
updatePersonalStickerFieldVisibility();

/**
 * 아르바이트 할 일의 근무 시작~종료 시간을 뱃지 등에 덧붙일 문자열로 만들어 반환합니다.
 * 시작/종료 시간이 둘 다 있으면 " 14:00~18:00" 형태로, 하나만 있으면 그 값만, 둘 다 없으면
 * 빈 문자열을 반환합니다. (근무 요일 뒤에 이어붙여서 사용)
 * @param {object} todo 할 일 데이터 (workStartTime, workEndTime 필드를 사용)
 * @returns {string} 시간 표시 문자열 (앞에 공백 포함, 없으면 빈 문자열)
 */
function formatWorkTimeSuffix(todo) {
  const start = todo.workStartTime || "";
  const end = todo.workEndTime || "";
  if (start && end) {
    return ` ${start}~${end}`;
  }
  if (start || end) {
    return ` ${start || end}`;
  }
  return "";
}

/**
 * 마감일이 있는 할 일(학과/개인)의 뱃지 라벨과 날짜+시간 문자열을 만들어 반환합니다.
 * - 카테고리가 '개인'이고 시작 시간이 있으면: 라벨 "일정", "2025-01-10 15:00~17:00" 형태
 *   (개인 일정은 약속처럼 시작~종료 시간이 함께 있는 경우가 많아 별도로 구분해서 보여줍니다)
 * - 그 외(학과, 또는 개인이지만 시작 시간이 없는 경우): 라벨 "마감일", "2025-01-10 14:00" 형태
 * @param {object} todo 할 일 데이터 (dueDate, dueStartTime, dueTime, category 필드를 사용)
 * @returns {{label: string, text: string}} 뱃지에 사용할 라벨과 날짜+시간 문자열
 */
function formatDueDateInfo(todo) {
  const isPersonalCategory = todo.category === "개인";
  const start = todo.dueStartTime || "";
  const end = todo.dueTime || "";

  if (isPersonalCategory && start) {
    // 시작 시간이 있으면 종료 시간 유무와 관계없이 "일정" 라벨과 시작~종료(또는 시작만) 형태로 보여줍니다.
    const timeText = end ? `${start}~${end}` : start;
    return { label: "일정", text: `${todo.dueDate} ${timeText}` };
  }

  return { label: "마감일", text: todo.dueDate + (end ? ` ${end}` : "") };
}

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

// ===== D-Day 뱃지 키티 이미지 표시 (T14) =====
// "css/키티 숫자" 폴더에 있는 숫자(0~9)/문자(D, A, Y, -) 키티 이미지를 D-Day 뱃지의 글자마다 사용합니다.
// 이 폴더에는 "+"나 "지남" 같은 글자에 대한 이미지가 없으므로, D-Day 라벨의 모든 글자가
// 이 매핑에 있는 경우(D-7, D-14, D-Day 등)에만 이미지로 표시하고, 그렇지 않은 경우(D+5 지남 등
// 마감이 지난 경우)는 기존처럼 텍스트로 표시합니다.
const DDAY_CHAR_IMAGE_MAP = {
  "0": "css/키티 숫자/0 키티 복사.png",
  "1": "css/키티 숫자/1 카티.png",
  "2": "css/키티 숫자/2키티.png",
  "3": "css/키티 숫자/3 키티.png",
  "4": "css/키티 숫자/4키티.png",
  "5": "css/키티 숫자/5 키티.png",
  "6": "css/키티 숫자/6키티.png",
  "7": "css/키티 숫자/7 키티.png",
  "8": "css/키티 숫자/8키티.png",
  "9": "css/키티 숫자/9 키티.png",
  "-": "css/키티 숫자/- 키티.png",
  D: "css/키티 숫자/D 키티.png",
  A: "css/키티 숫자/A 키티 .png",
  Y: "css/키티 숫자/Y 키티.png",
};

/**
 * D-Day 라벨 문자열(예: "D-7", "D-Day")의 모든 글자가 키티 이미지로 표시 가능한지 확인하고,
 * 가능하면 글자마다 하나씩 <img> 요소를 만들어 배열로 반환합니다.
 * "+"나 "지남"처럼 이미지가 없는 글자가 하나라도 포함되어 있으면(예: 마감이 지난 "D+5 지남") null을 반환합니다.
 * @param {string} label D-Day 라벨 문자열
 * @returns {HTMLImageElement[] | null} 글자별 키티 이미지 요소 배열, 표시 불가능하면 null
 */
function buildDDayImageElements(label) {
  // "D-Day"처럼 알파벳이 대소문자 섞여 있어도(D, a, y) 같은 이미지를 찾을 수 있도록 대문자로 맞춰 비교합니다.
  const chars = label.split("");
  const isRenderable = chars.every((ch) =>
    Object.prototype.hasOwnProperty.call(DDAY_CHAR_IMAGE_MAP, ch.toUpperCase())
  );
  if (!isRenderable) {
    return null;
  }

  return chars.map((ch) => {
    const imgEl = document.createElement("img");
    imgEl.className = "dday-char-img";
    imgEl.src = DDAY_CHAR_IMAGE_MAP[ch.toUpperCase()];
    imgEl.alt = ch;
    return imgEl;
  });
}

/**
 * D-Day 뱃지(span) 요소 안에 라벨을 채워 넣습니다.
 * 라벨의 모든 글자가 키티 이미지로 표시 가능하면(D-7, D-Day 등) 글자별 키티 이미지로,
 * 그렇지 않으면(마감이 지난 "D+5 지남" 등) 기존처럼 텍스트로 표시합니다.
 * @param {HTMLElement} badgeEl D-Day 뱃지 요소
 * @param {string} label D-Day 라벨 문자열
 */
function fillDDayBadgeContent(badgeEl, label) {
  const imageEls = buildDDayImageElements(label);
  if (imageEls) {
    badgeEl.classList.add("badge-dday-image");
    badgeEl.setAttribute("aria-label", label);
    imageEls.forEach((imgEl) => badgeEl.appendChild(imgEl));
  } else {
    badgeEl.textContent = label;
  }
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
        cell.title = `${day}요일 ${period}교시 · ${classInfo.subject}`;

        const subjectLabel = document.createElement("span");
        subjectLabel.className = "schedule-cell-subject";
        subjectLabel.textContent = classInfo.subject;
        cell.appendChild(subjectLabel);

        // 삭제는 셀 클릭이 아니라, 셀 안의 작은 X 버튼을 눌렀을 때만 동작하도록 해서
        // 실수로 셀을 클릭했다가 수업이 지워지는 일을 방지합니다.
        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "schedule-cell-remove-btn";
        removeBtn.textContent = "×";
        removeBtn.setAttribute("aria-label", `${day}요일 ${period}교시 ${classInfo.subject} 삭제`);
        removeBtn.addEventListener("click", (event) => {
          event.stopPropagation(); // 셀 클릭 이벤트로 전파되지 않도록 막기
          deleteScheduleItem(classInfo.id);
        });
        cell.appendChild(removeBtn);
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
 * 할 일의 카테고리(학과/아르바이트/개인)에 맞는 "🍎 내 일정" 카드 배경 색상 클래스를 반환합니다.
 * - 학과: 빨간색 계열 / 아르바이트: 노란색 계열 / 개인: 데님(파란색) 계열
 * @param {string} category 할 일 카테고리
 * @returns {string} 카드에 추가할 CSS 클래스 이름
 */
function getUpcomingCardCategoryClass(category) {
  if (category === "학과") {
    return "upcoming-card-category-school";
  }
  if (category === "아르바이트") {
    return "upcoming-card-category-parttime";
  }
  return "upcoming-card-category-personal";
}

/**
 * 완료되지 않은 할 일 중 마감일이 있거나(학과/개인), 근무 요일이 있는(아르바이트) 항목을
 * 모두 모아 카테고리와 관계없이 '🍎 내 일정' 카드로 화면에 보여줍니다.
 * - 마감일이 있는 할 일은 D-Day 뱃지를, 근무 요일만 있는 아르바이트는 근무 요일 뱃지를 보여줍니다.
 * - 마감일이 있는 항목은 D-Day가 빠른(더 임박하거나 더 많이 지난) 순으로 정렬하고,
 *   근무 요일만 있는 아르바이트 항목은 뒤쪽에 모아서 보여줍니다.
 */
function renderUpcoming() {
  upcomingListEl.innerHTML = "";

  const upcomingItems = todos
    .filter(
      (todo) =>
        !todo.completed &&
        (todo.dueDate || (todo.category === "아르바이트" && todo.workDays && todo.workDays.length > 0))
    )
    .map((todo) => ({ todo, dDayInfo: todo.dueDate ? getDDayInfo(todo.dueDate) : null }))
    .sort((a, b) => {
      const aKey = a.dDayInfo ? a.dDayInfo.diffDays : Number.POSITIVE_INFINITY;
      const bKey = b.dDayInfo ? b.dDayInfo.diffDays : Number.POSITIVE_INFINITY;
      return aKey - bKey;
    });

  if (upcomingItems.length === 0) {
    upcomingEmptyStateEl.classList.remove("hidden");
    return;
  }

  upcomingEmptyStateEl.classList.add("hidden");

  upcomingItems.forEach(({ todo, dDayInfo }) => {
    const card = document.createElement("div");
    card.className = "upcoming-card " + getUpcomingCardCategoryClass(todo.category);

    const titleEl = document.createElement("span");
    titleEl.className = "upcoming-card-title";
    titleEl.textContent = (todo.type ? `[${todo.type}] ` : "") + todo.title;
    card.appendChild(titleEl);

    // 시간이 있으면 제목 아래에 작게 보여줍니다.
    // 개인 일정에 시작 시간이 있으면 "🕐 15:00~17:00", 그 외(학과 등)에는 "🕐 14:00" 형태입니다.
    const timeText =
      todo.category === "개인" && todo.dueStartTime
        ? todo.dueTime
          ? `${todo.dueStartTime}~${todo.dueTime}`
          : todo.dueStartTime
        : todo.dueTime;
    if (timeText) {
      const timeEl = document.createElement("span");
      timeEl.className = "upcoming-card-time";
      timeEl.textContent = "🕐 " + timeText;
      card.appendChild(timeEl);
    }

    if (dDayInfo) {
      const dDayEl = document.createElement("span");
      dDayEl.className = "badge badge-dday-" + dDayInfo.state;
      fillDDayBadgeContent(dDayEl, dDayInfo.label);
      card.appendChild(dDayEl);
    } else if (todo.workDays && todo.workDays.length > 0) {
      const workDaysEl = document.createElement("span");
      workDaysEl.className = "badge badge-workdays";
      workDaysEl.textContent = "근무: " + todo.workDays.join("·") + formatWorkTimeSuffix(todo);
      card.appendChild(workDaysEl);
    }

    upcomingListEl.appendChild(card);
  });
}

/**
 * YYYY-MM-DD 형식의 날짜 문자열을 만듭니다. (월/일이 한 자리 숫자면 앞에 0을 붙입니다)
 * @param {number} year 연도
 * @param {number} month 0-indexed 월 (0=1월 ... 11=12월)
 * @param {number} day 일
 * @returns {string} YYYY-MM-DD 형식 문자열
 */
function formatDateKey(year, month, day) {
  const mm = String(month + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

/**
 * 특정 날짜(dateKey)에 해당하는 일정(할 일) 목록을 찾아 반환합니다.
 * - 마감일이 이 날짜와 정확히 일치하는 학과/개인 할 일
 * - 이 날짜의 요일에 근무하는 아르바이트 할 일
 * @param {string} dateKey YYYY-MM-DD 형식의 날짜 문자열
 * @returns {Array<{todo: object, isWorkday: boolean}>} 해당 날짜의 일정 목록
 */
function getEventsForDate(dateKey) {
  const weekdayLabel = WORK_DAYS[(new Date(dateKey + "T00:00:00").getDay() + 6) % 7];

  const dueDateEvents = todos
    .filter((todo) => todo.dueDate === dateKey)
    .map((todo) => ({ todo, isWorkday: false }));

  const workdayEvents = todos
    .filter((todo) => todo.category === "아르바이트" && (todo.workDays || []).includes(weekdayLabel))
    .map((todo) => ({ todo, isWorkday: true }));

  return [...dueDateEvents, ...workdayEvents];
}

/**
 * 특정 날짜(dateKey)의 일정 상태를 계산해 캘린더 스티커에 사용할 상태 키를 반환합니다.
 * - personal: 완료하지 않은 "개인" 카테고리 일정이 그 날짜에 하나라도 있는 경우
 *             (마감 지남/임박 여부와 관계없이 항상 최우선으로 표시됩니다)
 * - overdue: 그 날짜에 마감일인 할 일 중 이미 지난(D+) 것이 있는 경우
 * - urgent: 마감이 임박(D-3 ~ D-Day)한 할 일이 있는 경우
 * - normal: 마감/근무 등 일정은 있지만 임박하거나 지난 것은 없는 경우
 * - none: 그 날짜에 아무 일정도 없는 경우
 * @param {string} dateKey YYYY-MM-DD 형식의 날짜 문자열
 * @returns {"personal" | "overdue" | "urgent" | "normal" | "none"} 날짜 상태
 */
function getCalendarDateState(dateKey) {
  const events = getEventsForDate(dateKey);
  if (events.length === 0) {
    return "none";
  }

  // 완료하지 않은 "개인" 카테고리 일정이 있으면, 마감 상태와 무관하게 항상 개인 스티커를 우선 표시합니다.
  const hasActivePersonalEvent = events.some(
    ({ todo, isWorkday }) => !isWorkday && todo.category === "개인" && !todo.completed
  );
  if (hasActivePersonalEvent) {
    return "personal";
  }

  let hasOverdue = false;
  let hasUrgent = false;

  events.forEach(({ todo, isWorkday }) => {
    if (isWorkday || !todo.dueDate) {
      return;
    }
    const dDayInfo = getDDayInfo(todo.dueDate);
    if (!dDayInfo) {
      return;
    }
    if (dDayInfo.state === "overdue") {
      hasOverdue = true;
    } else if (dDayInfo.state === "urgent") {
      hasUrgent = true;
    }
  });

  if (hasOverdue) {
    return "overdue";
  }
  if (hasUrgent) {
    return "urgent";
  }
  return "normal";
}

/**
 * 특정 날짜(dateKey)에 표시할 "개인 일정" 스티커 값을 찾아 반환합니다.
 * 완료하지 않은 "개인" 카테고리 일정이 그 날짜에 여러 개 있으면, 목록에 먼저 등록된(가장 앞에 있는)
 * 일정의 스티커(todo.personalSticker)를 사용합니다. 해당 일정이 없으면 null을 반환합니다.
 * @param {string} dateKey YYYY-MM-DD 형식의 날짜 문자열
 * @returns {string | null} 개인 일정 스티커 값 (예: "냠냠키티") 또는 null
 */
function getActivePersonalStickerForDate(dateKey) {
  const events = getEventsForDate(dateKey);
  const personalEvent = events.find(
    ({ todo, isWorkday }) => !isWorkday && todo.category === "개인" && !todo.completed
  );
  if (!personalEvent) {
    return null;
  }
  return personalEvent.todo.personalSticker || DEFAULT_PERSONAL_STICKER;
}

/**
 * 현재 캘린더가 보여주고 있는 연/월(calendarYear, calendarMonth)을 기준으로
 * 월간 캘린더 그리드(<div id="calendar-grid">)를 새로 그립니다.
 * - 마감일이 있는 학과/개인 할 일은 해당 마감일 날짜 칸에 표시합니다.
 * - 아르바이트 근무 요일이 지정된 할 일은 그 요일에 해당하는 이번 달의 모든 날짜 칸에 표시합니다.
 * - 날짜 칸을 클릭하면 그 날의 상세 일정을 화면 아래쪽에 보여줍니다.
 * - 날짜 상태(마감 지남/임박/여유/없음)에 따라 사용자가 설정한 키티 스티커를 함께 보여줍니다.
 */
function renderCalendar() {
  calendarTitleEl.textContent = `${calendarYear}년 ${calendarMonth + 1}월`;
  calendarGridEl.innerHTML = "";

  // 요일 헤더 (일~토) 그리기
  CALENDAR_WEEKDAY_LABELS.forEach((label) => {
    const weekdayEl = document.createElement("div");
    weekdayEl.className = "calendar-weekday";
    weekdayEl.textContent = label;
    calendarGridEl.appendChild(weekdayEl);
  });

  const firstDayOfMonth = new Date(calendarYear, calendarMonth, 1);
  const startWeekday = firstDayOfMonth.getDay(); // 0(일) ~ 6(토)
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();

  const todayDateObj = new Date();
  const isCurrentMonth =
    todayDateObj.getFullYear() === calendarYear && todayDateObj.getMonth() === calendarMonth;
  const todayDate = todayDateObj.getDate();

  // 1일이 시작되기 전 빈 칸 채우기
  for (let i = 0; i < startWeekday; i += 1) {
    const emptyCell = document.createElement("div");
    emptyCell.className = "calendar-day-cell calendar-day-empty";
    calendarGridEl.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateKey = formatDateKey(calendarYear, calendarMonth, day);

    const dayCell = document.createElement("div");
    dayCell.className = "calendar-day-cell";
    dayCell.dataset.date = dateKey;
    if (isCurrentMonth && day === todayDate) {
      dayCell.classList.add("calendar-day-today");
    }
    if (dateKey === selectedCalendarDate) {
      dayCell.classList.add("calendar-day-selected");
    }

    const dayNumberEl = document.createElement("span");
    dayNumberEl.className = "calendar-day-number";
    dayNumberEl.textContent = String(day);
    dayCell.appendChild(dayNumberEl);

    // 날짜 상태에 맞는 키티 스티커를 날짜 칸 오른쪽 위에 표시합니다.
    // - personal(완료하지 않은 개인 일정이 있는 날): 그 일정을 등록할 때 골라둔 개인 스티커(냠냠/사랑/감기 키티)
    // - overdue/urgent/normal/none: 고정 스티커(우울/울음/안경/잠자는 키티)
    const dateState = getCalendarDateState(dateKey);
    const stickerValue =
      dateState === "personal"
        ? getActivePersonalStickerForDate(dateKey) || DEFAULT_PERSONAL_STICKER
        : FIXED_CALENDAR_STATE_STICKERS[dateState];
    const stickerSrc = getCalendarStickerSrc(stickerValue);
    if (stickerSrc) {
      const stickerEl = document.createElement("img");
      stickerEl.className = "calendar-day-sticker";
      stickerEl.src = stickerSrc;
      stickerEl.alt = stickerValue;
      // 각 키티 이미지는 2000x2000 캔버스 안에서 캐릭터가 차지하는 실제 비율이 서로 달라,
      // 같은 크기의 <img>로 표시하면 스티커마다 눈에 보이는 캐릭터 크기가 달라 보입니다.
      // data-sticker 속성에 값을 담아두고, css/style.css에서 스티커별로 컨테이너 크기를
      // 다르게 지정해 냠냠 키티를 기준으로 시각적 크기를 맞춥니다.
      stickerEl.dataset.sticker = stickerValue;
      dayCell.appendChild(stickerEl);
    }

    // 이 날짜의 일정(마감일 할 일 + 근무 요일 할 일)을 모아 표시
    getEventsForDate(dateKey).forEach(({ todo, isWorkday }) => {
      const eventEl = document.createElement("span");
      eventEl.className = "calendar-event" + (isWorkday ? " calendar-event-workday" : "");
      eventEl.textContent = todo.title;
      eventEl.title = todo.title;
      dayCell.appendChild(eventEl);
    });

    // 날짜 칸을 클릭하면 그 날짜를 선택하고 상세 일정을 보여줍니다.
    dayCell.addEventListener("click", () => {
      selectedCalendarDate = dateKey;
      renderCalendar();
    });

    calendarGridEl.appendChild(dayCell);
  }

  renderCalendarDetail();
}

/**
 * 현재 선택된 날짜(selectedCalendarDate)의 상세 일정을 화면(<ul id="calendar-detail-list">)에 보여줍니다.
 * 아직 선택한 날짜가 없으면 안내 문구만 보여줍니다.
 */
function renderCalendarDetail() {
  calendarDetailListEl.innerHTML = "";

  if (!selectedCalendarDate) {
    calendarDetailTitleEl.textContent = "날짜를 선택하면 상세 일정을 볼 수 있어요";
    calendarDetailEmptyStateEl.classList.add("hidden");
    return;
  }

  const [year, month, day] = selectedCalendarDate.split("-").map(Number);
  calendarDetailTitleEl.textContent = `${year}년 ${month}월 ${day}일 일정`;

  const events = getEventsForDate(selectedCalendarDate);

  if (events.length === 0) {
    calendarDetailEmptyStateEl.classList.remove("hidden");
    return;
  }

  calendarDetailEmptyStateEl.classList.add("hidden");

  events.forEach(({ todo, isWorkday }) => {
    const item = document.createElement("li");
    item.className = "calendar-detail-item";

    // 아르바이트는 근무 시작~종료 시간을, 학과/개인은 마감(또는 시작~종료) 시간을
    // 제목 앞에 함께 보여줍니다. 개인 일정은 시작 시간이 있으면 "15:00~17:00" 형태로 표시됩니다.
    const timePrefix = isWorkday
      ? formatWorkTimeSuffix(todo).trim()
      : todo.category === "개인" && todo.dueStartTime
        ? todo.dueTime
          ? `${todo.dueStartTime}~${todo.dueTime}`
          : todo.dueStartTime
        : todo.dueTime || "";

    const titleEl = document.createElement("span");
    titleEl.className = "calendar-detail-item-title";
    titleEl.textContent =
      (timePrefix ? `[${timePrefix}] ` : "") + (todo.type ? `[${todo.type}] ` : "") + todo.title;

    const badgeEl = document.createElement("span");
    if (isWorkday) {
      badgeEl.className = "badge badge-workdays";
      badgeEl.textContent = "아르바이트";
    } else {
      badgeEl.className = "badge badge-category";
      badgeEl.textContent = todo.category;
    }

    item.appendChild(titleEl);
    item.appendChild(badgeEl);
    calendarDetailListEl.appendChild(item);
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
  renderCalendar();
}

/**
 * 할 일의 메모를 보여주는 영역을 만들어 반환합니다.
 * 메모가 미리보기 길이(MEMO_PREVIEW_LENGTH)보다 길면 기본적으로 일부만 보여주고,
 * "더보기" 버튼을 눌러 전체 메모를 펼쳐볼 수 있게 합니다.
 * @param {object} todo 할 일 데이터 (memo 필드를 사용)
 * @returns {HTMLElement} 메모 영역 요소
 */
function createMemoElement(todo) {
  const memoWrap = document.createElement("div");
  memoWrap.className = "todo-item-memo";

  const memoLabel = document.createElement("span");
  memoLabel.className = "todo-item-memo-label";
  memoLabel.textContent = "메모";
  memoWrap.appendChild(memoLabel);

  const memoTextEl = document.createElement("p");
  memoTextEl.className = "todo-item-memo-text";

  const isLongMemo = todo.memo.length > MEMO_PREVIEW_LENGTH;
  const isExpanded = expandedMemoTodoIds.has(todo.id);

  const applyMemoText = () => {
    if (isLongMemo && !expandedMemoTodoIds.has(todo.id)) {
      memoTextEl.textContent = todo.memo.slice(0, MEMO_PREVIEW_LENGTH) + "…";
    } else {
      memoTextEl.textContent = todo.memo;
    }
  };
  applyMemoText();
  memoWrap.appendChild(memoTextEl);

  // 메모가 미리보기 길이보다 길 때만 "더보기/접기" 버튼을 보여줍니다.
  if (isLongMemo) {
    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "todo-item-memo-toggle-btn";
    toggleBtn.textContent = isExpanded ? "접기" : "더보기";
    toggleBtn.addEventListener("click", () => {
      if (expandedMemoTodoIds.has(todo.id)) {
        expandedMemoTodoIds.delete(todo.id);
      } else {
        expandedMemoTodoIds.add(todo.id);
      }
      applyMemoText();
      toggleBtn.textContent = expandedMemoTodoIds.has(todo.id) ? "접기" : "더보기";
    });
    memoWrap.appendChild(toggleBtn);
  }

  return memoWrap;
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

  // 카테고리가 '아르바이트'인 할 일은 중요도가 없으므로(priority가 빈 값) 중요도 뱃지를 보여주지 않습니다.
  if (todo.priority) {
    const priorityBadge = document.createElement("span");
    priorityBadge.className = "badge badge-priority-" + todo.priority;
    priorityBadge.textContent = "중요도: " + todo.priority;
    metaWrap.appendChild(priorityBadge);
  }

  if (todo.dueDate) {
    // 카테고리가 '개인'이고 시작 시간이 있으면 "일정: 날짜 시작~종료" 형태로,
    // 그 외에는 기존처럼 "마감일: 날짜 (시간)" 형태로 보여줍니다.
    const dueInfo = formatDueDateInfo(todo);
    const dueDateBadge = document.createElement("span");
    dueDateBadge.className = "badge badge-due-date";
    dueDateBadge.textContent = `${dueInfo.label}: ${dueInfo.text}`;
    metaWrap.appendChild(dueDateBadge);

    // 할 일 목록 카드에는 마감일만 보여주고, D-Day 뱃지는 표시하지 않습니다.
    // (D-Day는 시간표 아래 "마감 임박 학과 일정" 요약 카드(renderUpcoming)에서만 보여줍니다)
  }

  // 카테고리가 '아르바이트'이고 근무 요일이 지정되어 있으면 근무 요일 뱃지를 보여줍니다.
  if (todo.workDays && todo.workDays.length > 0) {
    const workDaysBadge = document.createElement("span");
    workDaysBadge.className = "badge badge-workdays";
    // 근무 시작~종료 시간이 지정되어 있으면 "근무: 월·수 14:00~18:00" 형태로 함께 보여줍니다.
    workDaysBadge.textContent = "근무: " + todo.workDays.join("·") + formatWorkTimeSuffix(todo);
    metaWrap.appendChild(workDaysBadge);
  }

  // 카테고리가 '개인'이고 캘린더 스티커가 지정되어 있으면, 이 일정에 어떤 캘린더 스티커가
  // 연결되어 있는지 작은 이미지 뱃지로 보여줍니다. (실제 캘린더 날짜 칸에도 이 스티커가 표시됩니다)
  if (todo.personalSticker) {
    const stickerBadge = document.createElement("span");
    stickerBadge.className = "badge badge-personal-sticker";
    const stickerImg = document.createElement("img");
    stickerImg.className = "badge-personal-sticker-img";
    stickerImg.src = getCalendarStickerSrc(todo.personalSticker);
    stickerImg.alt = todo.personalSticker;
    stickerBadge.appendChild(stickerImg);
    stickerBadge.appendChild(document.createTextNode(todo.personalSticker.replace("키티", " 키티")));
    metaWrap.appendChild(stickerBadge);
  }

  contentWrap.appendChild(titleSpan);
  contentWrap.appendChild(metaWrap);

  // 메모가 있는 할 일이면 메모 영역을 추가로 보여줍니다.
  // 기존에 저장된 할 일에 memo 필드가 없는 경우에도 todo.memo가 undefined이므로 아래 조건에서 자연스럽게 걸러집니다.
  if (todo.memo) {
    contentWrap.appendChild(createMemoElement(todo));
  }

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
 * HH:MM 형식의 시간 문자열이 올바른 형식인지 확인합니다.
 * <input type="time">에서 나온 값이 아니거나 형식이 이상하면 빈 문자열로 취급합니다.
 * @param {string} time 검증할 시간 문자열
 * @returns {string} 유효하면 그대로, 아니면 빈 문자열
 */
function resolveTimeValue(time) {
  return typeof time === "string" && /^\d{2}:\d{2}$/.test(time) ? time : "";
}

/**
 * 새로운 할 일을 목록에 추가합니다.
 * @param {object} params 할 일 입력 정보
 * @param {string} params.title 할 일 제목
 * @param {string} params.category 카테고리 (학과 / 아르바이트 / 개인)
 * @param {string} params.type 유형 (과제 / 시험 / 발표 / 팀플 / 기타, 카테고리가 '학과'일 때만 의미 있음)
 * @param {string} params.priority 중요도 (상 / 중 / 하, 카테고리가 '아르바이트'가 아닐 때만 의미 있음)
 * @param {string} params.dueDate 마감일 (YYYY-MM-DD 형식 문자열, 카테고리가 '아르바이트'가 아닐 때만 의미 있음)
 * @param {string} params.dueStartTime 시작 시간 (HH:MM 형식, 선택 입력, 카테고리가 '개인'일 때만 의미 있음)
 * @param {string} params.dueTime 마감(종료) 시간 (HH:MM 형식, 선택 입력, 카테고리가 '아르바이트'가 아닐 때만 의미 있음)
 * @param {string[]} params.workDays 근무 요일 목록 (카테고리가 '아르바이트'일 때만 의미 있음)
 * @param {string} params.workStartTime 근무 시작 시간 (HH:MM 형식, 선택 입력, 카테고리가 '아르바이트'일 때만 의미 있음)
 * @param {string} params.workEndTime 근무 종료 시간 (HH:MM 형식, 선택 입력, 카테고리가 '아르바이트'일 때만 의미 있음)
 * @param {string} params.personalSticker 캘린더 스티커 (냠냠/사랑/감기 키티, 카테고리가 '개인'일 때만 의미 있음)
 * @param {string} params.memo 메모 (선택 입력, 비어있어도 할 일 등록에는 문제 없음)
 */
function addTodo({
  title,
  category,
  type,
  priority,
  dueDate,
  dueStartTime,
  dueTime,
  workDays,
  workStartTime,
  workEndTime,
  personalSticker,
  memo,
}) {
  const trimmedTitle = title.trim();
  if (trimmedTitle === "") {
    return; // 빈 값은 추가하지 않음
  }

  // 메모는 선택 입력이므로 비어있어도 되고, 앞뒤 공백만 정리해서 저장합니다.
  const trimmedMemo = (memo || "").trim();

  // 카테고리가 '학과'가 아니면 유형은 저장하지 않습니다.
  const isSchoolCategory = category === "학과";
  const resolvedType = isSchoolCategory && SCHOOL_TYPES.includes(type) ? type : "";

  // 카테고리가 '아르바이트'일 때는 마감일 대신 근무 요일을 저장하고, 마감일은 저장하지 않습니다.
  // 아르바이트는 중요도도 필요 없으므로 저장하지 않습니다.
  const isPartTimeCategory = category === "아르바이트";
  // 카테고리가 '개인'일 때만 "시작 시간"을 입력받아 저장합니다. (약속처럼 시작~종료 시간을 함께 관리)
  const isPersonalCategory = category === "개인";
  const resolvedPriority = isPartTimeCategory ? "" : priority;
  const resolvedDueDate = isPartTimeCategory ? "" : dueDate || "";
  // 마감(종료) 시간은 마감일이 있을 때만 의미가 있으므로, 마감일이 없으면 시간도 저장하지 않습니다.
  const resolvedDueTime = isPartTimeCategory || !resolvedDueDate ? "" : resolveTimeValue(dueTime);
  // 시작 시간은 카테고리가 '개인'이고 마감일이 있을 때만 저장합니다.
  const resolvedDueStartTime =
    isPersonalCategory && resolvedDueDate ? resolveTimeValue(dueStartTime) : "";
  const resolvedWorkDays = isPartTimeCategory
    ? (workDays || []).filter((day) => WORK_DAYS.includes(day))
    : [];
  // 근무 시작/종료 시간은 선택 입력이며, 카테고리가 '아르바이트'일 때만 저장합니다.
  const resolvedWorkStartTime = isPartTimeCategory ? resolveTimeValue(workStartTime) : "";
  const resolvedWorkEndTime = isPartTimeCategory ? resolveTimeValue(workEndTime) : "";

  // 카테고리가 '개인'일 때만 캘린더 스티커(냠냠/사랑/감기 키티)를 저장합니다.
  // 유효하지 않은 값이 들어오면 기본값(냠냠 키티)으로 저장합니다.
  const validPersonalStickers = PERSONAL_STICKER_OPTIONS.map((option) => option.value);
  const resolvedPersonalSticker = isPersonalCategory
    ? validPersonalStickers.includes(personalSticker)
      ? personalSticker
      : DEFAULT_PERSONAL_STICKER
    : "";

  const newTodo = {
    id: Date.now().toString() + Math.random().toString(16).slice(2), // 간단한 고유 id 생성
    title: trimmedTitle,
    category,
    type: resolvedType,
    priority: resolvedPriority,
    dueDate: resolvedDueDate,
    dueStartTime: resolvedDueStartTime,
    dueTime: resolvedDueTime,
    workDays: resolvedWorkDays,
    workStartTime: resolvedWorkStartTime,
    workEndTime: resolvedWorkEndTime,
    personalSticker: resolvedPersonalSticker,
    memo: trimmedMemo,
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

  // 체크된 근무 요일 체크박스들의 값(월/화/.../일)만 모아 배열로 만듭니다.
  const checkedWorkDays = Array.from(todoWorkdayCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  addTodo({
    title: todoTitleInput.value,
    category: todoCategorySelect.value,
    type: todoTypeSelect.value,
    priority: todoPrioritySelect.value,
    dueDate: todoDueDateInput.value,
    dueStartTime: todoDueStartTimeInput.value,
    dueTime: todoDueTimeInput.value,
    workDays: checkedWorkDays,
    workStartTime: todoWorkStartTimeInput.value,
    workEndTime: todoWorkEndTimeInput.value,
    personalSticker: todoPersonalStickerSelect.value,
    memo: todoMemoInput.value,
  });

  // 입력창 초기화 (카테고리/중요도/캘린더 스티커는 마지막 선택값을 유지해 연속 입력을 편하게 함)
  todoTitleInput.value = "";
  todoDueDateInput.value = "";
  todoDueStartTimeInput.value = "";
  todoDueTimeInput.value = "";
  todoWorkStartTimeInput.value = "";
  todoWorkEndTimeInput.value = "";
  todoMemoInput.value = "";
  todoWorkdayCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
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

// 이전 달 버튼 클릭 시 캘린더를 한 달 전으로 이동
calendarPrevBtn.addEventListener("click", () => {
  calendarMonth -= 1;
  if (calendarMonth < 0) {
    calendarMonth = 11;
    calendarYear -= 1;
  }
  renderCalendar();
});

// 다음 달 버튼 클릭 시 캘린더를 한 달 뒤로 이동
calendarNextBtn.addEventListener("click", () => {
  calendarMonth += 1;
  if (calendarMonth > 11) {
    calendarMonth = 0;
    calendarYear += 1;
  }
  renderCalendar();
});

/**
 * 캘린더 위쪽 스티커 안내 영역을 초기화하고 화면을 채웁니다.
 * 마감 지남/마감 임박/여유 있음/일정 없음 4가지 상태 스티커는 고정값이라 미리보기 이미지만 보여줍니다.
 * "개인" 일정 스티커(냠냠/사랑/감기 키티)는 여기서 전역으로 고르는 게 아니라, 할 일을 등록할 때
 * 일정마다 각각 지정하므로 이 함수에서는 다루지 않습니다.
 */
function renderCalendarStickerSettings() {
  // 고정 상태 스티커 미리보기 (마감 지남/임박/여유/없음)
  calendarFixedStickerPreviewEls.forEach((previewEl) => {
    const state = previewEl.dataset.state;
    const value = FIXED_CALENDAR_STATE_STICKERS[state];
    previewEl.src = getCalendarStickerSrc(value);
    previewEl.alt = value;
  });
}

// ===== 메모 (T18) =====

// 메모 내용을 입력할 때마다 매번 저장하면 너무 자주 저장소에 접근하게 되므로,
// 타이핑을 멈춘 뒤 잠시(디바운스) 기다렸다가 한 번만 저장합니다.
let memoSaveTimerId = null;
const MEMO_SAVE_DEBOUNCE_MS = 400;

if (memoInputEl) {
  // 페이지가 열릴 때 저장되어 있던 메모를 textarea에 그대로 복원합니다.
  memoInputEl.value = loadMemo();

  memoInputEl.addEventListener("input", () => {
    if (memoSaveTimerId) {
      clearTimeout(memoSaveTimerId);
    }
    memoSaveTimerId = setTimeout(() => {
      saveMemo(memoInputEl.value);
    }, MEMO_SAVE_DEBOUNCE_MS);
  });
}

// 페이지가 처음 열렸을 때 화면 초기 상태 그리기 (저장된 데이터가 있으면 그대로 복원)
renderCalendarStickerSettings();
renderTodoList();
renderSchedule();
renderCalendar();
