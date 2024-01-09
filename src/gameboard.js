import shipFactory from './shipFact';

/* eslint no-plusplus: off */
const gameboard = () => {
  const graph = () => {
    const moves = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ];
    const vertex = (x, y) => {
      const coordinates = [x, y];
      // eslint-disable-next-line prefer-const
      let shipID = null;
      return { coordinates, shipID };
    };
    const defineVertices = () => {
      const vertices = {};
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          vertices[`${i},${j}`] = vertex(i, j);
        }
      }
      return vertices;
    };

    const adjacencyList = (vertexList, movesList) => {
      const adjacency = {};
      Object.keys(vertexList).forEach((key) => {
        adjacency[key] = {};
        movesList.forEach((move) => {
          const moveKey = `${Number(key[0]) + Number(move[0])},${
            Number(key[2]) + Number(move[1])
          }`;
          if (vertexList[moveKey]) {
            adjacency[key][moveKey] = vertexList[moveKey];
          }
        });
      });
      return adjacency;
    };
    return { adjacencyList, defineVertices, moves };
  };

  // const boardGraph = graph();

  // const myShips = {};
  const makeShips = (size, amount, id) => {
    const myShips = {};
    for (let i = 0; i < amount; i++) {
      myShips[`${id + (i + 1)}`] = shipFactory(size);
    }
    return { ...myShips };
  };
  /** Rules:
   * No. 	Class of ship 	Size
      1 	Carrier 	      5
      2 	Battleship    	4
      3 	Destroyer 	    3
      4 	Submarine 	    3
      5 	Patrol Boat 	  2 
   */
  const ships = {
    ...makeShips(5, 1, 'c'),
    ...makeShips(4, 2, 'b'),
    ...makeShips(3, 3, 'd'),
    ...makeShips(3, 4, 's'),
    ...makeShips(2, 5, 'pb'),
  };
  return { graph, ships };
};

export default gameboard;
