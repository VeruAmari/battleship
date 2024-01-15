const player = (name) => {
  const playerName = name;

  const movesMade = {};
  const moves = {};
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      moves[`${i},${j}`] = true;
    }
  }
  const validMove = (move) => {
    if (moves[move]) {
      if (!movesMade[move]) {
        movesMade[move] = true;
        return move;
      }
      return false;
    }
    return false;
  };
  const computerMakeMove = () => {
    const computerMoves = Object.keys(moves);
    let valid = false;
    let chosenMove;
    while (!valid) {
      const moveIndex = Math.floor(Math.random() * computerMoves.length);
      chosenMove = computerMoves[moveIndex];
      if (!movesMade[chosenMove]) {
        valid = true;
      }
    }
    return chosenMove;
  };
  const getPlayer = () => playerName;

  return { getPlayer, validMove, computerMakeMove };
};

export default player;
