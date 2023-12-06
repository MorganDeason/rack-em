from app import app
from models import db, Team



players =["Tim","Dennis","Andrew B.","Jason","Sophie","Sean","Mario","Miguel","Snehal","Maria","Andrew S.","Josh","Kash"]


def create_teams(players):
    teams = []
    for player in players:
        teams.append(Team(
            name = player
        ))

    return teams


with app.app_context():

    Team.query.delete()
    db.session.commit()

    teams = create_teams(players)
    db.session.add_all(teams)
    db.session.commit()

