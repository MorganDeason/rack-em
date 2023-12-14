from flask import Flask, make_response, jsonify, render_template, request
from flask_migrate import Migrate
from models import db, Team, Bracket, TeamBracketAssociator
from matches import match_finder, generate_bracket
import random
import json 


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
    bracket = json.loads(Bracket.query.get(1).matches)
    

    return [bracket]

@app.post("/random")
def blank_bracket():
    new_bracket = Bracket(matches="{}")
    db.session.add(new_bracket)
    db.session.commit()
    return jsonify(new_bracket.to_dict())
    

@app.put("/maybe")
def add_team_to_bracket():
    payload = request.get_json()
    team_bracket_associator = TeamBracketAssociator(team_id=payload['team_id'], bracket_id=payload['bracket_id'])
    
    found = TeamBracketAssociator.query.filter(
        TeamBracketAssociator.team_id == payload['team_id'], 
        TeamBracketAssociator.bracket_id == payload['bracket_id']
        )
    
    if found is None:
        db.session.add(team_bracket_associator)
        db.session.commit()

    return make_response("Hello") 

@app.post('/learning')
def generate_matches():
    bracket_id = request.args.get('bracket_id', type=int)
    if bracket_id is None:
        raise ValueError("Please provide bracket id.")
    
    teams = [team.to_dict()["name"] for team in Team.query.all()]
    matches = generate_bracket(teams)
    bracket = Bracket.query.get(bracket_id)
    bracket.matches = json.dumps(matches)
    db.session.commit()

    


    return make_response(jsonify(matches))





@app.patch("/api/bracket")
def mod_bracket():
    payload = request.get_json()
    print(f"1>>>>>>>>{payload}")
    bracket = Bracket.query.get(1)
    print(f"2>>>>>>{bracket}")
    new_bracket = match_finder(payload, json.loads(bracket.matches))
    print(f"3>>>>{new_bracket}")

    # NOTE: The other way to do this is use the ID that we used previously to grab
    #       the current match from `match_finder()` and use that to set the bracket's
    #       current match equal to the newly edited current match.
    if new_bracket is None:
        raise ValueError("Parameters can not be empty or were not found.")
    bracket.matches = json.dumps(new_bracket)
    
    # db.session.add(bracket)
    db.session.commit()
    
    return make_response([new_bracket])









    


if __name__ == "__main__":
    app.run()
