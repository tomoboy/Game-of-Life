export type HeatMap = number[][];
export type LifeStatus = boolean[][];
export interface BoardState {
  currentBoard: LifeStatus;
  heatMap: HeatMap;
  history: LifeStatus[];
}
export interface ChangedState {
  alive: boolean;
  y: number;
  x: number;
}
