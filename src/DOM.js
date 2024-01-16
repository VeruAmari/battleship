const DOM = () => {
  const makeBoard = (div, boardData, display) => {
    const data = Object.keys(boardData);
    const processAttack = () => {};
    data.forEach((key) => {
      const newSquare = document.createElement('div');
      newSquare.classList.add('square');
      newSquare.id = key;
      if (!display) {
        newSquare.addEventListener('click', () => {
          if (boardData[key].square.getShipID()) {
            newSquare.textContent = 'o';
            newSquare.classList.add('hit');
          } else {
            newSquare.textContent = 'x';
            newSquare.classList.add('miss');
          }

          processAttack();
        });
      }
      if (display) {
        if (boardData[key].square.getShipID()) {
          newSquare.classList.add('ship');
          newSquare.classList.add(`${boardData[key].square.getShipID()}`);
        } else {
          newSquare.classList.add('no-ship');
        }
      }
      // boardData[key]
      div.appendChild(newSquare);
    });
  };

  const p1Score = document.querySelector('.player-1.score>.score.num');
  const p2Score = document.querySelector('.player-2.score>.score.num');
  const player1Board = document.querySelector('.boards>.player-1');

  const player2Board = document.querySelector('.boards>.player-2');
  return { makeBoard, player1Board, player2Board, p1Score, p2Score };
};

export default DOM;
