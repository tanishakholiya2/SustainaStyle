from flask import Flask, jsonify, request
from pymongo import MongoClient
from database import get_database
from flask_cors import CORS 
dbname = get_database()

app = Flask(__name__)
CORS(app)
client = MongoClient("mongodb+srv://sustainastyle:SustainaStyle115@cluster0.xth1dlj.mongodb.net/?retryWrites=true&w=majority")

@app.route('/', methods=(['GET']), strict_slashes=False)
def index():
    print(client.server_info())
    return "Hello World!"

# @app.route('/', methods=(['PUT']), strict_slashes=False)
# def index():
#     return jsonify([])

@app.route('/login',methods = ['POST', 'GET'])
def login():
   if request.method == 'POST':
      user = request.form['name']
      return redirect(url_for('dashboard',name = user))
   else:
      user = request.args.get('name')

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()  # Retrieve JSON data from request body
    app.logger.debug('hi')
    email = data.get("email")
    password = data.get("password")

    if email and password:
        collection_name = dbname["users"]
        collection_name.insertOne({"email": email, "score": 0, "password": password})
        return jsonify({"message": "User signed up successfully"})
    else:
        return jsonify({"error": "Missing email or password"}), 400

    
@app.route('/camera',methods = ['POST'])
def camera():
   print('hi')

@app.route('/leaderboard', methods = ['GET'])
def viewLeaders():
   print('hi')
   #return an array of all users in the leaderboard

if __name__ == "__main__":
    app.run(debug=True)
