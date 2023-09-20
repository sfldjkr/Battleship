let classes = require("../src/classes");

test("hit func changes hit count properly", () => {
  let ship = new classes.Ship(3);
  ship.hit();
  ship.hit();
  expect(ship.hitCount).toBe(2);
});

test("isSunk func works properly", () => {
  let ship = new classes.Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBeTruthy();
});
