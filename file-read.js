const fs = require('fs');

const reader = filePath => new Promise((resolve) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    resolve(data.replace(/"/g, '').split('\n'));
  });
});

// console.log(reader('./data/datafile.csv'));
// let datafile = [];
// const countryContinent = [];
// Promise.all([reader('./data/datafile.csv'), reader('./cc-mapping.txt')]).then((values) => {

//     values[0].forEach((e) => datafile.push(e.split(',')));

//     values[1].forEach((e) => countryContinent.push(e.split(',')));

//     // console.log(countryContinent);

//     // datafile = datafile1.split(',');
//     // console.log(datafile);
// });
module.exports = reader;
// const value = reader('./data/datafile.csv');
// console.log(value);
// let data1 = reader('./data/datafile.csv').then((response)=>{
//     datafile = response;
//     console.log(datafile)
// });
// reader('./cc-mapping.txt').then((response)=>{console.log(response)});
