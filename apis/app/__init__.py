from flask import Flask

app = Flask(__name__)

from app.controllers.auth import auth 

app.register_blueprint(auth)
