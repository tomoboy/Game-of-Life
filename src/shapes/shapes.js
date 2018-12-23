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
    let xMin = Math.floor(rows/2);
    let yMin = Math.floor(columns/2);

    return {
        rows
        , columns
        , xMin
        , yMin
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
