import React, { Component } from 'react';
import { CELL_COLOUR } from './constants';
import { indexesToKey } from './helperFunctions';

export default class BoardCanvas extends Component {
  constructor(props) {
    super(props);
    this.lastX = 0;
    this.lastY = 0;
    this.canvasRef = React.createRef();
    this.visited = new Set();
    this.tileSize = props.tileSize;
    this.isPlaying = props.isPlaying;
    this.rerender = null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { boardState, isPlaying, changes, tileSize, rerender } = this.props;
    const reRender =
      tileSize !== this.tileSize || this.isPlaying !== isPlaying || rerender !== this.rerender;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!isPlaying) this.visited = new Set();
    if (!reRender && changes.length > 0) {
      changes.forEach(({ rowIndex, colIndex, alive, marked }) =>
        this.drawSquare(ctx, rowIndex, colIndex, alive, marked)
      );
    } else {
      this.rerender = rerender;
      this.tileSize = tileSize;
      this.isPlaying = isPlaying;
      this.clearBoard(ctx, canvas.width, canvas.height);
      boardState.forEach((row, x) => {
        row.forEach((alive, y) => {
          this.drawSquare(ctx, x, y, alive);
        });
      });
    }
  }

  getColour = (alive, marked, key) => {
    const { isPlaying, customShapeMarking } = this.props;
    if (alive) return CELL_COLOUR.living;
    if (customShapeMarking && marked) return CELL_COLOUR.customShapeMode;
    if (isPlaying && this.visited.has(key)) return CELL_COLOUR.visited;
    if (!isPlaying) return CELL_COLOUR.setup;
    return CELL_COLOUR.dead;
  };

  drawSquare = (ctx, x, y, alive, marked) => {
    const { isPlaying, tileSize } = this.props;
    const actualSize = isPlaying ? tileSize : tileSize - 1;
    const key = indexesToKey(x, y);
    if (alive && isPlaying) this.visited.add(key);
    ctx.fillStyle = this.getColour(alive, marked, key);
    ctx.fillRect(y * tileSize, x * tileSize, actualSize, actualSize);
  };

  clearBoard = (ctx, w, h) => ctx.clearRect(0, 0, w, h);

  handleMouse = e => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const offsetY = e.pageY - ctx.canvas.offsetTop;

    const offsetX = e.pageX - ctx.canvas.offsetLeft;
    const { onTileHover, isPlaying, rows, columns, tileSize } = this.props;
    const curX = (offsetX - (offsetX % tileSize)) / tileSize;

    const curY = (offsetY - (offsetY % tileSize)) / tileSize;

    if (
      !isPlaying &&
      (curX !== this.lastX || curY !== this.lastY) &&
      curX < columns &&
      curY < rows
    ) {
      onTileHover(curY, curX);
      this.lastY = curY;
      this.lastX = curX;
    }
  };

  render() {
    const { rows, columns, isPlaying, onClick, removePreview, tileSize } = this.props;
    return (
      <canvas
        id="boardCanvas"
        ref={this.canvasRef}
        width={columns * tileSize}
        height={rows * tileSize}
        onMouseMove={this.handleMouse}
        onMouseLeave={removePreview}
        onClick={() => {
          if (!isPlaying) {
            onClick();
          }
        }}
      />
    );
  }
}
