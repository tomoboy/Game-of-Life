import React, { useReducer } from 'react';
import 'typeface-roboto';
import './App.css';
import { ControlBoard } from './topBar/ControlBoard';
import { Board } from './board/Board';
import { PreviewShapePopup } from './ShapePreviewPopup';
import { reducer } from './AppSettingsReducers';
import { AppContext, initialState } from './AppContext';

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <ControlBoard />
      <Board />
      <PreviewShapePopup />
    </AppContext.Provider>
  );
};
