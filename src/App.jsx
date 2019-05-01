import React, { Component } from 'react';
import 'typeface-roboto';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import Fullscreen from 'react-full-screen';
import Board from './Board';
import ControlBoard from './ControlBoard';
import SideBar from './SideBar';
import CustomShapeDialog from './CustomShapeDialog';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardTick: null,
      columns: 300,
      customShapeDialogOpen: false,
      customShapeMode: false,
      errorMessage: '',
      fullscreen: false,
      newGame: false,
      playing: false,
      previewShape: null,
      rerender: false,
      rows: 200,
      selectedShape: null,
      snackbarOpen: false,
      tileSize: 9,
    };
  }

  tick = () => {
    const { boardTick } = this.state;
    boardTick();
  };

  toggleCustomShape = customShapeMode => {
    const { rerender } = this.state;

    this.setState({
      customShapeDialogOpen: customShapeMode,
      customShapeMode,
      previewShape: null,
      rerender: !rerender,

    });
  };

  saveCustomShape = () => console.log('saving custom shape');

  setBoardfuncs = boardTick => this.setState({ boardTick });

  setSelectedShape = shape => this.setState({ previewShape: null, selectedShape: shape });

  reportError = errorMessage => this.setState({ snackbarOpen: true, errorMessage });

  togglePlay = () => {
    const { playing } = this.state;
    this.setState({ playing: !playing });
  };

  render() {
    const {
      rows,
      columns,
      playing,
      previewShape,
      selectedShape,
      newGame,
      tileSize,
      fullscreen,
      snackbarOpen,
      errorMessage,
      customShapeMode,
      customShapeDialogOpen,
      rerender
    } = this.state;

    return (
      <Fullscreen enabled={fullscreen} onChange={full => this.setState({ fullscreen: full })}>
        <div style={{ display: 'flex' }}>
          {/*<CustomShapeDialog*/}
            {/*open={customShapeDialogOpen}*/}
            {/*handleClose={() => this.setState({ customShapeDialogOpen: false })}*/}
          {/*/>*/}
          <ControlBoard
            isPlaying={playing}
            newGame={newGame}
            onTick={this.tick}
            togglePlay={this.togglePlay}
            fullscreen={fullscreen}
            toggleFullscreen={full => this.setState({ fullscreen: full })}
            zoom={change => {
              this.setState({ tileSize: tileSize + change });
            }}
          />
          <CssBaseline />
          <SideBar
            isPlaying={playing}
            rows={rows}
            columns={columns}
            setPreviewShape={shape => this.setState({ previewShape: shape })}
            setSelectedShape={this.setSelectedShape}
            reportError={this.reportError}
            startCustomShapeMode={this.toggleCustomShape}
            customShapeMode={customShapeMode}
            saveCustomShape={this.saveCustomShape}
          />
          <Board
            customShapeMode={customShapeMode}
            setCustomShapeMode={this.toggleCustomShape}
            isPlaying={playing}
            rows={rows}
            tileSize={tileSize}
            columns={columns}
            rerender={rerender}
            reportError={this.reportError}
            newGame={newGame}
            setNewGame={() => this.setState({ newGame: false })}
            previewShape={previewShape}
            selectedShape={selectedShape}
            setBoardfuncs={this.setBoardfuncs}
          />
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => this.setState({ snackbarOpen: false })}
          message={<span>{errorMessage}</span>}
        />
      </Fullscreen>
    );
  }
}
