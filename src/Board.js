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
            , childRefs: this.childRefBoard(props.rows, props.columns)
            , lastPreview: []
        };
        this.props.setBoardfuncs(this.onTick, this.newBoard);
    }

    childRefBoard = (rows, columns) => {
        let childRefs = [];
        for (let i = 0; i < rows; i++){
            childRefs.push([]);
            for (let j = 0; j < columns; j++)
                childRefs[i].push(React.createRef());
        }
        return childRefs;
    };

    removeLastPreview = () => {
        let {childRefs, lastPreview} = this.state;
        if (lastPreview.length > 0){
            lastPreview.forEach(({i, j}) => childRefs[i][j].current.setPreview(false))
        }
    };

    newBoard = (rows, columns) => {
        let boardState = createEmptyBoardState(rows, columns);
        this.setState({
            boardState
            , rows
            , columns
            , childRefs: this.childRefBoard(rows, columns)
        });
    };

    componentWillReceiveProps({selectedShape, previewShape}, context){
        let {boardState, childRefs, lastPreview} = this.state;
        this.removeLastPreview();
        lastPreview = [];
        if (previewShape !== null){
            let startRow = Math.floor(boardState.length/2) - previewShape.xMin;
            let startCol = Math.floor(boardState[0].length/2) - previewShape.yMin;
            for(let i =  startRow, k = 0; i < startRow + previewShape.rows; i++, k++){
                for (let j = startCol, h = 0; j < startCol + previewShape.columns; j++, h++){
                    let alive = previewShape.pattern[k][h];
                    lastPreview.push({i, j, alive});
                    childRefs[i][j].current.setPreview(alive);
                }
            }
        }
        this.setState({previewShape, selectedShape, lastPreview});
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
        const {lastPreview, boardState} = this.state;
        lastPreview.forEach(({i, j, alive}) => boardState[i][j] = alive);
        this.setState({boardState, lastPreview: []})
    };

    onTileHover = (i, j) => {
        let {childRefs, boardState, selectedShape, lastPreview} = this.state;
        let startRow = i - selectedShape.xMin;
        let startCol = j - selectedShape.yMin;
        this.removeLastPreview();
        lastPreview = [];
        for(let i =  startRow, k = 0; i < startRow + selectedShape.rows; i++, k++){
            for (let j = startCol, h = 0; j < startCol + selectedShape.columns; j++, h++){
                let ii = this.wrap(i, boardState);
                let jj = this.wrap(j, boardState);
                let alive = selectedShape.pattern[k][h];
                lastPreview.push({i: ii, j: jj, alive});
                childRefs[ii][jj].current.setPreview(alive)
            }
        }
        this.setState({lastPreview});
    };

    onTick = () => {
        let {boardState} = this.state;
        this.setState({boardState: tick(boardState, createEmptyBoardState(this.state.rows, this.state.columns))});
    };

    render(){
        const {classes, isPlaying } = this.props;
        const {childRefs, boardState} = this.state;
        return (
            <div className={classNames(classes.content, {
                [classes.contentShift]: !isPlaying
            })}>
                <Grid
                    container
                    direction="column">
                    {childRefs.map((row, i) =>
                        (<Grid key={i} container direction="row" wrap='nowrap' >
                            {row.map((ref, j) => (
                                <Tile
                                    key={`${i}${j}`}
                                    i={i}
                                    j={j}
                                    ref={ref}
                                    onHover={this.onTileHover}
                                    onClick={this.onTileClick}
                                    isPlaying={isPlaying}
                                    alive={boardState[i][j]}/>)
                            )}
                        </Grid>))
                    }
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Board);


