import { HeatMap } from '../board/types';
import { NUMBER_OF_NOTES_TO_PLAY } from '../consts';
import clusterMaker from 'clusters';

const getLowestValuesOfHeatMap = (
  targetValue: number,
  heatMap: HeatMap
): HeatMap => {
  const vectors = heatMap
    .flatMap((row, i) =>
      row.map((cell, j) => (cell === targetValue ? [i, j] : []))
    )
    .filter(loc => loc.length !== 0);

  return vectors.length >= NUMBER_OF_NOTES_TO_PLAY || targetValue === 5
    ? vectors
    : [...vectors, ...getLowestValuesOfHeatMap(targetValue + 1, heatMap)];
};

export const getCellsToPlaySound = (
  heatMap: HeatMap
): Array<[number, number]> => {
  const heatMapMin = getLowestValuesOfHeatMap(1, heatMap);
  clusterMaker.k(NUMBER_OF_NOTES_TO_PLAY);
  clusterMaker.iterations(300);
  clusterMaker.data(heatMapMin);
  return clusterMaker
    .clusters()
    .map(({ centroid: [y, x] }) => [Math.floor(y), Math.floor(x)]);
};
