/* eslint no-undef: off */
import gameboard from '../src/gameboard';

test('basic test graph', () => {
  const game = gameboard(false);
  expect(game.board['0,0'].square.getShipID()).toBe(null);
});

const game = gameboard(true);
test('basic test ships', () => {
  const theShips = game.ships;
  expect(Object.keys(theShips).length).toEqual(5);
});
test('basic test ships 2', () => {
  const theShips = game.ships;
  expect(
    Object.keys(theShips)
      .map((key) => theShips[key])[0]
      .c1.length(),
  ).toEqual(5);
});
test('basic test ships 3', () => {
  const theShips = game.ships;
  expect(
    Object.keys(theShips)
      .map((key) => theShips[key])[0]
      .c1.length(),
  ).toEqual(5);
});
