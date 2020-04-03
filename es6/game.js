// contains the flipped cards.
let active = [];

class Start {
  //Event listener for all clicks inside the container and flip cards on click.
  eventListeners() {
    //Event listener for all clicks inside the container and flip cards on click.
    document.querySelector("main").addEventListener("click", event => {
      let levelChoice = Number(document.querySelector("#level").value);
      if (event.target.classList.contains("front-img")) {
        setTimeout(() => {
          event.target.parentNode.classList.toggle("flipflap");
        }, 250);
        active.push(event.target.parentNode);
        checkMatch.checkIfMatch(active);
      }

      if (event.target.classList.contains("submit")) {
        startGame.startTheGame(levelChoice);
      }

      if (event.target.classList.contains("restart")) {
        document.querySelector(".end-game").style.visibility = "hidden";
        document.querySelector(".overlay").style.visibility = "visible";
      }
    });

    return levelChoice;
  }

  //Function that starts the game.
  startTheGame(choice) {
    document.querySelector(".overlay").style.visibility = "hidden";
    createBoard.createTheBoard(choice);
  }
}

class CreateBoard {
  //Function that creates the board according to the size the player can choose from an overlay droplist.
  createTheBoard(num) {
    let j = 0;
    for (let i = 0; i < num; i++) {
      i % 2 == 0 ? j++ : (j = j);
      document
        .querySelector(".container")
        .insertAdjacentHTML(
          "beforeend",
          `<div class="inner-div"><img src="imgs/front.png" alt="" class="front-img"><img src="imgs/${j}.png" alt="" class="back-img"></div>`
        );
    }

    const allCards = [...document.querySelectorAll(".inner-div")];
    const typeNames = [
      "karam",
      "wagde",
      "alaa",
      "firefix",
      "chrome",
      "mario",
      "batman",
      "fox",
      "gru",
      "yoda",
      "stormtrooper",
      "angrybird",
      "snorlax",
      "dog",
      "flappybird",
      "cat"
    ];

    this.shuffleCards(allCards, typeNames);
  }

  // Shuffles the cards order, adds type to the elements prototype that includes specific name from "typeNames".
  shuffleCards(cards, checkNames) {
    let j = 0;
    cards.forEach((card, index) => {
      let random = Math.floor(Math.random() * 12);

      card.style.order = random;
      index % 2 == 0 ? j++ : (j = j);
      card.type = checkNames[j];
    });
  }
}

class CheckAndEnd {
  //Checks if card matchs or not, if yes it keeps them fliped, otherwise it flips them back.
  checkIfMatch(arr) {
    if (arr.length == 2) {
      setTimeout(() => {
        if (arr[0].type == arr[1].type) {
          arr.forEach(cur => {
            cur.classList.add("done");
          });
          console.log("Match!!!");
          this.endGame();
        }
        arr.forEach(cur => {
          cur.classList.toggle("flipflap");
        });
        active = [];
      }, 800);
    }
  }

  //This function ends and restart ther game.
  endGame() {
    let cards = [...document.querySelectorAll(".done")];
    let levelChoice = Number(document.querySelector("#level").value);

    if (cards.length == levelChoice) {
      document.querySelector(".end-game").style.visibility = "visible";
      document.querySelector(".container").innerHTML = "";
    }
  }
}

const startGame = new Start();
const createBoard = new CreateBoard();
const checkMatch = new CheckAndEnd();

startGame.eventListeners();
startGame.startTheGame(startGame.eventListeners());

createBoard.createTheBoard();
createBoard.shuffleCards();

checkMatch.checkIfMatch(active);
checkMatch.endGame();
