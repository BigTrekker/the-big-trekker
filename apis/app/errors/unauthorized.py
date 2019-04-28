from flask import jsonify

ERRORS_401 = {
    'NO_TOKEN': "You are not authorized to access",
    'TOKEN_EXPIRED': "Your token expired, you must send a valid token",
    'NOT_ENOUGHT_RIGHTS': "You don't have the right to acces to this resource"
}

def unauthorized(errors):
    message = ERRORS_401[errors] if errors in ERRORS_401 else ERRORS_401['NO_TOKEN']
    response = jsonify({ 'code': 401, 'message': message })
    response.status_code = 401
    return response
