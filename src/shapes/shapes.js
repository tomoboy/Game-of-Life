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
import tenCellRow from './10CellRow'
import tumbler from "./tumbler";
import centinal from "./centinal";

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
];

export default _.reduce(shapes.map(calculateProperties), (accumulator, current) => {
    (accumulator[current.category] || (accumulator[current.category] = [])).push(current);
    return accumulator;
}, {});
