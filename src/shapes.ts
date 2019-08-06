import { lightweightSpaceShip } from "./patterns/lightweightSpaceShip";
import { tTetromino } from "./patterns/tTetromino";
import { beehive } from "./patterns/beehive";
import { singleSquare } from "./patterns/singleSquare";
import { acorn } from "./patterns/acorn";
import { straightPolyomino } from "./patterns/straightPolyomino";
import { spaceship2 } from "./patterns/spaceship2";
import { loafer } from "./patterns/loafer";
import { glidersByTheDozen } from "./patterns/glidersByTheDozen";
import { block } from "./patterns/block";
import { boat } from "./patterns/boat";
import { flower } from "./patterns/flower";
import { fPentomino } from "./patterns/fPentomino";
import { bloom } from "./patterns/bloom";
import { homer } from "./patterns/homer";
import { pinwheel } from "./patterns/pinwheel";
import { figureEight } from "./patterns/figureEight";
import { twinBeesShuttle } from "./patterns/twinBeesShuttle";
import { copperhead } from "./patterns/copperhead";
import { tub } from "./patterns/tub";
import { bunnies9 } from "./patterns/bunnies9";
import { bHeptomino } from "./patterns/bHeptomino";
import { piHeptomino } from "./patterns/piHeptomino";
import { pulsar } from "./patterns/pulsar";
import { loaf } from "./patterns/loaf";
import { tumbler } from "./patterns/tumbler";
import { centinal } from "./patterns/centinal";
import { Pentadecathlon } from "./patterns/Pentadecathlon";
import { p60GliderShuttle } from "./patterns/p60GliderShuttle";
import { glider } from "./patterns/glider";
import { Shape, Shapes } from "./types";

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
    category: category !== "" ? capitalize(category) + ":" : ""
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
