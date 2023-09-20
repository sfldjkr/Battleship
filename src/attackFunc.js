import { makeAiMove } from "./autoAttack";

let findOutWhereClicked = (className, receivedBy) => {
  let finalAnswer = false;
  receivedBy.myBoard.shipOne.coord.forEach((coordinates) => {
    if (className == `${coordinates}${receivedBy.name}`) {
      finalAnswer = true;
      receivedBy.myBoard.shipOne.hit();
      return;
    }
  });
  receivedBy.myBoard.shipTwo.coord.forEach((coordinates) => {
    if (className == `${coordinates}${receivedBy.name}`) {
      finalAnswer = true;
      receivedBy.myBoard.shipTwo.hit();
      return;
    }
  });
  receivedBy.myBoard.shipThree.coord.forEach((coordinates) => {
    if (className == `${coordinates}${receivedBy.name}`) {
      finalAnswer = true;
      receivedBy.myBoard.shipThree.hit();
      return;
    }
  });
  receivedBy.myBoard.shipFour.coord.forEach((coordinates) => {
    if (className == `${coordinates}${receivedBy.name}`) {
      finalAnswer = true;
      receivedBy.myBoard.shipFour.hit();
      return;
    }
  });
  receivedBy.myBoard.shipFive.coord.forEach((coordinates) => {
    if (className == `${coordinates}${receivedBy.name}`) {
      finalAnswer = true;
      receivedBy.myBoard.shipFive.hit();
      return;
    }
  });

  return finalAnswer;
};

let playerClicked = (DivClassName, x, y, receivedBy, attackedBy) => {
  let playerClickedShip = findOutWhereClicked(DivClassName, receivedBy);
  let clickedDiv = document.querySelector(`${DivClassName}`);
  clickedDiv.classList.remove(".userGreyedDiv");
  if (playerClickedShip) {
    clickedDiv.classList.add("wrongGuessDiv");
    receivedBy.myBoard.hitCoord.push(`${DivClassName}`);
  } else {
    clickedDiv.classList.add("rightGuessDiv");
    receivedBy.myBoard.missedCoord.push(`${DivClassName}`);
  }
};

let addAttackFuncForAi = (reciever, attacker) => {
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      let currentClass = `#Grid${x}${y}${reciever.name}`;
      let currentDiv = document.querySelector(currentClass);
      currentDiv.addEventListener("click", function () {
        let missedCoord = reciever.myBoard.missedCoord;
        let hitCoord = reciever.myBoard.hitCoord;
        let neverTouchedBefore = true;
        missedCoord.forEach((coord) => {
          if (coord === currentClass) {
            neverTouchedBefore = false;
          }
        });
        hitCoord.forEach((coord) => {
          if (coord === currentClass) {
            neverTouchedBefore = false;
          }
        });
        if (neverTouchedBefore) {
          playerClicked(currentClass, x, y, reciever, attacker);
          makeAiMove(reciever, attacker);
        }
      });
    }
  }
};

export { addAttackFuncForAi, findOutWhereClicked };
