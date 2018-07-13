/**
 * Aggregates GDP and Population Data by Continents
 * @param {*} filePath
 */
const fs = require('fs');
const reader = require('./file-read');

const aggregate = filePath => new Promise((resolve) => {
  // const reader = require('./file-read');
  // console.log('HEy');
  const datafile = [];
  const countryContinent = [];
  let mapCountryContinent = new Map();
  const country = [];
  const gdp = [];
  const population = [];
  const output = {};
  const continent = ['South America', 'Oceania', 'North America', 'Asia', 'Europe', 'Africa'];
  Promise.all([reader(filePath), reader('./cc-mapping.txt')]).then((values) => {
    // console.log("Reached");
    values[0].forEach(e => datafile.push(e.split(',')));
    for (let i = 1; i < datafile.length - 2; i += 1) {
      country.push(datafile[i][0]);
      population.push(datafile[i][4]);
      gdp.push(datafile[i][7]);
    }
    // console.log(country);
    values[1].forEach(e => countryContinent.push(e.split(',')));
    mapCountryContinent = new Map(countryContinent);
    const gdpSum = new Map();
    const populationSum = new Map();
    let x = '';
    // console.log(country.length)
    for (let i = 0; i < country.length; i += 1) {
      //  console.log(x);
      // console.log(continent[i]);
      x = mapCountryContinent.get(country[i]);
      if (gdpSum.has(x)) {
        // console.log(x);
        gdpSum.set(x, parseFloat(gdpSum.get(x) + parseFloat(gdp[i])));
        populationSum.set(x, parseFloat(populationSum.get(x) + parseFloat(population[i])));
      } else {
        gdpSum.set((x), parseFloat(gdp[i]));
        populationSum.set(x, parseFloat(population[i]));
      }
    }
    // console.log(gdpSum);
    // console.log(populationSum);
    for (let i = 0; i < 6; i += 1) {
      output[continent[i]].GDP_2012 = gdpSum.get(continent[i]);
      output[continent[i]].POPULATION_2012 = populationSum.get(continent[i]);
    }
    const jasonOut = JSON.stringify(output);
    fs.writeFile('./output/output.json', jasonOut, () => {
      resolve();
    });
    // console.log(jasonOut);

    // console.log(mapCountryContinent);
  });
  // console.log(continent[3]);
  for (let i = 0; i < 6; i += 1) {
    output[continent[i]] = {
      GDP_2012: 0,
      POPULATION_2012: 0,
    };
  }
});

module.exports = aggregate;
