from app import app
from models import db, Team, Bracket
from matches import Match, generate_bracket


players =["Tim","Dennis","Andrew B.","Jason","Sophie","Sean","Mario","Miguel","Snehal","Maria","Andrew S.","Josh","Kash", "Julie", "Tre", "Emilia"]


def create_teams(players):
    teams = []
    for player in players:
        teams.append(Team(
            name = player
        ))

    return teams

def create_bracket(players):
    return Bracket(matches = generate_bracket(players))




with app.app_context():

    Team.query.delete()
    Bracket.query.delete()
    db.session.commit()

    teams = create_teams(players)
    db.session.add_all(teams)
    db.session.commit()

    brackets = create_bracket(players)
    db.session.add(brackets)
    db.session.commit()

