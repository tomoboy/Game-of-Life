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

    componentWillReceiveProps({boardState, isPlaying}, context){
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0 , 0, canvas.width, canvas.height);
        if (!isPlaying) this.visited = new Set();
        boardState.forEach((row, x) => {
            row.forEach((alive, y) => {
                const key = `${x},${y}`;
                if (alive && isPlaying) this.visited.add(key);
                ctx.fillStyle = this.getColour(alive, key);
                ctx.fillRect(y * 10, x * 10, 9, 9);
            })
        });
    }

    handleMouse = e => {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        const offsetY = e.pageY -  ctx.canvas.offsetTop, offsetX = e.pageX - ctx.canvas.offsetLeft;
        const {onTileHover, isPlaying, rows, columns} = this.props;

        const currentX = (offsetX - (offsetX % 10))/10, currentY = (offsetY - (offsetY % 10))/10;
        if (!isPlaying && (currentX !== this.lastX || currentY !== this.lastY)
            && currentX < columns && currentY < rows){
            onTileHover(currentY, currentX)
        }
        this.lastY = currentY;
        this.lastX = currentX;
    };

    render(){
        let {rows, columns, isPlaying, onClick, removePreview} = this.props;
        return (
            <canvas
                id='boardCanvas'
                ref={this.canvasRef}
                width={columns * 10}
                height={rows * 10}
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