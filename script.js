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

// 폼이 제출될 때 실행할 함수입니다.
function handlePick(event) {
  event.preventDefault();

  const taste = tasteInput.value.trim();
  const pickAll = allGamesCheck.checked;

  // 전체 뽑기를 선택하면 빈 키워드로 찾으므로 모든 게임이 후보가 됩니다.
  const candidates = pickAll ? findCandidates("") : findCandidates(taste);

  // 닉네임을 입력했으면 결과 문구 앞에 붙입니다.
  const nickname = nicknameInput.value.trim();
  const greeting = nickname === "" ? "" : nickname + "님, ";

  if (!pickAll && taste === "") {
    // 취향을 입력하지 않으면 오류 문구와 스타일을 보여 줍니다.
    pickMessage.textContent = "취향 키워드를 먼저 입력해 주세요. (예: 혼자, 힐링, 짧게)";
    pickMessage.classList.remove("is-success");
    pickMessage.classList.add("is-error");
  } else if (candidates.length === 0) {
    // 키워드가 모두 들어간 게임이 없으면 다른 키워드를 안내합니다.
    pickMessage.textContent =
      "'" + taste + "' 취향에 맞는 게임이 없습니다. 키워드를 줄이거나 주요 기능의 취향 고르기 탭에 있는 키워드로 입력해 주세요.";
    pickMessage.classList.remove("is-success");
    pickMessage.classList.add("is-error");
  } else {
    // 후보 중에서 게임을 뽑고 완료 스타일을 적용합니다.
    const range = pickAll ? "전체 게임 " : "'" + taste + "' 취향에 맞는 게임 ";

    pickMessage.textContent =
      greeting + range + candidates.length + "개 중에서 뽑은 오늘의 게임은 「" +
      pickRandomGame(candidates) + "」입니다!";
    pickMessage.classList.remove("is-error");
    pickMessage.classList.add("is-success");

    // 버튼 글자를 바꿔 다시 뽑을 수 있다는 것을 알려 줍니다.
    pickButton.textContent = "다시 뽑기";
  }
}

// submit 이벤트와 함수를 연결합니다.
pickForm.addEventListener("submit", handlePick);

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

// change · 전체 뽑기 선택 여부에 따라 안내 문구·스타일·입력창 상태를 함께 바꿉니다.
function handleAllGamesChange() {
  const pickAll = allGamesCheck.checked;

  tasteInput.disabled = pickAll;
  allGamesMessage.textContent = pickAll
    ? "취향 키워드 없이 전체 게임 " + games.length + "개 중에서 뽑습니다."
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
