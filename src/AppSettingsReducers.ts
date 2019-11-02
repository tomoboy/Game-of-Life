import { AppState, Shape } from './types';
export type Action =
  | { type: 'setNewGame'; newGame: boolean }
  | { type: 'togglePlay'; isPlaying: boolean }
  | { type: 'newTickTime'; tickTime: number }
  | { type: 'changeSelectedShape'; selectedShape: Shape }
  | { type: 'zoom'; zoom: number }
  | { type: 'newBoard'; rows: number; columns: number }
  | { type: 'toggleSound'; isSoundOn: boolean }
  | { type: 'previewShape'; previewShape: Shape | null };

export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'setNewGame':
      return {
        ...state,
        newGame: action.newGame
      };
    case 'togglePlay':
      return {
        ...state,
        isPlaying: action.isPlaying
      };
    case 'newTickTime':
      return {
        ...state,
        tickTime: action.tickTime
      };
    case 'changeSelectedShape':
      return {
        ...state,
        previewShape: null,
        selectedShape: action.selectedShape
      };
    case 'zoom':
      return {
        ...state,
        tileSize: state.tileSize + action.zoom
      };
    case 'newBoard':
      return {
        ...state,
        rows: action.rows,
        columns: action.columns,
        newGame: true,
        isPlaying: false
      };
    case 'toggleSound':
      return {
        ...state,
        isSoundOn: action.isSoundOn
      };
    case 'previewShape':
      return {
        ...state,
        previewShape: action.previewShape
      };
    default:
      return state;
  }
};
