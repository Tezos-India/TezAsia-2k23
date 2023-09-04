//Shuffle players and cards (Fisher–Yates shuffle)
function shuffle(items) {
  let shuffledArray = [...items];
  let m = shuffledArray.length;

  let index;
  let temp;

  while (m) {
    index = Math.floor(Math.random() * m--);

    temp = shuffledArray[m];
    shuffledArray[m] = shuffledArray[index];
    shuffledArray[index] = temp;
  }

  return shuffledArray;
}

module.exports = { shuffle };
