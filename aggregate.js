/**
 * Aggregates GDP and Population Data by Continents
 * @param {*} filePath
 */
const fs = require('fs');

const aggregate = (filePath) => {
  //  import Papa.parse from'./node_modules/papaparse/papaparse';

  const text = fs.readFileSync(filePath, 'utf8').replace(/"/g, '').split('\n');
  const mapContinent = fs.readFileSync('cc-mapping.txt', 'utf8').split('\n');
  // console.log(mapContinent[1]);
  // console.log(text.length);
  const arr = [];
  const country = [];
  const population = [];
  const gdp = [];
  const map = [];
  // let j = 0;
  // mapContinent=[[argentina,SouthAmerica],[Brazil,SouthAmerica],]
  for (let i = 1; i < text.length - 1; i += 1) {
    // console.log(text[i]);
    arr.push(text[i].split(','));
  }
  for (let i = 0; i < arr.length - 1; i += 1) {
    country.push(arr[i][0]);
    population.push(arr[i][4]);
    gdp.push(arr[i][7]);
  }
  for (let i = 1; i < mapContinent.length - 1; i += 1) {
    map.push(mapContinent[i].split(','));
  }
  const mapping = new Map(map);
  // let temp = [];
  // temp = country.map(x => mapping.get(x));
  // console.log(arr[3][0]);
  // console.log(arr[3][4]);
  // console.log(map[1][1]);
  // console.log(temp);
  const output = {};
  // country_obj = {};
  const continent = ['South America', 'Oceania', 'North America', 'Asia', 'Europe', 'Africa'];
  // console.log(continent[3]);
  for (let i = 0; i < 6; i += 1) {
    output[continent[i]] = {
      GDP_2012: 0,
      POPULATION_2012: 0,

    };
  }
  // console.log(output[continent[1]]);
  const gdpSum = new Map();
  const populationSum = new Map();
  // console.log(country.length)
  for (let i = 0; i < country.length; i += 1) {
    //  console.log(mapping.get(country[i]));
    // console.log(continent[i]);
    if (gdpSum.has(mapping.get(country[i]))) {
      // console.log(mapping.get(country[i]));
      gdpSum.set(mapping.get(country[i]), parseFloat(gdpSum.get(mapping.get(country[i])) + parseFloat(gdp[i])));
      populationSum.set(mapping.get(country[i]), parseFloat(populationSum.get(mapping.get(country[i])) + parseFloat(population[i])));
    } else {
      gdpSum.set(mapping.get((country[i])), parseFloat(gdp[i]));
      populationSum.set(mapping.get(country[i]), parseFloat(population[i]));
    }
  }
  for (let i = 0; i < 6; i += 1) {
    output[continent[i]].GDP_2012 = gdpSum.get(continent[i]);
    output[continent[i]].POPULATION_2012 = populationSum.get(continent[i]);
  }
  jasonOut = JSON.stringify(output);
  // console.log(jasonOut);
  fs.writeFileSync('./output/output.json', jasonOut);
};

module.exports = aggregate;
