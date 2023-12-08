from flask import Flask, make_response, jsonify, render_template, request
from flask_migrate import Migrate
from models import db, Team
import random


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
migrate = Migrate(app, db)
db.init_app(app)


@app.get('/')
def index():
    return {"msg": "Hello World!"}


@app.get("/api/teams")
def get_teams():
    teams = Team.query.all()
    data = [team.to_dict() for team in teams]

    return make_response(data)


@app.get("/api/teams/pairs")
def get_pairs():
    teams = Team.query.all()
    list_of_teams = [team.to_dict() for team in teams]
    random.shuffle(list_of_teams)

    competing_pairs, z = [], int(len(list_of_teams) // 2)
    for _ in range(z):
        first_competitor, second_competitor = list_of_teams.pop(0), list_of_teams.pop(0)
        # print(f"{first_competitor['name']} <> {second_competitor['name']}")
        competing_pairs.append([first_competitor["name"], second_competitor["name"]])
    if len(list_of_teams) == 1:
        lone_competitor = list_of_teams.pop(0)
        competing_pairs.append([lone_competitor["name"],"You advance to the next round!"])
        # print(f"{lone_competitor['name']} automatically advances to the next round!")


    return make_response(competing_pairs)


@app.post("/api/teams")
def add_team():
    POST_REQ = request.get_json()
    new_team = Team(
        name=POST_REQ["name"],
    )
    db.session.add(new_team)
    db.session.commit()
    return make_response(jsonify(new_team.to_dict()))


if __name__ == "__main__":
    app.run()
