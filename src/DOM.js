const DOM = () => {
  const makeBoard = (div, boardData, mode, cb) => {
    // eslint-disable-next-line no-param-reassign
    div.textContent = '';
    const data = Object.keys(boardData);

    data.forEach((key) => {
      const newSquare = document.createElement('div');
      newSquare.classList.add('square');
      if (mode) {
        newSquare.id = `p1-${key}`;
      } else {
        newSquare.id = `p2-${key}`;
      }
      newSquare.classList.add(key);

      if (cb) {
        newSquare.addEventListener('click', () => {
          console.log(cb(key));
        });
      }

      if (mode === 'auto') {
        newSquare.addEventListener('click', () => {
          if (cb(key)) {
            makeBoard(div, boardData, mode, cb);
          }
        });
      }

      if (mode) {
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
  const player1BoardPlacement = document.querySelector(
    '.ship.placement>.player-1',
  );

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
  const hideBoardPlacement = () => {
    const shipPlacement = document.querySelector('.ship.placement');
    shipPlacement.textContent = '';
    shipPlacement.classList.add('hid');
  };
  const displayVictory = (player) => {
    const victoryScreen = document.querySelector('.victory.screen');
    const victoryText = document.querySelector('.victory.screen .text');
    victoryText.textContent = `${player} wins!`;
    victoryScreen.classList.toggle('hid');
  };
  const getDirection = (valids, dirs, placeFunc, updFn) => {
    document.querySelector('.ship.direction').classList.remove('hid');
    valids.forEach((dir) => {
      function abc() {
        document.querySelector('.ship.direction').classList.add('hid');
        valids.forEach((element) => {
          const arrow = document.querySelector(`#${element}`);
          arrow.replaceWith(arrow.cloneNode(true));
        });
        placeFunc(dirs[dir]);
        updFn();
        return dir;
      }
      document.querySelector(`#${dir}`).addEventListener('click', abc);
    });
  };
  return {
    getDirection,
    hideBoardPlacement,
    makeBoard,
    player1Board,
    player1BoardPlacement,
    player2Board,
    updateP1Score,
    updateP2Score,
    updateBoardCom,
    updateBoardPlayer,
    displayVictory,
  };
};

export default DOM;
