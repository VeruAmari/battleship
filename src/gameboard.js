/* eslint no-plusplus: off */
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

  /*
  const edgeList = (vertexList, movesList) => {
    const edgeObj = (inVertex, outVertex) => ({ inVertex, outVertex });
    const edges = new Set();
    Object.keys(vertexList).forEach((key) => {
      movesList.forEach((move) => {
        const k = `${Number(key[0]) + Number([move[0]])},${
          Number(key[2]) + Number(move[1])
        }`;
        if (vertexList[k]) {
          edges.add(edgeObj(vertexList[key], vertexList[k]));
        }
      });
    });
    return edges;
  };
*/
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
const gameboard = () => ({ size: 0 });

export { gameboard, graph };
