
let board = [
  ['e', 'e', 'e', 'e'],
  ['e', 'e', 'e', 'e'],
  ['e', 'e', 'e', 'e'],
  ['e', 'e', 'e', 'e']
];

let w; // = width / 4;
let h; // = height / 4;

let bot = 'X';
let player = 'O';
let currentPlayer = player;

function setup() {
  createCanvas(800, 800);
  w = width / 4;
  h = height / 4;
  optimalMove();
}

function checkEqual(a, b, c) {
  return a == b && b == c && a != 'e';
}

function checkWinner() {
  let winner = null;

  // horizontal
  for (let i = 0; i < 4; i++) {
    if (checkEqual(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
    else if (checkEqual(board[i][1], board[i][2], board[i][3])) {
      winner = board[i][1];
    }
  }

  // Vertical
  for (let i = 0; i < 4; i++) {
    if (checkEqual(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
    else if (checkEqual(board[1][i], board[2][i], board[3][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (checkEqual(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (checkEqual(board[1][1], board[2][2], board[3][3])) {
    winner = board[1][1];
  }
  if (checkEqual(board[3][0], board[2][1], board[1][2])) {
    winner = board[3][0];
  }
  if (checkEqual(board[2][1], board[1][2], board[0][3])) {
    winner = board[2][1];
  }
  if (checkEqual(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }
  if (checkEqual(board[0][1], board[1][2], board[2][3])) {
    winner = board[0][1];
  }
  if (checkEqual(board[1][0], board[2][1], board[3][2])) {
    winner = board[1][0];
  }
  if (checkEqual(board[3][1], board[2][2], board[1][3])) {
    winner = board[3][1];
  }


  let openSpots = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] == 'e') {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

function mousePressed() {
  if (currentPlayer == player) {
    // Human make turn
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    // If valid turn
    if (board[i][j] == 'e') {
      board[i][j] = player;
      currentPlayer = bot;
      optimalMove();
    }
  }
}

function draw() {
  background(225);
  strokeWeight(5);

  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(w * 3, 0, w * 3, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);
  line(0, h * 3, width, h * 3);
//come back to fix this
  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 4; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      textSize(32);
      let r = w / 4;
      if (spot == player) {
        noFill();
        ellipse(x, y, r * 2);
      } else if (spot == bot) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }

  let result = checkWinner();
  if (result != null) {
    noLoop();
    let resultP = createP('');
    resultP.style('font-size', '32pt');
    if (result == 'tie') {
      resultP.html('Tie!');
    } else {
      resultP.html(`${result} wins!`);
    }
  }
}
