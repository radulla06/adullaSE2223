from flask import Flask, render_template, url_for, request, jsonify
from datetime import datetime
import pyrebase

app = Flask(__name__)

# Landing Page
@app.route('/')
def index():
    return render_template('index.html')

# Account Registration Page
@app.route('/register')
def register():
    return render_template('register.html')

# Sign In Page
@app.route('/signIn')
def signIn():
    return render_template('signIn.html')

# Account home page
@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/test', methods=['GET', 'POST'])
def test():
    # GET request
    if request.method == 'GET':
        message = {'message': 'Receiving sensor data'}
        return jsonify(message)  # serialize and use JSON headers
    
    # POST request
    if request.method == 'POST':
        # Receive Firebase config credentials, pop uid and assign to userID
        config = request.get_json()
        userID = config.pop('userID')

        # Output to console
        print('User ID: ' + userID, flush=True)
        print(config, flush=True)

        # Initialize Firebase
        firebase = pyrebase.initialize_app(config)

        # Create database object
        db = firebase.database()

        # Get the current timestamp
        timeStamp = datetime.now().strftime('%d-%m-%Y %H:%M:%S')

        # Write sample data to Firebase
        db.child('users/' + userID + '/data' + timeStamp).update({"test" : "Working"})

        return 'Success', 200

# Run Flask server
if __name__ == '__main__':
    app.run(debug=True)