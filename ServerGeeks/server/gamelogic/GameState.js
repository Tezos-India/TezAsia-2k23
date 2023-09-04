const {
  switchTwoPlayerGame,
  switchPlayers,
  removeCardFromHand,
  getWinnerScore,
  canPlayWild4Card,
  removeCardFromDiscard,
} = require("./utils/gameLogicUtils");
const Deck = require("./Deck");

class GameState {
  constructor() {
    this.avatarIDList = [];
    this.currentPlayerIndex = 0; // current player's turn
    this.nextPlayerIndex = 1;
    this.currentColor = "";
    this.direction = "forward";
    this.currentType = "";
    this.deck = new Deck();
    this.topCard = {};
    this.isWild = false;
    this.discardPile = [];
    this.gameStart = false;
    this.isWin = false;
    this.players = [];
  }

  Win(currentPlayerID) {
    //determine win (if a player's card == 0) then they win
    const currentPlayer = this.players.find(
      (player) => player.id === currentPlayerID
    );

    return currentPlayer.hand.length === 0;
  }

  switchPlayers(type = "") {
    let currPlayerIndex = this.currentPlayerIndex;
    let nextPlayerIndex = this.nextPlayerIndex;
    let playerLength = this.players.length;

    const playerGameInfo = {
      direction: this.direction,
      currPlayerIndex: currPlayerIndex,
      nextPlayerIndex: nextPlayerIndex,
      playerLength: playerLength,
      currentType: type ? type : this.currentType,
    };

    // switch player
    [currPlayerIndex, nextPlayerIndex] =
      playerLength <= 2
        ? switchTwoPlayerGame(playerGameInfo)
        : switchPlayers(playerGameInfo);

    this.currentPlayerIndex = currPlayerIndex;
    this.nextPlayerIndex = nextPlayerIndex;
  }

  moveDiscardCardsToDeck() {
    const discardCards = [];

    this.discardPile.forEach((card) => {
      if (card !== this.topCard) {
        discardCards.push(card);
        this.discardPile = removeCardFromDiscard(this.discardPile, card);
      }
    });

    this.deck.push(...discardCards);

    return discardCards;
  }

  Move({ io, roomID, playerID, cardPlayed }) {
    //check if player can move card (if current turn) and if the card is a valid move or not
    //set Game State
    let currentPlayer = this.players[this.currentPlayerIndex];
    let updatedNextPlayerHand = [];

    const cardGameInfo = {
      currentPlayer: currentPlayer,
      cardPlayed: cardPlayed,
    };

    if (this.deck.length <= 8) {
      const discardCards = this.moveDiscardCardsToDeck();

      io.to(roomID).emit("update_deck", discardCards);
    }

    if (currentPlayer.id === playerID) {
      if (
        cardPlayed.color === this.currentColor ||
        cardPlayed.color === this.topCard.color ||
        cardPlayed.name === this.topCard.name
      ) {
        switch (cardPlayed.type) {
          case "reverse":
            this.currentType = "reverse";
            this.direction =
              this.direction === "forward" ? "reverse" : "forward";
            break;

          case "skip":
            this.currentType = "skip";
            break;

          case "draw":
            this.currentType = "draw";
            for (let i = 0; i < 2; i++) {
              updatedNextPlayerHand.push(this.deck.pop());
            }
            break;

          default:
            this.currentType = "normal";
            break;
        }

        if (updatedNextPlayerHand.length) {
          this.players[this.nextPlayerIndex].hand.push(
            ...updatedNextPlayerHand
          );
        }

        this.switchPlayers();

        currentPlayer.hand = removeCardFromHand(cardGameInfo);

        this.topCard = cardPlayed;
        this.discardPile = [...this.discardPile, cardPlayed];

        this.currentColor = this.topCard.color;

        return {
          status: "success",
          id: currentPlayer.id,
          updatedDeck: this.deck,
          updatedNextPlayerHand: updatedNextPlayerHand,
          updatedCurrentPlayerIndex: this.currentPlayerIndex,
          nextPlayerIndex: this.nextPlayerIndex,
          cardPlayed: cardPlayed,
        };
      } else if (
        cardPlayed.name === "Wild4card" ||
        cardPlayed.name === "Wildcard"
      ) {
        const wild4Info = {
          currentPlayer: currentPlayer,
          currentColor: this.currentColor,
        };

        switch (cardPlayed.type) {
          case "Wild4":
            if (canPlayWild4Card(wild4Info)) {
              this.currentType = "Wild4";
              for (let i = 0; i < 4; i++) {
                updatedNextPlayerHand.push(this.deck.pop());
              }
              break;
            } else {
              return {
                status: "error",
              };
            }

          case "Wild":
            this.currentType = "Wild";
            break;
          default:
            break;
        }

        if (updatedNextPlayerHand.length) {
          this.players[this.nextPlayerIndex].hand.push(
            ...updatedNextPlayerHand
          );
        }

        currentPlayer.hand = removeCardFromHand(cardGameInfo);

        this.topCard = cardPlayed;
        this.discardPile = [...this.discardPile, cardPlayed];

        return {
          status: "success",
          id: currentPlayer.id,
          updatedDeck: this.deck,
          updatedNextPlayerHand: updatedNextPlayerHand,
          cardPlayed: cardPlayed,
        };
      }
    }

    return {
      status: "error",
    };
  }

  WildMove(color) {
    this.currentColor = color;
    this.isColorChosen = true;

    this.switchPlayers();

    return {
      updatedCurrentPlayerIndex: this.currentPlayerIndex,
      nextPlayerIndex: this.nextPlayerIndex,
    };
  }

  Draw({ io, playerID, roomID }) {
    this.currentType = "drawPile";
    let currentPlayer = this.players[this.currentPlayerIndex];

    if (this.deck.length <= 8) {
      //move cards in discard except topCard to deckpile and shuffle again
      const discardCards = this.moveDiscardCardsToDeck();

      io.to(roomID).emit("update_deck", discardCards);
    }
    if (currentPlayer.id === playerID) {
      const currentPlayerHand = this.players[this.currentPlayerIndex].hand;

      const discardCard = this.deck.pop();

      currentPlayerHand.push(discardCard);

      // switch player
      this.switchPlayers();

      return {
        status: "success",
        id: currentPlayer.id,
        updatedDeck: this.deck,
        updatedCurrentPlayerIndex: this.currentPlayerIndex,
        nextPlayerIndex: this.nextPlayerIndex,
        discardCard: discardCard,
      };
    }

    return {
      status: "error",
    };
  }

  getDeck() {
    return this.deck.getDeck();
  }

  getWinnerScore() {
    return getWinnerScore(this.players);
  }

  getAvatarID() {
    let avatarID;
    while (true) {
      avatarID = Math.floor(Math.random() * 10);
      if (this.avatarIDList.includes(avatarID)) {
        continue;
      } else {
        this.avatarIDList.push(avatarID);
        break;
      }
    }
    return avatarID;
  }

  setTopCard(card) {
    this.topCard = card;
    this.currentColor = this.topCard.color;
    this.discardPile.push(card);
  }
}

module.exports = GameState;
