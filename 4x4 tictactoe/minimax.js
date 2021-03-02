function optimalMove() {
  // AI to make its turn
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      // Is the spot available?
      if (board[i][j] == 'e') {
        board[i][j] = bot;
        let score = minimax(board, 0, false);
        board[i][j] = 'e';
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  board[move.i][move.j] = bot;
  currentPlayer = player;
}

let scores = {
  X: 10,
  O: -10,
  tie: 0
};

function minimax(board, depth, isMaximizing) {
  let result = checkWinner();
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == 'e') {
          board[i][j] = bot;
          let score = minimax(board, depth + 1, false);
          board[i][j] = 'e';
          bestScore = max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == 'e') {
          board[i][j] = player;
          let score = minimax(board, depth + 1, true);
          board[i][j] = 'e';
          bestScore = min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}
