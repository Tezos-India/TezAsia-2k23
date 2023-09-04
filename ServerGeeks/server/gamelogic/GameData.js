const games = new Map();

function addGame(server) {
  games.set(server.roomID, server);
}

function deleteGame(roomID) {
  games.delete(roomID);
}

function getGame(roomID) {
  return games.get(roomID);
}

function getAllGames() {
  return games;
}

module.exports = { addGame, getGame, getAllGames, deleteGame };
