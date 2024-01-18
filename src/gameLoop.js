// import player from './player';
import gameboard from './gameboard';
import DOM from './DOM';
import player from './player';

// Initialize gameboards data and players data
const playerGameboard = gameboard();
const computerGameboard = gameboard(true);
const p1 = player('Player 1');
const com = player('Computer');

const UI = DOM();

const playRound = (playerInput) => {
  const p1ChosenCoords = p1.validMove(playerInput);
  if (p1ChosenCoords) {
    const comChosenCoords = com.computerMakeMove();
    const playerAttack = computerGameboard.receiveAttack(p1ChosenCoords);

    if (playerAttack) {
      p1.updateScore();
    }
    if (computerGameboard.allShipsSunk()) {
      UI.displayVictory(p1.getPlayer());
    }
    // Updates board square status at specified coord
    const comAttack = playerGameboard.receiveAttack(comChosenCoords);
    if (comAttack) {
      com.updateScore();
    }
    if (playerGameboard.allShipsSunk() && !computerGameboard.allShipsSunk()) {
      UI.displayVictory(com.getPlayer());
    }

    UI.updateP1Score(p1.getScore());
    UI.updateP2Score(com.getScore());
    const p1BoardStatus =
      playerGameboard.board[comChosenCoords].square.getStatus();
    const comBoardStatus =
      computerGameboard.board[p1ChosenCoords].square.getStatus();
    UI.updateBoardPlayer(comChosenCoords, p1BoardStatus);
    UI.updateBoardCom(p1ChosenCoords, comBoardStatus);
  }
};

const shipKeys = Object.keys(playerGameboard.ships);

const placement = (cell) => {
  // Ask for directional input
  if (shipKeys.length <= 0) {
    UI.hideBoardPlacement();
    UI.makeBoard(UI.player1Board, playerGameboard.board, 'manual');

    return false;
  }
  const currentShipKey = shipKeys.pop();

  const placingShip = playerGameboard.placeShipManually(
    playerGameboard.ships,
    currentShipKey,
    playerGameboard.board,
    cell,
  );

  const valids = placingShip.getValidDirections();
  if (!valids) {
    shipKeys.push(currentShipKey);
  }

  const dirsDict = {};
  const validDirectionsToWords = valids.map((dir) => {
    if (dir[0] === 1) {
      dirsDict.down = dir;
      return 'down';
    }
    if (dir[0] === -1) {
      dirsDict.up = dir;
      return 'up';
    }
    if (dir[1] === 1) {
      dirsDict.right = dir;
      return 'right';
    }
    if (dir[1] === -1) {
      dirsDict.left = dir;
      return 'left';
    }
    return false;
  });
  if (validDirectionsToWords.length > 0) {
    const update = () => {
      UI.makeBoard(
        UI.player1BoardPlacement,
        playerGameboard.board,
        'placement',
        placement,
      );
    };
    UI.getDirection(
      validDirectionsToWords,
      dirsDict,
      placingShip.placeShip,
      update,
    );
  } else {
    UI.hideBoardPlacement();
    UI.makeBoard(UI.player1Board, playerGameboard.board, 'manual');
  } // Else, hide placing UI and start game
  return true;
};
// Initialize game boards visuals
UI.makeBoard(UI.player1Board, playerGameboard.board, 'manual');
UI.makeBoard(
  UI.player1BoardPlacement,
  playerGameboard.board,
  'placement',
  placement,
);
UI.makeBoard(UI.player2Board, computerGameboard.board, 'computer', playRound);

// What does a loop look like?
// 1- Game initializes
// 2- Watch for player input
// 3- When player inputs, check for validity
// 4- If valid, perform attack on data, update UI.
// 5- Run computers turn, go back to step 2.
