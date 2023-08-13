from flask import Flask, jsonify, request
from pymongo import MongoClient
from database import get_database
from flask_cors import CORS 
from werkzeug.utils import secure_filename
from bson.json_util import dumps
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
dbname = get_database()

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
jwt = JWTManager(app)

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

@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Server is reachable"})

@app.route('/volunteer', methods = ['GET'])
def volunteer():
   collection_name = dbname["volunteering"] 
   volunteer = collection_name.find()
   return dumps(list(volunteer))

@app.route('/signup/<email>/<password>', methods=['POST'])
def signup(email, password):
    if email and password:
      user = {
         "email": email,
         "password": password,
      }
      collection_name = dbname["users"]
      collection_name.insert_many([user])
      return jsonify({"message": "User signed up successfully"})
    else:
        return jsonify({"error": "Missing email or password"}), 400

@app.route("/image", methods=['GET', 'POST'])
def image():
    if(request.method == "POST"):
        bytesOfImage = request.get_data()
        with open('image.jpeg', 'wb') as out:
            out.write(bytesOfImage)
        return "Image read"

# UPLOAD_FOLDER = './images'
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# @app.route('/camera', methods=['POST'])
# def camera():
#    target=os.path.join(UPLOAD_FOLDER,'test_docs')
#    if not os.path.isdir(target):
#       os.mkdir(target)
#    logger.info("welcome to upload`")
#    file = request.files['file'] 
#    filename = secure_filename(file.filename)
#    destination="/".join([target, filename])
#    file.save(destination)
#    session['uploadFilePath']=destination
#    response="Whatever you wish to return"
#    return response

@app.route('/leaderboard', methods = ['GET'])
def viewLeaders():
   print('hi')
   #return an array of all users in the leaderboard

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)