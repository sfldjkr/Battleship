let getRandomCoords = () => {
  let finalList = [];
  let i = 5;
  outerLoop: while (i > 0) {
    let temporaryList = [];
    let allCoordinates = [];
    finalList.forEach((sublist) => {
      sublist.forEach((item) => {
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

export { getRandomCoords };
