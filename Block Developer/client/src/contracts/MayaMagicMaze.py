import smartpy as sp

class MayaMagicMaze(sp.Contract):
    def __init__(self):
        self.init(nbMoves    = 0,
                  winner     = 0,
                  draw       = False,
                  deck       = sp.utils.matrix([[0, 0, 0], [0, 0, 0], [0, 0, 0]]),
                  nextPlayer = 1)

    @sp.entry_point
    def play(self, params):
        sp.verify((self.data.winner == 0) & ~self.data.draw)
        sp.verify((params.i >= 0) & (params.i < 3))
        sp.verify((params.j >= 0) & (params.j < 3))
        sp.verify(params.move == self.data.nextPlayer)
        sp.verify(self.data.deck[params.i][params.j] == 0)
        self.data.deck[params.i][params.j] = params.move
        self.data.nbMoves += 1
        self.data.nextPlayer = 3 - self.data.nextPlayer
        self.checkLine( self.data.deck[params.i])
        self.checkLine([self.data.deck[i       ][params.j] for i in range(0, 3)])
        self.checkLine([self.data.deck[i       ][i       ] for i in range(0, 3)])
        self.checkLine([self.data.deck[i       ][2 - i   ] for i in range(0, 3)])
        sp.if (self.data.nbMoves == 9) & (self.data.winner == 0):
            self.data.draw = True

    def checkLine(self, line):
        with sp.if_ ((line[0] != 0) & (line[0] == line[1]) & (line[0] == line[2])):
            self.data.winner = line[0]

# Tests
if "templates" not in __name__:
    @sp.add_test(name = "Maya Magic Maze")
    def test():
        scenario = sp.test_scenario()
        scenario.h1("Maya Magic Maze")
        # define a contract
        c1 = MayaMagicMaze()

        # show its representation
        scenario.h2("A sequence of interactions with a winner")
        scenario += c1
        scenario.h2("Message execution")
        scenario.h3("A first move in the center")
        c1.play(i = 1, j = 1, move = 1)
        scenario.h3("A forbidden move")
        c1.play(i = 1, j = 1, move = 2).run(valid = False)
        scenario.h3("A second move")
        c1.play(i = 1, j = 2, move = 2)
        scenario.h3("Other moves")
        c1.play(i = 2, j = 1, move = 1)
        c1.play(i = 2, j = 2, move = 2)
        scenario.verify(c1.data.winner == 0)
        c1.play(i = 0, j = 1, move = 1)
        scenario.verify(c1.data.winner == 1)
        scenario.p("Player1 has won")
        c1.play(i = 0, j = 0, move = 2).run(valid = False)

        c2 = MayaMagicMaze()
        scenario.h2("A sequence of interactions with a draw")
        scenario += c2
        scenario.h2("Message execution")
        scenario.h3("A first move in the center")
        c2.play(i = 1, j = 1, move = 1)
        scenario.h3("A forbidden move")
        c2.play(i = 1, j = 1, move = 2).run(valid = False)
        scenario.h3("A second move")
        c2.play(i = 1, j = 2, move = 2)
        scenario.h3("Other moves")
        c2.play(i = 2, j = 1, move = 1)
        c2.play(i = 2, j = 2, move = 2)
        c2.play(i = 0, j = 0, move = 1)
        c2.play(i = 0, j = 1, move = 2)
        c2.play(i = 0, j = 2, move = 1)
        c2.play(i = 2, j = 0, move = 2)
        c2.play(i = 1, j = 0, move = 1)

    sp.add_compilation_target("Maya Magic Maze", MayaMagicMaze())