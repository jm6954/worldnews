import os
import requests
from bs4 import BeautifulSoup
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

RSS_URL = "https://www.hankyung.com/feed/economy"

def crawl_headlines():
    response = requests.get(RSS_URL)
    soup = BeautifulSoup(response.content, "xml")
    items = soup.find_all("item")

    headlines = [item.title.text for item in items[:10]]
    return headlines

def save_to_supabase(headlines):
    for headline in headlines:
        supabase.table("worldnews").insert({"headline": headline}).execute()
    print(f"{len(headlines)}개 뉴스 저장 완료")

if __name__ == "__main__":
    headlines = crawl_headlines()
    save_to_supabase(headlines)