import React, {Component} from 'react'
import tick from "./gameLogic";
import withStyles from "@material-ui/core/styles/withStyles";
import {DRAWER_WIDTH} from "./constants";
import classNames from 'classnames'
import createEmptyBoardState from "./createEmptyBoardState";
import BoardCanvas from "./BoardCanvas";

const styles = theme => ({
    content: {
        flexGrow: 1,
        marginTop: '60px',
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -DRAWER_WIDTH,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }
});

class Board extends Component{
    constructor(props) {
        super(props);
        const { rows, columns, previewShape, selectedShape} = this.props;
        let startBoard = createEmptyBoardState(rows, columns);
        this.state = {
            boardState: startBoard
            , rows
            , columns
            , previewShape
            , selectedShape
            , previewState: startBoard
        };
        this.props.setBoardfuncs(this.onTick);
    }

    newBoard = (rows, columns) => {
        let boardState = createEmptyBoardState(rows, columns);
        this.setState({
            boardState
            , rows
            , columns
            , previewState: boardState
        });
    };

    componentWillReceiveProps({selectedShape, rows, columns, previewShape}, context){// is called when hovering over a shape in sidebar
        if (rows !== this.state.rows || columns !== this.state.columns ){ // make a new board
            this.newBoard(rows, columns);
        } else { // a new preview shape is hovered over
            let {boardState} = this.state;
            let previewState = boardState.map(row => row.map(tile => tile));
            if (previewShape !== null){
                let startRow = Math.floor(boardState.length/2) - previewShape.xMin;
                let startCol = Math.floor(boardState[0].length/2) - previewShape.yMin;
                for(let i =  startRow, k = 0; i < startRow + previewShape.rows; i++, k++){
                    for (let j = startCol, h = 0; j < startCol + previewShape.columns; j++, h++){
                        previewState[i][j] = previewShape.pattern[k][h];
                    }
                }
            }
            this.setState({previewShape, selectedShape, previewState});
        }
    }


    wrap = (index, board) => {
        if (index < 0){
            return board.length + index;
        } else if(index >= board.length) {
            return index - board.length
        } else {
          return index;
        }
    };

    onTileClick = () => {
        const { previewState } = this.state;
        this.setState({boardState: previewState})
    };

    onTileHover = (i, j) => {
        console.log('onhover');
        if (!this.props.isPlaying) {
            let {boardState, previewState, selectedShape} = this.state;
            let startRow = i - selectedShape.xMin;
            let startCol = j - selectedShape.yMin;
            previewState = boardState.map(row => row.map(tile => tile));
            for(let i =  startRow, k = 0; i < startRow + selectedShape.rows; i++, k++)
                for (let j = startCol, h = 0; j < startCol + selectedShape.columns; j++, h++){
                    let ii = this.wrap(i, boardState);
                    let jj = this.wrap(j, boardState);
                    let alive = selectedShape.pattern[k][h];
                    previewState[ii][jj] = alive;
                }
            this.setState({previewState})
        }
    };

    onTick = () => {
        let {boardState} = this.state;
        this.setState({boardState: tick(boardState, createEmptyBoardState(this.state.rows, this.state.columns))});
    };

    render(){
        const {classes, isPlaying } = this.props;
        const {previewState, boardState, rows, columns} = this.state;
        return (
            <div className={classNames(classes.content, {
                [classes.contentShift]: !isPlaying
            })}>
                <BoardCanvas
                    rows={rows}
                    columns={columns}
                    onTileHover={this.onTileHover}
                    boardState={(isPlaying) ? boardState : previewState}
                    isPlaying={isPlaying}
                    onClick={this.onTileClick}
                />
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Board);


