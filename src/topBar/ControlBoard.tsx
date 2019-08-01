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
  padding: 20px;
  max-height: 100px;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  text-align: center;
  padding-top: 10px;
  font-size: 50px;
  font-family: "SF Alien Encounters", sans-serif;
`;

const Banner = styled.div`
  background-color: rgb(255, 255, 255, 0.2);
`;

const Selectors = styled.div`
  display: flex;
`;

const ControlBoard = ({
  isPlaying,
  tickTime,
  selectedShape,
  rows,
  columns
}: AppState) => {
  return (
    <Banner>
      <Logo>GAME OF LIFE </Logo>
      <GenerationCounter isPlaying={isPlaying} tickTime={tickTime} />
      <TopBar>
        <Selectors>
          <SpeedSelector tickTime={tickTime} isPlaying={isPlaying} />
          <ShapesSelector selectedShape={selectedShape} isPlaying={isPlaying} />
        </Selectors>
        <PlayButton isPlaying={isPlaying} />
        <ZoomInButton />
        <ZoomOutButton />
        <FullScreenButton />
        <NewBoardButtonAndDialog rows={rows} columns={columns} />
        <AboutWindow />
        <GitHubButton />
      </TopBar>
    </Banner>
  );
};

export default connect(
  ControlBoard,
  appSettings$
);
