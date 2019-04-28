from flask import Flask, request, abort, g, jsonify
from flask_cors import CORS
from firebase_admin import initialize_app
from flask_sqlalchemy import SQLAlchemy

from .config import config_by_name
from .errors import unauthorized
from .interceptors import before_request

db = SQLAlchemy()

initialize_app()

def create_app(config_name):
  app = Flask(__name__)
  app.config.from_object(config_by_name[config_name])

  CORS(app)
  db.init_app(app)

  app.errorhandler(401)(unauthorized)
  app.before_request(before_request)

  return app