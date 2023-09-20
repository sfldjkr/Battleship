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
  player.myBoard.shipOne.coord.forEach((gridClass) => {
    let currentDiv = document.querySelector(`${gridClass}${humanOrAi}`);
    currentDiv.classList.add("userGreyedDiv");
  });
  player.myBoard.shipTwo.coord.forEach((gridClass) => {
    let currentDiv = document.querySelector(`${gridClass}${humanOrAi}`);
    currentDiv.classList.add("userGreyedDiv");
  });
  player.myBoard.shipThree.coord.forEach((gridClass) => {
    let currentDiv = document.querySelector(`${gridClass}${humanOrAi}`);
    currentDiv.classList.add("userGreyedDiv");
  });
  player.myBoard.shipFour.coord.forEach((gridClass) => {
    let currentDiv = document.querySelector(`${gridClass}${humanOrAi}`);
    currentDiv.classList.add("userGreyedDiv");
  });
  player.myBoard.shipFive.coord.forEach((gridClass) => {
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

export { fillGameGrids };
