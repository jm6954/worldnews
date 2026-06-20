const newsList = document.getElementById("news-list");
const refreshBtn = document.getElementById("refresh-btn");

const newsSets = [
  [
    "코스피 2,650선 회복, 외국인 순매수 전환",
    "엔비디아 실적 발표 앞두고 반도체株 강세",
    "유가 상승, 중동 긴장 영향"
  ],
  [
    "달러 인덱스 약세, 원화 강세 전환",
    "미 연준 금리 동결 시사",
    "비트코인 급등, 9만 달러 돌파"
  ]
];

let currentIndex = 0;

function renderNews(newsArray) {
    newsList.innerHTML = "";
    newsArray.forEach(news => {
      const li = document.createElement("li");
      li.className = "bg-white p-3 rounded-md shadow-sm";
      li.textContent = news;
      newsList.appendChild(li);
    });
  }

renderNews(newsSets[currentIndex]);

refreshBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % newsSets.length;
  renderNews(newsSets[currentIndex]);
});