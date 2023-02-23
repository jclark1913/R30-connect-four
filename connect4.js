"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    Updates board array to include HEIGHT # of subarrays and WIDTH # of items long
 *    Example: With default values for WIDTH and HEIGHT, board becomes an array of (6) subarrays,
 *    each of which contain (7) items.
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {

  // Generates memory board according to WIDTH and HEIGHT
  for (let y = 0; y < HEIGHT; y++) {
    board[y] = [];
    for (let x = 0; x < WIDTH; x++) {
      board[y][x] = undefined;
    }
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const htmlBoard = document.getElementById('board');

  // Creates tr element for top row and adds handleClick event listener
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // Populates top row with table data cells and adds an id attribute for each
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", `top-${x}`);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      // Creates a table cell variable called cell
      const cell = document.createElement("td");

      // Adds an id attribute for each cell (c-y-x)
      // you'll use this later, so make sure you use c-y-x
      cell.setAttribute("id", `c-${y}-${x}`);

      // Appends cell to row
      row.appendChild(cell);
    }
    // Appends row to htmlBoard
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return bottom empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 5
  for (let y = 5; y >= 0; y--) {
    if (board[y][x] === undefined) {
      return y;
    }
  }
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {

  // Get piece location & create game piece
  const pieceLocation = document.getElementById(`c-${y}-${x}`);
  const gamePiece = document.createElement('div');

  // Add CSS classes for piece & player
  gamePiece.classList.add('piece');
  gamePiece.classList.add(`p${currPlayer}`);

  // Append game piece to correct location on board
  pieceLocation.appendChild(gamePiece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  // KNOWN ISSUE: Will NOT work if WIDTH > 9
  let x = parseInt((evt.target.id)[4]);


  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // Updates memory board with player selection

  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  if (board.every(cell => cell === 1 || cell === 2)) {
    return endGame("It's a tie!");
  }

  // switch players
  // Switches players each time function is called
  if (currPlayer > 1) {
    currPlayer = 1;
  } else {
    currPlayer = 2;
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    // TODO: Check four cells to see if they're all legal & all color of current
    // player

  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // Assigns win conditions
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDL = [[y, x], [y - 1, x - 1], [y - 2, x - 2], [y - 3, x - 3]];
      let diagDR = [[y, x], [y - 1, x + 1], [y - 2, x + 2], [y - 3, x + 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        console.log("winner")
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
