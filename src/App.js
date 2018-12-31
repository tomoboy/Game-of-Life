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
        let rows = 20;
        let columns = 20;
        this.state = {
            rows
            , columns
            , playing: false
            , boardTick: null
            , selectedShape: null
            , previewShape: null
            , newBoard: null

        };
    }

    tick = () => {
        this.state.boardTick()
    };

    setBoardfuncs = boardTick => this.setState({boardTick});

    setSelectedShape = shape => this.setState({previewShape: null, selectedShape: shape, newGame: false});

    togglePlay = () => {
        const {playing} = this.state;
        if (!playing) {
            return new Promise(resolve => setTimeout(resolve, 300)).then(() => { //Adding a slight delay
                this.setState({playing: true})
            });
        } else {
            this.setState({playing: false})
        }
    };

    render() {
        const {rows, columns, playing, previewShape, selectedShape, newGame } = this.state;

        return <div style={{display: 'flex', backgroundColor: '#f5f5f5'}}>
            <ControlBoard
                isPlaying={playing}
                onTick={this.tick}
                togglePlay={this.togglePlay}
            />
            <CssBaseline/>
            <SideBar
                isPlaying={playing}
                rows={rows}
                columns={columns}
                setBoardSize={(rows, columns) => this.setState({rows, columns, newGame: true})}
                setPreviewShape={shape => this.setState({previewShape: shape, newGame: false})}
                setSelectedShape={this.setSelectedShape}
            />
            <Board
                isPlaying={playing}
                rows={rows}
                columns={columns}
                newGame={newGame}
                previewShape={previewShape}
                selectedShape={selectedShape}
                setBoardfuncs={this.setBoardfuncs}/>
        </div>
  }
}

export default App;
