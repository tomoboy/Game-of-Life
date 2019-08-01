export interface AppState {
  rows: number;
  columns: number;
  snackBarOpen: boolean;
  errorMessage: string;
  selectedShape: Shape;
  newGame: boolean;
  tileSize: number;
  isPlaying: boolean;
  tickTime: number;
  previewShape?: Shape;
}

export interface Shape {
  rows: number;
  columns: number;
  pattern: boolean[][];
  xMin: number;
  yMin: number;
  name: string;
  category: string;
}
export interface Shapes {
  [index: string]: Shape[];
}
