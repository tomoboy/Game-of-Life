import React, { Component } from 'react';
import 'typeface-roboto'
import './App.css';
import Board from "./Board";
import ControlBoard from "./ControlBoard";
import SideBar from "./SideBar";
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
    constructor(props) {
        super(props);
        let rows = 10;
        let columns = 10;
        this.state = {
            rows
            , columns
            , playing: false
            , boardTick: null
            , newBoard: null
        };
    }

    tick = () => {
        this.state.boardTick()
    };


    setBoardfuncs = (boardTick, newBoard) => this.setState({boardTick, newBoard});

    setBoardSize = (rows, columns) => {
        this.setState({rows, columns});
        this.state.newBoard(rows, columns)
    };

    togglePlay = () => {
        this.setState({playing: !this.state.playing})
    };

    playStatus = () => this.state.playing;

    render() {
        const {rows, columns } = this.state;

        return <div style={{display: 'flex'}}>
            <ControlBoard
                onTick={this.tick}
                isPlaying={this.playStatus}
                togglePlay={this.togglePlay}
            />
            <CssBaseline/>
            <SideBar
                isPlaying={this.playStatus}
                setBoardSize={this.setBoardSize}
                rows={rows}
                columns={columns}
            />
            <Board
                rows={rows}
                isPlaying={this.playStatus}
                setBoardfuncs={this.setBoardfuncs}
                columns={columns}/>
        </div>
  }
}

export default App;
