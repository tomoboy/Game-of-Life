import singleSquare from './singleSquare'
import _ from 'lodash';
import block from "./block";
import beehive from "./beehive";
import loaf from "./loaf";
import boat from "./boat";
import tub from "./tub";
import tTetromino from "./tTetromino";
import straightPolyomino from "./straightPolyomino";
import glider from "./glider";
import lightweightSpaceShip from "./lightweightSpaceShip";
import fPentomino from "./fPentomino";
import acorn from "./acorn";
import pulsar from "./pulsar";
import homer from "./homer";
import flower from "./flower";
import tenCellRow from './Pentadecathlon'
import tumbler from "./tumbler";
import centinal from "./centinal";
import pinwheel from "./pinwheel";
import figureEight from "./figureEight";
import twinBeesShuttle from "./twinBeesShuttle";
import p60GliderShuttle from "./p60GliderShuttle";
import spaceship2 from "./spaceship2";
import loafer from "./loafer";
import copperhead from "./copperhead";
import bHeptomino from "./bHeptomino";
import piHeptomino from "./piHeptomino";
import bunnies9 from "./bunnies9";
import glidersByTheDozen from "./glidersByTheDozen";
import bloom from "./bloom";

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const calculateProperties = ({name, pattern, category}) => {
    let rows = pattern.length;
    let columns = pattern[0].length;
    let xMin = Math.floor(rows/2);
    let yMin = Math.floor(columns/2);

    return {
        rows
        , columns
        , xMin
        , yMin
        , pattern
        , name: capitalize(name)
        , category:(category !== '') ? capitalize(category) + ':' : ''}
};

let shapes = [
    singleSquare
    , block
    , beehive
    , loaf
    , boat
    , tub
    , tTetromino
    , straightPolyomino
    , glider
    , lightweightSpaceShip
    , fPentomino
    , acorn
    , pulsar
    , homer
    , flower
    , tenCellRow
    , tumbler
    , centinal
    , pinwheel
    , figureEight
    , twinBeesShuttle
    , p60GliderShuttle
    , spaceship2
    , loafer
    , copperhead
    , bHeptomino
    , piHeptomino
    , bunnies9
    , glidersByTheDozen
    , bloom
];

export default _.reduce(shapes.map(calculateProperties), (accumulator, current) => {
    (accumulator[current.category] || (accumulator[current.category] = [])).push(current);
    return accumulator;
}, {});
