// import player from './player';
import gameboard from './gameboard';
import DOM from './DOM';

const playerGameboard = gameboard(true);
const computerGameboard = gameboard(true);

const dom = DOM();

dom.makeBoard(dom.player1Board, playerGameboard.board, true);

dom.makeBoard(dom.player2Board, computerGameboard.board);

console.log('Gamelup ran');
