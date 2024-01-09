/* eslint no-undef: off */
import gameboard from '../src/gameboard';

test('basic test graph', () => {
  const myGraph = gameboard().graph();
  expect(
    myGraph.adjacencyList(myGraph.defineVertices(), myGraph.moves)['0,0'],
  ).toEqual({
    '1,0': { coordinates: [1, 0], shipID: null },
    '0,1': { coordinates: [0, 1], shipID: null },
  });
});

test('basic test ships', () => {
  const theShips = gameboard().ships;
  expect(Object.keys(theShips).length).toEqual(15);
});
