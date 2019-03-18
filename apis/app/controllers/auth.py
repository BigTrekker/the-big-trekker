from flask import Blueprint

auth = Blueprint('auth', __name__, url_prefix='/auth')

@auth.route('', methods=['GET'])
def authenticate():
    return 'Hello World !'