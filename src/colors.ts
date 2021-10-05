const OPACITY = 0.6;

const COLOR_PALETTE = [
  `rgb(255, 0, 167, ${OPACITY})`,
  `rgb(255, 0, 167, ${OPACITY})`,
  `rgb(255, 110, 173, ${OPACITY})`,
  `rgb(255, 162 ,170, ${OPACITY})`,
  `rgb(252, 208, 151, ${OPACITY})`,
  `rgb(242, 255, 0, ${OPACITY})`
];

export const getColor = (freq: number, soundSquare: boolean | undefined) =>
  soundSquare ? 'black' : COLOR_PALETTE[freq];

export const CELL_COLOUR = {
  living: 'black',
  dead: 'rgb(255, 255, 255, 0.2)'
};
