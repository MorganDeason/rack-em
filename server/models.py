from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()



class Team(db.Model, SerializerMixin):
    __tablename__ = 'teams'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)



class Bracket(db.Model, SerializerMixin):
    __tablename__ = 'brackets'

    id = db.Column(db.Integer, primary_key=True)
    matches = db.Column(db.JSON, nullable=False)