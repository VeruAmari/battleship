const DOM = () => {
  const makeBoard = (div, boardData, display, cb) => {
    // BoardData is an array containingall squares

    const data = Object.keys(boardData);

    data.forEach((key) => {
      const newSquare = document.createElement('div');
      newSquare.classList.add('square');
      if (display) {
        newSquare.id = `p1-${key}`;
      } else {
        newSquare.id = `p2-${key}`;
      }
      newSquare.classList.add(key);

      /* if (!display) {
        newSquare.addEventListener('click', () => {
          if (boardData[key].square.getShipID()) {
            newSquare.textContent = 'o';
            newSquare.classList.add('hit');
          } else {
            newSquare.textContent = 'x';
            newSquare.classList.add('miss');
          }
        });
      } */

      if (cb) {
        newSquare.addEventListener('click', () => {
          cb(key);
        });
      }
      if (display) {
        if (boardData[key].square.getShipID()) {
          newSquare.classList.add('has-ship');
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
  const updateP1Score = (newScore) => {
    p1Score.textContent = newScore;
  };
  const updateP2Score = (newScore) => {
    p2Score.textContent = newScore;
  };
  const updateBoardPlayer = (coords, status) => {
    document.getElementById(`p1-${coords}`).classList.add(status);
  };
  const updateBoardCom = (coords, status) => {
    document.getElementById(`p2-${coords}`).classList.add(status);
  };

  return {
    makeBoard,
    player1Board,
    player2Board,
    updateP1Score,
    updateP2Score,
    updateBoardCom,
    updateBoardPlayer,
  };
};

export default DOM;