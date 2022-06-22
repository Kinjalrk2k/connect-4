const chalk = require("chalk");
const prompt = require("prompt-sync")({ sigint: true });

/**
 * Constants for the game
 */
const CONNECT_TO_WIN = 4;
const ROWS = 6;
const COLS = 5;

const centralPoint = [0, 0];

/**
 * Computing all possible point offsets w.r.t to the inserted point
 */
const winnablePointsE = [];
winnablePointsE.push(centralPoint);
for (let i = 1; i < CONNECT_TO_WIN; i++) {
  const point = [centralPoint[0] + i, centralPoint[1]];
  winnablePointsE.push(point);
}

const winnablePointsW = [];
winnablePointsW.push(centralPoint);
for (let i = 1; i < CONNECT_TO_WIN; i++) {
  const point = [centralPoint[0] - i, centralPoint[1]];
  winnablePointsW.push(point);
}

const winnablePointsN = [];
winnablePointsN.push(centralPoint);
for (let i = 1; i < CONNECT_TO_WIN; i++) {
  const point = [centralPoint[0], centralPoint[1] - i];
  winnablePointsN.push(point);
}

const winnablePointsS = [];
winnablePointsS.push(centralPoint);
for (let i = 1; i < CONNECT_TO_WIN; i++) {
  const point = [centralPoint[0], centralPoint[1] + i];
  winnablePointsS.push(point);
}

const winnablePointsSE = [];
winnablePointsSE.push(centralPoint);
for (let i = 1; i < CONNECT_TO_WIN; i++) {
  const point = [centralPoint[0] + i, centralPoint[1] + i];
  winnablePointsSE.push(point);
}

const winnablePointsNW = [];
winnablePointsNW.push(centralPoint);
for (let i = 1; i < CONNECT_TO_WIN; i++) {
  const point = [centralPoint[0] - i, centralPoint[1] - i];
  winnablePointsNW.push(point);
}

const winnablePointsNE = [];
winnablePointsNE.push(centralPoint);
for (let i = 1; i < CONNECT_TO_WIN; i++) {
  const point = [centralPoint[0] + i, centralPoint[1] - i];
  winnablePointsNE.push(point);
}

const winnablePointsSW = [];
winnablePointsSW.push(centralPoint);
for (let i = 1; i < CONNECT_TO_WIN; i++) {
  const point = [centralPoint[0] - i, centralPoint[1] + i];
  winnablePointsSW.push(point);
}

const winnablePoints = [
  winnablePointsN,
  winnablePointsS,
  winnablePointsE,
  winnablePointsW,
  winnablePointsSE,
  winnablePointsNW,
  winnablePointsNE,
  winnablePointsSW,
];

/**
 * Initialize the board with the passed numbers of rows and cols.
 * Initially all the cells are zero.
 * The board matrix is column major
 * @param {number[]} board
 * @param {number} rows
 * @param {number} cols
 */
const initBoard = (board, rows, cols) => {
  for (let i = 0; i < cols; i++) {
    board.push(Array(rows).fill(0));
  }
};

/**
 * Print the board with Box drawing characters and numbers
 * @param {number[][]} board
 */
const printBoard = (board) => {
  const cols = board.length;
  const rows = board[0].length;

  // first row
  process.stdout.write(`╔`);
  for (let j = 0; j < cols; j++) {
    process.stdout.write(`═`);
    process.stdout.write(`═`);
    process.stdout.write(`═`);
    process.stdout.write(`═`);
    process.stdout.write(`╦`);
  }
  process.stdout.write(`\b╗`);
  console.log();

  process.stdout.write(`║`);
  for (let j = 0; j < cols; j++) {
    process.stdout.write(
      chalk.green.bold(` ${String(j + 1).padStart(2, " ")} `)
    );
    process.stdout.write(`║`);
  }
  process.stdout.write(`\b║`);
  console.log();

  process.stdout.write(`╚`);
  for (let j = 0; j < cols; j++) {
    process.stdout.write(`═`);
    process.stdout.write(`═`);
    process.stdout.write(`═`);
    process.stdout.write(`═`);
    process.stdout.write(`╩`);
  }
  process.stdout.write(`\b╝`);
  console.log();

  process.stdout.write(`┌`);
  for (let j = 0; j < cols; j++) {
    process.stdout.write(`─`);
    process.stdout.write(`─`);
    process.stdout.write(`─`);
    process.stdout.write(`─`);
    process.stdout.write(`┬`);
  }
  process.stdout.write(`\b┐`);
  console.log();

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      process.stdout.write(`│`);
      playerToColor(board[j][i]);
    }
    process.stdout.write(`│`);
    console.log();

    // not for the last row
    if (i !== rows - 1) {
      process.stdout.write(`├`);
      for (let j = 0; j < cols; j++) {
        process.stdout.write(`─`);
        process.stdout.write(`─`);
        process.stdout.write(`─`);
        process.stdout.write(`─`);
        process.stdout.write(`┼`);
      }
      process.stdout.write(`\b┤`);
      console.log();
    }
  }

  // last row
  process.stdout.write(`└`);
  for (let j = 0; j < cols; j++) {
    process.stdout.write(`─`);
    process.stdout.write(`─`);
    process.stdout.write(`─`);
    process.stdout.write(`─`);
    process.stdout.write(`┴`);
  }
  process.stdout.write(`\b┘`);
  console.log();

  console.log();
};

/**
 * ACTUAL LOGIC GOES HERE
 * Insert a coin in a specific column of the board
 * @param {number[][]} board
 * @param {number} col
 * @param {number} player
 * @returns
 */
const insertCoin = (board, col, player) => {
  const rows = board[0].length;
  let i,
    flag = false;
  for (i = rows - 1; i >= 0; i--) {
    if (board[col][i] === 0) {
      flag = true;
      break;
    }
  }

  if (!flag) {
    throw new Error("Overflow");
  } else {
    board[col][i] = player;
  }

  for (const pointsArray of winnablePoints) {
    try {
      // prettier-ignore
      const check = pointsArray.every((point) => board[col + point[0]][i + point[1]] === player)
      if (check) {
        return { winner: player, point: [col, i], winingPoints: pointsArray };
      }
    } catch (err) {
      if (err instanceof TypeError) {
        continue;
      }
    }
  }

  return { winner: 0, point: [], winingPoints: [] };
};

/**
 * Check if there's any more empty cells left in the board
 * @param {number[][]} board
 * @returns
 */
const isOverflow = (board) => {
  return !board.some((col) => col[0] === 0);
};

/**
 * Convert player number to color
 * 1 - Red
 * -1 - Yellow
 * @param {number} player
 */
const playerToColor = (player) => {
  switch (player) {
    case -1:
      process.stdout.write(chalk.yellow.bold(" ⬤  "));
      break;
    case 1:
      process.stdout.write(chalk.red.bold(" ⬤  "));
      break;
    default:
      process.stdout.write("    ");
  }
};

/**
 * MAIN
 */

let game = [];
initBoard(game, ROWS, COLS);
printBoard(game);

/**
 * Random Play!
 * If this is set to true, then the game proceeds randomly, without any
 * user's input (The game doesn't wait or sleep between moves)
 */
const randomPlay = false;

// Red starts
let player = 1;
while (true) {
  (async () => {
    let input;
    if (!randomPlay) {
      playerToColor(player);
      input = prompt(`Enter Column (1-${COLS}): `);
    } else {
      input = parseInt(Math.random() * COLS + 1);
    }

    const { winner, point, winingPoints } = insertCoin(game, input - 1, player);

    printBoard(game);

    // when we have a winner!
    if (winner !== 0) {
      playerToColor(player);
      process.stdout.write("wins!");
      console.log("\nGAME OVER");
      process.exit(0);
    }

    // when overflows
    if (isOverflow(game)) {
      console.log("No more spaces left!");
      console.log("GAME OVER");
      process.exit(0);
    }

    // switch players between moves
    player = player === 1 ? -1 : 1;
  })();
}
