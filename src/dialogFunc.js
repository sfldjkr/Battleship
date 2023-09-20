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
  let highlightDiv = (Hovergrid) => {
    Hovergrid.classList.add("hoverDiv");
    highlightOtherDiv(Hovergrid, boxCount, directionBtn);
  };
  let notHighlightDiv = (Hovergrid) => {
    Hovergrid.classList.remove("hoverDiv");
    nonHighlightOtherDiv(Hovergrid, boxCount, directionBtn);
  };

  let addGreyInDiv = (list) => {
    list.forEach((coord) => {
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

  let confirmCoordinates = (ClickedGrid) => {
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
  allDialogGrids.forEach((grid) => {
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

export { gridFunc, finalDivs };
