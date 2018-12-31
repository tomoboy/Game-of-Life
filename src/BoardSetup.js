import React, { Component } from 'react'
import Grid from "@material-ui/core/Grid/Grid";
import Tile from "./Tile";
import {Stage, Layer} from 'react-konva';

export default class BoardSetup extends Component{
    constructor(props) {
        super(props);
        let {boardState, onTileHover, onTileClick, rectangles} = this.props;
        this.state = {boardState, onTileHover, onTileClick, rectangles};
    }

    componentWillReceiveProps({boardState, rectangles}, context){
        this.setState({boardState, rectangles})
    }

    render() {
        let {boardState, onTileHover, onTileClick, rectangles} = this.state;
        console.log('render');
        return (
            <Grid
                container
                direction="column">
                <Stage width={window.innerWidth} height={window.innerHeight}>
                    <Layer>
                        {boardState.map((row, i) =>
                            row.map((ref, j) => (
                                <Tile
                                    key={`${i}${j}`}
                                    x={i}
                                    y={j}
                                    ref={rectangles[i][j]}
                                    onHover={onTileHover}
                                    onClick={onTileClick}
                                    alive={boardState[i][j]}/>)))
                        }
                    </Layer>
                </Stage>
            </Grid>
        )
    }
}