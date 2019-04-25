from flask import Flask, request, abort, g, jsonify
from flask_cors import CORS
from firebase_admin import auth, initialize_app

app = Flask(__name__)
CORS(app)

initialize_app()

ERRORS_401 = {
    'NO_TOKEN': "You are not authorized to access",
    'TOKEN_EXPIRED': "Your token expired, you must send a valid token",
    'NOT_ENOUGHT_RIGHTS': "You don't have the right to acces to this resource"
}

@app.errorhandler(401)
def unauthorized(errors):
    message = ERRORS_401[errors] if errors in ERRORS_401 else ERRORS_401['NO_TOKEN']
    response = jsonify({ 'code': 401, 'message': message })
    response.status_code = 401
    return response

@app.before_request
def before_request():
    methods = ['GET', 'POST', 'PUT', 'DELETE']

    if request.method not in methods:
        return

    authorization_header = request.headers.get('Authorization') if request.headers.get('Authorization') is not None else ''
    header_value = authorization_header.split(' ')

    if len(header_value) != 2:
        abort(401, 'NO_TOKEN')
        return

    if header_value[0] != 'Bearer' or header_value[1] == '':
        abort(401, 'NO_TOKEN')
        return

    try :
        g.user = auth.verify_id_token(header_value[1])
    except ValueError as err:
        print("{0}".format(err))
        abort(401, 'TOKEN_EXPIRED')

@app.route('/api/hello-world')
def hello():
    return 'Hello World!, uid' + g.user['uid']


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
