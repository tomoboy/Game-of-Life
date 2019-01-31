import React, { Component } from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import tick from './gameLogic';
import { DRAWER_WIDTH } from './constants';
import createEmptyBoardState from './createEmptyBoardState';
import BoardCanvas from './BoardCanvas';
import NewShapeDialog from './NewShapeDialog';

const styles = theme => ({
  content: {
    flexGrow: 1,
    marginTop: '75px',
    padding: theme.spacing.unit * 2,
    backgroundColor: 'snow',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -DRAWER_WIDTH
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardState: createEmptyBoardState(props.rows, props.columns),
      rows: props.rows,
      columns: props.columns,
      marked1: null,
      marked2: null,
      customShapeDialogOpen: false,
      changes: []
    };
    props.setBoardfuncs(this.onTick);
  }

  componentWillReceiveProps({ rows, columns, previewShape, newGame, customShapeMode }, _) {
    // is called when hovering over a shape in sidebar
    const { marked1, changes } = this.state;

    if (rows !== this.state.rows || columns !== this.state.columns || newGame) {
      // make a new board
      this.newBoard(rows, columns);
    } else if (previewShape !== null) {
      // a new preview shape is hovered over
      this.previewShape(previewShape);
    } else if (!customShapeMode && marked1 !== null) {
      this.setState({
        marked1: null,
        changes: changes.map(({ rowIndex, colIndex, alive }) => ({
          rowIndex,
          colIndex,
          alive,
          marked: false
        }))
      });
    }
  }

  newBoard = (rows, columns) => {
    const { setNewGame } = this.props;

    this.setState({
      boardState: createEmptyBoardState(rows, columns),
      rows,
      columns,
      changes: []
    });
    setNewGame();
  };

  changesDifferentFromBoard = () => {
    const { boardState, changes } = this.state;
    return changes
      .filter(({ alive, rowIndex, colIndex }) => alive !== boardState[rowIndex][colIndex])
      .map(({ rowIndex, colIndex }) => ({
        alive: boardState[rowIndex][colIndex],
        rowIndex,
        colIndex,
        marked: false
      }));
  };

  previewShape = shape => {
    const { rows, columns } = this.state;

    const { customShapeMode } = this.props;
    if (customShapeMode) return;

    const newChanges = this.changesDifferentFromBoard();
    const startI = Math.floor(rows / 2) - shape.xMin;

    const startJ = Math.floor(columns / 2) - shape.yMin;

    for (let i = startI - 1, k = -1; i <= startI + shape.rows; i++, k++)
      for (let j = startJ - 1, h = -1; j <= startJ + shape.columns; j++, h++) {
        const alive =
          i >= startI &&
          i < startI + shape.rows &&
          j >= startJ &&
          j < startJ + shape.columns &&
          shape.pattern[k][h];
        const c = newChanges.find(({ rowIndex, colIndex }) => rowIndex === i && colIndex === j);
        if (typeof c !== 'undefined') {
          c.alive = alive;
        } else {
          newChanges.push({ rowIndex: i, colIndex: j, alive });
        }
      }
    this.setState({ changes: newChanges });
  };

  wrap = (index, board) => {
    if (index < 0) {
      return board.length + index;
    }
    if (index >= board.length) {
      return index - board.length;
    }
    return index;
  };

  onTileClick = () => {
    const { boardState, changes, marked1 } = this.state;

    const { newGame, customShapeMode } = this.props;
    if (customShapeMode) {
      if (marked1 === null) {
        this.setState({ marked1: changes.pop() });
      } else {
        this.setState({ marked2: changes.pop(), customShapeDialogOpen: true });
      }
    }
    if (!newGame) {
      changes.forEach(({ rowIndex, colIndex, alive }) => {
        boardState[rowIndex][colIndex] = alive;
      });
      this.setState({ boardState });
    }
  };

  markCustomShape = (i, j) => {
    const { marked1, boardState, changes } = this.state;
    const newChanges = changes
      .filter(change => change.marked)
      .map(({ rowIndex, colIndex, alive }) => ({
        rowIndex,
        colIndex,
        alive,
        marked: false
      }));
    if (marked1 === null) {
      newChanges.push({
        rowIndex: i,
        colIndex: j,
        marked: true,
        alive: boardState[i][j]
      });
    } else {
      let startI = marked1.rowIndex;
      let startJ = marked1.colIndex;
      let endI = i;
      let endJ = j;

      if (marked1.rowIndex > i) {
        startI = i;
        endI = marked1.rowIndex;
      }
      if (marked1.colIndex > j) {
        startJ = j;
        endJ = marked1.colIndex;
      }
      for (let ii = startI; ii <= endI; ii++) {
        for (let jj = startJ; jj <= endJ; jj++) {
          const c = newChanges.find(({ rowIndex, colIndex }) => rowIndex === ii && colIndex === jj);
          if (typeof c !== 'undefined') {
            c.marked = true;
          } else {
            newChanges.push({
              rowIndex: ii,
              colIndex: jj,
              marked: true,
              alive: boardState[ii][jj]
            });
          }
        }
      }
    }
    this.setState({ changes: newChanges });
  };

  onTileHover = (i, j) => {
    const { boardState } = this.state;

    const { selectedShape, customShapeMode } = this.props;
    if (customShapeMode) {
      return this.markCustomShape(i, j);
    }
    if (!selectedShape) return {};

    const startI = i - selectedShape.xMin;

    const startJ = j - selectedShape.yMin;
    const newChanges = this.changesDifferentFromBoard();

    for (let i = startI, k = 0; i < startI + selectedShape.rows; i++, k++)
      for (let j = startJ, h = 0; j < startJ + selectedShape.columns; j++, h++) {
        const ii = this.wrap(i, boardState);

        const jj = this.wrap(j, boardState[0]);
        const c = newChanges.find(({ rowIndex, colIndex }) => rowIndex === ii && colIndex === jj);
        if (typeof c !== 'undefined') {
          c.alive = selectedShape.pattern[k][h];
        } else {
          newChanges.push({
            rowIndex: ii,
            colIndex: jj,
            alive: selectedShape.pattern[k][h]
          });
        }
      }
    this.setState({ changes: newChanges });
  };

  onTick = () => {
    const { boardState, rows, columns } = this.state;
    const { newBoard, changes } = tick(boardState, createEmptyBoardState(rows, columns));
    this.setState({ boardState: newBoard, changes });
  };

  copyBoardState = (boardState, point1, point2) => {
    if (point1 === null || point2 === null) {
      return [[]];
    }

    const copiedState = [];
    let startI = point1.rowIndex;
    let endI = point2.rowIndex;
    let startJ = point1.colIndex;
    let endJ = point2.colIndex;
    if (startI > endI) {
      startI = endI;
      endI = point1.rowIndex;
    }
    if (startJ > endJ) {
      startJ = endJ;
      endJ = point1.colIndex;
    }
    for (let i = startI, k = 0; i < endI; i++, k++) {
      copiedState.push([]);
      for (let j = startJ, h = 0; j < endJ; j++, h++) {
        copiedState[k][h] = boardState[i][j];
      }
    }

    if (copiedState.length === 0) {
      copiedState.push([]);
    }
    return copiedState;
  };

  render() {
    const { classes, isPlaying, tileSize, reportError, setCustomShapeMode, rerender } = this.props;

    const {
      boardState,
      rows,
      columns,
      changes,
      marked1,
      customShapeDialogOpen,
      marked2
    } = this.state;
    const shape = this.copyBoardState(boardState, marked1, marked2);

    return (
      <div
        className={classNames(classes.content, {
          [classes.contentShift]: !isPlaying
        })}
      >
        {customShapeDialogOpen && (
          <NewShapeDialog
            reportError={reportError}
            shape={shape}
            open={customShapeDialogOpen}
            handleClose={() => {
              this.setState({ customShapeDialogOpen: false, marked1: null, marked2: null });
              setCustomShapeMode(false);
            }}
          />
        )}
        <BoardCanvas
          rows={rows}
          columns={columns}
          rerender={rerender}
          customShapeMarking={marked1 !== null}
          onTileHover={this.onTileHover}
          tileSize={tileSize}
          changes={changes}
          removePreview={() =>
            this.setState({
              changes: changes.map(({ rowIndex, colIndex }) => ({
                rowIndex,
                colIndex,
                alive: boardState[rowIndex][colIndex]
              }))
            })
          }
          boardState={boardState}
          isPlaying={isPlaying}
          onClick={this.onTileClick}
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Board);
