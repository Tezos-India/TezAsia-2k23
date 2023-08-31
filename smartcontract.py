import smartpy as sp

class DiceRollingGame(sp.Contract):
    def __init__(self):
        self.init(
            players = sp.map(tkey=sp.TAddress, tvalue=PlayerInfo),
        )

    @sp.entry_point
    def log_in(self):
        sender = sp.sender
        player_info = sp.local(self.data.players[sender], default_value=PlayerInfo(streak=0, lastLogin=sp.timestamp(0)))

        # Check if player's login streak is maintained
        if sp.now - player_info.lastLogin < sp.timestamp(days=1):
            player_info.streak += 1
        else:
            player_info.streak = 1

        player_info.lastLogin = sp.now
        self.data.players[sender] = player_info

    @sp.entry_point
    def place_bet(self):
        sender = sp.sender
        player_info = self.data.players[sender]
        # Calculate base reward
        base_reward = 10  # Replace with actual reward calculation

        # Double the reward for login streak
        final_reward = base_reward * player_info.streak

        # Implement game logic for bet placement and reward distribution
        # ...

# Define the PlayerInfo structure
class PlayerInfo(sp.Record):
    streak = sp.nat
    lastLogin = sp.timestamp

if "templates" not in __name__:
    @sp.add_test(name="Example")
    def test():
        scenario = sp.test_scenario()
        game = DiceRollingGame()

        # Simulate a player logging in and placing a bet
        scenario += game
        scenario += game.log_in().run(sender=sp.address("tz1Player"))
        scenario += game.place_bet().run(sender=sp.address("tz1Player"))
