import React, {Component} from 'react';
import {CELL_COLOUR} from "./constants";

export default class BoardCanvas extends Component{
    constructor(props) {
        super(props);
        this.lastX = 0;
        this.lastY = 0;
        this.canvasRef = React.createRef();
        this.visited = new Set();
    }

    getColour = (alive, key) => {
        const {isPlaying} = this.props;
        if (alive)
            return CELL_COLOUR.living;
        else if (isPlaying && this.visited.has(key))
            return CELL_COLOUR.visited;
        else if (!isPlaying)
            return CELL_COLOUR.setup;
        else
            return CELL_COLOUR.dead;
    };

    componentDidUpdate(prevProps, prevState){
        const {boardState, isPlaying, tileSize} = this.props;
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!isPlaying) this.visited = new Set();
        boardState.forEach((row, x) => {
            row.forEach((alive, y) => {
                const key = `${x},${y}`;
                if (alive && isPlaying) this.visited.add(key);
                ctx.fillStyle = this.getColour(alive, key);
                ctx.fillRect(y * tileSize, x * tileSize, tileSize - 1, tileSize - 1);
            })
        });
    }

    handleMouse = e => {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        const offsetY = e.pageY -  ctx.canvas.offsetTop, offsetX = e.pageX - ctx.canvas.offsetLeft;
        const {onTileHover, isPlaying, rows, columns, tileSize} = this.props;
        const currentX = (offsetX - (offsetX % tileSize))/tileSize, currentY = (offsetY - (offsetY % tileSize))/tileSize;
        if (!isPlaying && (currentX !== this.lastX || currentY !== this.lastY)
            && currentX < columns && currentY < rows){
            onTileHover(currentY, currentX);
            this.lastY = currentY;
            this.lastX = currentX;
        }
    };

    render(){
        let {rows, columns, isPlaying, onClick, removePreview, tileSize} = this.props;
        return (
            <canvas
                id='boardCanvas'
                ref={this.canvasRef}
                width={columns * tileSize}
                height={rows * tileSize}
                onMouseMove={this.handleMouse}
                onMouseLeave={removePreview}
                onClick={() => {
                    if (!isPlaying){
                        onClick();
                    }
                }}
            >
                </canvas>

        )
    }
}