import React from "react";
import "typeface-roboto";
import "./App.css";

import ControlBoard from "./topBar/ControlBoard";
import BoardCanvas from "./board/Board";
import { connect } from "./streamUtils";
import { appSettings$ } from "./AppSettings$";
import Popup from "./Popup";

const App = () => {
  return (
    <>
      <ControlBoard />
      <BoardCanvas />
      <Popup />
    </>
  );
};

export default connect(
  App,
  appSettings$
);
