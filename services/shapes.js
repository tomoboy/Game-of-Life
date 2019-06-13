const glob = require("glob");
const path = require("path");
const _ = require("lodash");

const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1);

const calculateProperties = ({ name, pattern, category }) => {
  console.log(name);
  const rows = pattern.length,
    columns = pattern[0].length;
  return {
    rows,
    columns,
    pattern,
    xMin: Math.floor(rows / 2),
    yMin: Math.floor(columns / 2),
    name: capitalize(name),
    category: category !== "" ? capitalize(category) + ":" : ""
  };
};
const shapes = glob
  .sync("./services/patterns/*.js")
  .map(file => calculateProperties(require(path.resolve(file))));


const categories = shapes.reduce(
  (accumulator, current) => {
    (
      accumulator[current.category] || (accumulator[current.category] = [])
    ).push(current);
    return accumulator;
  },
  {}
);


// Add alphabetical sorting
module.exports = Object.values(categories).map(cat => ({category: cat, shapes: categories[cat]}));
