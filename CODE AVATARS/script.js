// CONTRIBUTORS

// JNANA YASASWINI

// G JAYANTH REDDY

// KOMAL REDDY K 


let player1 = "Player1";
let player2 = "Player2";
function changenames() {
  player1 = prompt("change player1 name");
  player2 = prompt("change player2 name");
  if (player1.length < 1 || player2.length < 1) {
    alert("please enter a valid name");
    return;
  }
  document.querySelector("p.Player1").innerHTML = player1;
  document.querySelector("p.Player2").innerHTML = player2;
}
function begin() {
  let r = document.querySelector("h1");
  let utterance = new SpeechSynthesisUtterance(`${r.innerText}`);
  speechSynthesis.speak(utterance);
}
function rollthedice() {
  let diceNum1 = document.querySelector(".img1");
  let diceNum2 = document.querySelector(".img2");

  diceNum1.setAttribute("src", "./diceroll.gif");
  diceNum2.setAttribute("src", "./diceroll.gif");
  audio = new Audio("./rolldice.mp3");
  audio.play();

  let result = document.querySelector("h1");
  setTimeout(() => {
    let randomNumber1 = Math.floor(Math.random() * 6) + 1;
    let randomNumber2 = Math.floor(Math.random() * 6) + 1;

    diceNum1.setAttribute("src", "./d" + randomNumber1 + ".png");
    diceNum2.setAttribute("src", "./d" + randomNumber2 + ".png");

    if (randomNumber1 == randomNumber2) {
      result.innerHTML = "TIE";
    } else if (randomNumber1 < randomNumber2) {
      result.innerHTML = player2 + " Won";
    } else {
      result.innerHTML = player1 + " Won";
    }
    let speakout = new SpeechSynthesisUtterance(`${result.innerText}`);
    speechSynthesis.speak(speakout);
    audio = new Audio("./success.mp3");
    audio.play();
    let speakout1 = new SpeechSynthesisUtterance(`Lets Begin`);
    speechSynthesis.speak(speakout1);
    setTimeout(() => {
      result.innerHTML = "Let's Begin";
    }, 1000);
  }, 2500);
}
