const fs = require("fs");

const makeShapeFile = ({ name, category, shape }) => {
  const fileName = `./services/patterns/${new Date().getTime()}.js`;

  let fileContent = `module.exports = {name: '${name}',
     pattern: ${JSON.stringify(shape)},
     category: '${category}'
  }`;

  fs.writeFileSync(fileName, fileContent);
};

module.exports = makeShapeFile;
