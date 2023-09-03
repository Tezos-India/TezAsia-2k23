import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomName: "",
  players: [],
  deck: [],
  discard: [],
  currentPlayer: 0,
  nextPlayer: 1,
  playerID: "",
  direction: "forward",
  TopCard: {},
  currentColor: "",
  currentType: "",
  gameStart: false,
  isWild: false,
  isColorChosen: false,
  isWin: false,
  winner: {},
  winnerScore: 0,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    start(state, action) {
      action.payload.deck.forEach((card) => {
        state.deck.push(card);
      });

      state.roomName = action.payload.roomName;

      state.deck = [...action.payload.deck];

      state.players = [...action.payload.players];

      state.TopCard = action.payload.topCard;

      state.currentColor = state.TopCard.color;

      state.discard.push(action.payload.topCard);
    },

    draw(state, action) {
      const currentPlayer = state.players.find(
        (player) => player.id === action.payload.id
      );

      currentPlayer.hand = [...currentPlayer.hand, action.payload.discardCard];

      //Switch Player
      state.currentPlayer = action.payload.updatedCurrentPlayerIndex;
      state.nextPlayer = action.payload.nextPlayerIndex;

      state.deck = [...action.payload.updatedDeck];
    },

    move(state, action) {
      const currentPlayer = state.players.find(
        (player) => player.id === action.payload.id
      );
      const cardPlayed = action.payload.cardPlayed;
      const nextPlayerHand = action.payload.updatedNextPlayerHand;

      if (nextPlayerHand.length) {
        state.players[state.nextPlayer].hand.push(...nextPlayerHand);

        state.deck = [...action.payload.updatedDeck];
      }

      if (cardPlayed.name === "Wild4card" || cardPlayed.name === "Wildcard") {
        currentPlayer.hand = currentPlayer.hand.filter(
          (card) => card.id !== cardPlayed.id
        );

        state.TopCard = cardPlayed;
        state.currentColor = state.TopCard.color;
        state.isColorChosen = false;

        state.discard = [...state.discard, cardPlayed];
      } else {
        state.currentPlayer = action.payload.updatedCurrentPlayerIndex;
        state.nextPlayer = action.payload.nextPlayerIndex;

        currentPlayer.hand = currentPlayer.hand.filter(
          (card) => card.id !== cardPlayed.id
        );

        state.TopCard = cardPlayed;

        state.discard = [...state.discard, cardPlayed];

        state.currentColor = state.TopCard.color;
      }
    },

    WinGame(state, action) {
      const currentPlayer = state.players.find(
        (player) => player.id === action.payload.playerID
      );
      state.winner = {
        name: currentPlayer.name,
        avatarID: currentPlayer.avatarID,
      };
      state.winnerScore = action.payload.score;
      state.isWin = true;
    },

    setWildCard(state, action) {
      state.isWild = action.payload;
    },

    updatePlayers(state, action) {
      state.players = state.players.filter(
        (player) => player.id !== action.payload.id
      );
      state.currentPlayer = action.payload.currPlayer;

      state.nextPlayer = action.payload.nextPlayer;
    },

    updateDeck(state, action) {
      state.deck.push(...action.payload);
    },

    //called when wild card is placed after player has chosen a color
    //switch player after setting current color
    colorChange(state, action) {
      state.isColorChosen = true;
      state.currentColor = action.payload.color;

      state.currentPlayer = action.payload.updatedCurrentPlayerIndex;
      state.nextPlayer = action.payload.nextPlayerIndex;
    },

    reset() {
      return initialState;
    },
  },
});

export const {
  start,
  draw,
  reset,
  move,
  WinGame,
  updatePlayers,
  updateDeck,
  setWildCard,
  colorChange,
} = gameSlice.actions;
export default gameSlice.reducer;
