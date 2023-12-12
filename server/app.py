from flask import Flask, make_response, jsonify, render_template, request
from flask_migrate import Migrate
from models import db, Team, Bracket
from matches import match_finder
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

@app.get("/api/bracket")
def get_bracket():
    bracket = Bracket.query.all()[0].matches
    

    return [bracket]


@app.patch("/api/bracket")
def mod_bracket():
    PATCH_REQUEST = request.get_json()
    bracket = Bracket.query.all()[0].matches

    current_match = match_finder(bracket, lambda x: x["id"] == PATCH_REQUEST["matchId"])
    print(current_match)
    current_match["winner"] = list(filter(lambda x: x["id"] == PATCH_REQUEST["submatchId"], current_match["submatches"]))[0]["winner"]

    
    
    return make_response([current_match])


    

# print(match_finder(bracket, lambda x: x.id == 5).winner)

if __name__ == "__main__":
    app.run()
