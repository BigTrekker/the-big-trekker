from .. import db

class User(db.Model):
    """ User Model for storing user related details """
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    uid = db.Column(db.Integer, unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    username = db.Column(db.String(50), unique=True)
    photoUrl = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return "<User '{}'>".format(self.username)