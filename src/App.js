import React, { Component } from 'react';
import 'typeface-roboto'
import './App.css';
import Board from "./Board";
import ControlBoard from "./ControlBoard";
import SideBar from "./SideBar";
import CssBaseline from '@material-ui/core/CssBaseline';
import Fullscreen from "react-full-screen";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";

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
            , tileSize: 10
            , fullScreen: false
            , snackbarOpen: false
            , errorMessage: ''
        };
    }

    tick = () => {
        this.state.boardTick()
    };

    setBoardfuncs = boardTick => this.setState({boardTick});

    setSelectedShape = shape => this.setState({previewShape: null, selectedShape: shape, newGame: false});

    reportError = errorMessage => this.setState({snackbarOpen: true, errorMessage});

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
        const {rows, columns, playing, previewShape, selectedShape, newGame, tileSize, fullscreen,
            snackbarOpen, errorMessage } = this.state;

        return <Fullscreen
            enabled={fullscreen}
            onChange={fullscreen => this.setState({fullscreen})}
        >

            <div style={{display: 'flex', backgroundColor: '#f5f5f5'}}>
                <ControlBoard
                    isPlaying={playing}
                    newGame={newGame}
                    onTick={this.tick}
                    togglePlay={this.togglePlay}
                    fullscreen={fullscreen}
                    toggleFullscreen={fullscreen => this.setState({fullscreen})}
                    zoom={change => {
                        const { tileSize } = this.state;
                        this.setState({tileSize: tileSize + change})
                    }}
                />
                <CssBaseline/>
                <SideBar
                    isPlaying={playing}
                    rows={rows}
                    columns={columns}
                    setBoardSize={(rows, columns) => this.setState({rows, columns, newGame: true})}
                    setPreviewShape={shape => this.setState({previewShape: shape})}
                    setSelectedShape={this.setSelectedShape}
                    reportError={this.reportError}
                />
                <Board
                    isPlaying={playing}
                    rows={rows}
                    tileSize={tileSize}
                    columns={columns}
                    newGame={newGame}
                    setNewGame={() => this.setState({newGame: false})}
                    previewShape={previewShape}
                    selectedShape={selectedShape}
                    setBoardfuncs={this.setBoardfuncs}/>
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top'
                    , horizontal: 'center'
                }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => this.setState({snackbarOpen: false})}
                message={<span>{errorMessage}</span>}
            />
        </Fullscreen>
    }
}

export default App;
