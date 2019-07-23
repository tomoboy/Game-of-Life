export const defaultTick = 200;
export const speedOptions = [
  { value: defaultTick * 2, label: "0.5x" },
  { value: defaultTick, label: "1x" },
  { value: defaultTick / 2, label: "2x" },
  { value: defaultTick / 5, label: "5x" },
  { value: defaultTick / 10, label: "10x" }
];

export interface SpeedOption {
  value: number;
  label: string;
}
