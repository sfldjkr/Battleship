/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/attackFunc.js":
/*!***************************!*\
  !*** ./src/attackFunc.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addAttackFuncForAi: () => (/* binding */ addAttackFuncForAi),
/* harmony export */   findOutWhereClicked: () => (/* binding */ findOutWhereClicked)
/* harmony export */ });
/* harmony import */ var _autoAttack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./autoAttack */ "./src/autoAttack.js");

let findOutWhereClicked = (className, receivedBy) => {
  let finalAnswer = false;
  receivedBy.myBoard.shipOne.coord.forEach(coordinates => {
    if (className == `${coordinates}${receivedBy.name}`) {
      finalAnswer = true;
      receivedBy.myBoard.shipOne.hit();
      return;
    }
  });
  receivedBy.myBoard.shipTwo.coord.forEach(coordinates => {
    if (className == `${coordinates}${receivedBy.name}`) {
      finalAnswer = true;
      receivedBy.myBoard.shipTwo.hit();
      return;
    }
  });
  receivedBy.myBoard.shipThree.coord.forEach(coordinates => {
    if (className == `${coordinates}${receivedBy.name}`) {
      finalAnswer = true;
      receivedBy.myBoard.shipThree.hit();
      return;
    }
  });
  receivedBy.myBoard.shipFour.coord.forEach(coordinates => {
    if (className == `${coordinates}${receivedBy.name}`) {
      finalAnswer = true;
      receivedBy.myBoard.shipFour.hit();
      return;
    }
  });
  receivedBy.myBoard.shipFive.coord.forEach(coordinates => {
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
        missedCoord.forEach(coord => {
          if (coord === currentClass) {
            neverTouchedBefore = false;
          }
        });
        hitCoord.forEach(coord => {
          if (coord === currentClass) {
            neverTouchedBefore = false;
          }
        });
        if (neverTouchedBefore) {
          playerClicked(currentClass, x, y, reciever, attacker);
          (0,_autoAttack__WEBPACK_IMPORTED_MODULE_0__.makeAiMove)(reciever, attacker);
        }
      });
    }
  }
};


/***/ }),

/***/ "./src/autoAttack.js":
/*!***************************!*\
  !*** ./src/autoAttack.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   makeAiMove: () => (/* binding */ makeAiMove)
/* harmony export */ });
/* harmony import */ var _attackFunc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attackFunc */ "./src/attackFunc.js");

let getValidMoves = (attacker, receiver) => {
  let allMoves = [];
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      let notAlreadyClicked = true;
      let iteratingCoord = `Grid${x}${y}user`;
      receiver.myBoard.hitCoord.forEach(coordinate => {
        if (coordinate == iteratingCoord) {
          notAlreadyClicked = false;
        }
      });
      receiver.myBoard.missedCoord.forEach(coordinate => {
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
  let playerClickedShip = (0,_attackFunc__WEBPACK_IMPORTED_MODULE_0__.findOutWhereClicked)(`#${randomDivClassName}`, receiver);
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


/***/ }),

/***/ "./src/checkWinner.js":
/*!****************************!*\
  !*** ./src/checkWinner.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addCheckWinnerFunc: () => (/* binding */ addCheckWinnerFunc)
/* harmony export */ });
const gameDiv = document.querySelector(".gameMainDiv");
let checkIfAllShipsSunk = player => {
  return player.myBoard.isAllSink();
};
let showWinner = player => {
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


/***/ }),

/***/ "./src/classes.js":
/*!************************!*\
  !*** ./src/classes.js ***!
  \************************/
/***/ ((module) => {

class Ship {
  constructor(length) {
    this.length = length;
    this.hitCount = 0;
    this.sink = false;
    this.coord = [];
  }
  hit() {
    this.hitCount++;
  }
  isSunk() {
    if (this.length <= this.hitCount) {
      this.sink = true;
    }
    return this.sink;
  }
}
class gameBoard {
  constructor(coordinatesOne, coordinatesTwo, coordinatesThree, coordinatesFour, coordinatesFive) {
    this.allSunk = false;
    this.hitCoord = [];
    this.missedCoord = [];
    this.shipOne = new Ship(5);
    this.shipTwo = new Ship(4);
    this.shipThree = new Ship(3);
    this.shipFour = new Ship(2);
    this.shipFive = new Ship(1);
    this.shipOne.coord = coordinatesOne;
    this.shipTwo.coord = coordinatesTwo;
    this.shipThree.coord = coordinatesThree;
    this.shipFour.coord = coordinatesFour;
    this.shipFive.coord = coordinatesFive;
  }
  receieveAttack(coordList) {
    let hitX = coordList[0];
    let hitY = coordList[1];
    for (let i = 0; i < this.shipOne.coord.length; i++) {
      if (this.shipOne.coord[i][0] === hitX && this.shipOne.coord[i][1] === hitY) {
        this.shipOne.hit();
        this.hitCoord.push(coordList);
        return;
      }
    }
    for (let i = 0; i < this.shipTwo.coord.length; i++) {
      if (this.shipTwo.coord[i][0] === hitX && this.shipTwo.coord[i][1] === hitY) {
        this.shipTwo.hit();
        this.hitCoord.push(coordList);
        return;
      }
    }
    for (let i = 0; i < this.shipThree.coord.length; i++) {
      if (this.shipThree.coord[i][0] === hitX && this.shipThree.coord[i][1] === hitY) {
        this.shipThree.hit();
        this.hitCoord.push(coordList);
      }
    }
    for (let i = 0; i < this.shipFour.coord.length; i++) {
      if (this.shipFour.coord[i][0] === hitX && this.shipFour.coord[i][1] === hitY) {
        this.shipFour.hit();
        this.hitCoord.push(coordList);
      }
    }
    for (let i = 0; i < this.shipFive.coord.length; i++) {
      if (this.shipFive.coord[i][0] === hitX && this.shipFive.coord[i][1] === hitY) {
        this.shipFive.hit();
        this.hitCoord.push(coordList);
      }
    }
  }
  isAllSink() {
    if (this.shipOne.isSunk() && this.shipTwo.isSunk() && this.shipThree.isSunk() && this.shipFour.isSunk() && this.shipFive.isSunk()) {
      this.allSunk = true;
    }
    return this.allSunk;
  }
}
class Player {
  constructor(coordinates) {
    this.name = "user";
    this.turn = true;
    this.myBoard = new gameBoard(coordinates[0], coordinates[1], coordinates[2], coordinates[3], coordinates[4]);
  }
}
class Ai {
  constructor(coordinates) {
    this.name = "ai";
    this.turn = false;
    this.myBoard = new gameBoard(coordinates[0], coordinates[1], coordinates[2], coordinates[3], coordinates[4]);
  }
}
module.exports = {
  Ship,
  gameBoard,
  Player,
  Ai
};

/***/ }),

/***/ "./src/dialogFunc.js":
/*!***************************!*\
  !*** ./src/dialogFunc.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   finalDivs: () => (/* binding */ finalDivs),
/* harmony export */   gridFunc: () => (/* binding */ gridFunc)
/* harmony export */ });
const dialog = document.querySelector(".dialog");
const dialogGrid = document.querySelector(".choosingShipsGrid");
const changeDirectionBtn = document.querySelector(".rotateBtn");
let directionBtn = "x";
let finalDivs = [];
let temporaryPlace = [];
let addDialogGrids = () => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let div = document.createElement("div");
      div.classList.add("eachGrid");
      div.id = `Grid${j}${i}`;
      div.dataset.x = j;
      div.dataset.y = i;
      dialogGrid.appendChild(div);
    }
  }
};
let highlightOtherDiv = (grid, boxCount, direction) => {
  temporaryPlace = [];
  let iteration = boxCount;
  let adjacentCoordinates;
  for (let i = 0; i < boxCount; i++) {
    if (direction === "x") {
      let nextX = Number(grid.dataset.x) + i;
      if (nextX < 10) {
        adjacentCoordinates = `#Grid${nextX}${grid.dataset.y}`;
        temporaryPlace.push(adjacentCoordinates);
        let adjacentDiv = document.querySelector(`${adjacentCoordinates}`);
        adjacentDiv.classList.add("hoverDiv");
      } else {
        temporaryPlace = [];
      }
    } else if (direction === "y") {
      let nextY = Number(grid.dataset.y) + i;
      if (nextY < 10) {
        adjacentCoordinates = `#Grid${grid.dataset.x}${nextY}`;
        temporaryPlace.push(adjacentCoordinates);
        let adjacentDiv = document.querySelector(`${adjacentCoordinates}`);
        adjacentDiv.classList.add("hoverDiv");
      } else {
        temporaryPlace = [];
      }
    }
  }
};
let nonHighlightOtherDiv = (grid, boxCount, direction) => {
  temporaryPlace = [];
  let iteration = boxCount;
  let adjacentCoordinates;
  for (let i = 0; i < boxCount; i++) {
    if (direction === "x") {
      let nextX = Number(grid.dataset.x) + i;
      if (nextX < 10) {
        adjacentCoordinates = `#Grid${nextX}${grid.dataset.y}`;
        let adjacentDiv = document.querySelector(`${adjacentCoordinates}`);
        adjacentDiv.classList.remove("hoverDiv");
      }
    } else if (direction === "y") {
      let nextY = Number(grid.dataset.y) + i;
      if (nextY < 10) {
        adjacentCoordinates = `#Grid${grid.dataset.x}${nextY}`;
        let adjacentDiv = document.querySelector(`${adjacentCoordinates}`);
        adjacentDiv.classList.remove("hoverDiv");
      }
    }
  }
  temporaryPlace = [];
};
let addEachGridFunc = () => {
  let boxCount = 5;
  let highlightDiv = Hovergrid => {
    Hovergrid.classList.add("hoverDiv");
    highlightOtherDiv(Hovergrid, boxCount, directionBtn);
  };
  let notHighlightDiv = Hovergrid => {
    Hovergrid.classList.remove("hoverDiv");
    nonHighlightOtherDiv(Hovergrid, boxCount, directionBtn);
  };
  let addGreyInDiv = list => {
    list.forEach(coord => {
      let div = document.querySelector(`${coord}`);
      div.classList.add("greyedOut");
    });
  };
  let checkIfValidCoords = () => {
    if (finalDivs.length === 0) return true;
    for (let i = 0; i < finalDivs.length; i++) {
      for (let j = 0; j < finalDivs[i].length; j++) {
        for (let x = 0; x < temporaryPlace.length; x++) {
          if (temporaryPlace[x] === finalDivs[i][j]) {
            return false;
          }
        }
      }
    }
    return true;
  };
  let confirmCoordinates = ClickedGrid => {
    if (temporaryPlace.length) {
      let isValid = checkIfValidCoords(temporaryPlace);
      if (isValid) {
        finalDivs.push(temporaryPlace);
        boxCount--;
        addGreyInDiv(temporaryPlace);
        if (finalDivs.length == 5) {
          let dialogDiv = document.querySelector(".dialogDiv");
          dialogDiv.innerHTML = "";
          dialog.close();
        }
      }
      temporaryPlace = [];
    }
  };
  let allDialogGrids = document.querySelectorAll(".eachGrid");
  allDialogGrids.forEach(grid => {
    grid.addEventListener("mouseover", function () {
      highlightDiv(grid);
    });
    grid.addEventListener("mouseout", function () {
      notHighlightDiv(grid);
    });
    grid.addEventListener("click", function () {
      confirmCoordinates(grid);
    });
  });
};
let addDirectionBtnFunc = () => {
  changeDirectionBtn.addEventListener("click", function () {
    if (directionBtn === "x") {
      directionBtn = "y";
    } else {
      directionBtn = "x";
    }
  });
};
let gridFunc = () => {
  dialog.showModal();
  addDialogGrids();
  addEachGridFunc();
  addDirectionBtnFunc();
};


/***/ }),

/***/ "./src/gameGrids.js":
/*!**************************!*\
  !*** ./src/gameGrids.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fillGameGrids: () => (/* binding */ fillGameGrids)
/* harmony export */ });
let fillGameGrids = (playerOneInstance, AiPlayerInstance) => {
  let mainGameDiv = document.querySelector(".gameMainDiv");
  let hOne = document.createElement("h1");
  hOne.innerText = "BattleField";
  let gridContainer = document.createElement("div");
  gridContainer.classList.add("gridContainer");
  hOne.classList.add("mainHeading");
  let userDiv = document.createElement("div");
  userDiv.classList.add("userGridDiv");
  let aiDiv = document.createElement("div");
  aiDiv.classList.add("aiGridDiv");
  mainGameDiv.appendChild(hOne);
  gridContainer.appendChild(userDiv);
  gridContainer.appendChild(aiDiv);
  mainGameDiv.appendChild(gridContainer);
  addGrids("userGridDiv", "user");
  addGrids("aiGridDiv", "ai");
  addGreyInUserDivs(playerOneInstance, "user");
  // remove here to remove ai blue divs
  // addGreyInUserDivs(AiPlayerInstance, "ai");
};

let addGreyInUserDivs = (player, humanOrAi) => {
  player.myBoard.shipOne.coord.forEach(gridClass => {
    let currentDiv = document.querySelector(`${gridClass}${humanOrAi}`);
    currentDiv.classList.add("userGreyedDiv");
  });
  player.myBoard.shipTwo.coord.forEach(gridClass => {
    let currentDiv = document.querySelector(`${gridClass}${humanOrAi}`);
    currentDiv.classList.add("userGreyedDiv");
  });
  player.myBoard.shipThree.coord.forEach(gridClass => {
    let currentDiv = document.querySelector(`${gridClass}${humanOrAi}`);
    currentDiv.classList.add("userGreyedDiv");
  });
  player.myBoard.shipFour.coord.forEach(gridClass => {
    let currentDiv = document.querySelector(`${gridClass}${humanOrAi}`);
    currentDiv.classList.add("userGreyedDiv");
  });
  player.myBoard.shipFive.coord.forEach(gridClass => {
    let currentDiv = document.querySelector(`${gridClass}${humanOrAi}`);
    currentDiv.classList.add("userGreyedDiv");
  });
};
let addGrids = (className, humanOrAi) => {
  let mainDiv = document.querySelector(`.${className}`);
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let div = document.createElement("div");
      div.classList.add("userGrid");
      div.id = `Grid${j}${i}${humanOrAi}`;
      div.dataset.x = j;
      div.dataset.y = i;
      mainDiv.appendChild(div);
    }
  }
};


/***/ }),

/***/ "./src/randomCords.js":
/*!****************************!*\
  !*** ./src/randomCords.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRandomCoords: () => (/* binding */ getRandomCoords)
/* harmony export */ });
let getRandomCoords = () => {
  let finalList = [];
  let i = 5;
  outerLoop: while (i > 0) {
    let temporaryList = [];
    let allCoordinates = [];
    finalList.forEach(sublist => {
      sublist.forEach(item => {
        allCoordinates.push(item);
      });
    });
    let randomFirstCoord = Math.floor(Math.random() * 10);
    let startCoords = `#Grid${randomFirstCoord}${randomFirstCoord}`;
    if (allCoordinates.includes(startCoords)) {
      continue outerLoop;
    }
    let XorY = Math.floor(Math.random() * 2);
    temporaryList.push(startCoords);
    for (let j = 1; j < i; j++) {
      let nextCoords;
      let finalListLen = finalList.length;
      if (XorY === 0) {
        let nextX = randomFirstCoord + j;
        if (nextX >= 10) {
          continue outerLoop;
        }
        nextCoords = `#Grid${nextX}${randomFirstCoord}`;
      } else if (XorY === 1) {
        let nextY = randomFirstCoord + j;
        if (nextY >= 10) {
          continue outerLoop;
        }
        nextCoords = `#Grid${randomFirstCoord}${nextY}`;
      }
      for (let t = 9; t < allCoordinates.length; t++) {
        if (nextCoords == allCoordinates[t]) {
          continue outerLoop;
        }
      }
      temporaryList.push(nextCoords);
    }
    finalList.push(temporaryList);
    i--;
  }
  return finalList;
};


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styling/main.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styling/main.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.mainHeading {
  letter-spacing: 4px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 60px;
  font-family: "Press Start 2P", cursive;
}

.gridContainer {
  display: grid;
  width: 80%;
  margin: auto;
  gap: 50px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.userGridDiv,
.aiGridDiv {
  display: grid;
  gap: 1px;
  align-content: stretch;
  grid-template-columns: repeat(10, 30px);
  grid-template-rows: repeat(10, 30px);
}

.userGrid {
  border: 1px solid grey;
}

.aiGrid {
  border: 1px solid red;
}

.userGreyedDiv {
  background-color: aqua;
}

.wrongGuessDiv {
  background-color: red;
}

.rightGuessDiv {
  background-color: grey;
}

.aiWonMessage {
  color: red;
}

.humanWonMessage {
  color: green;
}

.showWinnerDiv {
  display: grid;
  margin-top: 20vh;
  text-align: center;
  justify-content: center;
  justify-items: center;
}

.aiWonMessage,
.humanWonMessage {
  font-weight: bolder;
  font-family: "Work Sans", "Roboto", sans-serif;
}
`, "",{"version":3,"sources":["webpack://./src/styling/main.css"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,kBAAkB;EAClB,gBAAgB;EAChB,mBAAmB;EACnB,sCAAsC;AACxC;;AAEA;EACE,aAAa;EACb,UAAU;EACV,YAAY;EACZ,SAAS;EACT,8BAA8B;EAC9B,mBAAmB;EACnB,kBAAkB;EAClB,2DAA2D;AAC7D;;AAEA;;EAEE,aAAa;EACb,QAAQ;EACR,sBAAsB;EACtB,uCAAuC;EACvC,oCAAoC;AACtC;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,aAAa;EACb,gBAAgB;EAChB,kBAAkB;EAClB,uBAAuB;EACvB,qBAAqB;AACvB;;AAEA;;EAEE,mBAAmB;EACnB,8CAA8C;AAChD","sourcesContent":[".mainHeading {\n  letter-spacing: 4px;\n  text-align: center;\n  margin-top: 20px;\n  margin-bottom: 60px;\n  font-family: \"Press Start 2P\", cursive;\n}\n\n.gridContainer {\n  display: grid;\n  width: 80%;\n  margin: auto;\n  gap: 50px;\n  justify-content: space-between;\n  align-items: center;\n  text-align: center;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n}\n\n.userGridDiv,\n.aiGridDiv {\n  display: grid;\n  gap: 1px;\n  align-content: stretch;\n  grid-template-columns: repeat(10, 30px);\n  grid-template-rows: repeat(10, 30px);\n}\n\n.userGrid {\n  border: 1px solid grey;\n}\n\n.aiGrid {\n  border: 1px solid red;\n}\n\n.userGreyedDiv {\n  background-color: aqua;\n}\n\n.wrongGuessDiv {\n  background-color: red;\n}\n\n.rightGuessDiv {\n  background-color: grey;\n}\n\n.aiWonMessage {\n  color: red;\n}\n\n.humanWonMessage {\n  color: green;\n}\n\n.showWinnerDiv {\n  display: grid;\n  margin-top: 20vh;\n  text-align: center;\n  justify-content: center;\n  justify-items: center;\n}\n\n.aiWonMessage,\n.humanWonMessage {\n  font-weight: bolder;\n  font-family: \"Work Sans\", \"Roboto\", sans-serif;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styling/welcomeDialog.css":
/*!*****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styling/welcomeDialog.css ***!
  \*****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `body {
  font-family: "Work Sans", "Roboto", sans-serif;
}

.dialog {
  display: grid;
  gap: 2vh;
  justify-items: center;
  border: none;
  padding: 20px 30px;
  border-radius: 10px 10px 10px 10px;
}

.rotateBtn {
  justify-self: center;
  font-weight: bold;
  margin-bottom: 30px;
}

.choosingShipsGrid {
  display: grid;
  gap: 1px;
  grid-template-columns: repeat(10, 25px);
  grid-template-rows: repeat(10, 25px);
}

.eachGrid {
  border: 1px solid grey;
}

.hoverDiv {
  background-color: aqua;
}

.greyedOut {
  background-color: grey;
}
`, "",{"version":3,"sources":["webpack://./src/styling/welcomeDialog.css"],"names":[],"mappings":"AAAA;EACE,8CAA8C;AAChD;;AAEA;EACE,aAAa;EACb,QAAQ;EACR,qBAAqB;EACrB,YAAY;EACZ,kBAAkB;EAClB,kCAAkC;AACpC;;AAEA;EACE,oBAAoB;EACpB,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,QAAQ;EACR,uCAAuC;EACvC,oCAAoC;AACtC;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,sBAAsB;AACxB","sourcesContent":["body {\n  font-family: \"Work Sans\", \"Roboto\", sans-serif;\n}\n\n.dialog {\n  display: grid;\n  gap: 2vh;\n  justify-items: center;\n  border: none;\n  padding: 20px 30px;\n  border-radius: 10px 10px 10px 10px;\n}\n\n.rotateBtn {\n  justify-self: center;\n  font-weight: bold;\n  margin-bottom: 30px;\n}\n\n.choosingShipsGrid {\n  display: grid;\n  gap: 1px;\n  grid-template-columns: repeat(10, 25px);\n  grid-template-rows: repeat(10, 25px);\n}\n\n.eachGrid {\n  border: 1px solid grey;\n}\n\n.hoverDiv {\n  background-color: aqua;\n}\n\n.greyedOut {\n  background-color: grey;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styling/main.css":
/*!******************************!*\
  !*** ./src/styling/main.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./src/styling/main.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styling/welcomeDialog.css":
/*!***************************************!*\
  !*** ./src/styling/welcomeDialog.css ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_welcomeDialog_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./welcomeDialog.css */ "./node_modules/css-loader/dist/cjs.js!./src/styling/welcomeDialog.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_welcomeDialog_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_welcomeDialog_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_welcomeDialog_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_welcomeDialog_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styling_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styling/main.css */ "./src/styling/main.css");
/* harmony import */ var _styling_welcomeDialog_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styling/welcomeDialog.css */ "./src/styling/welcomeDialog.css");
/* harmony import */ var _dialogFunc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dialogFunc */ "./src/dialogFunc.js");
/* harmony import */ var _randomCords__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./randomCords */ "./src/randomCords.js");
/* harmony import */ var _gameGrids__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gameGrids */ "./src/gameGrids.js");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./classes */ "./src/classes.js");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_classes__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _attackFunc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./attackFunc */ "./src/attackFunc.js");
/* harmony import */ var _checkWinner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./checkWinner */ "./src/checkWinner.js");








const dialog = document.querySelector(".dialog");
(0,_dialogFunc__WEBPACK_IMPORTED_MODULE_2__.gridFunc)();
dialog.addEventListener("close", function () {
  playGame(_dialogFunc__WEBPACK_IMPORTED_MODULE_2__.finalDivs);
});
let playGame = shipCoords => {
  let humanPlayer = new _classes__WEBPACK_IMPORTED_MODULE_5__.Player(shipCoords);
  let AiPlayer = new _classes__WEBPACK_IMPORTED_MODULE_5__.Ai((0,_randomCords__WEBPACK_IMPORTED_MODULE_3__.getRandomCoords)());
  (0,_gameGrids__WEBPACK_IMPORTED_MODULE_4__.fillGameGrids)(humanPlayer, AiPlayer);
  (0,_attackFunc__WEBPACK_IMPORTED_MODULE_6__.addAttackFuncForAi)(AiPlayer, humanPlayer);
  (0,_checkWinner__WEBPACK_IMPORTED_MODULE_7__.addCheckWinnerFunc)(humanPlayer, AiPlayer);
};
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0E0QjtBQUNTO0FBQ2M7QUFDSDtBQUNKO0FBQ1k7QUFDUztBQUNkO0FBQ25ELE1BQU10RCxNQUFNLEdBQUd2RSxRQUFRLENBQUNDLGFBQWEsQ0FBQyxTQUFTLENBQUM7QUFFaEQyRyxxREFBUSxDQUFDLENBQUM7QUFDVnJDLE1BQU0sQ0FBQzFELGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFZO0VBQzNDOEgsUUFBUSxDQUFDaEUsa0RBQVMsQ0FBQztBQUNyQixDQUFDLENBQUM7QUFFRixJQUFJZ0UsUUFBUSxHQUFJQyxVQUFVLElBQUs7RUFDN0IsSUFBSS9GLFdBQVcsR0FBRyxJQUFJcUIsNENBQU0sQ0FBQzBFLFVBQVUsQ0FBQztFQUN4QyxJQUFJQyxRQUFRLEdBQUcsSUFBSXpFLHdDQUFFLENBQUN3RCw2REFBZSxDQUFDLENBQUMsQ0FBQztFQUN4Q2QseURBQWEsQ0FBQ2pFLFdBQVcsRUFBRWdHLFFBQVEsQ0FBQztFQUNwQ3JJLCtEQUFrQixDQUFDcUksUUFBUSxFQUFFaEcsV0FBVyxDQUFDO0VBQ3pDRCxnRUFBa0IsQ0FBQ0MsV0FBVyxFQUFFZ0csUUFBUSxDQUFDO0FBQzNDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXR0YWNrRnVuYy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2F1dG9BdHRhY2suanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jaGVja1dpbm5lci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NsYXNzZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kaWFsb2dGdW5jLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUdyaWRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcmFuZG9tQ29yZHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsaW5nL21haW4uY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGluZy93ZWxjb21lRGlhbG9nLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsaW5nL21haW4uY3NzPzEwMWMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsaW5nL3dlbGNvbWVEaWFsb2cuY3NzPzRmNWQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG1ha2VBaU1vdmUgfSBmcm9tIFwiLi9hdXRvQXR0YWNrXCI7XG5cbmxldCBmaW5kT3V0V2hlcmVDbGlja2VkID0gKGNsYXNzTmFtZSwgcmVjZWl2ZWRCeSkgPT4ge1xuICBsZXQgZmluYWxBbnN3ZXIgPSBmYWxzZTtcbiAgcmVjZWl2ZWRCeS5teUJvYXJkLnNoaXBPbmUuY29vcmQuZm9yRWFjaCgoY29vcmRpbmF0ZXMpID0+IHtcbiAgICBpZiAoY2xhc3NOYW1lID09IGAke2Nvb3JkaW5hdGVzfSR7cmVjZWl2ZWRCeS5uYW1lfWApIHtcbiAgICAgIGZpbmFsQW5zd2VyID0gdHJ1ZTtcbiAgICAgIHJlY2VpdmVkQnkubXlCb2FyZC5zaGlwT25lLmhpdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSk7XG4gIHJlY2VpdmVkQnkubXlCb2FyZC5zaGlwVHdvLmNvb3JkLmZvckVhY2goKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgaWYgKGNsYXNzTmFtZSA9PSBgJHtjb29yZGluYXRlc30ke3JlY2VpdmVkQnkubmFtZX1gKSB7XG4gICAgICBmaW5hbEFuc3dlciA9IHRydWU7XG4gICAgICByZWNlaXZlZEJ5Lm15Qm9hcmQuc2hpcFR3by5oaXQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH0pO1xuICByZWNlaXZlZEJ5Lm15Qm9hcmQuc2hpcFRocmVlLmNvb3JkLmZvckVhY2goKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgaWYgKGNsYXNzTmFtZSA9PSBgJHtjb29yZGluYXRlc30ke3JlY2VpdmVkQnkubmFtZX1gKSB7XG4gICAgICBmaW5hbEFuc3dlciA9IHRydWU7XG4gICAgICByZWNlaXZlZEJ5Lm15Qm9hcmQuc2hpcFRocmVlLmhpdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSk7XG4gIHJlY2VpdmVkQnkubXlCb2FyZC5zaGlwRm91ci5jb29yZC5mb3JFYWNoKChjb29yZGluYXRlcykgPT4ge1xuICAgIGlmIChjbGFzc05hbWUgPT0gYCR7Y29vcmRpbmF0ZXN9JHtyZWNlaXZlZEJ5Lm5hbWV9YCkge1xuICAgICAgZmluYWxBbnN3ZXIgPSB0cnVlO1xuICAgICAgcmVjZWl2ZWRCeS5teUJvYXJkLnNoaXBGb3VyLmhpdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSk7XG4gIHJlY2VpdmVkQnkubXlCb2FyZC5zaGlwRml2ZS5jb29yZC5mb3JFYWNoKChjb29yZGluYXRlcykgPT4ge1xuICAgIGlmIChjbGFzc05hbWUgPT0gYCR7Y29vcmRpbmF0ZXN9JHtyZWNlaXZlZEJ5Lm5hbWV9YCkge1xuICAgICAgZmluYWxBbnN3ZXIgPSB0cnVlO1xuICAgICAgcmVjZWl2ZWRCeS5teUJvYXJkLnNoaXBGaXZlLmhpdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGZpbmFsQW5zd2VyO1xufTtcblxubGV0IHBsYXllckNsaWNrZWQgPSAoRGl2Q2xhc3NOYW1lLCB4LCB5LCByZWNlaXZlZEJ5LCBhdHRhY2tlZEJ5KSA9PiB7XG4gIGxldCBwbGF5ZXJDbGlja2VkU2hpcCA9IGZpbmRPdXRXaGVyZUNsaWNrZWQoRGl2Q2xhc3NOYW1lLCByZWNlaXZlZEJ5KTtcbiAgbGV0IGNsaWNrZWREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke0RpdkNsYXNzTmFtZX1gKTtcbiAgY2xpY2tlZERpdi5jbGFzc0xpc3QucmVtb3ZlKFwiLnVzZXJHcmV5ZWREaXZcIik7XG4gIGlmIChwbGF5ZXJDbGlja2VkU2hpcCkge1xuICAgIGNsaWNrZWREaXYuY2xhc3NMaXN0LmFkZChcIndyb25nR3Vlc3NEaXZcIik7XG4gICAgcmVjZWl2ZWRCeS5teUJvYXJkLmhpdENvb3JkLnB1c2goYCR7RGl2Q2xhc3NOYW1lfWApO1xuICB9IGVsc2Uge1xuICAgIGNsaWNrZWREaXYuY2xhc3NMaXN0LmFkZChcInJpZ2h0R3Vlc3NEaXZcIik7XG4gICAgcmVjZWl2ZWRCeS5teUJvYXJkLm1pc3NlZENvb3JkLnB1c2goYCR7RGl2Q2xhc3NOYW1lfWApO1xuICB9XG59O1xuXG5sZXQgYWRkQXR0YWNrRnVuY0ZvckFpID0gKHJlY2lldmVyLCBhdHRhY2tlcikgPT4ge1xuICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwOyB4KyspIHtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDEwOyB5KyspIHtcbiAgICAgIGxldCBjdXJyZW50Q2xhc3MgPSBgI0dyaWQke3h9JHt5fSR7cmVjaWV2ZXIubmFtZX1gO1xuICAgICAgbGV0IGN1cnJlbnREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGN1cnJlbnRDbGFzcyk7XG4gICAgICBjdXJyZW50RGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBtaXNzZWRDb29yZCA9IHJlY2lldmVyLm15Qm9hcmQubWlzc2VkQ29vcmQ7XG4gICAgICAgIGxldCBoaXRDb29yZCA9IHJlY2lldmVyLm15Qm9hcmQuaGl0Q29vcmQ7XG4gICAgICAgIGxldCBuZXZlclRvdWNoZWRCZWZvcmUgPSB0cnVlO1xuICAgICAgICBtaXNzZWRDb29yZC5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgICAgIGlmIChjb29yZCA9PT0gY3VycmVudENsYXNzKSB7XG4gICAgICAgICAgICBuZXZlclRvdWNoZWRCZWZvcmUgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBoaXRDb29yZC5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgICAgIGlmIChjb29yZCA9PT0gY3VycmVudENsYXNzKSB7XG4gICAgICAgICAgICBuZXZlclRvdWNoZWRCZWZvcmUgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobmV2ZXJUb3VjaGVkQmVmb3JlKSB7XG4gICAgICAgICAgcGxheWVyQ2xpY2tlZChjdXJyZW50Q2xhc3MsIHgsIHksIHJlY2lldmVyLCBhdHRhY2tlcik7XG4gICAgICAgICAgbWFrZUFpTW92ZShyZWNpZXZlciwgYXR0YWNrZXIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCB7IGFkZEF0dGFja0Z1bmNGb3JBaSwgZmluZE91dFdoZXJlQ2xpY2tlZCB9O1xuIiwiaW1wb3J0IHsgZmluZE91dFdoZXJlQ2xpY2tlZCB9IGZyb20gXCIuL2F0dGFja0Z1bmNcIjtcbmxldCBnZXRWYWxpZE1vdmVzID0gKGF0dGFja2VyLCByZWNlaXZlcikgPT4ge1xuICBsZXQgYWxsTW92ZXMgPSBbXTtcbiAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCsrKSB7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCAxMDsgeSsrKSB7XG4gICAgICBsZXQgbm90QWxyZWFkeUNsaWNrZWQgPSB0cnVlO1xuICAgICAgbGV0IGl0ZXJhdGluZ0Nvb3JkID0gYEdyaWQke3h9JHt5fXVzZXJgO1xuICAgICAgcmVjZWl2ZXIubXlCb2FyZC5oaXRDb29yZC5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XG4gICAgICAgIGlmIChjb29yZGluYXRlID09IGl0ZXJhdGluZ0Nvb3JkKSB7XG4gICAgICAgICAgbm90QWxyZWFkeUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZWNlaXZlci5teUJvYXJkLm1pc3NlZENvb3JkLmZvckVhY2goKGNvb3JkaW5hdGUpID0+IHtcbiAgICAgICAgaWYgKGNvb3JkaW5hdGUgPT0gaXRlcmF0aW5nQ29vcmQpIHtcbiAgICAgICAgICBub3RBbHJlYWR5Q2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChub3RBbHJlYWR5Q2xpY2tlZCkge1xuICAgICAgICBhbGxNb3Zlcy5wdXNoKGl0ZXJhdGluZ0Nvb3JkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFsbE1vdmVzO1xufTtcblxubGV0IG1ha2VBaU1vdmUgPSAoYXR0YWNrZXIsIHJlY2VpdmVyKSA9PiB7XG4gIGxldCBhbGxNb3ZlcyA9IGdldFZhbGlkTW92ZXMoYXR0YWNrZXIsIHJlY2VpdmVyKTtcbiAgbGV0IGFsbE1vdmVzTGVuID0gYWxsTW92ZXMubGVuZ3RoO1xuICBsZXQgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhbGxNb3Zlc0xlbik7XG4gIGxldCByYW5kb21EaXZDbGFzc05hbWUgPSBhbGxNb3Zlc1tyYW5kb21JbmRleF07XG4gIGxldCBwbGF5ZXJDbGlja2VkU2hpcCA9IGZpbmRPdXRXaGVyZUNsaWNrZWQoXG4gICAgYCMke3JhbmRvbURpdkNsYXNzTmFtZX1gLFxuICAgIHJlY2VpdmVyLFxuICApO1xuICBsZXQgY2xpY2tlZERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3JhbmRvbURpdkNsYXNzTmFtZX1gKTtcbiAgY2xpY2tlZERpdi5jbGFzc0xpc3QucmVtb3ZlKFwiLnVzZXJHcmV5ZWREaXZcIik7XG4gIGlmIChwbGF5ZXJDbGlja2VkU2hpcCkge1xuICAgIGNsaWNrZWREaXYuY2xhc3NMaXN0LmFkZChcIndyb25nR3Vlc3NEaXZcIik7XG4gICAgcmVjZWl2ZXIubXlCb2FyZC5oaXRDb29yZC5wdXNoKGAke3JhbmRvbURpdkNsYXNzTmFtZX1gKTtcbiAgfSBlbHNlIHtcbiAgICBjbGlja2VkRGl2LmNsYXNzTGlzdC5hZGQoKTtcbiAgICBjbGlja2VkRGl2LmNsYXNzTGlzdC5hZGQoXCJyaWdodEd1ZXNzRGl2XCIpO1xuICAgIHJlY2VpdmVyLm15Qm9hcmQubWlzc2VkQ29vcmQucHVzaChgJHtyYW5kb21EaXZDbGFzc05hbWV9YCk7XG4gIH1cbn07XG5cbmV4cG9ydCB7IG1ha2VBaU1vdmUgfTtcbiIsImNvbnN0IGdhbWVEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVNYWluRGl2XCIpO1xuXG5sZXQgY2hlY2tJZkFsbFNoaXBzU3VuayA9IChwbGF5ZXIpID0+IHtcbiAgcmV0dXJuIHBsYXllci5teUJvYXJkLmlzQWxsU2luaygpO1xufTtcblxubGV0IHNob3dXaW5uZXIgPSAocGxheWVyKSA9PiB7XG4gIGxldCB3aW5uaW5nU2hvd2luZ0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hvd1dpbm5lckRpdlwiKTtcbiAgbGV0IHdpbm5pbmdOYW1lID0gcGxheWVyLm5hbWUudG9VcHBlckNhc2UoKTtcbiAgbGV0IFdpbm5pbmdUZXh0ID0gXCJcIjtcbiAgZ2FtZURpdi5pbm5lckhUTUwgPSBcIlwiO1xuICBsZXQgbmV3SW1nID0gbmV3IEltYWdlKCk7XG4gIGxldCB3aW5uaW5nSG9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgaWYgKHBsYXllci5uYW1lID09PSBcImFpXCIpIHtcbiAgICBXaW5uaW5nVGV4dCA9IGBZb3UndmUgQmVlbiBEZWZlYXRlZCBCeSBBSWA7XG4gICAgd2lubmluZ0hvbmUuY2xhc3NMaXN0LmFkZChcImFpV29uTWVzc2FnZVwiKTtcblxuICAgIG5ld0ltZy5zcmMgPSBgaHR0cHM6Ly9tZWRpYS50ZW5vci5jb20vUjkxQ20wX0lDSlVBQUFBZC91bHRyb24tYWdlLW9mLXVsdHJvbi5naWZgO1xuICB9IGVsc2UgaWYgKHBsYXllci5uYW1lID09IFwidXNlclwiKSB7XG4gICAgV2lubmluZ1RleHQgPSBgQ29uZ3JhdHVsYXRpb24hISBZb3UndmUgRGVmZWF0ZWQgVGhlIEFpYDtcblxuICAgIG5ld0ltZy5zcmMgPSBgaHR0cHM6Ly9tZWRpYS50ZW5vci5jb20vQUNZNWNLTDZPWTRBQUFBTS9jcmF6eS1kYW5jZS1kYW5jZS5naWZgO1xuICAgIHdpbm5pbmdIb25lLmNsYXNzTGlzdC5hZGQoXCJodW1hbldvbk1lc3NhZ2VcIik7XG4gIH1cbiAgd2lubmluZ1Nob3dpbmdEaXYuYXBwZW5kQ2hpbGQobmV3SW1nKTtcbiAgd2lubmluZ0hvbmUuaW5uZXJIVE1MID0gV2lubmluZ1RleHQ7XG4gIHdpbm5pbmdTaG93aW5nRGl2LmFwcGVuZENoaWxkKHdpbm5pbmdIb25lKTtcbn07XG5cbmxldCBhZGRDaGVja1dpbm5lckZ1bmMgPSAoaHVtYW5QbGF5ZXIsIGFpUGxheWVyKSA9PiB7XG4gIGdhbWVEaXYuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYWxsSHVtYW5TaGlwc1N1bmsgPSBjaGVja0lmQWxsU2hpcHNTdW5rKGh1bWFuUGxheWVyKTtcbiAgICBsZXQgYWxsQWlTaGlwc1N1bmsgPSBjaGVja0lmQWxsU2hpcHNTdW5rKGFpUGxheWVyKTtcbiAgICBpZiAoYWxsSHVtYW5TaGlwc1N1bmspIHtcbiAgICAgIHNob3dXaW5uZXIoYWlQbGF5ZXIpO1xuICAgIH0gZWxzZSBpZiAoYWxsQWlTaGlwc1N1bmspIHtcbiAgICAgIHNob3dXaW5uZXIoaHVtYW5QbGF5ZXIpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgeyBhZGRDaGVja1dpbm5lckZ1bmMgfTtcbiIsImNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLmhpdENvdW50ID0gMDtcbiAgICB0aGlzLnNpbmsgPSBmYWxzZTtcbiAgICB0aGlzLmNvb3JkID0gW107XG4gIH1cblxuICBoaXQoKSB7XG4gICAgdGhpcy5oaXRDb3VudCsrO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIGlmICh0aGlzLmxlbmd0aCA8PSB0aGlzLmhpdENvdW50KSB7XG4gICAgICB0aGlzLnNpbmsgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zaW5rO1xuICB9XG59XG5cbmNsYXNzIGdhbWVCb2FyZCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGNvb3JkaW5hdGVzT25lLFxuICAgIGNvb3JkaW5hdGVzVHdvLFxuICAgIGNvb3JkaW5hdGVzVGhyZWUsXG4gICAgY29vcmRpbmF0ZXNGb3VyLFxuICAgIGNvb3JkaW5hdGVzRml2ZSxcbiAgKSB7XG4gICAgdGhpcy5hbGxTdW5rID0gZmFsc2U7XG4gICAgdGhpcy5oaXRDb29yZCA9IFtdO1xuICAgIHRoaXMubWlzc2VkQ29vcmQgPSBbXTtcbiAgICB0aGlzLnNoaXBPbmUgPSBuZXcgU2hpcCg1KTtcbiAgICB0aGlzLnNoaXBUd28gPSBuZXcgU2hpcCg0KTtcbiAgICB0aGlzLnNoaXBUaHJlZSA9IG5ldyBTaGlwKDMpO1xuICAgIHRoaXMuc2hpcEZvdXIgPSBuZXcgU2hpcCgyKTtcbiAgICB0aGlzLnNoaXBGaXZlID0gbmV3IFNoaXAoMSk7XG4gICAgdGhpcy5zaGlwT25lLmNvb3JkID0gY29vcmRpbmF0ZXNPbmU7XG4gICAgdGhpcy5zaGlwVHdvLmNvb3JkID0gY29vcmRpbmF0ZXNUd287XG4gICAgdGhpcy5zaGlwVGhyZWUuY29vcmQgPSBjb29yZGluYXRlc1RocmVlO1xuICAgIHRoaXMuc2hpcEZvdXIuY29vcmQgPSBjb29yZGluYXRlc0ZvdXI7XG4gICAgdGhpcy5zaGlwRml2ZS5jb29yZCA9IGNvb3JkaW5hdGVzRml2ZTtcbiAgfVxuICByZWNlaWV2ZUF0dGFjayhjb29yZExpc3QpIHtcbiAgICBsZXQgaGl0WCA9IGNvb3JkTGlzdFswXTtcbiAgICBsZXQgaGl0WSA9IGNvb3JkTGlzdFsxXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaGlwT25lLmNvb3JkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuc2hpcE9uZS5jb29yZFtpXVswXSA9PT0gaGl0WCAmJlxuICAgICAgICB0aGlzLnNoaXBPbmUuY29vcmRbaV1bMV0gPT09IGhpdFlcbiAgICAgICkge1xuICAgICAgICB0aGlzLnNoaXBPbmUuaGl0KCk7XG4gICAgICAgIHRoaXMuaGl0Q29vcmQucHVzaChjb29yZExpc3QpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNoaXBUd28uY29vcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5zaGlwVHdvLmNvb3JkW2ldWzBdID09PSBoaXRYICYmXG4gICAgICAgIHRoaXMuc2hpcFR3by5jb29yZFtpXVsxXSA9PT0gaGl0WVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuc2hpcFR3by5oaXQoKTtcbiAgICAgICAgdGhpcy5oaXRDb29yZC5wdXNoKGNvb3JkTGlzdCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2hpcFRocmVlLmNvb3JkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuc2hpcFRocmVlLmNvb3JkW2ldWzBdID09PSBoaXRYICYmXG4gICAgICAgIHRoaXMuc2hpcFRocmVlLmNvb3JkW2ldWzFdID09PSBoaXRZXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5zaGlwVGhyZWUuaGl0KCk7XG4gICAgICAgIHRoaXMuaGl0Q29vcmQucHVzaChjb29yZExpc3QpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaGlwRm91ci5jb29yZC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnNoaXBGb3VyLmNvb3JkW2ldWzBdID09PSBoaXRYICYmXG4gICAgICAgIHRoaXMuc2hpcEZvdXIuY29vcmRbaV1bMV0gPT09IGhpdFlcbiAgICAgICkge1xuICAgICAgICB0aGlzLnNoaXBGb3VyLmhpdCgpO1xuICAgICAgICB0aGlzLmhpdENvb3JkLnB1c2goY29vcmRMaXN0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2hpcEZpdmUuY29vcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5zaGlwRml2ZS5jb29yZFtpXVswXSA9PT0gaGl0WCAmJlxuICAgICAgICB0aGlzLnNoaXBGaXZlLmNvb3JkW2ldWzFdID09PSBoaXRZXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5zaGlwRml2ZS5oaXQoKTtcbiAgICAgICAgdGhpcy5oaXRDb29yZC5wdXNoKGNvb3JkTGlzdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaXNBbGxTaW5rKCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuc2hpcE9uZS5pc1N1bmsoKSAmJlxuICAgICAgdGhpcy5zaGlwVHdvLmlzU3VuaygpICYmXG4gICAgICB0aGlzLnNoaXBUaHJlZS5pc1N1bmsoKSAmJlxuICAgICAgdGhpcy5zaGlwRm91ci5pc1N1bmsoKSAmJlxuICAgICAgdGhpcy5zaGlwRml2ZS5pc1N1bmsoKVxuICAgICkge1xuICAgICAgdGhpcy5hbGxTdW5rID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYWxsU3VuaztcbiAgfVxufVxuXG5jbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3Rvcihjb29yZGluYXRlcykge1xuICAgIHRoaXMubmFtZSA9IFwidXNlclwiO1xuICAgIHRoaXMudHVybiA9IHRydWU7XG4gICAgdGhpcy5teUJvYXJkID0gbmV3IGdhbWVCb2FyZChcbiAgICAgIGNvb3JkaW5hdGVzWzBdLFxuICAgICAgY29vcmRpbmF0ZXNbMV0sXG4gICAgICBjb29yZGluYXRlc1syXSxcbiAgICAgIGNvb3JkaW5hdGVzWzNdLFxuICAgICAgY29vcmRpbmF0ZXNbNF0sXG4gICAgKTtcbiAgfVxufVxuXG5jbGFzcyBBaSB7XG4gIGNvbnN0cnVjdG9yKGNvb3JkaW5hdGVzKSB7XG4gICAgdGhpcy5uYW1lID0gXCJhaVwiO1xuICAgIHRoaXMudHVybiA9IGZhbHNlO1xuICAgIHRoaXMubXlCb2FyZCA9IG5ldyBnYW1lQm9hcmQoXG4gICAgICBjb29yZGluYXRlc1swXSxcbiAgICAgIGNvb3JkaW5hdGVzWzFdLFxuICAgICAgY29vcmRpbmF0ZXNbMl0sXG4gICAgICBjb29yZGluYXRlc1szXSxcbiAgICAgIGNvb3JkaW5hdGVzWzRdLFxuICAgICk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IFNoaXAsIGdhbWVCb2FyZCwgUGxheWVyLCBBaSB9O1xuIiwiY29uc3QgZGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kaWFsb2dcIik7XG5jb25zdCBkaWFsb2dHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaG9vc2luZ1NoaXBzR3JpZFwiKTtcbmNvbnN0IGNoYW5nZURpcmVjdGlvbkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucm90YXRlQnRuXCIpO1xubGV0IGRpcmVjdGlvbkJ0biA9IFwieFwiO1xubGV0IGZpbmFsRGl2cyA9IFtdO1xubGV0IHRlbXBvcmFyeVBsYWNlID0gW107XG5cbmxldCBhZGREaWFsb2dHcmlkcyA9ICgpID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKFwiZWFjaEdyaWRcIik7XG4gICAgICBkaXYuaWQgPSBgR3JpZCR7an0ke2l9YDtcbiAgICAgIGRpdi5kYXRhc2V0LnggPSBqO1xuICAgICAgZGl2LmRhdGFzZXQueSA9IGk7XG4gICAgICBkaWFsb2dHcmlkLmFwcGVuZENoaWxkKGRpdik7XG4gICAgfVxuICB9XG59O1xuXG5sZXQgaGlnaGxpZ2h0T3RoZXJEaXYgPSAoZ3JpZCwgYm94Q291bnQsIGRpcmVjdGlvbikgPT4ge1xuICB0ZW1wb3JhcnlQbGFjZSA9IFtdO1xuICBsZXQgaXRlcmF0aW9uID0gYm94Q291bnQ7XG4gIGxldCBhZGphY2VudENvb3JkaW5hdGVzO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJveENvdW50OyBpKyspIHtcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcInhcIikge1xuICAgICAgbGV0IG5leHRYID0gTnVtYmVyKGdyaWQuZGF0YXNldC54KSArIGk7XG4gICAgICBpZiAobmV4dFggPCAxMCkge1xuICAgICAgICBhZGphY2VudENvb3JkaW5hdGVzID0gYCNHcmlkJHtuZXh0WH0ke2dyaWQuZGF0YXNldC55fWA7XG4gICAgICAgIHRlbXBvcmFyeVBsYWNlLnB1c2goYWRqYWNlbnRDb29yZGluYXRlcyk7XG4gICAgICAgIGxldCBhZGphY2VudERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7YWRqYWNlbnRDb29yZGluYXRlc31gKTtcbiAgICAgICAgYWRqYWNlbnREaXYuY2xhc3NMaXN0LmFkZChcImhvdmVyRGl2XCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGVtcG9yYXJ5UGxhY2UgPSBbXTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJ5XCIpIHtcbiAgICAgIGxldCBuZXh0WSA9IE51bWJlcihncmlkLmRhdGFzZXQueSkgKyBpO1xuICAgICAgaWYgKG5leHRZIDwgMTApIHtcbiAgICAgICAgYWRqYWNlbnRDb29yZGluYXRlcyA9IGAjR3JpZCR7Z3JpZC5kYXRhc2V0Lnh9JHtuZXh0WX1gO1xuICAgICAgICB0ZW1wb3JhcnlQbGFjZS5wdXNoKGFkamFjZW50Q29vcmRpbmF0ZXMpO1xuICAgICAgICBsZXQgYWRqYWNlbnREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke2FkamFjZW50Q29vcmRpbmF0ZXN9YCk7XG4gICAgICAgIGFkamFjZW50RGl2LmNsYXNzTGlzdC5hZGQoXCJob3ZlckRpdlwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRlbXBvcmFyeVBsYWNlID0gW107XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5sZXQgbm9uSGlnaGxpZ2h0T3RoZXJEaXYgPSAoZ3JpZCwgYm94Q291bnQsIGRpcmVjdGlvbikgPT4ge1xuICB0ZW1wb3JhcnlQbGFjZSA9IFtdO1xuICBsZXQgaXRlcmF0aW9uID0gYm94Q291bnQ7XG4gIGxldCBhZGphY2VudENvb3JkaW5hdGVzO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJveENvdW50OyBpKyspIHtcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcInhcIikge1xuICAgICAgbGV0IG5leHRYID0gTnVtYmVyKGdyaWQuZGF0YXNldC54KSArIGk7XG4gICAgICBpZiAobmV4dFggPCAxMCkge1xuICAgICAgICBhZGphY2VudENvb3JkaW5hdGVzID0gYCNHcmlkJHtuZXh0WH0ke2dyaWQuZGF0YXNldC55fWA7XG4gICAgICAgIGxldCBhZGphY2VudERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7YWRqYWNlbnRDb29yZGluYXRlc31gKTtcbiAgICAgICAgYWRqYWNlbnREaXYuY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyRGl2XCIpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcInlcIikge1xuICAgICAgbGV0IG5leHRZID0gTnVtYmVyKGdyaWQuZGF0YXNldC55KSArIGk7XG4gICAgICBpZiAobmV4dFkgPCAxMCkge1xuICAgICAgICBhZGphY2VudENvb3JkaW5hdGVzID0gYCNHcmlkJHtncmlkLmRhdGFzZXQueH0ke25leHRZfWA7XG4gICAgICAgIGxldCBhZGphY2VudERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7YWRqYWNlbnRDb29yZGluYXRlc31gKTtcbiAgICAgICAgYWRqYWNlbnREaXYuY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyRGl2XCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICB0ZW1wb3JhcnlQbGFjZSA9IFtdO1xufTtcblxubGV0IGFkZEVhY2hHcmlkRnVuYyA9ICgpID0+IHtcbiAgbGV0IGJveENvdW50ID0gNTtcbiAgbGV0IGhpZ2hsaWdodERpdiA9IChIb3ZlcmdyaWQpID0+IHtcbiAgICBIb3ZlcmdyaWQuY2xhc3NMaXN0LmFkZChcImhvdmVyRGl2XCIpO1xuICAgIGhpZ2hsaWdodE90aGVyRGl2KEhvdmVyZ3JpZCwgYm94Q291bnQsIGRpcmVjdGlvbkJ0bik7XG4gIH07XG4gIGxldCBub3RIaWdobGlnaHREaXYgPSAoSG92ZXJncmlkKSA9PiB7XG4gICAgSG92ZXJncmlkLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlckRpdlwiKTtcbiAgICBub25IaWdobGlnaHRPdGhlckRpdihIb3ZlcmdyaWQsIGJveENvdW50LCBkaXJlY3Rpb25CdG4pO1xuICB9O1xuXG4gIGxldCBhZGRHcmV5SW5EaXYgPSAobGlzdCkgPT4ge1xuICAgIGxpc3QuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke2Nvb3JkfWApO1xuICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJncmV5ZWRPdXRcIik7XG4gICAgfSk7XG4gIH07XG5cbiAgbGV0IGNoZWNrSWZWYWxpZENvb3JkcyA9ICgpID0+IHtcbiAgICBpZiAoZmluYWxEaXZzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRydWU7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaW5hbERpdnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZmluYWxEaXZzW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGVtcG9yYXJ5UGxhY2UubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgICBpZiAodGVtcG9yYXJ5UGxhY2VbeF0gPT09IGZpbmFsRGl2c1tpXVtqXSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBsZXQgY29uZmlybUNvb3JkaW5hdGVzID0gKENsaWNrZWRHcmlkKSA9PiB7XG4gICAgaWYgKHRlbXBvcmFyeVBsYWNlLmxlbmd0aCkge1xuICAgICAgbGV0IGlzVmFsaWQgPSBjaGVja0lmVmFsaWRDb29yZHModGVtcG9yYXJ5UGxhY2UpO1xuICAgICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgICAgZmluYWxEaXZzLnB1c2godGVtcG9yYXJ5UGxhY2UpO1xuICAgICAgICBib3hDb3VudC0tO1xuICAgICAgICBhZGRHcmV5SW5EaXYodGVtcG9yYXJ5UGxhY2UpO1xuICAgICAgICBpZiAoZmluYWxEaXZzLmxlbmd0aCA9PSA1KSB7XG4gICAgICAgICAgbGV0IGRpYWxvZ0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGlhbG9nRGl2XCIpO1xuICAgICAgICAgIGRpYWxvZ0Rpdi5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgIGRpYWxvZy5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0ZW1wb3JhcnlQbGFjZSA9IFtdO1xuICAgIH1cbiAgfTtcblxuICBsZXQgYWxsRGlhbG9nR3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmVhY2hHcmlkXCIpO1xuICBhbGxEaWFsb2dHcmlkcy5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGhpZ2hsaWdodERpdihncmlkKTtcbiAgICB9KTtcbiAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBub3RIaWdobGlnaHREaXYoZ3JpZCk7XG4gICAgfSk7XG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgY29uZmlybUNvb3JkaW5hdGVzKGdyaWQpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmxldCBhZGREaXJlY3Rpb25CdG5GdW5jID0gKCkgPT4ge1xuICBjaGFuZ2VEaXJlY3Rpb25CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoZGlyZWN0aW9uQnRuID09PSBcInhcIikge1xuICAgICAgZGlyZWN0aW9uQnRuID0gXCJ5XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdGlvbkJ0biA9IFwieFwiO1xuICAgIH1cbiAgfSk7XG59O1xuXG5sZXQgZ3JpZEZ1bmMgPSAoKSA9PiB7XG4gIGRpYWxvZy5zaG93TW9kYWwoKTtcbiAgYWRkRGlhbG9nR3JpZHMoKTtcbiAgYWRkRWFjaEdyaWRGdW5jKCk7XG4gIGFkZERpcmVjdGlvbkJ0bkZ1bmMoKTtcbn07XG5cbmV4cG9ydCB7IGdyaWRGdW5jLCBmaW5hbERpdnMgfTtcbiIsImxldCBmaWxsR2FtZUdyaWRzID0gKHBsYXllck9uZUluc3RhbmNlLCBBaVBsYXllckluc3RhbmNlKSA9PiB7XG4gIGxldCBtYWluR2FtZURpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZU1haW5EaXZcIik7XG4gIGxldCBoT25lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICBoT25lLmlubmVyVGV4dCA9IFwiQmF0dGxlRmllbGRcIjtcbiAgbGV0IGdyaWRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBncmlkQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJncmlkQ29udGFpbmVyXCIpO1xuICBoT25lLmNsYXNzTGlzdC5hZGQoXCJtYWluSGVhZGluZ1wiKTtcbiAgbGV0IHVzZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB1c2VyRGl2LmNsYXNzTGlzdC5hZGQoXCJ1c2VyR3JpZERpdlwiKTtcbiAgbGV0IGFpRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYWlEaXYuY2xhc3NMaXN0LmFkZChcImFpR3JpZERpdlwiKTtcblxuICBtYWluR2FtZURpdi5hcHBlbmRDaGlsZChoT25lKTtcbiAgZ3JpZENvbnRhaW5lci5hcHBlbmRDaGlsZCh1c2VyRGl2KTtcbiAgZ3JpZENvbnRhaW5lci5hcHBlbmRDaGlsZChhaURpdik7XG4gIG1haW5HYW1lRGl2LmFwcGVuZENoaWxkKGdyaWRDb250YWluZXIpO1xuICBhZGRHcmlkcyhcInVzZXJHcmlkRGl2XCIsIFwidXNlclwiKTtcbiAgYWRkR3JpZHMoXCJhaUdyaWREaXZcIiwgXCJhaVwiKTtcbiAgYWRkR3JleUluVXNlckRpdnMocGxheWVyT25lSW5zdGFuY2UsIFwidXNlclwiKTtcbiAgLy8gcmVtb3ZlIGhlcmUgdG8gcmVtb3ZlIGFpIGJsdWUgZGl2c1xuICAvLyBhZGRHcmV5SW5Vc2VyRGl2cyhBaVBsYXllckluc3RhbmNlLCBcImFpXCIpO1xufTtcblxubGV0IGFkZEdyZXlJblVzZXJEaXZzID0gKHBsYXllciwgaHVtYW5PckFpKSA9PiB7XG4gIHBsYXllci5teUJvYXJkLnNoaXBPbmUuY29vcmQuZm9yRWFjaCgoZ3JpZENsYXNzKSA9PiB7XG4gICAgbGV0IGN1cnJlbnREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke2dyaWRDbGFzc30ke2h1bWFuT3JBaX1gKTtcbiAgICBjdXJyZW50RGl2LmNsYXNzTGlzdC5hZGQoXCJ1c2VyR3JleWVkRGl2XCIpO1xuICB9KTtcbiAgcGxheWVyLm15Qm9hcmQuc2hpcFR3by5jb29yZC5mb3JFYWNoKChncmlkQ2xhc3MpID0+IHtcbiAgICBsZXQgY3VycmVudERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7Z3JpZENsYXNzfSR7aHVtYW5PckFpfWApO1xuICAgIGN1cnJlbnREaXYuY2xhc3NMaXN0LmFkZChcInVzZXJHcmV5ZWREaXZcIik7XG4gIH0pO1xuICBwbGF5ZXIubXlCb2FyZC5zaGlwVGhyZWUuY29vcmQuZm9yRWFjaCgoZ3JpZENsYXNzKSA9PiB7XG4gICAgbGV0IGN1cnJlbnREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke2dyaWRDbGFzc30ke2h1bWFuT3JBaX1gKTtcbiAgICBjdXJyZW50RGl2LmNsYXNzTGlzdC5hZGQoXCJ1c2VyR3JleWVkRGl2XCIpO1xuICB9KTtcbiAgcGxheWVyLm15Qm9hcmQuc2hpcEZvdXIuY29vcmQuZm9yRWFjaCgoZ3JpZENsYXNzKSA9PiB7XG4gICAgbGV0IGN1cnJlbnREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke2dyaWRDbGFzc30ke2h1bWFuT3JBaX1gKTtcbiAgICBjdXJyZW50RGl2LmNsYXNzTGlzdC5hZGQoXCJ1c2VyR3JleWVkRGl2XCIpO1xuICB9KTtcbiAgcGxheWVyLm15Qm9hcmQuc2hpcEZpdmUuY29vcmQuZm9yRWFjaCgoZ3JpZENsYXNzKSA9PiB7XG4gICAgbGV0IGN1cnJlbnREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke2dyaWRDbGFzc30ke2h1bWFuT3JBaX1gKTtcbiAgICBjdXJyZW50RGl2LmNsYXNzTGlzdC5hZGQoXCJ1c2VyR3JleWVkRGl2XCIpO1xuICB9KTtcbn07XG5cbmxldCBhZGRHcmlkcyA9IChjbGFzc05hbWUsIGh1bWFuT3JBaSkgPT4ge1xuICBsZXQgbWFpbkRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2NsYXNzTmFtZX1gKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKFwidXNlckdyaWRcIik7XG4gICAgICBkaXYuaWQgPSBgR3JpZCR7an0ke2l9JHtodW1hbk9yQWl9YDtcbiAgICAgIGRpdi5kYXRhc2V0LnggPSBqO1xuICAgICAgZGl2LmRhdGFzZXQueSA9IGk7XG4gICAgICBtYWluRGl2LmFwcGVuZENoaWxkKGRpdik7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgeyBmaWxsR2FtZUdyaWRzIH07XG4iLCJsZXQgZ2V0UmFuZG9tQ29vcmRzID0gKCkgPT4ge1xuICBsZXQgZmluYWxMaXN0ID0gW107XG4gIGxldCBpID0gNTtcbiAgb3V0ZXJMb29wOiB3aGlsZSAoaSA+IDApIHtcbiAgICBsZXQgdGVtcG9yYXJ5TGlzdCA9IFtdO1xuICAgIGxldCBhbGxDb29yZGluYXRlcyA9IFtdO1xuICAgIGZpbmFsTGlzdC5mb3JFYWNoKChzdWJsaXN0KSA9PiB7XG4gICAgICBzdWJsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgYWxsQ29vcmRpbmF0ZXMucHVzaChpdGVtKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGxldCByYW5kb21GaXJzdENvb3JkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGxldCBzdGFydENvb3JkcyA9IGAjR3JpZCR7cmFuZG9tRmlyc3RDb29yZH0ke3JhbmRvbUZpcnN0Q29vcmR9YDtcbiAgICBpZiAoYWxsQ29vcmRpbmF0ZXMuaW5jbHVkZXMoc3RhcnRDb29yZHMpKSB7XG4gICAgICBjb250aW51ZSBvdXRlckxvb3A7XG4gICAgfVxuICAgIGxldCBYb3JZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG4gICAgdGVtcG9yYXJ5TGlzdC5wdXNoKHN0YXJ0Q29vcmRzKTtcbiAgICBmb3IgKGxldCBqID0gMTsgaiA8IGk7IGorKykge1xuICAgICAgbGV0IG5leHRDb29yZHM7XG4gICAgICBsZXQgZmluYWxMaXN0TGVuID0gZmluYWxMaXN0Lmxlbmd0aDtcbiAgICAgIGlmIChYb3JZID09PSAwKSB7XG4gICAgICAgIGxldCBuZXh0WCA9IHJhbmRvbUZpcnN0Q29vcmQgKyBqO1xuICAgICAgICBpZiAobmV4dFggPj0gMTApIHtcbiAgICAgICAgICBjb250aW51ZSBvdXRlckxvb3A7XG4gICAgICAgIH1cbiAgICAgICAgbmV4dENvb3JkcyA9IGAjR3JpZCR7bmV4dFh9JHtyYW5kb21GaXJzdENvb3JkfWA7XG4gICAgICB9IGVsc2UgaWYgKFhvclkgPT09IDEpIHtcbiAgICAgICAgbGV0IG5leHRZID0gcmFuZG9tRmlyc3RDb29yZCArIGo7XG4gICAgICAgIGlmIChuZXh0WSA+PSAxMCkge1xuICAgICAgICAgIGNvbnRpbnVlIG91dGVyTG9vcDtcbiAgICAgICAgfVxuICAgICAgICBuZXh0Q29vcmRzID0gYCNHcmlkJHtyYW5kb21GaXJzdENvb3JkfSR7bmV4dFl9YDtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IHQgPSA5OyB0IDwgYWxsQ29vcmRpbmF0ZXMubGVuZ3RoOyB0KyspIHtcbiAgICAgICAgaWYgKG5leHRDb29yZHMgPT0gYWxsQ29vcmRpbmF0ZXNbdF0pIHtcbiAgICAgICAgICBjb250aW51ZSBvdXRlckxvb3A7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRlbXBvcmFyeUxpc3QucHVzaChuZXh0Q29vcmRzKTtcbiAgICB9XG4gICAgZmluYWxMaXN0LnB1c2godGVtcG9yYXJ5TGlzdCk7XG4gICAgaS0tO1xuICB9XG4gIHJldHVybiBmaW5hbExpc3Q7XG59O1xuXG5leHBvcnQgeyBnZXRSYW5kb21Db29yZHMgfTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAubWFpbkhlYWRpbmcge1xuICBsZXR0ZXItc3BhY2luZzogNHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG4gIG1hcmdpbi1ib3R0b206IDYwcHg7XG4gIGZvbnQtZmFtaWx5OiBcIlByZXNzIFN0YXJ0IDJQXCIsIGN1cnNpdmU7XG59XG5cbi5ncmlkQ29udGFpbmVyIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgd2lkdGg6IDgwJTtcbiAgbWFyZ2luOiBhdXRvO1xuICBnYXA6IDUwcHg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDI1MHB4LCAxZnIpKTtcbn1cblxuLnVzZXJHcmlkRGl2LFxuLmFpR3JpZERpdiB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdhcDogMXB4O1xuICBhbGlnbi1jb250ZW50OiBzdHJldGNoO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAzMHB4KTtcbn1cblxuLnVzZXJHcmlkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgZ3JleTtcbn1cblxuLmFpR3JpZCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcbn1cblxuLnVzZXJHcmV5ZWREaXYge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBhcXVhO1xufVxuXG4ud3JvbmdHdWVzc0RpdiB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbn1cblxuLnJpZ2h0R3Vlc3NEaXYge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xufVxuXG4uYWlXb25NZXNzYWdlIHtcbiAgY29sb3I6IHJlZDtcbn1cblxuLmh1bWFuV29uTWVzc2FnZSB7XG4gIGNvbG9yOiBncmVlbjtcbn1cblxuLnNob3dXaW5uZXJEaXYge1xuICBkaXNwbGF5OiBncmlkO1xuICBtYXJnaW4tdG9wOiAyMHZoO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5haVdvbk1lc3NhZ2UsXG4uaHVtYW5Xb25NZXNzYWdlIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcbiAgZm9udC1mYW1pbHk6IFwiV29yayBTYW5zXCIsIFwiUm9ib3RvXCIsIHNhbnMtc2VyaWY7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsaW5nL21haW4uY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLHNDQUFzQztBQUN4Qzs7QUFFQTtFQUNFLGFBQWE7RUFDYixVQUFVO0VBQ1YsWUFBWTtFQUNaLFNBQVM7RUFDVCw4QkFBOEI7RUFDOUIsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQiwyREFBMkQ7QUFDN0Q7O0FBRUE7O0VBRUUsYUFBYTtFQUNiLFFBQVE7RUFDUixzQkFBc0I7RUFDdEIsdUNBQXVDO0VBQ3ZDLG9DQUFvQztBQUN0Qzs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLFVBQVU7QUFDWjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsa0JBQWtCO0VBQ2xCLHVCQUF1QjtFQUN2QixxQkFBcUI7QUFDdkI7O0FBRUE7O0VBRUUsbUJBQW1CO0VBQ25CLDhDQUE4QztBQUNoRFwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIubWFpbkhlYWRpbmcge1xcbiAgbGV0dGVyLXNwYWNpbmc6IDRweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxuICBtYXJnaW4tYm90dG9tOiA2MHB4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJQcmVzcyBTdGFydCAyUFxcXCIsIGN1cnNpdmU7XFxufVxcblxcbi5ncmlkQ29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICB3aWR0aDogODAlO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgZ2FwOiA1MHB4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjUwcHgsIDFmcikpO1xcbn1cXG5cXG4udXNlckdyaWREaXYsXFxuLmFpR3JpZERpdiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiAxcHg7XFxuICBhbGlnbi1jb250ZW50OiBzdHJldGNoO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDMwcHgpO1xcbn1cXG5cXG4udXNlckdyaWQge1xcbiAgYm9yZGVyOiAxcHggc29saWQgZ3JleTtcXG59XFxuXFxuLmFpR3JpZCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZWQ7XFxufVxcblxcbi51c2VyR3JleWVkRGl2IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGFxdWE7XFxufVxcblxcbi53cm9uZ0d1ZXNzRGl2IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuXFxuLnJpZ2h0R3Vlc3NEaXYge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG59XFxuXFxuLmFpV29uTWVzc2FnZSB7XFxuICBjb2xvcjogcmVkO1xcbn1cXG5cXG4uaHVtYW5Xb25NZXNzYWdlIHtcXG4gIGNvbG9yOiBncmVlbjtcXG59XFxuXFxuLnNob3dXaW5uZXJEaXYge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIG1hcmdpbi10b3A6IDIwdmg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmFpV29uTWVzc2FnZSxcXG4uaHVtYW5Xb25NZXNzYWdlIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxuICBmb250LWZhbWlseTogXFxcIldvcmsgU2Fuc1xcXCIsIFxcXCJSb2JvdG9cXFwiLCBzYW5zLXNlcmlmO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYGJvZHkge1xuICBmb250LWZhbWlseTogXCJXb3JrIFNhbnNcIiwgXCJSb2JvdG9cIiwgc2Fucy1zZXJpZjtcbn1cblxuLmRpYWxvZyB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdhcDogMnZoO1xuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG4gIGJvcmRlcjogbm9uZTtcbiAgcGFkZGluZzogMjBweCAzMHB4O1xuICBib3JkZXItcmFkaXVzOiAxMHB4IDEwcHggMTBweCAxMHB4O1xufVxuXG4ucm90YXRlQnRuIHtcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xufVxuXG4uY2hvb3NpbmdTaGlwc0dyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBnYXA6IDFweDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDI1cHgpO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMjVweCk7XG59XG5cbi5lYWNoR3JpZCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyZXk7XG59XG5cbi5ob3ZlckRpdiB7XG4gIGJhY2tncm91bmQtY29sb3I6IGFxdWE7XG59XG5cbi5ncmV5ZWRPdXQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGluZy93ZWxjb21lRGlhbG9nLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLDhDQUE4QztBQUNoRDs7QUFFQTtFQUNFLGFBQWE7RUFDYixRQUFRO0VBQ1IscUJBQXFCO0VBQ3JCLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsa0NBQWtDO0FBQ3BDOztBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLGlCQUFpQjtFQUNqQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsUUFBUTtFQUNSLHVDQUF1QztFQUN2QyxvQ0FBb0M7QUFDdEM7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keSB7XFxuICBmb250LWZhbWlseTogXFxcIldvcmsgU2Fuc1xcXCIsIFxcXCJSb2JvdG9cXFwiLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG4uZGlhbG9nIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDJ2aDtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHBhZGRpbmc6IDIwcHggMzBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHggMTBweCAxMHB4IDEwcHg7XFxufVxcblxcbi5yb3RhdGVCdG4ge1xcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XFxufVxcblxcbi5jaG9vc2luZ1NoaXBzR3JpZCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiAxcHg7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMjVweCk7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMjVweCk7XFxufVxcblxcbi5lYWNoR3JpZCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBncmV5O1xcbn1cXG5cXG4uaG92ZXJEaXYge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYXF1YTtcXG59XFxuXFxuLmdyZXllZE91dCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tYWluLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWFpbi5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vd2VsY29tZURpYWxvZy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3dlbGNvbWVEaWFsb2cuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgXCIuL3N0eWxpbmcvbWFpbi5jc3NcIjtcbmltcG9ydCBcIi4vc3R5bGluZy93ZWxjb21lRGlhbG9nLmNzc1wiO1xuaW1wb3J0IHsgZ3JpZEZ1bmMsIGZpbmFsRGl2cyB9IGZyb20gXCIuL2RpYWxvZ0Z1bmNcIjtcbmltcG9ydCB7IGdldFJhbmRvbUNvb3JkcyB9IGZyb20gXCIuL3JhbmRvbUNvcmRzXCI7XG5pbXBvcnQgeyBmaWxsR2FtZUdyaWRzIH0gZnJvbSBcIi4vZ2FtZUdyaWRzXCI7XG5pbXBvcnQgeyBTaGlwLCBnYW1lQm9hcmQsIFBsYXllciwgQWkgfSBmcm9tIFwiLi9jbGFzc2VzXCI7XG5pbXBvcnQgeyBhZGRBdHRhY2tGdW5jLCBhZGRBdHRhY2tGdW5jRm9yQWkgfSBmcm9tIFwiLi9hdHRhY2tGdW5jXCI7XG5pbXBvcnQgeyBhZGRDaGVja1dpbm5lckZ1bmMgfSBmcm9tIFwiLi9jaGVja1dpbm5lclwiO1xuY29uc3QgZGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kaWFsb2dcIik7XG5cbmdyaWRGdW5jKCk7XG5kaWFsb2cuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsIGZ1bmN0aW9uICgpIHtcbiAgcGxheUdhbWUoZmluYWxEaXZzKTtcbn0pO1xuXG5sZXQgcGxheUdhbWUgPSAoc2hpcENvb3JkcykgPT4ge1xuICBsZXQgaHVtYW5QbGF5ZXIgPSBuZXcgUGxheWVyKHNoaXBDb29yZHMpO1xuICBsZXQgQWlQbGF5ZXIgPSBuZXcgQWkoZ2V0UmFuZG9tQ29vcmRzKCkpO1xuICBmaWxsR2FtZUdyaWRzKGh1bWFuUGxheWVyLCBBaVBsYXllcik7XG4gIGFkZEF0dGFja0Z1bmNGb3JBaShBaVBsYXllciwgaHVtYW5QbGF5ZXIpO1xuICBhZGRDaGVja1dpbm5lckZ1bmMoaHVtYW5QbGF5ZXIsIEFpUGxheWVyKTtcbn07XG4iXSwibmFtZXMiOlsibWFrZUFpTW92ZSIsImZpbmRPdXRXaGVyZUNsaWNrZWQiLCJjbGFzc05hbWUiLCJyZWNlaXZlZEJ5IiwiZmluYWxBbnN3ZXIiLCJteUJvYXJkIiwic2hpcE9uZSIsImNvb3JkIiwiZm9yRWFjaCIsImNvb3JkaW5hdGVzIiwibmFtZSIsImhpdCIsInNoaXBUd28iLCJzaGlwVGhyZWUiLCJzaGlwRm91ciIsInNoaXBGaXZlIiwicGxheWVyQ2xpY2tlZCIsIkRpdkNsYXNzTmFtZSIsIngiLCJ5IiwiYXR0YWNrZWRCeSIsInBsYXllckNsaWNrZWRTaGlwIiwiY2xpY2tlZERpdiIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsImhpdENvb3JkIiwicHVzaCIsIm1pc3NlZENvb3JkIiwiYWRkQXR0YWNrRnVuY0ZvckFpIiwicmVjaWV2ZXIiLCJhdHRhY2tlciIsImN1cnJlbnRDbGFzcyIsImN1cnJlbnREaXYiLCJhZGRFdmVudExpc3RlbmVyIiwibmV2ZXJUb3VjaGVkQmVmb3JlIiwiZ2V0VmFsaWRNb3ZlcyIsInJlY2VpdmVyIiwiYWxsTW92ZXMiLCJub3RBbHJlYWR5Q2xpY2tlZCIsIml0ZXJhdGluZ0Nvb3JkIiwiY29vcmRpbmF0ZSIsImFsbE1vdmVzTGVuIiwibGVuZ3RoIiwicmFuZG9tSW5kZXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJyYW5kb21EaXZDbGFzc05hbWUiLCJnYW1lRGl2IiwiY2hlY2tJZkFsbFNoaXBzU3VuayIsInBsYXllciIsImlzQWxsU2luayIsInNob3dXaW5uZXIiLCJ3aW5uaW5nU2hvd2luZ0RpdiIsIndpbm5pbmdOYW1lIiwidG9VcHBlckNhc2UiLCJXaW5uaW5nVGV4dCIsImlubmVySFRNTCIsIm5ld0ltZyIsIkltYWdlIiwid2lubmluZ0hvbmUiLCJjcmVhdGVFbGVtZW50Iiwic3JjIiwiYXBwZW5kQ2hpbGQiLCJhZGRDaGVja1dpbm5lckZ1bmMiLCJodW1hblBsYXllciIsImFpUGxheWVyIiwiYWxsSHVtYW5TaGlwc1N1bmsiLCJhbGxBaVNoaXBzU3VuayIsIlNoaXAiLCJjb25zdHJ1Y3RvciIsImhpdENvdW50Iiwic2luayIsImlzU3VuayIsImdhbWVCb2FyZCIsImNvb3JkaW5hdGVzT25lIiwiY29vcmRpbmF0ZXNUd28iLCJjb29yZGluYXRlc1RocmVlIiwiY29vcmRpbmF0ZXNGb3VyIiwiY29vcmRpbmF0ZXNGaXZlIiwiYWxsU3VuayIsInJlY2VpZXZlQXR0YWNrIiwiY29vcmRMaXN0IiwiaGl0WCIsImhpdFkiLCJpIiwiUGxheWVyIiwidHVybiIsIkFpIiwibW9kdWxlIiwiZXhwb3J0cyIsImRpYWxvZyIsImRpYWxvZ0dyaWQiLCJjaGFuZ2VEaXJlY3Rpb25CdG4iLCJkaXJlY3Rpb25CdG4iLCJmaW5hbERpdnMiLCJ0ZW1wb3JhcnlQbGFjZSIsImFkZERpYWxvZ0dyaWRzIiwiaiIsImRpdiIsImlkIiwiZGF0YXNldCIsImhpZ2hsaWdodE90aGVyRGl2IiwiZ3JpZCIsImJveENvdW50IiwiZGlyZWN0aW9uIiwiaXRlcmF0aW9uIiwiYWRqYWNlbnRDb29yZGluYXRlcyIsIm5leHRYIiwiTnVtYmVyIiwiYWRqYWNlbnREaXYiLCJuZXh0WSIsIm5vbkhpZ2hsaWdodE90aGVyRGl2IiwiYWRkRWFjaEdyaWRGdW5jIiwiaGlnaGxpZ2h0RGl2IiwiSG92ZXJncmlkIiwibm90SGlnaGxpZ2h0RGl2IiwiYWRkR3JleUluRGl2IiwibGlzdCIsImNoZWNrSWZWYWxpZENvb3JkcyIsImNvbmZpcm1Db29yZGluYXRlcyIsIkNsaWNrZWRHcmlkIiwiaXNWYWxpZCIsImRpYWxvZ0RpdiIsImNsb3NlIiwiYWxsRGlhbG9nR3JpZHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYWRkRGlyZWN0aW9uQnRuRnVuYyIsImdyaWRGdW5jIiwic2hvd01vZGFsIiwiZmlsbEdhbWVHcmlkcyIsInBsYXllck9uZUluc3RhbmNlIiwiQWlQbGF5ZXJJbnN0YW5jZSIsIm1haW5HYW1lRGl2IiwiaE9uZSIsImlubmVyVGV4dCIsImdyaWRDb250YWluZXIiLCJ1c2VyRGl2IiwiYWlEaXYiLCJhZGRHcmlkcyIsImFkZEdyZXlJblVzZXJEaXZzIiwiaHVtYW5PckFpIiwiZ3JpZENsYXNzIiwibWFpbkRpdiIsImdldFJhbmRvbUNvb3JkcyIsImZpbmFsTGlzdCIsIm91dGVyTG9vcCIsInRlbXBvcmFyeUxpc3QiLCJhbGxDb29yZGluYXRlcyIsInN1Ymxpc3QiLCJpdGVtIiwicmFuZG9tRmlyc3RDb29yZCIsInN0YXJ0Q29vcmRzIiwiaW5jbHVkZXMiLCJYb3JZIiwibmV4dENvb3JkcyIsImZpbmFsTGlzdExlbiIsInQiLCJhZGRBdHRhY2tGdW5jIiwicGxheUdhbWUiLCJzaGlwQ29vcmRzIiwiQWlQbGF5ZXIiXSwic291cmNlUm9vdCI6IiJ9