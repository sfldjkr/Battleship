const gameDiv = document.querySelector(".gameMainDiv");

let checkIfAllShipsSunk = (player) => {
  return player.myBoard.isAllSink();
};

let showWinner = (player) => {
  let winningShowingDiv = document.querySelector(".showWinnerDiv");
  let winningName = player.name.toUpperCase();
  let WinningText = "";
  gameDiv.innerHTML = "";
  let newImg = new Image();
  let winningHone = document.createElement("h1");
  if (player.name === "ai") {
    WinningText = `You've Been Defeated By AI`;
    winningHone.classList.add("aiWonMessage");

    newImg.src = `https://media.tenor.com/R91Cm0_ICJUAAAAd/ultron-age-of-ultron.gif`;
  } else if (player.name == "user") {
    WinningText = `Congratulation!! You've Defeated The Ai`;

    newImg.src = `https://media.tenor.com/ACY5cKL6OY4AAAAM/crazy-dance-dance.gif`;
    winningHone.classList.add("humanWonMessage");
  }
  winningShowingDiv.appendChild(newImg);
  winningHone.innerHTML = WinningText;
  winningShowingDiv.appendChild(winningHone);
};

let addCheckWinnerFunc = (humanPlayer, aiPlayer) => {
  gameDiv.addEventListener("click", function () {
    let allHumanShipsSunk = checkIfAllShipsSunk(humanPlayer);
    let allAiShipsSunk = checkIfAllShipsSunk(aiPlayer);
    if (allHumanShipsSunk) {
      showWinner(aiPlayer);
    } else if (allAiShipsSunk) {
      showWinner(humanPlayer);
    }
  });
};

export { addCheckWinnerFunc };
