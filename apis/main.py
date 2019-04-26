# This is used by app engine to point to our app

import os
from app import create_app

app = create_app(os.getenv('BIG_TREKKER_ENV') or 'dev')
