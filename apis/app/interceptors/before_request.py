from flask import request, abort
from firebase_admin import auth

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