import React from "react";
import AboutWindow from "./buttons/AboutButtonAndWindow";
import styled from "styled-components";
import { connect } from "../streams/streamUtils";
import { appSettings$ } from "../streams/AppSettings$";
import SpeedSelector from "./selectors/SpeedSelector";
import ShapesSelector from "./selectors/ShapesSelector";
import { AppState } from "../types";
import GitHubButton from "./buttons/GitHubButton";
import PlayButton from "./buttons/PlayButton";
import ZoomInButton from "./buttons/ZoomInButton";
import ZoomOutButton from "./buttons/ZoomOutButton";
import FullScreenButton from "./buttons/FullScreenButton";
import NewBoardButtonAndDialog from "./buttons/NewBoardButtonAndDialog";
import MuteButton from "./buttons/MuteButton";

const TopBar = styled.div`
  display: flex;
  padding: 20px 20px 0 20px;
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
  background-color: rgb(255, 255, 255, 0);
  max-height: 135px;
`;

const Group = styled.div`
  display: flex;
`;

const ControlBoard = ({
  isPlaying,
  tickTime,
  selectedShape,
  rows,
  columns,
  isSoundOn
}: AppState) => {
  return (
    <Banner>
      <Logo>GAME OF LIFE </Logo>
      <TopBar>
        <Group>
          <SpeedSelector tickTime={tickTime} />
          <ShapesSelector selectedShape={selectedShape} />
        </Group>
        <Group>
          <PlayButton isPlaying={isPlaying} />
          <ZoomInButton />
          <ZoomOutButton />
          <MuteButton isSoundOn={isSoundOn} />
          <FullScreenButton />
        </Group>
        <Group>
          <NewBoardButtonAndDialog rows={rows} columns={columns} />
          <AboutWindow />
          <GitHubButton />
        </Group>
      </TopBar>
    </Banner>
  );
};

export default connect(
  ControlBoard,
  appSettings$
);
