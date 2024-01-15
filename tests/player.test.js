/* eslint no-undef: off */
import player from '../src/player';

const player1 = player('P1');
const computer = player('computer');

test('player can make a valid move', () => {
  expect(player1.validMove('1,1')).toBe('1,1');
});
test('player cant make an invalid move', () => {
  expect(player1.validMove('1,')).toBe(false);
});

test('player cant repeat a move', () => {
  expect(player1.validMove('1,1')).toBe(false);
});

test('computer can make a valid move', () => {
  expect(computer.computerMakeMove()).toMatch(/[0-9],[0-9]/);
});
