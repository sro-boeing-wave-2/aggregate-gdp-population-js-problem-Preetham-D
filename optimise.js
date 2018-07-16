const fs = require('fs');
const reader = require('./file-read');

const aggregate = filePath => new Promise((resolve) => {
  Promise.all([reader(filePath), reader('./cc-mapping.txt')]).then((values) => {
    const header = values[0][0].split(',');
    const map = [];
    values[1].forEach(e => map.push(e.split(',')));
    const mapObject = {};
    for (let i = 0; i < map.length; i += 1) {
      [mapObject[map[i][0]]] = [map[i][1]];
    }
    const cI = header.indexOf('Country Name');
    const gdp2012Index = header.indexOf('GDP Billions (US Dollar) - 2012');
    const population2012Index = header.indexOf('Population (Millions) - 2012');
    const output = {};
    values[0].forEach((item, i) => {
      if (item.length > 1 && i > 0) {
        const row = item.split(',');
        if (row[cI] !== 'European Union') {
          if (output[mapObject[row[cI]]] === undefined) {
            output[mapObject[row[cI]]] = {};
            output[mapObject[row[cI]]].gdp2012Sum = parseFloat(row[gdp2012Index]);
            output[mapObject[row[cI]]].population2012Sum = parseFloat(row[population2012Index]);
          } else {
            output[mapObject[row[cI]]].gdp2012Sum += parseFloat(row[gdp2012Index]);
            output[mapObject[row[cI]]].population2012Sum += parseFloat(row[population2012Index]);
          }
        }
      }
    });
    fs.writeFile('./output/output.json', JSON.stringify(output), () => {
      resolve();
    });
  });
});
module.exports = aggregate;
