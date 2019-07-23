import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography/Typography";

const aboutText = `The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.
The game is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves, or, for advanced players, by creating patterns with particular properties.`;

export default function() {
  return (
    <Fragment>
      <Typography variant="body2">{aboutText}</Typography>
      <br />
      <Typography variant="subtitle1">Rules:</Typography>
      <Typography variant="body2">
        The universe of the Game of Life is an infinite, two-dimensional
        orthogonal grid of square cells, each of which is in one of two possible
        states, alive or dead, (or populated and unpopulated, respectively).
        Every cell interacts with its eight neighbours, which are the cells that
        are horizontally, vertically, or diagonally adjacent.
        <br />
        At each step in time, the following transitions occur:
        <br />
        1. Any live cell with fewer than two live neighbors dies, as if by
        underpopulation.
        <br />
        2. Any live cell with two or three live neighbors lives on to the next
        generation.
        <br />
        3. Any live cell with more than three live neighbors dies, as if by
        overpopulation.
        <br />
        4. Any dead cell with exactly three live neighbors becomes a live cell,
        as if by reproduction.
        <br />
        The initial pattern constitutes the seed of the system. The first
        generation is created by applying the above rules simultaneously to
        every cell in the seed; births and deaths occur simultaneously, and the
        discrete moment at which this happens is sometimes called a tick. Each
        generation is a pure function of the preceding one. The rules continue
        to be applied repeatedly to create further generations.
      </Typography>
      <br />
      <Typography variant="body2">
        Read more about it on &nbsp;
        <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
          Wikipedia
        </a>
      </Typography>
    </Fragment>
  );
}
