class Match:
    def __init__(self, id, winner=None, submatches=None):
        # This is the leaves from learning example
        self.submatches = submatches
        # This is the node from the learning example
        self.winner = winner
        self.id = id 


    def left(self):
        return self.submatches[0] if self.submatches is not None else None

    def left_wins(self):
        self.winner = self.submatches[0].winner if self.submatches and self.submatches[0] is not None else None

    def right(self):
        return self.submatches[1] if self.submatches is not None else None

    def right_wins(self):
        self.winner = self.submatches[1].winner if self.submatches and self.submatches[1] is not None else None


def generate_bracket(teams):
    """
    This generates the Matches with id's of "1-16" using the "range(len(teams)" which translates to [1,2,...15,16]
    After that, "zip" uses that list of numbers along with name of each team to return a tuple "(1, 'name')..."
    To use these tuples effectively they need to be desconstructed which is done with the (x, team) 
    This allows the instant of Match to be created with the incrementing (x+1) id along with the name to create 16 unique instances of Match()
    """
    list_of_matches = [Match(x + 1 ,team) for (x, team) in zip(range(len(teams)), teams)]

    def recurse(list_of_matches, id_offset):
        if len(list_of_matches) == 1:
            return list_of_matches[0]

        competing_pairs, z = [], int(len(list_of_matches) // 2)

        for id in range(z):
            team_left, team_right = list_of_matches.pop(0), list_of_matches.pop(0)
            competing_pairs.append(Match(id + id_offset, None, (team_left, team_right)))

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
