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
const placement = (cell) => {
  // Ask for directional input
  const validDirections = Object.keys(
    playerGameboard.board[cell].adjacents,
  ).map((key) => {
    if (cell[0] > key[0]) {
      return 'up';
    }
    if (cell[0] < key[0]) {
      return 'down';
    }
    if (cell[2] < key[2]) {
      return 'right';
    }
    return 'left';
  });

  UI.getDirection(validDirections);
  // player1BoardPlacement;
  return false;
};
// Initialize game boards visuals
UI.makeBoard(UI.player1Board, playerGameboard.board, 'placement');
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
