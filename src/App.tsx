import React from "react";
import "typeface-roboto";
import "./App.css";

import ControlBoard from "./topBar/ControlBoard";
import BoardCanvas from "./board/Board";
import { connect } from "./streams/streamUtils";
import { appSettings$ } from "./streams/AppSettings$";
import ShapePreviewPopup from "./streams/ShapePreviewPopup";

const App = () => {
  return (
    <>
      <ControlBoard />
      <BoardCanvas />
      <ShapePreviewPopup />
    </>
  );
};

export default connect(
  App,
  appSettings$
);
