const SUPABASE_URL = "https://huuvumuwdkyicjsxttaj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1dXZ1bXV3ZGt5aWNqc3h0dGFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4OTkzMjMsImV4cCI6MjA5NzQ3NTMyM30.keSJJqaPqUMnlEX_oOY4uyNwbz5CBfKWzepgQA0BBQ4";

const newsList = document.getElementById("news-list");
const refreshBtn = document.getElementById("refresh-btn");

function renderNews(newsArray) {
  newsList.innerHTML = "";
  newsArray.forEach(news => {
    const li = document.createElement("li");
    li.className = "bg-white p-3 rounded-md shadow-sm";
    li.textContent = news;
    newsList.appendChild(li);
  });
}

async function fetchNewsFromSupabase() {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/worldnews?select=headline&order=created_at.desc`,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      }
    }
  );
  const data = await response.json();
  return data.map(row => row.headline);
}

async function loadNews() {
  newsList.innerHTML = "<li class='bg-white p-3 rounded-md shadow-sm'>불러오는 중...</li>";
  const headlines = await fetchNewsFromSupabase();
  renderNews(headlines);
}

loadNews();
refreshBtn.addEventListener("click", loadNews);