import React from "react";
import AboutWindow from "./AboutButtonAndWindow";
import styled from "styled-components";
import { GenerationCounter } from "./GenerationCounter";
import { connect } from "../streamUtils";
import { appSettings$ } from "../AppSettings$";
import SpeedSelector from "./SpeedSelector";
import ShapesSelector from "./ShapesSelector";
import { AppState } from "../types";
import GitHubButton from "./buttons/GitHubButton";
import PlayButton from "./buttons/PlayButton";
import ZoomInButton from "./buttons/ZoomInButton";
import ZoomOutButton from "./buttons/ZoomOutButton";
import FullScreenButton from "./buttons/FullScreenButton";
import NewBoardButtonAndDialog from "./NewBoardButtonAndDialog";

const TopBar = styled.div`
  display: flex;
  background-color: #f2fcff;
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
  isFullScreen,
  selectedShape,
  rows,
  columns
}: AppState) => {
  return (
    <TopBar>
      <h4>GAME OF LIFE </h4>
      <SpeedSelector tickTime={tickTime} isPlaying={isPlaying} />
      <ShapesSelector selectedShape={selectedShape} isPlaying={isPlaying} />
      <PlayButton isPlaying={isPlaying} />
      <GenerationCounter isPlaying={isPlaying} tickTime={tickTime} />
      <ZoomInButton />
      <ZoomOutButton />
      <FullScreenButton isFullScreen={isFullScreen} />
      <NewBoardButtonAndDialog
        isFullScreen={isFullScreen}
        rows={rows}
        columns={columns}
      />
      <AboutWindow isFullScreen={isFullScreen} />
      <GitHubButton />
    </TopBar>
  );
};

export default connect(
  ControlBoard,
  appSettings$
);
