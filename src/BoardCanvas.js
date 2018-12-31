import React, {Component} from 'react';

export default class BoardCanvas extends Component{
    constructor(props) {
        super(props);
        this.lastX = 0;
        this.lastY = 0;
    }

    componentWillReceiveProps({boardState}, context){
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        boardState.forEach((row, x) => row.forEach((alive, y) => {
            ctx.fillStyle = (alive) ? 'black' : 'lightgrey';
            ctx.fillRect(x * 10, y * 10, 9, 9);
        }))
    }

    handleMouse = e => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        const offsetY = e.pageY -  ctx.canvas.offsetTop;
        const offsetX = e.pageX - ctx.canvas.offsetLeft;
        const {onTileHover, isPlaying, rows, columns} = this.props;


        const currentX = (offsetX - (offsetX % 10))/10;
        const currentY = (offsetY - (offsetY % 10))/10;
        if (!isPlaying && (currentX !== this.lastX || currentY !== this.lastY)
        && currentX < rows && currentY < columns){
            onTileHover(currentX, currentY)
        }
        this.lastY = currentY;
        this.lastX = currentX;
    };

    render(){
        let {rows, columns, isPlaying, onClick} = this.props;
        return (
            <canvas
                id='boardCanvas'
                ref={'canvas'}
                width={columns * 10}
                height={rows * 10}
                onMouseMove={this.handleMouse}
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