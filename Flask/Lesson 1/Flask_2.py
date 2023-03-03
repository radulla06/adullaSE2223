# Import flask module
from flask import Flask
# Import render_template module
from flask import render_template

# __name__ is a built-in variable which evaluates to the name of the current module used to initialize the Flask constructor
app = Flask(__name__)

# Displays sample blog posts
posts = [
    {
        'author': 'Gandalf the Grey',
        'title': 'The Balrog at the Bridge of Khazad-dum',
        'content': 'YOU SHALL NOT PASS!',
        'date_posted': '3019 of the Third Age'
    },
    {
        'author': 'Elrond of Rivendell',
        'title': 'A Secret Council',
        'content': 'A beginner\'s guide to the One Ring',
        'date_posted': '3018 of the Third Age'
    }
]

@app.route('/')     # Home page
def home():     # Returns a blank page with a heading
    return render_template("home2.html", posts=posts)

@app.route('/about')    # About page
def about():    # Returns a blank page with a heading
    return render_template("about2.html", title="About", posts=posts)

# Driver function
if __name__ == '__main__':
    # Run app through port 5000
    app.run(debug=True)