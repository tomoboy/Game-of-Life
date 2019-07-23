import React, { Component } from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import tick from "../gameLogic";
import { DRAWER_WIDTH } from "../constants";
import createEmptyBoardState from "../createEmptyBoardState";
import BoardCanvas from "./BoardCanvas";

const styles = theme => ({
  content: {
    flexGrow: 1,
    marginTop: "75px",
    padding: theme.spacing.unit * 2,
    backgroundColor: "snow",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -DRAWER_WIDTH
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
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

  componentWillReceiveProps(
    { rows, columns, previewShape, newGame, customShapeMode },
    _
  ) {
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
      .filter(
        ({ alive, rowIndex, colIndex }) =>
          alive !== boardState[rowIndex][colIndex]
      )
      .map(({ rowIndex, colIndex }) => ({
        alive: boardState[rowIndex][colIndex],
        rowIndex,
        colIndex
      }));
  };

  previewShape = shape => {
    const { rows, columns } = this.state;

    const { customShapeMode } = this.props;
    if (customShapeMode) {
      return;
    }
    const newChanges = this.changesDifferentFromBoard();
    const startI = Math.floor(rows / 2) - shape.xMin;

    const startJ = Math.floor(columns / 2) - shape.yMin;

    for (let i = startI - 1, k = -1; i <= startI + shape.rows; i++, k++) {
      for (let j = startJ - 1, h = -1; j <= startJ + shape.columns; j++, h++) {
        const alive =
          i >= startI &&
          i < startI + shape.rows &&
          j >= startJ &&
          j < startJ + shape.columns &&
          shape.pattern[k][h];
        const c = newChanges.find(
          ({ rowIndex, colIndex }) => rowIndex === i && colIndex === j
        );
        if (typeof c !== "undefined") {
          c.alive = alive;
        } else {
          newChanges.push({ rowIndex: i, colIndex: j, alive });
        }
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

  onTileHover = (x, y) => {
    const { boardState } = this.state;

    const { selectedShape, customShapeMode } = this.props;
    if (customShapeMode) {
      return this.markCustomShape(x, y);
    }
    if (!selectedShape) {
      return {};
    }

    const startI = x - selectedShape.xMin;

    const startJ = y - selectedShape.yMin;
    const newChanges = this.changesDifferentFromBoard();

    for (let i = startI, k = 0; i < startI + selectedShape.rows; i++, k++) {
      for (
        let j = startJ, h = 0;
        j < startJ + selectedShape.columns;
        j++, h++
      ) {
        const ii = this.wrap(i, boardState);

        const jj = this.wrap(j, boardState[0]);
        const c = newChanges.find(
          ({ rowIndex, colIndex }) => rowIndex === ii && colIndex === jj
        );
        if (typeof c !== "undefined") {
          c.alive = selectedShape.pattern[k][h];
        } else {
          newChanges.push({
            rowIndex: ii,
            colIndex: jj,
            alive: selectedShape.pattern[k][h]
          });
        }
      }
    }
    this.setState({ changes: newChanges });
  };

  onTick = () => {
    const { boardState, rows, columns } = this.state;
    const { newBoard, changes } = tick(
      boardState,
      createEmptyBoardState(rows, columns)
    );
    this.setState({ boardState: newBoard, changes });
  };
  render() {
    console.log("rendering board");
    const {
      classes,
      isPlaying,
      tileSize,
      reportError,
      setCustomShapeMode,
      rerender
    } = this.props;

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
