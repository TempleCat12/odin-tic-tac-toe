// Factory

const playerFactory = (xOrO) => {
  let role = xOrO;
  const setRole = (str) => {
    role = str;
  };
  const play = () => {
    return role;
  };
  return { play, setRole };
};

const player = playerFactory("X");
const computer = playerFactory("O");

// Module function

const GameBoard = (() => {
  // storage game data
  let winnerRole = "";
  let filledBox = ["", "", "", "", "", "", "", "", ""];
  let blankBoxNum = 9;
  let blankBoxIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const reset = () => {
    console.log("reset");
    winnerRole = "";
    filledBox = ["", "", "", "", "", "", "", "", ""];
    blankBoxNum = 9;
    blankBoxIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    resultMsgP.textContent = "";
    DisplayController.refreshBoard(filledBox);
  };

  const record = (index, X_O) => {
    if (blankBoxIndex[index] != -1) {
      filledBox[index] = X_O;
      console.log(filledBox);
      // -1 represents that the box was filled
      blankBoxIndex[index] = -1;
      blankBoxNum--;
      // refresh page
      DisplayController.refreshBoard(filledBox);
    }
  };

  const play = (index) => {
    if(filledBox[index] == ''){
        record(index, player.play());
        computerPlay();
    }
  };

  const computerPlay = () => {
    let index;
    while (true && blankBoxNum > 0) {
      let random = Number.parseInt(Math.random() * 9);
      if (blankBoxIndex[random] != -1) {
        index = random;
        break;
      }
    }
    record(index, computer.play());
  };

  const justify = () => {
    if (isOver()) {
      if (blankBoxNum == 0 && winnerRole == "") {
        showResult("---- Peace ----");
      } else if (winnerRole == player.play()) {
        showResult("---- Congratulation! You Win ----");
      } else {
        showResult("---- You lose ----");
      }
    }
  };

  const showResult = (msg) => {
    resultMsgP.textContent = msg;
  };

  const isOver = () => {
    if (blankBoxNum == 0) {
      return true;
    }
    // index 0
    if (filledBox[0] != "") {
      if (filledBox[0] == filledBox[1] && filledBox[0] == filledBox[2]) {
        winnerRole = filledBox[0];
        return true;
      }
      if (filledBox[0] == filledBox[3] && filledBox[0] == filledBox[6]) {
        winnerRole = filledBox[0];
        return true;
      }
      if (filledBox[0] == filledBox[4] && filledBox[0] == filledBox[8]) {
        winnerRole = filledBox[0];
        return true;
      }
    }
    //index 1
    if (filledBox[1] != "") {
      if (filledBox[1] == filledBox[4] && filledBox[1] == filledBox[7]) {
        winnerRole = filledBox[1];
        return true;
      }
    }
    //index 2
    if (filledBox[2] != "") {
      if (filledBox[2] == filledBox[4] && filledBox[2] == filledBox[6]) {
        winnerRole = filledBox[2];
        return true;
      }
      if (filledBox[2] == filledBox[5] && filledBox[2] == filledBox[8]) {
        winnerRole = filledBox[2];
        return true;
      }
    }
    // index 3
    if (filledBox[3] != "") {
      if (filledBox[3] == filledBox[4] && filledBox[3] == filledBox[5]) {
        winnerRole = filledBox[3];
        return true;
      }
    }
    // index 6
    if (filledBox[6] != "") {
      if (filledBox[6] == filledBox[7] && filledBox[6] == filledBox[8]) {
        winnerRole = filledBox[6];
        return true;
      }
    }
    return false;
  };

  return {
    filledBox,
    record,
    play,
    computerPlay,
    justify,
    reset,
  };
})();

const DisplayController = (() => {
  const showGameBoard = () => {
    gameBoardDiv.classList.add("active");
    startBtn.classList.add('hide');
  };

  const refreshBoard = (data) => {
    for (let index = 0; index < divList.length; index++) {
      // Can't use GameBoard.filledBox, so i sent it as data
      divList.item(index).textContent = data[index];
    }
  };

  const setPlayRole = (role) => {
    player.setRole(role);
    if (role == "X") {
      computer.setRole("O");
    } else {
      computer.setRole("X");
    }
  };

  return {
    showGameBoard,
    refreshBoard,
    setPlayRole,
  };
})();

// User interface
const gameBoardDiv = document.getElementById("gameBoard");
const startBtn = document.getElementById("startBtn");
const divList = document.querySelectorAll("#gameBoard>div");
const roleInputs = document.querySelectorAll("input");
const contentDiv = document.getElementById("content");
const resultMsgP = document.getElementById("resultMsg");
const resetBtn = document.getElementById("resetBtn");

// event listener
startBtn.addEventListener("click", DisplayController.showGameBoard);

resetBtn.addEventListener("click", GameBoard.reset);
divList.forEach((div) => {
  div.addEventListener("click", (e) => {
    const id = div.getAttribute("id");
    GameBoard.play(id)
    GameBoard.play(id);
    GameBoard.justify();
  });
});

roleInputs.forEach((input) => {
  input.addEventListener("click", (e) => {
    console.log(input.value);
    DisplayController.setPlayRole(input.value);
    GameBoard.reset()
  });
});
