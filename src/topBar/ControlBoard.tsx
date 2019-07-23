import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton/IconButton";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Pause from "@material-ui/icons/Pause";
import Typography from "@material-ui/core/Typography/Typography";
import ZoomIn from "@material-ui/icons/ZoomIn";
import ZoomOut from "@material-ui/icons/ZoomOut";
import CloseIcon from "@material-ui/icons/Close";
import FullScreen from "@material-ui/icons/Fullscreen";
import FullScreenExit from "@material-ui/icons/FullscreenExit";
import Select from "react-select";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Grid from "@material-ui/core/Grid/Grid";
import { isMobile } from "react-device-detect";
import GithubLogo from "../GitHub-Mark-32px.png";
import AboutWindow from "./AboutWindow";
import { BACKGROUND_COLOUR } from "../constants";
import styled from "styled-components";
import { GenerationCounter } from "./GenerationCounter";
import { dispatchAction } from "../baseStream$";
import { newTickTime, toggleFullScreen, togglePlay, zoom } from "./actions";
import { ValueType } from "react-select/lib/types";
import { SpeedOption, speedOptions } from "./speedOptions";
import { connect } from "../streamUtils";
import { appSettings$ } from "../AppSettings$";

const TopBar = styled.div`
  display: flex;
  background-color: ${BACKGROUND_COLOUR};
  padding: 20px;
  max-height: 100px;
  justify-content: space-between;
  border-bottom: 1px solid lightgrey;
  box-shadow: 0 2px 5px lightgrey;
  align-items: center;
`;

const ControlBoard = ({
  isPlaying,
  tickTime,
  isFullScreen
}: {
  isPlaying: boolean;
  tickTime: number;
  isFullScreen: boolean;
}) => {
  const [aboutOpen, setAboutOpen] = useState<boolean>(false);
  const [wasFullScreen, setWasFullScreen] = useState<boolean>(false);

  console.log("isPlaying", isPlaying);
  const openAboutWindow = () => {
    if (isFullScreen) {
      dispatchAction(toggleFullScreen({ isFullScreen: false }));
      setWasFullScreen(true);
    }
    setAboutOpen(true);
  };

  const closeAboutWindow = () => {
    if (wasFullScreen) {
      dispatchAction(toggleFullScreen({ isFullScreen: true }));
    }
    setAboutOpen(false);
    setWasFullScreen(false);
  };

  const speedChange = (value: number) => {
    if (value !== tickTime) {
      dispatchAction(newTickTime({ tickTime: value }));
    }
  };
  let selectedSpeedOption =
    speedOptions.find(e => e.value === tickTime) ||
    (speedOptions[0] as SpeedOption);

  return (
    <TopBar>
      <h4>GAME OF LIFE </h4>
      <Select
        value={selectedSpeedOption}
        onChange={(selected: ValueType<SpeedOption>) =>
          selected && speedChange((selected as SpeedOption).value)
        }
        options={speedOptions}
        defaultValue={speedOptions[2]}
        isDisabled={isPlaying}
        isClearable={false}
        isSearchable={false}
        name="speed"
      />
      <IconButton
        color="inherit"
        onClick={() => dispatchAction(togglePlay({ isPlaying: !isPlaying }))}
      >
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <GenerationCounter isPlaying={isPlaying} tickTime={tickTime} />
      <IconButton onClick={() => dispatchAction(zoom({ zoom: 1 }))}>
        <ZoomIn />
      </IconButton>
      <IconButton onClick={() => dispatchAction(zoom({ zoom: -1 }))}>
        <ZoomOut />
      </IconButton>
      {!isMobile && (
        <IconButton
          onClick={() =>
            dispatchAction(toggleFullScreen({ isFullScreen: !isFullScreen }))
          }
        >
          {isFullScreen ? <FullScreenExit /> : <FullScreen />}
        </IconButton>
      )}
      <Button size="small" mini variant="outlined" onClick={openAboutWindow}>
        About
      </Button>
      <Dialog open={aboutOpen} onClose={closeAboutWindow}>
        <DialogTitle>
          <Grid container alignItems="stretch" justify="space-between">
            <Typography variant="h6"> About the Game of Life </Typography>
            <IconButton aria-label="Close" onClick={closeAboutWindow}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <AboutWindow />
        </DialogContent>
      </Dialog>
      <Button
        style={{ marginLeft: "5px" }}
        size="small"
        mini
        variant="outlined"
        target="_blank"
        href="https://github.com/tomoboy"
      >
        <img
          style={{ width: "15px", marginRight: "5px" }}
          src={GithubLogo}
          alt="Github logo"
        />
        Follow me
      </Button>
    </TopBar>
  );
};

export default connect(
  ControlBoard,
  appSettings$
);
