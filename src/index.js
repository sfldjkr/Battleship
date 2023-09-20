import "./styling/main.css";
import "./styling/welcomeDialog.css";
import { gridFunc, finalDivs } from "./dialogFunc";
import { getRandomCoords } from "./randomCords";
import { fillGameGrids } from "./gameGrids";
import { Ship, gameBoard, Player, Ai } from "./classes";
import { addAttackFunc, addAttackFuncForAi } from "./attackFunc";
import { addCheckWinnerFunc } from "./checkWinner";
const dialog = document.querySelector(".dialog");

gridFunc();
dialog.addEventListener("close", function () {
  playGame(finalDivs);
});

let playGame = (shipCoords) => {
  let humanPlayer = new Player(shipCoords);
  let AiPlayer = new Ai(getRandomCoords());
  fillGameGrids(humanPlayer, AiPlayer);
  addAttackFuncForAi(AiPlayer, humanPlayer);
  addCheckWinnerFunc(humanPlayer, AiPlayer);
};
