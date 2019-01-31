const x = true;
const o = false;
module.exports = {
  name: "bloom",
  pattern: [
    [x, o, o, o, o, o, o, o, o, o, o, x],
    [o, x, x, x, x, o, o, o, o, o, o, x],
    [o, o, x, x, o, o, o, o, o, o, o, x],
    [o, o, o, o, o, o, o, o, o, o, x, o],
    [o, o, o, o, o, o, o, o, x, o, x, o]
  ],
  category: "Methuselah"
};
