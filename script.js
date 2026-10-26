// 개발자 도구의 Console에 연결 확인 문장을 출력합니다.
console.log("JavaScript가 연결되었습니다.");

// 바뀌지 않는 게임 목록은 const로 저장합니다.
// tags에는 장르·인원·분위기·플레이 시간 키워드를 띄어 써서 적습니다.
const games = [
  { name: "스타듀 밸리", tags: "시뮬레이션 혼자 함께 힐링 몰입 보통" },
  { name: "마인크래프트", tags: "샌드박스 혼자 함께 힐링 탐험 보통" },
  { name: "잇 테이크 투", tags: "협동 함께 감동 유머 보통" },
  { name: "할로우 나이트", tags: "메트로배니아 혼자 도전 탐험 보통" },
  { name: "모여봐요 동물의 숲", tags: "시뮬레이션 혼자 함께 힐링 짧게" },
  { name: "오버쿡드 2", tags: "협동 함께 유머 긴장 짧게" },
  { name: "엘든 링", tags: "소울라이크 혼자 함께 도전 탐험 길게" },
  { name: "리그 오브 레전드", tags: "MOBA 함께 경쟁 긴장 보통" },
  { name: "발로란트", tags: "FPS 함께 경쟁 긴장 보통" },
  { name: "오버워치 2", tags: "FPS 함께 경쟁 유머 짧게" },
  { name: "배틀그라운드", tags: "배틀로얄 혼자 함께 경쟁 긴장 짧게" },
  { name: "메이플스토리", tags: "MMORPG 혼자 함께 몰입 힐링 길게" },
  { name: "마리오 카트 8 디럭스", tags: "레이싱 함께 유머 경쟁 짧게" },
  { name: "젤다의 전설: 야생의 숨결", tags: "오픈월드 혼자 탐험 힐링 길게" },
  { name: "더 위쳐 3: 와일드 헌트", tags: "오픈월드 혼자 몰입 탐험 길게" },
  { name: "레드 데드 리뎀션 2", tags: "오픈월드 혼자 몰입 감동 길게" },
  { name: "발더스 게이트 3", tags: "RPG 혼자 함께 몰입 탐험 길게" },
  { name: "슈퍼 마리오 오디세이", tags: "플랫포머 혼자 힐링 유머 짧게" },
  { name: "셀레스트", tags: "플랫포머 혼자 도전 감동 짧게" },
  { name: "하데스", tags: "로그라이크 혼자 도전 몰입 짧게" },
  { name: "발라트로", tags: "카드 혼자 몰입 힐링 짧게" },
  { name: "데이브 더 다이버", tags: "어드벤처 혼자 힐링 유머 짧게" },
  { name: "언더테일", tags: "RPG 혼자 감동 유머 보통" },
  { name: "철권 8", tags: "격투 함께 경쟁 도전 짧게" },
  { name: "포탈 2", tags: "퍼즐 혼자 함께 유머 몰입 짧게" },
  { name: "바이오하자드 4 리메이크", tags: "호러 혼자 공포 긴장 보통" },
  { name: "몬스터 헌터 와일즈", tags: "액션 RPG 혼자 함께 도전 탐험 보통" },
  { name: "심즈 4", tags: "시뮬레이션 혼자 힐링 유머 보통" }
];

// HTML에서 id로 네 요소를 찾습니다.
const pickForm = document.querySelector("#pick-form");
const tasteInput = document.querySelector("#taste");
const pickButton = document.querySelector("#pickButton");
const pickMessage = document.querySelector("#pickMessage");

// 요소가 보이면 선택 성공, null이면 HTML id를 다시 확인합니다.
console.log(pickForm, tasteInput, pickButton, pickMessage);

// 자료형을 예상하고 typeof로 확인합니다.
console.log(typeof tasteInput.value);    // string
console.log(typeof games.length);        // number
console.log(typeof pickButton.disabled); // boolean

// 입력한 키워드가 모두 tags에 들어 있는 게임만 후보로 모읍니다.
function findCandidates(taste) {
  const keywords = taste.replaceAll(",", " ").split(" ");
  const candidates = [];

  games.forEach(function (game) {
    let matched = true;

    keywords.forEach(function (keyword) {
      if (!game.tags.includes(keyword)) {
        matched = false;
      }
    });

    if (matched) {
      candidates.push(game.name);
    }
  });

  return candidates;
}

// 후보 목록에서 하나를 무작위로 골라 돌려줍니다.
function pickRandomGame(candidates) {
  const index = Math.floor(Math.random() * candidates.length);
  return candidates[index];
}

// 뽑기 설정에서 사용할 다섯 요소를 찾습니다.
const themeButton = document.querySelector("#themeButton");
const nicknameInput = document.querySelector("#nickname");
const nicknameCount = document.querySelector("#nicknameCount");
const allGamesCheck = document.querySelector("#allGamesCheck");
const allGamesMessage = document.querySelector("#allGamesMessage");

// click · 테마를 바꾸고 버튼 문구를 다음 동작으로 바꿉니다.
function handleThemeClick() {
  const isDark = document.body.classList.toggle("dark");

  themeButton.textContent = isDark
    ? "밝은 테마로 바꾸기"
    : "어두운 테마로 바꾸기";
}

// input · 닉네임을 쓰거나 지울 때마다 현재 글자 수를 보여 줍니다.
function handleNicknameInput() {
  const currentLength = nicknameInput.value.length;
  nicknameCount.textContent = currentLength + " / 10";
}

// change · 키워드 없이 뽑기 선택 여부에 따라 안내 문구·스타일·입력창 상태를 함께 바꿉니다.
function handleAllGamesChange() {
  const pickAll = allGamesCheck.checked;

  tasteInput.disabled = pickAll;
  allGamesMessage.textContent = pickAll
    ? "취향 키워드 없이 인원·플레이 시간만으로 뽑습니다."
    : "입력한 취향 키워드가 모두 들어간 게임 중에서 뽑습니다.";

  allGamesMessage.classList.toggle("is-checked", pickAll);
}

themeButton.addEventListener("click", handleThemeClick);
nicknameInput.addEventListener("input", handleNicknameInput);
allGamesCheck.addEventListener("change", handleAllGamesChange);

// 주요 기능의 탭 버튼과 패널을 모두 찾습니다.
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

// 모든 탭과 패널의 선택 상태를 해제합니다.
function resetTabsAndPanels() {
  tabs.forEach(function (tab) {
    tab.classList.remove("is-active");
    tab.setAttribute("aria-selected", "false");
  });

  panels.forEach(function (panel) {
    panel.classList.remove("is-active");
    panel.hidden = true;
  });
}

// 클릭한 탭과 data-target으로 연결된 패널만 활성화합니다.
function activateTab(clickedTab) {
  const targetSelector = clickedTab.dataset.target;
  const targetPanel = document.querySelector(targetSelector);

  clickedTab.classList.add("is-active");
  clickedTab.setAttribute("aria-selected", "true");

  targetPanel.classList.add("is-active");
  targetPanel.hidden = false;
}

function handleTabClick(event) {
  resetTabsAndPanels();
  activateTab(event.currentTarget);
}

tabs.forEach(function (tab) {
  tab.addEventListener("click", handleTabClick);
});

// 게임 뽑기 흐름에서 사용할 요소를 찾습니다.
const pickFlow = document.querySelector("#pickFlow");
const pickNext1 = document.querySelector("#pickNext1");
const pickSteps = document.querySelectorAll(".pick-step");
const pickProgress = document.querySelector("#pickProgress");
const playersSelect = document.querySelector("#players");
const playTimeSelect = document.querySelector("#playTime");
const playersHelp = document.querySelector("#playersHelp");
const selectError = document.querySelector("#selectError");
const pickSummary = document.querySelector("#pickSummary");
const pickResult = document.querySelector("#pickResult");
const stepNames = ["취향 입력", "인원·시간 선택", "내용 확인", "뽑기 완료", "게임 기록"];

// 처음 안내 문구를 저장해 두었다가 오류를 고치면 다시 보여 줍니다.
const tasteGuide = pickMessage.textContent;

// 확인 단계에서 정한 후보 목록입니다. 완료와 다시 뽑기에서 사용합니다.
let pickCandidates = [];

// 현재 단계만 보여 주고 진행 표시를 바꿉니다.
function showPickStep(step) {
  pickSteps.forEach((item) => {
    item.hidden = Number(item.dataset.step) !== step;
  });

  pickProgress.textContent = step <= 3
    ? `${step} / 3 · ${stepNames[step - 1]}`
    : stepNames[step - 1];
}

// 1·2단계에서 입력·선택한 조건을 키워드 하나로 모읍니다. 상관없음은 빈 값으로 둡니다.
function getCondition() {
  const taste = allGamesCheck.checked ? "" : tasteInput.value.trim();
  const players = playersSelect.value === "상관없음" ? "" : playersSelect.value;
  const playTime = playTimeSelect.value === "상관없음" ? "" : playTimeSelect.value;

  return `${taste},${players},${playTime}`;
}

// 완료 화면에서 뽑은 게임입니다. 기록할 때 사용합니다.
let currentGame = "";

// 확인한 후보 중에서 하나를 뽑아 완료 화면에 보여 줍니다.
function showPickResult() {
  const nickname = nicknameInput.value.trim();
  const greeting = nickname === "" ? "" : `${nickname}님, `;

  currentGame = pickRandomGame(pickCandidates);
  pickResult.textContent = `${greeting}오늘의 게임은 「${currentGame}」입니다!`;
  showSavedRecord();
}

// 시작 · 기존 게임 뽑기 버튼을 누르면 흐름을 열고 1단계를 보여 줍니다.
pickButton.addEventListener("click", () => {
  pickFlow.hidden = false;
  pickButton.hidden = true;
  showPickStep(1);
  // 키워드 없이 뽑기를 선택해 입력창을 쓸 수 없으면 다음 버튼으로 포커스를 옮깁니다.
  (tasteInput.disabled ? pickNext1 : tasteInput).focus();
});

// 1단계 · 키워드가 비었거나 맞는 게임이 없으면 같은 단계에서 고치게 합니다.
pickForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const taste = tasteInput.value.trim();
  const pickAll = allGamesCheck.checked;
  const missingTaste = !pickAll && taste === "";
  const noGame = !pickAll && findCandidates(taste).length === 0;

  if (missingTaste || noGame) {
    pickMessage.textContent = missingTaste
      ? "취향 키워드를 입력해 주세요. (예: 힐링, RPG)"
      : `'${taste}' 키워드가 모두 들어간 게임이 없습니다. 키워드를 줄이거나 주요 기능의 취향 고르기 탭에 있는 키워드로 바꿔 주세요.`;
    pickMessage.classList.add("is-error");
    tasteInput.classList.add("has-error");
    tasteInput.focus();
    return;
  }

  pickMessage.textContent = tasteGuide;
  pickMessage.classList.remove("is-error");
  tasteInput.classList.remove("has-error");
  showPickStep(2);
  playersSelect.focus();
});

// 2단계 · 인원을 바꾸면 이전 오류를 지우고, 함께를 고르면 기기 확인 안내를 보여 줍니다.
playersSelect.addEventListener("change", () => {
  playersHelp.hidden = playersSelect.value !== "함께";
  selectError.textContent = "";
  selectError.classList.remove("is-error");
  playersSelect.classList.remove("has-error");
});

// 2단계 · 인원을 고르지 않았거나 맞는 게임이 없으면 같은 단계에서 고치게 합니다.
document.querySelector("#pickNext2").addEventListener("click", () => {
  const missingPlayers = playersSelect.value === "";
  const candidates = findCandidates(getCondition());

  if (missingPlayers || candidates.length === 0) {
    selectError.textContent = missingPlayers
      ? "함께 할 인원을 선택해 주세요. 상관없다면 '상관없음'을 고르면 됩니다."
      : "선택한 조건에 맞는 게임이 없습니다. 플레이 시간을 바꾸거나 이전 단계에서 키워드를 수정해 주세요.";
    selectError.classList.add("is-error");
    playersSelect.classList.toggle("has-error", missingPlayers);
    playersSelect.focus();
    return;
  }

  selectError.textContent = "";
  selectError.classList.remove("is-error");
  playersSelect.classList.remove("has-error");

  // 확인 단계에 입력·선택한 값과 후보 수를 보여 줍니다.
  pickCandidates = candidates;
  const taste = allGamesCheck.checked ? "키워드 없이 뽑기" : tasteInput.value.trim();
  pickSummary.textContent =
    `키워드: ${taste} · 인원: ${playersSelect.value} · 플레이 시간: ${playTimeSelect.value} → 조건에 맞는 게임 ${candidates.length}개 중에서 뽑습니다.`;

  showPickStep(3);
  document.querySelector("#pickComplete").focus();
});

// 이전 단계로 돌아가도 입력·선택한 값은 그대로 둡니다.
document.querySelector("#pickBack2").addEventListener("click", () => {
  showPickStep(1);
  (tasteInput.disabled ? pickNext1 : tasteInput).focus();
});

document.querySelector("#pickBack3").addEventListener("click", () => {
  showPickStep(2);
  playersSelect.focus();
});

// 완료 · 확인한 조건으로 게임을 뽑고, 같은 조건으로 다시 뽑을 수 있습니다.
document.querySelector("#pickComplete").addEventListener("click", () => {
  showPickResult();
  showPickStep(4);
  document.querySelector("#pickAgain").focus();
});

document.querySelector("#pickAgain").addEventListener("click", showPickResult);

// 다시 시작 · 입력·선택·오류·진행 상태를 모두 처음으로 돌립니다.
document.querySelector("#pickRestart").addEventListener("click", () => {
  tasteInput.value = "";
  playersSelect.value = "";
  playTimeSelect.value = "상관없음";

  pickMessage.textContent = tasteGuide;
  pickMessage.classList.remove("is-error");
  selectError.textContent = "";
  selectError.classList.remove("is-error");
  [tasteInput, playersSelect].forEach((field) => field.classList.remove("has-error"));

  playersHelp.hidden = true;
  pickSummary.textContent = "";
  pickResult.textContent = "";
  pickCandidates = [];

  // 뽑기 설정의 키워드 없이 뽑기 선택도 풀어 입력창을 다시 쓸 수 있게 합니다.
  allGamesCheck.checked = false;
  handleAllGamesChange();

  // 기록 입력 칸과 완료 화면의 기록 안내도 비웁니다. 이미 저장한 기록은 그대로 둡니다.
  currentGame = "";
  resetRecordForm();
  setRecordNotice("", false);

  showPickStep(1);
  tasteInput.focus();
});


// 뽑은 게임 기록에서 사용할 요소를 찾습니다.
const recordNotice = document.querySelector("#recordNotice");
const recordOpen = document.querySelector("#recordOpen");
const recordTarget = document.querySelector("#recordTarget");
const recordGuide = document.querySelector("#recordGuide");
const recordForm = document.querySelector("#recordForm");
const ratingField = document.querySelector("#ratingField");
const ratingInputs = document.querySelectorAll('input[name="rating"]');
const reviewField = document.querySelector("#reviewField");
const recordReview = document.querySelector("#recordReview");
const reviewHelp = document.querySelector("#reviewHelp");
const reviewCount = document.querySelector("#reviewCount");
const replayStop = document.querySelector("#replayStop");
const stopReasonField = document.querySelector("#stopReasonField");
const stopReason = document.querySelector("#stopReason");
const recordSubmitStatus = document.querySelector("#recordSubmitStatus");
const recordCancel = document.querySelector("#recordCancel");
const recordSave = document.querySelector("#recordSave");
const recordStatus = document.querySelector("#recordStatus");
const recordEmpty = document.querySelector("#recordEmpty");
const recordList = document.querySelector("#recordList");

// 기록은 { name, rating, review, stopReason } 객체로 저장하고, 새 기록을 뒤에 넣습니다.
// 브라우저 저장 공간(localStorage)에는 이 이름으로 저장합니다.
const storageKey = "gamepick-records";
const reviewLimit = 30;

// 한 줄 평의 처음 안내 문구를 저장해 두었다가 조건을 다시 못 맞추면 되돌립니다.
const reviewGuide = reviewHelp.textContent;

// 기록 폼의 제출 상태입니다. idle(기본) · error(검사 실패) · loading(저장 중) · fail(저장 실패)
let submitState = "idle";

// 별점 1~5점에 맞는 별 모양입니다. 별점 - 1 위치의 문자열을 사용합니다.
const starTexts = ["★☆☆☆☆", "★★☆☆☆", "★★★☆☆", "★★★★☆", "★★★★★"];

// 브라우저에 저장해 둔 기록을 불러옵니다. 저장된 것이 없거나 읽을 수 없으면 빈 목록으로 시작합니다.
function loadRecords() {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved === null ? [] : JSON.parse(saved);
  } catch (error) {
    return [];
  }
}

// 기록 목록을 브라우저에 저장합니다. 브라우저가 저장을 막았거나 공간이 가득 차면 false를 돌려줍니다.
function storeRecords(list) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(list));
    return true;
  } catch (error) {
    return false;
  }
}

let records = loadRecords();

// 같은 게임의 기록이 있으면 그 기록을, 없으면 null을 돌려줍니다.
function findRecord(name) {
  let found = null;

  records.forEach((record) => {
    if (record.name === name) {
      found = record;
    }
  });

  return found;
}

// 완료 화면의 기록 안내 · 문구가 없으면 숨기고, 저장에 성공하면 초록색으로 보여 줍니다.
function setRecordNotice(text, isSuccess) {
  recordNotice.textContent = text;
  recordNotice.hidden = text === "";
  recordNotice.classList.toggle("is-success", isSuccess);
}

// 지금 뽑은 게임이 기록에 있는지에 따라 버튼과 안내 문구를 바꿉니다.
function updateRecordTexts() {
  const saved = findRecord(currentGame) !== null;

  recordOpen.textContent = saved ? "이 게임 기록 고치기" : "이 게임 기록하기";
  recordTarget.textContent = `기록할 게임: 「${currentGame}」`;
  recordGuide.textContent = saved
    ? "이미 기록한 게임입니다. 별점이나 한 줄 평을 바꿔 저장하면 기록이 새 값으로 바뀝니다."
    : "해 본 느낌을 별점과 한 줄 평으로 남겨 주세요.";
}

// 뽑은 게임이 이미 기록에 있으면 지난번 별점과 다시 하지 않는 이유를 완료 화면에 알려 줍니다.
function showSavedRecord() {
  const saved = findRecord(currentGame);
  let text = "";

  if (saved !== null) {
    text = saved.stopReason === null
      ? `지난번에 별점 ${saved.rating}점으로 기록한 게임입니다. 다시 해 봤다면 기록을 고칠 수 있습니다.`
      : `지난번에 별점 ${saved.rating}점, 다시 하지 않을 게임(${saved.stopReason})으로 기록했습니다. 같은 조건으로 다시 뽑아 보세요.`;
  }

  setRecordNotice(text, false);
  updateRecordTexts();
}

// 제출 상태에 맞춰 저장 버튼, 폼, 제출 안내 문구를 함께 바꿉니다.
// 저장 중에는 버튼을 disabled로 바꿔 같은 기록이 두 번 저장되지 않게 합니다.
function setSubmitState(state, message) {
  const loading = state === "loading";

  submitState = state;
  recordSave.disabled = loading;
  recordCancel.disabled = loading;
  recordForm.setAttribute("aria-busy", String(loading));

  if (loading) {
    recordSave.textContent = "저장 중…";
  } else if (state === "fail") {
    recordSave.textContent = "다시 저장하기";
  } else {
    recordSave.textContent = findRecord(currentGame) === null ? "기록 저장하기" : "기록 고치기";
  }

  recordSubmitStatus.textContent = message;
  recordSubmitStatus.classList.toggle("is-loading", loading);
  recordSubmitStatus.classList.toggle("is-error", state === "error" || state === "fail");
}

// 오류 표시 · 항목의 빨간 테두리(is-error), 오류 문장, aria-invalid를 함께 바꿉니다.
function showError(field, message) {
  field.classList.add("is-error");
  field.querySelector(".field-error").textContent = message;
  field.querySelectorAll("input, select").forEach((input) => {
    input.setAttribute("aria-invalid", "true");
  });
  return false;
}

// 오류 해제 · showError가 바꾼 세 가지를 모두 되돌립니다.
function clearError(field) {
  field.classList.remove("is-error");
  field.querySelector(".field-error").textContent = "";
  field.querySelectorAll("input, select").forEach((input) => {
    input.removeAttribute("aria-invalid");
  });

  // 고칠 항목이 하나도 남지 않으면 제출 오류 안내도 지웁니다.
  if (submitState === "error" && recordForm.querySelector('[aria-invalid="true"]') === null) {
    setSubmitState("idle", "");
  }
}

// 별점 · 하나도 고르지 않았으면 오류입니다.
function validateRating() {
  if (recordForm.querySelector('input[name="rating"]:checked') === null) {
    return showError(ratingField, "별점을 고르지 않았습니다. 1점부터 5점 중에서 하나 골라 주세요.");
  }
  clearError(ratingField);
  return true;
}

// 한 줄 평 · 공백만 있는 값과 2자보다 짧은 값을 순서대로 검사합니다.
function validateReview() {
  const review = recordReview.value.trim();

  if (!review) {
    return showError(reviewField, "한 줄 평을 입력해 주세요. (예: 친구랑 하니까 더 재밌었다)");
  }
  if (review.length < 2) {
    return showError(reviewField, "한 줄 평을 2자 이상 입력해 주세요.");
  }
  clearError(reviewField);
  return true;
}

// 다시 하지 않는 이유 · 칸이 열려 있을 때(disabled가 아닐 때)만 검사합니다.
function validateStopReason() {
  if (!stopReason.disabled && stopReason.value === "") {
    return showError(stopReasonField, "다시 하지 않는 이유를 골라 주세요. 이유를 남기지 않으려면 위의 표시를 해제하면 됩니다.");
  }
  clearError(stopReasonField);
  return true;
}

// 제출할 때 모든 항목을 순서대로 검사하고, 고쳐야 할 항목 이름을 모아 돌려줍니다.
function validateRecordForm() {
  const invalidNames = [];

  if (!validateRating()) {
    invalidNames.push("별점");
  }
  if (!validateReview()) {
    invalidNames.push("한 줄 평");
  }
  if (!validateStopReason()) {
    invalidNames.push("다시 하지 않는 이유");
  }

  return invalidNames;
}

// input · 한 줄 평을 쓰거나 지울 때마다 글자 수와 조건 충족 여부를 보여 줍니다.
// 글자 수는 입력한 그대로 세고, 2자 이상인지는 앞뒤 공백을 뺀 값으로 확인합니다.
function updateReviewState() {
  const ok = recordReview.value.trim().length >= 2;

  reviewCount.textContent = `${recordReview.value.length} / ${reviewLimit}자`;
  reviewHelp.textContent = ok ? "입력 조건을 충족했습니다." : reviewGuide;
  reviewField.classList.toggle("is-valid", ok);
}

// change · 다시 하지 않을 게임으로 표시하면 이유 칸을 보여 주고 고를 수 있게 합니다.
// 표시를 풀면 칸을 숨기고 disabled로 바꿔 제출값(FormData)에서 빠지게 합니다.
function updateStopReasonField() {
  const isStop = replayStop.checked;

  stopReasonField.hidden = !isStop;
  stopReason.disabled = !isStop;
  replayStop.setAttribute("aria-expanded", String(isStop));

  if (!isStop) {
    clearError(stopReasonField);
  }
}

// 기록 입력값, 안내·오류 문구, 이유 칸, 버튼 상태를 모두 처음으로 돌립니다.
function resetRecordForm() {
  recordForm.reset();
  clearError(ratingField);
  clearError(reviewField);
  updateReviewState();
  updateStopReasonField();
  setSubmitState("idle", "");
}

// 기록 목록을 다시 그립니다. 기록이 없으면 빈 목록 안내를 보여 줍니다.
function renderRecords() {
  recordList.textContent = "";

  records.forEach((record) => {
    const item = document.createElement("li");
    const title = document.createElement("h3");
    const rating = document.createElement("p");
    const review = document.createElement("p");
    const deleteButton = document.createElement("button");

    item.className = "record-item";
    title.textContent = record.name;
    rating.className = "record-rating";
    rating.textContent = `${starTexts[record.rating - 1]} ${record.rating}점`;
    review.textContent = record.review;
    item.append(title, rating, review);

    // 다시 하지 않을 게임으로 표시한 기록은 이유를 한 줄 더 보여 줍니다.
    if (record.stopReason !== null) {
      const stop = document.createElement("p");
      stop.className = "record-stop";
      stop.textContent = `다시 하지 않을 게임 · ${record.stopReason}`;
      item.append(stop);
    }

    deleteButton.type = "button";
    deleteButton.className = "secondary-button";
    deleteButton.textContent = "기록 삭제";
    deleteButton.setAttribute("aria-label", `${record.name} 기록 삭제`);
    deleteButton.addEventListener("click", () => deleteRecord(record.name));

    item.append(deleteButton);
    recordList.append(item);
  });

  recordList.hidden = records.length === 0;
  recordEmpty.hidden = records.length > 0;
  recordStatus.textContent = `기록한 게임 ${records.length}개`;
  updateRecordTexts();
}

// 기록 삭제 · 지울 게임을 뺀 나머지만 다시 모아 저장하고, 남은 기록이 없으면 빈 목록 안내로 바뀝니다.
function deleteRecord(name) {
  const remaining = [];

  records.forEach((record) => {
    if (record.name !== name) {
      remaining.push(record);
    }
  });

  if (!storeRecords(remaining)) {
    recordStatus.textContent = `「${name}」 기록을 삭제하지 못했습니다. 브라우저의 사이트 데이터 저장이 막혀 있는지 확인한 뒤 다시 눌러 주세요.`;
    return;
  }

  records = remaining;
  renderRecords();
  recordStatus.textContent = `「${name}」 기록을 삭제했습니다. 남은 기록 ${records.length}개`;

  // 완료 화면의 게임을 지웠다면 지난번 별점 안내도 지웁니다.
  if (name === currentGame) {
    setRecordNotice("", false);
  }

  const nextFocus = records.length === 0
    ? document.querySelector("#recordEmptyLink")
    : recordList.querySelector("button");
  nextFocus.focus();
}

// 저장 · 저장에 시간이 걸리는 상황을 보여 주려고 0.8초 뒤에 브라우저 저장 공간에 저장합니다.
// 이유 칸이 숨겨져 disabled이면 FormData에 들어가지 않아 stopReason은 null이 됩니다.
function saveRecord(data) {
  setTimeout(() => {
    const saved = findRecord(currentGame);
    const newRecord = {
      name: currentGame,
      rating: Number(data.get("rating")),
      review: data.get("review").trim(),
      stopReason: data.get("stopReason")
    };

    // 이미 기록한 게임이면 같은 자리의 기록을 바꾸고, 처음 기록하는 게임이면 끝에 넣습니다.
    const nextRecords = [];
    records.forEach((record) => {
      nextRecords.push(record.name === currentGame ? newRecord : record);
    });
    if (saved === null) {
      nextRecords.push(newRecord);
    }

    // 실패 · 기록 목록과 입력값은 그대로 두고, 버튼을 다시 눌러 같은 내용으로 다시 저장하게 합니다.
    if (!storeRecords(nextRecords)) {
      setSubmitState("fail", "기록을 저장하지 못했습니다. 브라우저가 사이트 데이터 저장을 막았거나 저장 공간이 가득 찼을 수 있습니다. 입력한 내용은 그대로 두었으니 다시 저장하기를 눌러 주세요.");
      recordSave.focus();
      return;
    }

    // 성공 · 기록 목록을 다시 그리고 완료 화면으로 돌아가 저장 결과와 다음 행동을 안내합니다.
    records = nextRecords;
    renderRecords();
    resetRecordForm();
    setRecordNotice(saved === null
      ? `「${newRecord.name}」 기록을 저장했습니다. (별점 ${newRecord.rating}점) 아래 내 게임 기록에서 확인할 수 있습니다.`
      : `「${newRecord.name}」 기록을 별점 ${newRecord.rating}점으로 고쳤습니다. 아래 내 게임 기록에 반영했습니다.`, true);
    showPickStep(4);
    document.querySelector("#pickAgain").focus();
  }, 800);
}

// 완료 → 기록 · 뽑은 게임의 기록 단계를 엽니다. 이미 기록한 게임이면 저장된 값을 채웁니다.
recordOpen.addEventListener("click", () => {
  const saved = findRecord(currentGame);

  resetRecordForm();
  updateRecordTexts();

  if (saved !== null) {
    ratingInputs[saved.rating - 1].checked = true;
    recordReview.value = saved.review;

    if (saved.stopReason !== null) {
      replayStop.checked = true;
      stopReason.value = saved.stopReason;
    }

    updateReviewState();
    updateStopReasonField();
  }

  showPickStep(5);
  (saved === null ? ratingInputs[0] : ratingInputs[saved.rating - 1]).focus();
});

// 별점을 고르면 별점 오류를 지웁니다.
ratingInputs.forEach((input) => {
  input.addEventListener("change", validateRating);
});

// 한 줄 평을 입력할 때마다 글자 수를 바꾸고, 오류가 보이는 중이면 현재 값으로 다시 검사합니다.
recordReview.addEventListener("input", () => {
  updateReviewState();

  if (reviewField.classList.contains("is-error")) {
    validateReview();
  }
});

replayStop.addEventListener("change", updateStopReasonField);

// 이유를 고르면 이유 오류를 지웁니다.
stopReason.addEventListener("change", () => {
  if (stopReasonField.classList.contains("is-error")) {
    validateStopReason();
  }
});

// submit · 버튼 클릭과 Enter 모두 여기서 최종 검사합니다.
recordForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // 저장 중에 다시 제출되면 무시합니다.
  if (submitState === "loading") {
    return;
  }

  const invalidNames = validateRecordForm();

  // 조건을 못 맞춘 항목이 있으면 저장하지 않고, 첫 번째 오류 입력칸으로 초점을 옮깁니다.
  if (invalidNames.length > 0) {
    setSubmitState("error", `고쳐야 할 항목 ${invalidNames.length}개: ${invalidNames.join(", ")}. 항목 아래 안내대로 고친 뒤 다시 저장해 주세요.`);
    recordForm.querySelector('[aria-invalid="true"]').focus();
    return;
  }

  const data = new FormData(recordForm);
  setSubmitState("loading", "기록을 저장하고 있습니다. 잠시만 기다려 주세요.");
  saveRecord(data);
});

// 취소 · 입력한 별점·한 줄 평을 버리고 완료 화면으로 돌아갑니다.
recordCancel.addEventListener("click", () => {
  const saved = findRecord(currentGame);

  resetRecordForm();
  setRecordNotice(saved === null
    ? "기록하지 않았습니다. 게임을 해 본 뒤 이 게임 기록하기를 누르면 언제든 남길 수 있습니다."
    : `기록을 고치지 않았습니다. 저장된 별점 ${saved.rating}점이 그대로 남아 있습니다.`, false);
  showPickStep(4);
  recordOpen.focus();
});

// 페이지를 열 때 브라우저에 저장된 기록을 내 게임 기록에 보여 줍니다.
renderRecords();
