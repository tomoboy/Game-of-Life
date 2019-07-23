import React, { Component } from "react";
import "typeface-roboto";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import Fullscreen from "react-full-screen";
import Board from "./board/Board";
import ControlBoard from "./topBar/ControlBoard";
import BoardCanvas from "./board/BoardCanvas";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardTick: null,
      columns: 50,
      customShapeDialogOpen: false,
      customShapeMode: false,
      errorMessage: "",
      fullscreen: false,
      newGame: false,
      playing: false,
      previewShape: null,
      rerender: false,
      rows: 50,
      selectedShape: null,
      snackbarOpen: false,
      tileSize: 10
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
      rerender: !rerender
    });
  };

  saveCustomShape = () => console.log("saving custom shape");

  setBoardfuncs = boardTick => this.setState({ boardTick });

  setSelectedShape = shape =>
    this.setState({ previewShape: null, selectedShape: shape });

  reportError = errorMessage =>
    this.setState({ snackbarOpen: true, errorMessage });

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
      <Fullscreen
        enabled={fullscreen}
        onChange={full => this.setState({ fullscreen: full })}
      >
        <div style={{ display: "block" }}>
          <ControlBoard/>
          <CssBaseline />
          {/*<SideBar
            isPlaying={playing}
            rows={rows}
            columns={columns}
            setPreviewShape={shape => this.setState({ previewShape: shape })}
            setSelectedShape={this.setSelectedShape}
            reportError={this.reportError}
            startCustomShapeMode={this.toggleCustomShape}
            customShapeMode={customShapeMode}
            saveCustomShape={this.saveCustomShape}
          />*/}
          <BoardCanvas />
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
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
