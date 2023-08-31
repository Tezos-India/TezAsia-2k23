{/* <script */}
// Create a deck of cards and shuffle
const suits = ["hearts", "diamonds", "clubs", "spades"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const deck = [];

for (const suit of suits) {
  for (const rank of ranks) {
    deck.push(`${rank} of ${suit}`);
  }
}

// Shuffle the deck randomly
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(deck);

// Helper function to construct the image filename based on card name
function getImageFilename(cardName) {
    const rank = cardName.split(" ")[0];
    const suit = cardName.split(" ")[2];
  
    if (rank === "A" && suit === "spades") {
      return `png/${rank}_of_${suit.toLowerCase()}.png`;
    } else if (rank === "Q" && suit === "spades") {
      return `png/queen_of_spades.png`;
    } else if (rank === "Q") {
      return `png/queen_of_${suit.toLowerCase()}.png`;
    } else if (rank === "K") {
      return `png/king_of_${suit.toLowerCase()}.png`;
    } else if (rank === "J") {
      return `png/jack_of_${suit.toLowerCase()}.png`;
    } else if (rank === "10") {
      return `png/${rank}_of_${suit.toLowerCase()}.png`;
    } else if (rank === "9") {
      return `png/${rank}_of_${suit.toLowerCase()}.png`;
    } else if (rank === "8") {
      return `png/${rank}_of_${suit.toLowerCase()}.png`;
    } else if (rank === "7") {
      return `png/${rank}_of_${suit.toLowerCase()}.png`;
    } else if (rank === "6") {
      return `png/${rank}_of_${suit.toLowerCase()}.png`;
    } else if (rank === "5") {
      return `png/${rank}_of_${suit.toLowerCase()}.png`;
    } else if (rank === "4") {
      return `png/${rank}_of_${suit.toLowerCase()}.png`;
    } else if (rank === "3") {
      return `png/${rank}_of_${suit.toLowerCase()}.png`;
    } else if (rank === "2") {
      return `png/${rank}_of_${suit.toLowerCase()}.png`;
    } else {
      return `png/${rank}_of_${suit.toLowerCase()}s.png`;
    }
  }
  
  // Rest of the code...
  
  // Show Player 1's cards openly
  const player1Cards = deck.slice(0, 13);
  const player1Button = document.getElementById("player1-btn");
  const player1CardsContainer = document.getElementById("player1-cards");
  player1Button.addEventListener("click", () => {
    player1Button.style.display = "none";
    player1CardsContainer.style.display = "block";
  
    // Create and append card images to the container
    for (const card of player1Cards) {
      const cardImage = document.createElement("img");
      const filename = getImageFilename(card); // Get the image filename based on card name
      cardImage.src = filename;
      cardImage.style.height = "100px"; // Set the desired height of the card image
      cardImage.style.margin = "5px";
      player1CardsContainer.appendChild(cardImage);
    }
  });
  
  
  // Hide Player 1's cards initially
  player1CardsContainer.style.display = "none";
  
  // Rest of the code...
  

// Show face down cards for Player 2
const player2Cards = deck.slice(13, 26);
const player2Button = document.getElementById("player2-btn");
const player2CardsContainer = document.getElementById("player2-cards");
player2Button.addEventListener("click", () => {
  player2Button.style.display = "none";
  player2CardsContainer.style.display = "block";
  player2CardsContainer.textContent = "(Face Down)";
});


// Show face down cards for Player 2
//   const player2Cards = deck.slice(13, 26);
//   const player2Button = document.getElementById("player2-btn");
//   const player2CardsContainer = document.getElementById("player2-cards");
//   player2Button.addEventListener("click", () => {
//     player2Button.style.display = "none";
//     player2CardsContainer.style.display = "block";
  
//     // Create and append card images to the container
//     for (const card of player1Cards) {
//       const cardImage = document.createElement("img");
//       const filename = getImageFilename(card); // Get the image filename based on card name
//       cardImage.src = filename;
//       cardImage.style.height = "100px"; // Set the desired height of the card image
//       cardImage.style.margin = "5px";
//       player1CardsContainer.appendChild(cardImage);
//     }
//   });


// Show face down cards for Player 3
const player3Cards = deck.slice(26, 39);
const player3Button = document.getElementById("player3-btn");
const player3CardsContainer = document.getElementById("player3-cards");
player3Button.addEventListener("click", () => {
  player3Button.style.display = "none";
  player3CardsContainer.style.display = "block";
  player3CardsContainer.textContent = "(Face Down)";
});

// Show face down cards for Player 4
const player4Cards = deck.slice(39, 52);
const player4Button = document.getElementById("player4-btn");
const player4CardsContainer = document.getElementById("player4-cards");
player4Button.addEventListener("click", () => {
  player4Button.style.display = "none";
  player4CardsContainer.style.display = "block";
  player4CardsContainer.textContent = "(Face Down)";
});
// </script>