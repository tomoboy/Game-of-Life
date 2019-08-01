import React, { useState } from "react";
import Typography from "@material-ui/core/Typography/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import { Close } from "@material-ui/icons";
const aboutText = `The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.
The game is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves, or, for advanced players, by creating patterns with particular properties.`;

export default () => {
  const [aboutOpen, setAboutOpen] = useState<boolean>(false);

  const closeAboutWindow = () => {
    setAboutOpen(false);
  };
  return (
    <>
      <Button
        size="small"
        mini
        variant="outlined"
        onClick={() => {
          setAboutOpen(true);
        }}
      >
        About
      </Button>
      <Dialog open={aboutOpen} onClose={closeAboutWindow}>
        <DialogTitle>
          <Grid container alignItems="stretch" justify="space-between">
            <Typography variant="h6"> About the Game of Life </Typography>
            <IconButton aria-label="Close" onClick={closeAboutWindow}>
              <Close />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">{aboutText}</Typography>
          <br />
          <Typography variant="subtitle1">Rules:</Typography>
          <Typography variant="body2">
            The universe of the Game of Life is an infinite, two-dimensional
            orthogonal grid of square cells, each of which is in one of two
            possible states, alive or dead, (or populated and unpopulated,
            respectively). Every cell interacts with its eight neighbours, which
            are the cells that are horizontally, vertically, or diagonally
            adjacent.
            <br />
            At each step in time, the following transitions occur:
            <br />
            1. Any live cell with fewer than two live neighbors dies, as if by
            underpopulation.
            <br />
            2. Any live cell with two or three live neighbors lives on to the
            next generation.
            <br />
            3. Any live cell with more than three live neighbors dies, as if by
            overpopulation.
            <br />
            4. Any dead cell with exactly three live neighbors becomes a live
            cell, as if by reproduction.
            <br />
            The initial pattern constitutes the seed of the system. The first
            generation is created by applying the above rules simultaneously to
            every cell in the seed; births and deaths occur simultaneously, and
            the discrete moment at which this happens is sometimes called a
            tick. Each generation is a pure function of the preceding one. The
            rules continue to be applied repeatedly to create further
            generations.
          </Typography>
          <br />
          <Typography variant="body2">
            Read more about it on &nbsp;
            <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
              Wikipedia
            </a>
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};
