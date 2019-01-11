import React, {Component} from 'react'
import tick from "./gameLogic";
import withStyles from "@material-ui/core/styles/withStyles";
import {DRAWER_WIDTH} from "./constants";
import classNames from 'classnames'
import createEmptyBoardState from "./createEmptyBoardState";
import BoardCanvas from "./BoardCanvas";

const styles = theme => ({
    content: {
        flexGrow: 1
        , marginTop: '75px'
        , padding: theme.spacing.unit * 2
        , backgroundColor: 'snow'
        , transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp
            , duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -DRAWER_WIDTH
    }
    , contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut
            , duration: theme.transitions.duration.enteringScreen
        })
        , marginLeft: 0
    }
});
//testing
class Board extends Component{
    constructor(props) {
        super(props);
        this.state = {
            boardState: createEmptyBoardState(props.rows, props.columns)
            , rows: props.rows
            , columns: props.columns
            , changes: []
        };
        this.props.setBoardfuncs(this.onTick);
    }

    newBoard = (rows, columns) => {
        this.setState({
            boardState: createEmptyBoardState(rows, columns)
            , rows
            , columns
            , changes: []
        });
        this.props.setNewGame();
    };

    changesDifferentFromBoard = () => {
        const {boardState, changes} = this.state;
        return changes
            .filter(({alive, rowIndex, colIndex})  => alive !== boardState[rowIndex][colIndex])
            .map(({alive, rowIndex, colIndex}) => ({alive: boardState[rowIndex][colIndex], rowIndex, colIndex}));
    };

    previewShape = (shape) => {
        let { rows, columns} = this.state;
        let newChanges = this.changesDifferentFromBoard();
        const startI = Math.floor(rows/2) - shape.xMin , startJ = Math.floor(columns/2) - shape.yMin;

        for(let i = startI - 1, k = -1; i <= startI + shape.rows; i++, k++)
            for (let j = startJ - 1, h = -1; j <= startJ + shape.columns; j++, h++){
                const alive =
                    i >= startI
                    && i < startI + shape.rows
                    && j >= startJ
                    && j < startJ + shape.columns
                    && shape.pattern[k][h];
                let c = newChanges.find(({rowIndex, colIndex}) => rowIndex === i && colIndex === j);
                if (typeof c !== 'undefined') {
                    c.alive = alive
                } else {
                    newChanges.push({rowIndex: i, colIndex: j, alive});
                }
            }
        this.setState({changes: newChanges});
    };

    componentWillReceiveProps({rows, columns, previewShape, newGame}, context){// is called when hovering over a shape in sidebar
        if (rows !== this.state.rows || columns !== this.state.columns || newGame ){ // make a new board
            this.newBoard(rows, columns);
        } else if (previewShape !== null) { // a new preview shape is hovered over
            this.previewShape(previewShape);
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
        const { boardState, changes } = this.state, { newGame } = this.props;
        if (!newGame){
            changes.forEach(({rowIndex, colIndex, alive}) => boardState[rowIndex][colIndex] = alive);
            this.setState({boardState})
        }
    };

    onTileHover = (i, j) => {
        const {boardState} = this.state, {selectedShape} = this.props;
        const startI = i - selectedShape.xMin, startJ = j - selectedShape.yMin;
        const newChanges = this.changesDifferentFromBoard();

        for (let i = startI, k = 0; i < startI + selectedShape.rows; i++, k++)
            for (let j = startJ, h = 0; j < startJ + selectedShape.columns; j++, h++) {
                const ii = this.wrap(i, boardState), jj = this.wrap(j, boardState[0]);
                const c = newChanges.find(({rowIndex, colIndex}) => rowIndex === ii && colIndex === jj);
                if (typeof c !== 'undefined') {
                    c.alive = selectedShape.pattern[k][h]
                } else {
                    newChanges.push({rowIndex: ii, colIndex: jj, alive: selectedShape.pattern[k][h]});
                }
            }
        this.setState({changes: newChanges})
    };

    onTick = () => {
        const {boardState, rows, columns } = this.state;
        const {newBoard, changes} = tick(boardState, createEmptyBoardState(rows, columns));
        this.setState({boardState: newBoard, changes});
    };

    render(){
        const { classes, isPlaying, tileSize } = this.props, { boardState, rows, columns, changes} = this.state;
        return (
            <div className={classNames(classes.content, {
                [classes.contentShift]: !isPlaying
            })}>
                <BoardCanvas
                    rows={rows}
                    columns={columns}
                    onTileHover={this.onTileHover}
                    tileSize={tileSize}
                    changes={changes}
                    removePreview={() =>
                        this.setState({changes: changes.map(({rowIndex, colIndex}) =>
                                ({rowIndex, colIndex, alive: boardState[rowIndex][colIndex]}))})}
                    boardState={boardState}
                    isPlaying={isPlaying}
                    onClick={this.onTileClick}
                />
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Board);


