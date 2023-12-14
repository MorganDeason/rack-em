import functools
import random

class Match:
    def __init__(self, id, winner=None, submatches=None):

        self.id = id 
        self.winner = winner
        self.submatches = submatches

    ######################################
    # Functions for assigning submatches #
    #     from the parent submatches     #
    ######################################
    def left(self):
        return self.submatches[0] if self.submatches is not None else None
    def right(self):
            return self.submatches[1] if self.submatches is not None else None
    
    #########################################################
    # Functions for setting the winner of the current Match #
    #########################################################
    def left_wins(self):
        self.winner = self.submatches[0].winner if self.submatches and self.submatches[0] is not None else None
    def right_wins(self):
        self.winner = self.submatches[1].winner if self.submatches and self.submatches[1] is not None else None


def build_match(id, winner=None, submatches=None):
    return {
        "id": id,
        "winner": winner if winner is not None else "",
        "submatches": submatches if submatches is not None else []
    }


# This function is for generating the Bracket structure
def generate_bracket(teams):
    """
    This generates the Matches with id's of "1-16" using the "range(len(teams)" which translates to [1,2,...15,16]
    After that, "zip" uses that list of numbers along with name of each team to return a tuple "(1, 'name')..."
    To use these tuples effectively they need to be desconstructed which is done with the (x, team) 
    This allows the instant of Match to be created with the incrementing (x+1) id along with the name to create 16 unique instances of Match()
    """
    list_of_matches = [build_match(x + 1 ,team) for (x, team) in zip(range(len(teams)), teams)]
    random.shuffle(list_of_matches)

    # Below is the function for taking in the list of matches, creates pairs and passes them
    # into a parent Match until there is only one parent Match
    def recurse(list_of_matches, id_offset):
        if len(list_of_matches) == 1:
            return list_of_matches[0]

        competing_pairs, z = [], int(len(list_of_matches) // 2)

        for id in range(z):
            team_left, team_right = list_of_matches.pop(0), list_of_matches.pop(0)
            competing_pairs.append(build_match(id + id_offset, None, (team_left, team_right)))

        return recurse(competing_pairs, z + id_offset)

    return recurse(list_of_matches, len(teams) + 1)


# This turns the "tournament" into a JSON object so to be sent to the frontend eventually. 
def bracket_to_dict(match):
    if match is None:
        return None
    else:
        return {
            "id": match.id, 
            "winner": match.winner if match.winner is not None else "",
            "submatches": [match for match in [bracket_to_dict(match.left()), bracket_to_dict(match.right())] if match is not None]
            
        }

# The function below is used to grab an individual Match by its "id"
def match_finder(payload, bracket):
    match_list = [bracket]

    while len(match_list) != 0:
        found = list(filter(lambda x : x["id"] == payload["matchId"], match_list))   
        if found:
            # NOTE: The first way to scale this is to rewrite this function so
            #       the PATCH code actually happens here. However, in order to 
            #       fully handle the rewrite, this function will need access to
            #       the `bracket` object and return it.

            maybe = list(filter(lambda x : x["id"] == payload["submatchId"], found[0]["submatches"]))
            found[0]["winner"] = maybe[0]["winner"]
            
            return bracket
        else:
            match_list = functools.reduce(lambda x, y: x + y, map(lambda x: x["submatches"], match_list))

    return None