/* eslint no-undef: off */
import gameboard from '../src/gameboard';

const game = gameboard();
test('basic test graph', () => {
  expect(game.board['0,0']['1,0'].getShipID()).toBe(null);
});

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
