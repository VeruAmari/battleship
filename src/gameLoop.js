// import player from './player';
import gameboard from './gameboard';
import DOM from './DOM';
import player from './player';

// Initialize gameboards data and players data
const playerGameboard = gameboard(true);
const computerGameboard = gameboard(true);
const p1 = player('Player 1');
const com = player('Computer');

const UI = DOM();

const playRound = async (playerInput) => {
  const p1ChosenCoords = await p1.validMove(playerInput);
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
      await playerGameboard.board[comChosenCoords].square.getStatus();
    const comBoardStatus =
      await computerGameboard.board[p1ChosenCoords].square.getStatus();
    UI.updateBoardPlayer(comChosenCoords, p1BoardStatus);
    UI.updateBoardCom(p1ChosenCoords, comBoardStatus);
  }
};
// Initialize game boards visuals
UI.makeBoard(UI.player1Board, playerGameboard.board, true);
UI.makeBoard(UI.player2Board, computerGameboard.board, false, playRound);

console.log('Gameloop ran');

// What does a loop look like?
// 1- Game initializes
// 2- Watch for player input
// 3- When player inputs, check for validity
// 4- If valid, perform attack on data, update UI.
// 5- Run computers turn, go back to step 2.
