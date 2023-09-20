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
  constructor(
    coordinatesOne,
    coordinatesTwo,
    coordinatesThree,
    coordinatesFour,
    coordinatesFive,
  ) {
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
      if (
        this.shipOne.coord[i][0] === hitX &&
        this.shipOne.coord[i][1] === hitY
      ) {
        this.shipOne.hit();
        this.hitCoord.push(coordList);
        return;
      }
    }

    for (let i = 0; i < this.shipTwo.coord.length; i++) {
      if (
        this.shipTwo.coord[i][0] === hitX &&
        this.shipTwo.coord[i][1] === hitY
      ) {
        this.shipTwo.hit();
        this.hitCoord.push(coordList);
        return;
      }
    }

    for (let i = 0; i < this.shipThree.coord.length; i++) {
      if (
        this.shipThree.coord[i][0] === hitX &&
        this.shipThree.coord[i][1] === hitY
      ) {
        this.shipThree.hit();
        this.hitCoord.push(coordList);
      }
    }

    for (let i = 0; i < this.shipFour.coord.length; i++) {
      if (
        this.shipFour.coord[i][0] === hitX &&
        this.shipFour.coord[i][1] === hitY
      ) {
        this.shipFour.hit();
        this.hitCoord.push(coordList);
      }
    }

    for (let i = 0; i < this.shipFive.coord.length; i++) {
      if (
        this.shipFive.coord[i][0] === hitX &&
        this.shipFive.coord[i][1] === hitY
      ) {
        this.shipFive.hit();
        this.hitCoord.push(coordList);
      }
    }
  }

  isAllSink() {
    if (
      this.shipOne.isSunk() &&
      this.shipTwo.isSunk() &&
      this.shipThree.isSunk() &&
      this.shipFour.isSunk() &&
      this.shipFive.isSunk()
    ) {
      this.allSunk = true;
    }
    return this.allSunk;
  }
}

class Player {
  constructor(coordinates) {
    this.name = "user";
    this.turn = true;
    this.myBoard = new gameBoard(
      coordinates[0],
      coordinates[1],
      coordinates[2],
      coordinates[3],
      coordinates[4],
    );
  }
}

class Ai {
  constructor(coordinates) {
    this.name = "ai";
    this.turn = false;
    this.myBoard = new gameBoard(
      coordinates[0],
      coordinates[1],
      coordinates[2],
      coordinates[3],
      coordinates[4],
    );
  }
}

module.exports = { Ship, gameBoard, Player, Ai };
