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

# Get all Teams
'''
{
    "associator": [],
    "id": int,
    "name": ""
}
'''
@app.get("/api/teams")
def get_teams():
    teams = [team.to_dict() for team in Team.query.all()]
    return make_response(teams)

# Add new team to the database
'''
POST_REQ = {"name": ""}
'''
@app.post("/api/teams")
def add_team():
    POST_REQ = request.get_json()
    new_team = Team(
        name=POST_REQ["name"],
    )
    db.session.add(new_team)
    db.session.commit()
    return make_response(jsonify(new_team.to_dict()))

# Delete a team from the database
@app.delete("/api/teams")
def delete_team():
    team_id = request.args.get('team_id', type=int)
    matching_team = Team.query.filter(Team.id == team_id).first()
    
    if not matching_team:
        return make_response(jsonify({"error": "Team not found"}), 404)
    db.session.delete(matching_team)
    db.session.commit()
    return make_response(jsonify(matching_team.to_dict()),200)

# Gets all brackets
'''
{
"id": int,
"matches": {}
}
'''
# NOTE: "Json.loads" converts a string to a dictionary
@app.get("/api/brackets/all")
def get_bracket():
    bracket = [{"id": bracket.id, "matches": json.loads(bracket.matches)} for bracket in Bracket.query.all()]
    return make_response(bracket)

# Get Bracket by id
'''
url looks like "..../brackets?bracket_id="
'''
@app.get('/api/brackets')
def get_bracket_by_id():
    bracket_id = request.args.get('bracket_id', type=int)
    bracket = Bracket.query.get(bracket_id)
    return make_response({"id": bracket.id, "matches": json.loads(bracket.matches)})

@app.post("/api/brackets")
def blank_bracket():
    new_bracket = Bracket(matches="{}")
    db.session.add(new_bracket)
    db.session.commit()
    return jsonify(new_bracket.to_dict())

@app.delete("/api/brackets")
def remove_bracket():
    bracket_id = request.args.get('bracket_id', type=int)
    matching_bracket = Bracket.query.filter(Bracket.id == bracket_id).first()

    if not matching_bracket:
        return make_response(jsonify({"error": "Bracket not found"}), 404)
    db.session.delete(matching_bracket)
    db.session.commit()
    return make_response(jsonify(matching_bracket.to_dict()), 200)




    
# This associates a team with a bracket
# NOT BEING USED YET ##########################################
@app.put("/maybe")
def add_team_to_bracket():
    payload = request.get_json()
    team_bracket_associator = TeamBracketAssociator(team_id=payload['team_id'], bracket_id=payload['bracket_id'])
    
    found = TeamBracketAssociator.query.filter(
        TeamBracketAssociator.team_id == payload['team_id'], 
        TeamBracketAssociator.bracket_id == payload['bracket_id']
        )
    # A check to make sure that team is not already associated with the bracket before adding
    if found is None:
        db.session.add(team_bracket_associator)
        db.session.commit()

    return make_response("Hello") 

# This should populate the current bracket with the available teams.....MAYBE ########################################
# Also not being used yet...############################
@app.post('/api/brackets/generate')
def generate_matches():
    bracket_id = request.args.get('bracket_id', type=int)
    if bracket_id is None:
        raise ValueError("Please provide bracket id.")
    
    teams = [team.to_dict()["name"] for team in Team.query.all()]
    # matches = generate_bracket(teams)
    bracket = Bracket.query.get(bracket_id)
    bracket.matches = json.dumps({})
    db.session.commit()
    return make_response(jsonify(bracket.to_dict()))

# This sets the winner of the match within the bracket
@app.patch("/api/bracket")
def mod_bracket():
    payload = request.get_json()
    # print(f"1>>>>>>>>{payload}")
    bracket = Bracket.query.get(payload["bracketId"])
    # print(f"2>>>>>>{bracket}")
    new_bracket = match_finder(payload, json.loads(bracket.matches))
    # print(f"3>>>>{new_bracket}")


    if new_bracket is None:
        raise ValueError("Parameters can not be empty or were not found.")
    bracket.matches = json.dumps(new_bracket)
    
    db.session.commit()
    
    return make_response(new_bracket)




if __name__ == "__main__":
    app.run()
