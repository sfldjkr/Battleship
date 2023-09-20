import { findOutWhereClicked } from "./attackFunc";
let getValidMoves = (attacker, receiver) => {
  let allMoves = [];
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      let notAlreadyClicked = true;
      let iteratingCoord = `Grid${x}${y}user`;
      receiver.myBoard.hitCoord.forEach((coordinate) => {
        if (coordinate == iteratingCoord) {
          notAlreadyClicked = false;
        }
      });
      receiver.myBoard.missedCoord.forEach((coordinate) => {
        if (coordinate == iteratingCoord) {
          notAlreadyClicked = false;
        }
      });
      if (notAlreadyClicked) {
        allMoves.push(iteratingCoord);
      }
    }
  }
  return allMoves;
};

let makeAiMove = (attacker, receiver) => {
  let allMoves = getValidMoves(attacker, receiver);
  let allMovesLen = allMoves.length;
  let randomIndex = Math.floor(Math.random() * allMovesLen);
  let randomDivClassName = allMoves[randomIndex];
  let playerClickedShip = findOutWhereClicked(
    `#${randomDivClassName}`,
    receiver,
  );
  let clickedDiv = document.querySelector(`#${randomDivClassName}`);
  clickedDiv.classList.remove(".userGreyedDiv");
  if (playerClickedShip) {
    clickedDiv.classList.add("wrongGuessDiv");
    receiver.myBoard.hitCoord.push(`${randomDivClassName}`);
  } else {
    clickedDiv.classList.add();
    clickedDiv.classList.add("rightGuessDiv");
    receiver.myBoard.missedCoord.push(`${randomDivClassName}`);
  }
};

export { makeAiMove };
