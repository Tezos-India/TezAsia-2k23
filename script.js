function rollDice() {
    var betAmount = document.getElementById("betAmount").value;
    var diceRoll = Math.floor(Math.random() * 6) + 1;
    
    document.getElementById("result").innerHTML = "Dice Roll: " + diceRoll;
    
    if (diceRoll == betAmount) {
        document.getElementById("reward").innerHTML = "Congratulations! You won!";
    } else {
        document.getElementById("reward").innerHTML = "Better luck next time!";
    }
}

function participateJackpot() {
    // Code to participate in the weekly jackpot
}

function participateLuckyDraw() {
    // Code to participate in the weekly lucky draw
}

function claimStreakReward() {
    // Code to claim the daily streak reward
}

function submitGuess() {
    var guess = document.getElementById("guess").value;
    var result = Math.floor(Math.random() * 6) + 1;
    
    document.getElementById("resultText").innerHTML = "Your guess: " + guess + "<br>Actual roll: " + result;
    
    if (guess == result) {
        document.getElementById("reward").innerHTML = "Congratulations! You won the reward.";
    } else {
        document.getElementById("reward").innerHTML = "Better luck next time!";
    }
    
    document.getElementById("game").style.display = "none";
    document.getElementById("result").style.display = "block";
}
