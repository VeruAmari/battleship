/* eslint-disable no-loop-func */
import shipFactory from './shipFact';

/* eslint no-plusplus: off */
const gameboard = (start) => {
  const graph = () => {
    const moves = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ];
    const vertex = (x, y) => {
      const coordinates = [x, y];
      const statusOptions = ['empty', 'ship', 'miss', 'hit'];
      const status = ['empty'];
      const setStatus = (newStatus) => {
        if (statusOptions.includes(newStatus)) {
          status[0] = newStatus;
        }
      };
      const getStatus = () => status[0];
      // eslint-disable-next-line prefer-const
      let shipID = null;
      const setShipID = (newID) => {
        shipID = newID;
      };
      const getShipID = () => shipID;
      return { coordinates, setShipID, getShipID, setStatus, getStatus };
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
        adjacency[key].square = vertexList[key];
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

  const makeShips = (size, amount, id) => {
    const myShips = {};
    for (let i = 0; i < amount; i++) {
      myShips[`${id + (i + 1)}`] = shipFactory(size);
    }
    return myShips;
  };
  const makeShipList = () => {
    /** Rules:
     * No. 	Class of ship 	Size
        1 	Carrier 	      5
        2 	Battleship    	4
        3 	Destroyer 	    3
        4 	Submarine 	    3
        5 	Patrol Boat 	  2 
     */
    const rules = {
      c: { size: 5, amount: 1 },
      b: { size: 4, amount: 2 },
      d: { size: 3, amount: 3 },
      s: { size: 3, amount: 4 },
      pb: { size: 2, amount: 5 },
    };

    const shipList = {
      ...makeShips(rules.c.size, rules.c.amount, 'c'),
      ...makeShips(rules.b.size, rules.b.amount, 'b'),
      ...makeShips(rules.d.size, rules.d.amount, 'd'),
      ...makeShips(rules.s.size, rules.s.amount, 's'),
      ...makeShips(rules.pb.size, rules.pb.amount, 'pb'),
    };

    return shipList;
  };

  const placeShips = (shipList, boardSurface) => {
    Object.keys(shipList).forEach((ship) => {
      const shipLength = shipList[ship].length();

      const directions = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
      ];
      let placed = false;
      while (!placed) {
        const randomTileKey =
          Object.keys(boardSurface)[
            Math.floor(Math.random() * Object.keys(boardSurface).length)
          ];
        directions.forEach((direction) => {
          if (!placed) {
            // Check if there is an obstruction
            let availableSpaces = 0;
            for (let i = 0; i < shipLength; i++) {
              const a = direction[0] * (shipLength - i);
              const b = direction[1] * (shipLength - i);
              const keyWithABi = `${Number(randomTileKey[0]) + a},${
                Number(randomTileKey[2]) + b
              }`;
              // The space is inside of the board
              if (boardSurface[keyWithABi]) {
                if (!boardSurface[keyWithABi].square.getShipID()) {
                  availableSpaces += 1;
                } else {
                  break;
                }
              } else {
                break;
              }
            }
            if (availableSpaces === shipLength) {
              for (let i = 0; i < shipLength; i++) {
                const a = direction[0] * (shipLength - i);
                const b = direction[1] * (shipLength - i);
                const keyWithABi = `${Number(randomTileKey[0]) + a},${
                  Number(randomTileKey[2]) + b
                }`;
                boardSurface[keyWithABi].square.setShipID(ship);
                boardSurface[keyWithABi].square.setStatus('ship');
              }
              placed = true;
            }
          }
        });
      }
    });
  };
  const ships = makeShipList();
  const gameGraph = graph();
  const board = gameGraph.adjacencyList(
    gameGraph.defineVertices(),
    gameGraph.moves,
  );

  if (start) {
    placeShips(ships, board);
  }
  // Must write receiveAttack function.
  const receiveAttack = (coords) => {
    const status = board[coords].square.getStatus();
    if (status === 'ship') {
      board[coords].square.setStatus('hit');
      const ship = board[coords].square.getShipID();
      ships[ship].hit();
      return true;
    }
    if (status === 'empty') {
      board[coords].square.setStatus('miss');
      return true;
    }
    return false;
  };

  const allShipsSunk = () => {
    let sunkenShips = 0;
    Object.keys(ships).forEach((ship) => {
      if (ships[ship].isSunk()) {
        sunkenShips += 1;
      }
    });
    return sunkenShips === 15;
  };
  const hitAll = () => {
    Object.keys(board).forEach((sqr) => {
      receiveAttack(sqr);
    });
  };

  return { board, ships, receiveAttack, allShipsSunk, hitAll };
};

export default gameboard;
