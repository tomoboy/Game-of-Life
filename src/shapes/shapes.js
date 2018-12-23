import singleSquare from './singleSquare'
import _ from 'lodash';
import block from "./block";
import beehive from "./beehive";
import loaf from "./loaf";
import boat from "./boat";
import tub from "./tub";

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const calculateProperties = ({name, pattern, category}) => {
    let rows = pattern.length;
    let columns = pattern[0].length;
    let midPoint = Math.floor(rows/columns);
    let xMax = rows - midPoint;
    let xMin = -xMax;
    let yMin = columns - midPoint;
    let yMax = -yMin;
    return {
        rows
        , columns
        , midPoint
        , xMax
        , xMin
        , yMin
        , yMax
        , pattern
        , name: capitalize(name)
        , category: capitalize(category)}
};

let shapes = [
    singleSquare
    , block
    , beehive
    , loaf
    , boat
    , tub
];

export default _.reduce(shapes.map(calculateProperties), (accumulator, current) => {
    (accumulator[current.category] || (accumulator[current.category] = [])).push(current);
    return accumulator;
}, {});
