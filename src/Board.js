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
        let childRefs = [];
        for (let i = 0; i < this.props.rows; i++){
            let refRow = [];
            for (let j = 0; j < this.props.columns; j++){
                refRow.push(React.createRef())
            }
            childRefs.push(refRow);
        }
        let startBoard = createEmptyBoardState(props.rows, props.columns);
        // startBoard[3][4] = true;
        // startBoard[4][4] = true;
        // startBoard[5][4] = true;
        this.state = {
            boardState: startBoard
            , rows: props.rows
            , columns: props.columns
            , childRefs
            , previewShape: props.previewShape
            , selectedShape: props.selectedShape
            , previewState: null
            // , newGame: true
        };
        this.props.setBoardfuncs(this.onTick, this.newBoard);
    }

    newBoard = (rows, columns) => {
        let childRefs = [];
        for (let i = 0; i < rows; i++){
            let refRow = [];
            for (let j = 0; j < columns; j++){
                refRow.push(React.createRef())
            }
            childRefs.push(refRow);
        }
        let startBoard = createEmptyBoardState(rows, columns);
        // startBoard[3][4] = true;
        // startBoard[4][4] = true;
        // startBoard[5][4] = true;
        this.setState({
            boardState: startBoard
            , rows
            , columns
            , childRefs
            // , newGame: true
        });
    };

    componentWillReceiveProps({selectedShape, previewShape}, context){
        let previewState = null;
        if (previewShape !== null) {
            let boardState = this.state.boardState;
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


    onTick = () => {
        let {boardState} = this.state;
        // if (this.state.newGame){
        this.state.childRefs.forEach((refRow, i) =>
            refRow.forEach((child, j) =>
                boardState[i][j] = child.current.getAliveStatus()));
        // }
        let newBoard = tick(boardState, createEmptyBoardState(this.state.rows, this.state.columns));
        let unchanged = true;
        // this.state.childRefs.forEach((refRow, i) =>
        //     refRow.forEach((child, j) => {
        //         if (boardState[i][j] !== newBoard[i][j]){
        //             child.current.setAliveStatus(newBoard[i][j]);
        //             unchanged = false;
        //         }
        //     })
        // );
        this.setState({
            boardState: newBoard
            , newGame: false
        });

    };

    render(){
        const {classes, isPlaying } = this.props;
        console.log('rendering board');
        return (
            <div className={classNames(classes.content, {
                [classes.contentShift]: !isPlaying
            })}>
                <Grid
                    container
                    direction="column">
                    {this.state.childRefs.map((row, i) =>
                        (<Grid key={i} container direction="row" wrap='nowrap' >
                            {row.map((ref, j) => (
                                <Tile
                                    ref={ref}
                                    key={`${i}${j}`}
                                    i={i}
                                    j={j}
                                    isPlaying={isPlaying}
                                    alive={(this.state.previewState !== null) ?
                                        this.state.previewState[i][j] : this.state.boardState[i][j]}/>)
                            )}
                        </Grid>))
                    }
                </Grid>
            </div>
        )
    }

}

export default withStyles(styles, { withTheme: true })(Board);


