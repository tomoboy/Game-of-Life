import { lightweightSpaceShip } from './lightweightSpaceShip';
import { tTetromino } from './tTetromino';
import { beehive } from './beehive';
import { singleSquare } from './singleSquare';
import { acorn } from './acorn';
import { straightPolyomino } from './straightPolyomino';
import { spaceship2 } from './spaceship2';
import { loafer } from './loafer';
import { glidersByTheDozen } from './glidersByTheDozen';
import { block } from './block';
import { boat } from './boat';
import { flower } from './flower';
import { fPentomino } from './fPentomino';
import { bloom } from './bloom';
import { homer } from './homer';
import { pinwheel } from './pinwheel';
import { figureEight } from './figureEight';
import { twinBeesShuttle } from './twinBeesShuttle';
import { copperhead } from './copperhead';
import { tub } from './tub';
import { bunnies9 } from './bunnies9';
import { bHeptomino } from './bHeptomino';
import { piHeptomino } from './piHeptomino';
import { pulsar } from './pulsar';
import { loaf } from './loaf';
import { tumbler } from './tumbler';
import { centinal } from './centinal';
import { Pentadecathlon } from './Pentadecathlon';
import { p60GliderShuttle } from './p60GliderShuttle';
import { glider } from './glider';
import { Shape, Shapes } from '../types';

const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

const calculateProperties = ({
  name,
  pattern,
  category
}: {
  name: string;
  pattern: boolean[][];
  category: string;
}) => {
  const rows = pattern.length,
    columns = pattern[0].length;
  return {
    rows,
    columns,
    pattern,
    xMin: Math.floor(columns / 2),
    yMin: Math.floor(rows / 2),
    name: capitalize(name),
    category: category !== '' ? capitalize(category) + ':' : ''
  };
};

export const shapes = [
  acorn,
  beehive,
  bHeptomino,
  block,
  bloom,
  boat,
  bunnies9,
  centinal,
  copperhead,
  figureEight,
  flower,
  fPentomino,
  glider,
  glidersByTheDozen,
  homer,
  lightweightSpaceShip,
  loaf,
  loafer,
  p60GliderShuttle,
  Pentadecathlon,
  piHeptomino,
  pinwheel,
  pulsar,
  singleSquare,
  spaceship2,
  straightPolyomino,
  tTetromino,
  tub,
  tumbler,
  twinBeesShuttle
]
  .map((shape: { name: string; pattern: boolean[][]; category: string }) =>
    calculateProperties(shape)
  )
  .reduce((accumulator: Record<string, Shape[]>, current: Shape) => {
    (
      accumulator[current.category] || (accumulator[current.category] = [])
    ).push(current);
    return accumulator;
  }, {}) as Shapes;
