/* eslint no-undef: off */
import ship from '../src/shipFact';

test('ship length is correct', () => {
  expect(ship(3).length()).toBe(3);
});

test('hit increases hitcount', () => {
  const shp1 = ship(3);
  const shp2 = ship(3);
  shp1.hit();
  expect(shp1.getHits()).toBe(1);
  expect(shp2.getHits()).toBe(0);
});

test('ship is sunk when hit times its length', () => {
  const shp1 = ship(3);
  const shp2 = ship(3);
  shp1.hit();
  shp1.hit();
  shp1.hit();

  expect(shp1.isSunk()).toBe(true);
  expect(shp2.isSunk()).toBe(false);
});

test('edge case 1', () => {
  expect(ship(0).length()).toBe(0);
});
