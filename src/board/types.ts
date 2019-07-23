export type BoardState = boolean[][];

export interface ChangedState {
  alive: boolean;
  rowIndex: number;
  colIndex: number;
}

