const board = document.getElementById('board');
const message = document.getElementById('message');
const buttons = document.getElementById('buttons');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let movesHistory = [];

// Create the Tic Tac Toe board
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.setAttribute('data-index', i);
  cell.addEventListener('click', handleCellClick);
  board.appendChild(cell);
}

function handleCellClick(event) {
  const index = event.target.getAttribute('data-index');

  if (gameBoard[index] === '' && gameActive) {
    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    checkWinner();
    togglePlayer();
    updateButtons();
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      displayWinner();
      return;
    }
  }

  if (!gameBoard.includes('')) {
    displayDraw();
  }
}

function displayWinner() {
  message.textContent = `Player ${currentPlayer} wins!`;
  createNewGameButton();
  gameActive = false;
}

function displayDraw() {
  message.textContent = 'It\'s a draw!';
  gameActive = false;
}

function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  movesHistory = [];
  message.textContent = '';
  updateBoard();
  updateButtons();
}


function updateBoard() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
    cell.textContent = gameBoard[index];
  });
}

function updateButtons() {
  buttons.style.display = gameActive ? 'block' : 'none';
}

function createNewGameButton() {
  const newGameButton = document.createElement('button');
  newGameButton.textContent = 'New Game';
  newGameButton.addEventListener('click', newGame);
  buttons.appendChild(newGameButton);
}

function newGame() {
  buttons.innerHTML = ''; // Clear buttons
  resetGame();
}
