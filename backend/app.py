from flask import Flask, jsonify, request
from pymongo import MongoClient
from database import get_database
from flask_cors import CORS 
from bson.json_util import dumps
import identifyClothingLabel
import scraper
import os
from operator import itemgetter
import base64

dbname = get_database()

username = {}

app = Flask(__name__)
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'  # Allow requests from any origin
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

# Your route definitions and other code here

client = MongoClient("mongodb+srv://sustainastyle:SustainaStyle115@cluster0.xth1dlj.mongodb.net/?retryWrites=true&w=majority")

@app.route('/', methods=(['GET']), strict_slashes=False)
def index():
    app.logger.debug(client.server_info())
    return "Hello World!"

@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Server is reachable"})

@app.route('/volunteer', methods = ['GET'])
def volunteer():
   jsonData = request.get_json(force=True)
   username = jsonData["username"]
   collection_name = dbname["users"]
   collection_name.update_one({"username": username}, { "$inc": {"points": 20}})
   collection_name = dbname["volunteering"] 
   volunteer = collection_name.find()
   return dumps(list(volunteer))

@app.route('/results', methods = ['POST'])
def results():
    jsonData = request.get_json(force=True)
    bytesOfImage = bytes(request.json["img"][23:], "utf-8")
    print(jsonData["username"])
    collection_name = dbname["users"]
    collection_name.update_one({"username": jsonData["username"]}, { "$inc": {"points": 100}})
    with open('image.jpg', 'wb') as out:
        out.write(base64.decodebytes(bytesOfImage))

    label = identifyClothingLabel.getLabel('image.jpg')
    print(label)
    os.remove('image.jpg')
    res = dumps(list([{"label": label, "results": scraper.fetch_results(label)}]))
    collection_name.update_one({"username": jsonData["username"]}, {"$push": {"results": res}})
    print(res)
    return res


@app.route('/history', methods=['GET'])
def history(user):
    collection_name = dbname["users"]
    user = collection_name.find_one({"username": user["username"]})
    return dumps(list(user.results))

@app.route('/signup', methods=['POST'])
def signup():
    jsonData = request.get_json(force=True)
    username = jsonData["username"]
    password = jsonData["password"]

    if username and password:
        user = {
            "username": username,
            "password": password,
            "points": 0,
            "results": []
        }
        collection_name = dbname["users"]
        collection_name.insert_one(user)
        temp = dumps(list([{"username": username, "success": True}]))
        print(temp)
        return {"username": username}
    else:
        return jsonify({"error": "Missing username or password"}), 400

@app.route('/login',methods = ['POST'])
def login():
    jsonData = request.get_json(force=True)
    username = jsonData["username"]
    password = jsonData["password"]
    collection_name = dbname["users"]
    user = collection_name.find_one({"username": username, "password": password})
    if(user == None):
        return "Username or password not found", 401
    
    collection_name.update_one({"username": username}, { "$inc": {"points": 20}})
    # set current user to this user
    temp = dumps(list([{"username": username, "success": True}]))
    print(temp)
    return jsonify({"username": username})

@app.route('/leaderboard', methods = ['GET'])
def leaderboard():
   collection_name = dbname["users"] 
   users = collection_name.find()
   return dumps(sorted(list((users)), key=itemgetter('points'), reverse=True)) # change key to points when points are added

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)