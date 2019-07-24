export type BoardState = boolean[][];

export interface ChangedState {
  alive: boolean;
  y: number;
  x: number;
}
