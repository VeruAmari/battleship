const player = (name) => {
  const playerName = name;
  let score = 0;
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
        movesMade[chosenMove] = true;
        valid = true;
      }
    }
    return chosenMove;
  };
  const getPlayer = () => playerName;
  const getScore = () => score;
  const updateScore = () => {
    score += 1;
  };
  return { getPlayer, validMove, computerMakeMove, getScore, updateScore };
};

export default player;
