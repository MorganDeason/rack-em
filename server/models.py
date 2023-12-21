from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.associationproxy import association_proxy



db = SQLAlchemy()



class Team(db.Model, SerializerMixin):
    __tablename__ = 'teams'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)


    associator = db.relationship("TeamBracketAssociator", back_populates="team")

    brackets = association_proxy("associator", "bracket")

    serialize_rules = ("-associator.team",)


class Bracket(db.Model, SerializerMixin):
    __tablename__ = 'brackets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    matches = db.Column(db.String, nullable=False)

    associator = db.relationship("TeamBracketAssociator", back_populates="bracket")

    teams = association_proxy("associator", "team")

    serialize_rules = ("-associator.bracket",)


class TeamBracketAssociator(db.Model, SerializerMixin):
    __tablename__ = "team_bracket_associator"

    id = db.Column(db.Integer, primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey("teams.id"))
    bracket_id = db.Column(db.Integer,db.ForeignKey("brackets.id"))

    team = db.relationship("Team", back_populates="associator")

    bracket = db.relationship("Bracket", back_populates="associator")

    serialize_rules = ("-team.associator", "-bracket.associator")