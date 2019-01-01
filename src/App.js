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
        this.state = {
            rows : 75
            , columns: 75
            , playing: false
            , boardTick: null
            , selectedShape: null
            , previewShape: null
            , newGame: false

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
                newGame={newGame}
                onTick={this.tick}
                togglePlay={this.togglePlay}
            />
            <CssBaseline/>
            <SideBar
                isPlaying={playing}
                rows={rows}
                columns={columns}
                setBoardSize={(rows, columns) => this.setState({rows, columns, newGame: true})}
                setPreviewShape={shape => this.setState({previewShape: shape})}
                setSelectedShape={this.setSelectedShape}
            />
            <Board
                isPlaying={playing}
                rows={rows}
                columns={columns}
                newGame={newGame}
                setNewGame={() => this.setState({newGame: false})}
                previewShape={previewShape}
                selectedShape={selectedShape}
                setBoardfuncs={this.setBoardfuncs}/>
            <div>Icons made by <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
        </div>
  }
}

export default App;
