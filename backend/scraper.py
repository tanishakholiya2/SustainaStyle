import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
import time

def get_database():
 
   # Provide the mongodb atlas url to connect python to mongodb using pymongo
   CONNECTION_STRING = "mongodb+srv://sustainastyle:SustainaStyle115@cluster0.xth1dlj.mongodb.net/?retryWrites=true&w=majority"
 
   # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
   client = MongoClient(CONNECTION_STRING)
   # Create the database for our example (we will use the same database throughout the tutorial
   return client['SustainaStyle']


def fetch_results(inc):
    headers = {
        "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
    }
    db = get_database()
    stores = db["stores"]
    baseURL = 'https://google.com/search?q='
    result = []
    for store in stores.find():
        try:
            query = inc
            time.sleep(1)
            query = "site:"+store["link"]+" "+query
            query=query.replace(":", "%3A")
            query = query.replace(" ", "+")
            url = baseURL+query
            res = requests.get(url, headers=headers)
            print(res.text)
            soup = BeautifulSoup(res.text, "html.parser")
            main = soup.find('div', {"id": "search"})
            div1 = main.find_all("div", class_="MjjYud")
            div1 = div1[1]
            div2 = div1.find('div', class_="yuRUbf")
            a = div2.find('a')["href"]
            a2 = div1.find_all('a', {'href': a})
            result.append({"link": a, "name": store})
        except Exception:
            print("EXception")
            continue

    return result

fetch_results("gray jacket")
