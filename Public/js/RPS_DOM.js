//inisialisasi semua element
const logo_btn = document.getElementById("logo");

const state_initial = document.getElementById("initial");
const state_human_win = document.getElementById("human-win");
const state_comp_win = document.getElementById("comp-win");
const state_draw = document.getElementById("draw");

let states = [];

states = document.querySelectorAll(".states");

const refresh_btn = document.getElementById("refresh-btn");

const p_rock = document.getElementById("player-rock");
const p_paper = document.getElementById("player-paper");
const p_scissor = document.getElementById("player-scissor");

const c_rock = document.getElementById("comp-rock");
const c_paper = document.getElementById("comp-paper");
const c_scissor = document.getElementById("comp-scissor");

let elements_player = [];
let elements_comp = [];

elements_comp = document.querySelectorAll(".comp");
elements_player = document.querySelectorAll(".user");

class Player {
  //bikin variabel buat hasil perbandingan dan pilihan batu gunting kertas
  static playerWins = "player wins";
  static compWins = "computer wins";
  static draw = "draw";

  static choiceRock = "ROCK";
  static choicePaper = "PAPER";
  static choiceScissor = "SCISSOR";

  constructor() {
    if (this.constructor === Player)
      throw new Error("Mohon lebih spesifik dalam membuat pemain");
    this.choice = "";
  }

  getChoice() {
    return this.choice;
  }

  setChoice() {}

  static getComparisonResult(playerChoice, compChoice) {
    let result = "";

    if (playerChoice === Player.choiceRock) {
      //pemain pilih batu
      if (compChoice === Player.choiceRock) {
        result = Player.draw;
      } else if (compChoice === Player.choicePaper) {
        result = Player.compWins;
      } else {
        result = Player.playerWins;
      }
    } else if (playerChoice === Player.choicePaper) {
      //pemain pilih kertas
      if (compChoice === Player.choiceRock) {
        result = Player.playerWins;
      } else if (compChoice === Player.choicePaper) {
        result = Player.draw;
      } else {
        result = Player.compWins;
      }
    } else {
      //pemain pilih gunting
      if (compChoice === Player.choiceRock) {
        result = Player.compWins;
      } else if (compChoice === Player.choicePaper) {
        result = Player.playerWins;
      } else {
        result = Player.draw;
      }
    }

    return result;
  }
}

class PlayerHuman extends Player {
  constructor() {
    super();
  }

  setChoice(playerChoice) {
    this.choice = playerChoice;
    console.log("PLAYER CHOICE: " + this.choice);
  }
}

class PlayerComp extends Player {
  constructor() {
    super();
  }

  setChoice() {
    let pilihan = Math.random() * 100;

    if (pilihan <= 30) {
      this.choice = Player.choiceRock;
      setBackgroundColor(c_rock);
    } else if (pilihan > 30 && pilihan <= 60) {
      this.choice = Player.choicePaper;
      setBackgroundColor(c_paper);
    } else {
      this.choice = Player.choiceScissor;
      setBackgroundColor(c_scissor);
    }
    console.log("COMP CHOICE: " + this.choice);
  }
}

const human = new PlayerHuman();
const computer = new PlayerComp();

for (let i = 0; i < elements_player.length; i++) {
  elements_player[i].addEventListener("mouseover", function () {
    setBackgroundColor(elements_player[i]);
  });
  elements_player[i].addEventListener("mouseleave", function () {
    removeBackgroundColor(elements_player[i]);
  });
  elements_player[i].addEventListener("click", function () {
    startGame(elements_player[i]);
  });
}

logo_btn.addEventListener("click", refreshPage);

refresh_btn.addEventListener("click", returnToInitialState);

function refreshPage() {
  location.reload();
  // return false;
}

function setBackgroundColor(boxElement) {
  boxElement.style.backgroundColor = "lightgray";
}

function removeBackgroundColor(boxElement) {
  boxElement.style.backgroundColor = "";
}

function showComparisonResult(boxElement) {
  for (let i = 0; i < states.length; i++) {
    //buat nullify semua state yang sudah ada sebelumnya
    states[i].style.display = "none";
  }
  boxElement.style.display = "block";

  removeBoxLeaveEventHandler(boxElement);
}

function removeBoxLeaveEventHandler(boxElement) {
  boxElement.addEventListener("mouseleave", removeBackgroundColor(boxElement));
  boxElement.removeEventListener(
    "mouseleave",
    removeBackgroundColor(boxElement)
  );
}

function returnToInitialState() {
  state_initial.style.display = "block";
  state_comp_win.style.display = "none";
  state_human_win.style.display = "none";
  state_draw.style.display = "none";

  for (let i = 0; i < elements_comp.length; i++) {
    removeBackgroundColor(elements_comp[i]);
  }
  for (let i = 0; i < elements_player.length; i++) {
    removeBackgroundColor(elements_player[i]);
  }
}

function startGame(boxElement) {
  returnToInitialState();
  setBackgroundColor(boxElement);
  if (boxElement.id === "player-rock") {
    human.setChoice(Player.choiceRock);
  } else if (boxElement.id === "player-paper") {
    human.setChoice(Player.choicePaper);
  } else {
    human.setChoice(Player.choiceScissor);
  }
  computer.setChoice();
  Player.getComparisonResult(human.getChoice(), computer.getChoice());
  let result = Player.getComparisonResult(
    human.getChoice(),
    computer.getChoice()
  );
  console.log(result);
  if (result === Player.playerWins) {
    showComparisonResult(state_human_win);
  } else if (result === Player.compWins) {
    showComparisonResult(state_comp_win);
  } else {
    showComparisonResult(state_draw);
  }
}
