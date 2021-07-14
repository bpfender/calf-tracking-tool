import os
from flask import Flask  #
from app import routes


def create_app():
    app = Flask(__name__)
    # Seperate out config with from_object?
    app.config.from_mapping(SECRET_KEY=os.environ.get('SECRET_KEY') or 'dev',)

    return app


app = create_app()
