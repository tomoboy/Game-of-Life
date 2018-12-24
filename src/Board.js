import React, {Component} from 'react'
import Grid from "@material-ui/core/Grid/Grid";
import Tile from "./Tile";
import tick from "./gameLogic";
import withStyles from "@material-ui/core/styles/withStyles";
import {drawerWidth} from "./constants";
import classNames from 'classnames'
import createEmptyBoardState from "./createEmptyBoardState";

const styles = theme => ({
    content: {
        flexGrow: 1,
        marginTop: '60px',
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
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
        let startBoard = createEmptyBoardState(props.rows, props.columns);
        this.state = {
            boardState: startBoard
            , rows: props.rows
            , columns: props.columns
            , previewShape: props.previewShape
            , selectedShape: props.selectedShape
            , previewState: null
        };
        this.props.setBoardfuncs(this.onTick, this.newBoard);
    }

    newBoard = (rows, columns) => {
        let boardState = createEmptyBoardState(rows, columns);
        this.setState({
            boardState
            , rows
            , columns
        });
    };

    componentWillReceiveProps({selectedShape, previewShape}, context){
        let previewState = null;
        if (previewShape !== null) {
            let {boardState} = this.state;
            let startRow = Math.floor(boardState.length/2) - previewShape.xMin;
            let startCol = Math.floor(boardState[0].length/2) - previewShape.yMin;
            let newBoard = boardState.map(row => row.map(tile => tile));
            for(let i =  startRow, k = 0; i < startRow + previewShape.rows; i++, k++){
                for (let j = startCol, h = 0; j < startCol + previewShape.columns; j++, h++){
                    newBoard[i][j] = previewShape.pattern[k][h];
                }
            }
            previewState = newBoard;
        }
        this.setState({previewShape, selectedShape, previewState});
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
        const {previewState} = this.state;
        this.setState({boardState: previewState})
    };

    onTileHover = (i, j) => {
        let {boardState, selectedShape} = this.state;
        let startRow = i - selectedShape.xMin;
        let startCol = j - selectedShape.yMin;
        let newBoard = boardState.map(row => row.map(tile => tile));
        for(let i =  startRow, k = 0; i < startRow + selectedShape.rows; i++, k++){
            for (let j = startCol, h = 0; j < startCol + selectedShape.columns; j++, h++){
                newBoard[this.wrap(i, newBoard)][this.wrap(j, newBoard[0])] = selectedShape.pattern[k][h];
            }
        }
        this.setState({previewState: newBoard});
    };

    onTick = () => {
        let {boardState} = this.state;
        this.setState({boardState: tick(boardState, createEmptyBoardState(this.state.rows, this.state.columns))});
    };

    render(){
        const {classes, isPlaying } = this.props;
        const {previewState, boardState} = this.state;

        let isPreview = previewState !== null;
        return (
            <div className={classNames(classes.content, {
                [classes.contentShift]: !isPlaying
            })}>
                <Grid
                    container
                    direction="column">
                    {((isPreview) ? previewState : boardState).map((row, i) =>
                        (<Grid key={i} container direction="row" wrap='nowrap' >
                            {row.map((alive, j) => (
                                <Tile
                                    key={`${i}${j}`}
                                    i={i}
                                    j={j}
                                    onHover={this.onTileHover}
                                    onClick={this.onTileClick}
                                    isPreview={isPreview}
                                    isPlaying={isPlaying}
                                    alive={alive}/>)
                            )}
                        </Grid>))
                    }
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Board);


