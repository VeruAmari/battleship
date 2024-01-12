/* eslint no-undef: off */
import gameboard from '../src/gameboard';

test('basic test graph', () => {
  const game = gameboard(false);
  expect(game.board['0,0'].square.getShipID()).toBe(null);
});

const game = gameboard(true);
test('amount of ships to equal 15', () => {
  const theShips = game.ships;
  expect(Object.keys(theShips).length).toEqual(15);
});
test('length of ship c1 to be 5', () => {
  const theShips = game.ships;
  expect(theShips.c1.length()).toEqual(5);
});
test('basic test ships 3', () => {
  const theShips = game.ships;
  expect(Object.keys(theShips).length).toEqual(15);
});
