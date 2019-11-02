export interface AppState {
  rows: number;
  columns: number;
  selectedShape: Shape;
  newGame: boolean;
  tileSize: number;
  isPlaying: boolean;
  tickTime: number;
  previewShape: Shape | null;
  isSoundOn: boolean;
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
