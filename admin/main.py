# coding: utf-8
import datetime

from flask import Flask, send_from_directory

app = Flask(__name__)


@app.route('/')
def send_static_index():
    return send_from_directory('dist/admin', 'index.html')


@app.route('/<path:path>')
def send_static_resource(path):
    return send_from_directory('dist/admin', path)


if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    # Flask's development server will automatically serve static files in
    # the "static" directory. See:
    # http://flask.pocoo.org/docs/1.0/quickstart/#static-files. Once deployed,
    # App Engine itself will serve those files as configured in app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
