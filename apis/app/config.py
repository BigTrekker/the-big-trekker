import secret

class Config:
    GOOGLE_CLIENT_ID = secret.GOOGLE_CLIENT_ID
    GOOGLE_CLIENT_SECRET = secret.GOOGLE_CLIENT_SECRET
    DEBUG = False

class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'postgresql://root:my-password@localhost/big-trekker'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = True

class TestingConfig(Config):
    DEBUG = True
    TESTING = True
    PRESERVE_CONTEXT_ON_EXCEPTION = False
    SQLALCHEMY_DATABASE_URI = 'postgresql://root:my-password@localhost/big-trekker-test'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class ProductionConfig(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = secret.GOOGLE_CLOUD_SQL_URI


config_by_name = dict(
    dev=DevelopmentConfig,
    test=TestingConfig,
    prod=ProductionConfig
)
