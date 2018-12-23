import singleSquare from './singleSquare'
import _ from 'lodash';

const calculateProperties = ({name, pattern, category}) => {
    let rows = pattern.length;
    let columns = pattern[0].length;
    let midPoint = Math.floor(rows/columns);
    let xMax = rows - midPoint;
    let xMin = -xMax;
    let yMin = columns - midPoint;
    let yMax = -yMin;
    return {rows, columns, midPoint, xMax, xMin, yMin, yMax, name, pattern, category}
};

export default _.reduce([singleSquare].map(calculateProperties), (accumulator, current) => {
    (accumulator[current.category] || (accumulator[current.category])).push(current);
    return accumulator;
}, {});
