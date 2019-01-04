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
//testing
class Board extends Component{
    constructor(props) {
        super(props);
        const { rows, columns} = this.props;
        let startBoard = createEmptyBoardState(rows, columns);
        this.state = {
            boardState: startBoard
            , rows
            , columns
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

    componentWillReceiveProps({selectedShape, rows, columns, previewShape, newGame, setNewGame}, context){// is called when hovering over a shape in sidebar
        if (rows !== this.state.rows || columns !== this.state.columns || newGame ){ // make a new board
            this.newBoard(rows, columns);
            setNewGame();
        } else { // a new preview shape is hovered over
            let {boardState} = this.state;
            let previewState = boardState.map(row => row.map(tile => tile));
            if (previewShape !== null){
                let startRow = Math.floor(boardState.length/2) - previewShape.xMin;
                let startCol = Math.floor(boardState[0].length/2) - previewShape.yMin;
                for(let i = startRow - 1, k = -1; i <= startRow + previewShape.rows; i++, k++){
                    for (let j = startCol - 1, h = -1; j <= startCol + previewShape.columns; j++, h++){
                        previewState[i][j] = (i < startRow
                            || i === startRow + previewShape.rows
                            || j < startCol
                            || j === startCol + previewShape.columns) ?
                            false
                            :
                            previewShape.pattern[k][h];
                    }
                }
            }
            this.setState({previewState});
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
        const { newGame } = this.props;
        if (!newGame){
            this.setState({boardState: previewState})
        }
    };

    onTileHover = (i, j) => {
        const { isPlaying } = this.props;
        if (!isPlaying) {
            let {boardState, previewState} = this.state;
            const {selectedShape} = this.props;
            let startRow = i - selectedShape.xMin;
            let startCol = j - selectedShape.yMin;
            previewState = boardState.map(row => row.map(tile => tile));
            for(let i =  startRow, k = 0; i < startRow + selectedShape.rows; i++, k++)
                for (let j = startCol, h = 0; j < startCol + selectedShape.columns; j++, h++){
                    let ii = this.wrap(i, boardState);
                    let jj = this.wrap(j, boardState[0]);
                    previewState[ii][jj] =  selectedShape.pattern[k][h];
                }
            this.setState({previewState})
        }
    };

    onTick = () => {
        const {boardState, rows, columns } = this.state;
        const tickedState = tick(boardState, createEmptyBoardState(rows, columns));
        this.setState({boardState: tickedState, previewState: tickedState});
    };

    render(){
        const { classes, isPlaying, tileSize } = this.props;
        const {previewState, boardState, rows, columns} = this.state;
        return (
            <div className={classNames(classes.content, {
                [classes.contentShift]: !isPlaying
            })}>
                <BoardCanvas
                    rows={rows}
                    columns={columns}
                    onTileHover={this.onTileHover}
                    tileSize={tileSize}
                    removePreview={() => this.setState({previewState: boardState})}
                    boardState={(isPlaying) ? boardState : previewState}
                    isPlaying={isPlaying}
                    onClick={this.onTileClick}
                />
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Board);


