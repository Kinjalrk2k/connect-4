# connect-4

> Connect Four (also known as Connect 4, Four Up, Plot Four, Find Four, Captain's Mistress, Four in a Row, Drop Four, and Gravitrips in the Soviet Union) is a two-player connection board game, in which the players choose a color and then take turns dropping colored tokens into a seven-column, six-row vertically suspended grid. The pieces fall straight down, occupying the lowest available space within the column. The objective of the game is to be the first to form a horizontal, vertical, or diagonal line of four of one's own tokens. Connect Four is a solved game. The first player can always win by playing the right moves.
> [Connect Four, Wikipedia](https://en.wikipedia.org/wiki/Connect_Four)

## Install

```sh
npm install
```

## Run

```sh
npm start
```

## Setting Up

### Constants

Currently the following constants can be set up:

- `CONNECT_TO_WIN`: The number of coins to be connected vertically, horizontally or diagonally to win a game
- `ROWS`: Rows in the game board
- `COLS`: Columns in the game board

### RandomPlay

Tweak the code in `app.js` to set the variable `randomPlay` as `true`. This is set up RandomPlay. Then the game proceeds randomly, without any user's input
