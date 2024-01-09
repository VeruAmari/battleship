/* eslint no-undef: off */
import { gameboard, graph } from '../src/gameboard';

test('basic test gameboard', () => {
  expect(gameboard()).toEqual({ size: 0 });
});

test('basic test graph', () => {
  const myGraph = graph();
  expect(
    myGraph.adjacencyList(myGraph.defineVertices(), myGraph.moves)['0,0'],
  ).toEqual({
    '1,0': { coordinates: [1, 0], shipID: null },
    '0,1': { coordinates: [0, 1], shipID: null },
  });
});
