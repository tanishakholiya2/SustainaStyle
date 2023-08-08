from flask import Flask, jsonify
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient('localhost', 27017)

db = client.flask_db

@app.route('/', methods=('GET'), strict_slashes=False)
def index():
    return jsonify([])

@app.route('/', methods=('PUT'), strict_slashes=False)
def index():
    return jsonify([])

@app.route('/login',methods = ['POST', 'GET'])
def login():
   if request.method == 'POST':
      user = request.form['name']
      return redirect(url_for('dashboard',name = user))
   else:
      user = request.args.get('name')
    
@app.route('/camera',methods = ['POST'])
def camera():
   print('hi')

if __name__ == "__main__":
    app.run(debug=True)