//more than two player game for switching players
function switchPlayers({
  direction,
  currPlayerIndex,
  nextPlayerIndex,
  playerLength,
  currentType,
}) {
  const switchPlayerInfo = {
    currPlayerIndex: currPlayerIndex,
    nextPlayerIndex: nextPlayerIndex,
    length: playerLength,
    currentType: currentType,
  };
  switch (direction) {
    case "reverse":
      return reversePlayersTurn(switchPlayerInfo);

    case "forward":
      return switchPlayersTurn(switchPlayerInfo);

    default:
      break;
  }
}

//two player game for switching players
function switchTwoPlayerGame({
  currPlayerIndex,
  nextPlayerIndex,
  playerLength,
  currentType,
}) {
  //if playing reverseCard,skip Card, draw2 or WildDraw 4 Card, can play again
  //else wildcard, regular card goes to next player
  switch (currentType) {
    case "reverse":
    case "skip":
    case "draw":
    case "Wild4":
      return [currPlayerIndex, nextPlayerIndex];

    default:
    case "leave_game":
      currPlayerIndex = (currPlayerIndex + 1) % playerLength;
      nextPlayerIndex = (nextPlayerIndex + 1) % playerLength;

      return [currPlayerIndex, nextPlayerIndex];
  }
}

function switchPlayersTurn({
  currPlayerIndex,
  nextPlayerIndex,
  length,
  currentType,
}) {
  switch (currentType) {
    case "skip":
    case "Wild4":
    case "draw":
      // next person either draws 2 or 4 or get skip and loses turn
      currPlayerIndex = (nextPlayerIndex + 1 + length) % length;
      nextPlayerIndex = (currPlayerIndex + 1 + length) % length;

      return [currPlayerIndex, nextPlayerIndex];

    //Numbered Cards and Wild

    default:
      currPlayerIndex = (currPlayerIndex + 1) % length;
      nextPlayerIndex = (currPlayerIndex + 1) % length;

      return [currPlayerIndex, nextPlayerIndex];
  }
}

function reversePlayersTurn({
  currPlayerIndex,
  nextPlayerIndex,
  length,
  currentType,
}) {
  switch (currentType) {
    case "skip":
    case "draw":
    case "Wild4":
      // next person either draws 2 or 4 or get skip and loses turn
      currPlayerIndex = (nextPlayerIndex - 1 + length) % length;
      nextPlayerIndex = (currPlayerIndex - 1 + length) % length;

      return [currPlayerIndex, nextPlayerIndex];

    //Numbered Cards and Wild and Wild+4
    default:
      currPlayerIndex = (currPlayerIndex - 1 + length) % length;
      nextPlayerIndex = (currPlayerIndex - 1 + length) % length;

      return [currPlayerIndex, nextPlayerIndex];
  }
}

function removeCardFromHand({ currentPlayer, cardPlayed }) {
  return currentPlayer.hand.filter((card) => card.id !== cardPlayed.id);
}

function removeCardFromDiscard(deck, card) {
  return deck.filter((cards) => cards.id !== card.id);
}

function canPlayWild4Card({ currentPlayer, currentColor }) {
  let canPlay = true;

  currentPlayer.hand.map((card) => {
    if (card.color === currentColor) {
      canPlay = false;
    }
  });

  return canPlay;
}

function getWinnerScore(players) {
  let score = 0;

  players.forEach((player) => {
    player.hand.forEach((card) => {
      score = score + checkCardScore(card);
    });
  });

  return score;
}

function checkCardScore(card) {
  switch (card.type) {
    case "reverse":
    case "draw":
    case "skip":
      return 20;

    case "Wild4":
    case "Wild":
      return 50;

    default:
      return Number(card.name);
  }
}

module.exports = {
  switchPlayers,
  switchTwoPlayerGame,
  canPlayWild4Card,
  removeCardFromHand,
  removeCardFromDiscard,
  getWinnerScore,
};
