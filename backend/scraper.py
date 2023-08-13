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

headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}
db = get_database()
stores = db["stores"]
baseURL = 'https://google.com/search?q='

for store in stores.find():
    time.sleep(1)
    query = "site:"+store["link"]+" white tshirt"
    query=query.replace(":", "%3A")
    query = query.replace(" ", "+")
    url = baseURL+query
    res = requests.get(url, headers=headers)
    print(res.text)
    soup = BeautifulSoup(res.text, "html.parser")
    div = soup.find('div', class_="MjjYud")
    div2 = div.find('div', class_="yuRUbf")
    a = div2.find('a')["href"]
    img = div.find('img')
    src = img['src']
    print([a, src])

