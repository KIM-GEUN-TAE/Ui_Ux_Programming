// 개발자 도구의 Console에 연결 확인 문장을 출력합니다.
console.log("JavaScript가 연결되었습니다.");

// 바뀌지 않는 게임 목록은 const로 저장합니다.
const games = [
  "스타듀 밸리",
  "마인크래프트",
  "잇 테이크 투",
  "할로우 나이트",
  "모여봐요 동물의 숲",
  "오버쿡드 2",
  "엘든 링",
  "리그 오브 레전드"
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

// 게임 목록에서 하나를 무작위로 골라 돌려줍니다.
function pickRandomGame() {
  const index = Math.floor(Math.random() * games.length);
  return games[index];
}

// 폼이 제출될 때 실행할 함수입니다.
function handlePick(event) {
  event.preventDefault();

  const taste = tasteInput.value;

  if (taste === "") {
    // 취향을 입력하지 않으면 오류 문구와 스타일을 보여 줍니다.
    pickMessage.textContent = "취향 키워드를 먼저 입력해 주세요. (예: 혼자, 힐링, 30분)";
    pickMessage.classList.remove("is-success");
    pickMessage.classList.add("is-error");
  } else {
    // 취향을 입력하면 게임을 뽑고 완료 스타일을 적용합니다.
    pickMessage.textContent =
      "'" + taste + "' 취향으로 뽑은 오늘의 게임은 「" + pickRandomGame() + "」입니다!";
    pickMessage.classList.remove("is-error");
    pickMessage.classList.add("is-success");

    // 버튼 글자를 바꿔 다시 뽑을 수 있다는 것을 알려 줍니다.
    pickButton.textContent = "다시 뽑기";
  }
}

// submit 이벤트와 함수를 연결합니다.
pickForm.addEventListener("submit", handlePick);
