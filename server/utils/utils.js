const fs = require('fs');
const csv = require('csvtojson');
const converter = csv({ noheader: true });
const { standartColors } = require('../constants');

function convertToJson(fileName) {
  const promise = converter
    .fromFile(`./uploads/${fileName}`)
    .then(strings => {
      const points = strings.slice(1);
      const sale = {
        name: fileName,
        points
      }

      return sale;
    });

  return promise;
}

function formatSales(sales) {
  const formatedSales = sales.map(({ name, points }) => ({
      name,
      points: formatPoints(points)
  }));

  const salesObj = {};
  formatedSales.forEach(sale => salesObj[sale.name] = sale);
  return salesObj;
}

function formatPoints(points) {
  const formatedPoints = points.map(point => {
    return {
      coords: [parseFloat(point['field2']), parseFloat(point['field1'])],
      partner: point['field3'],
      address: point['field5'],
      weight: round1Decimal(parseFloat(point['field6'])),
      sum: round1Decimal(parseFloat(point['field8'].replace(/\s/g, ''))),
      task: point['field9'],
    }
  });

  return formatedPoints;
}

function mergeSalesFile(newSales) {
  readSalesFromFile()
    .then(sales => appendColors(sales, newSales))
    .then(({ sales, newSales }) => mergeSales(sales, newSales))
    .then(mergedData => writeSalesToFile(mergedData))
    .catch(err => console.log(err));
}

function mergeSales(sales, newSales) {
  return {
    ...sales,
    ...newSales
  }
}

function appendColors(sales, newSales) {
  const usedColors = {};
  Object.keys(sales).forEach(name => {
    const { color: usedColor } = sales[name];
    usedColors[usedColor] = true;
  });

  for (const name in newSales) {
    setColor(usedColors, newSales[name]);
    console.log('SALE', newSales[name]);
  }

  return { sales, newSales };
}

function setColor(usedColors, sale) {
  for (let i = 0; i < standartColors.length; i++) {
    const currentColor = standartColors[i];
    console.log('COLOR', currentColor);
    if (!usedColors[currentColor]) {
      console.log('TESRT');
      sale['color'] = currentColor;
      usedColors[currentColor] = true;
      return;
    };
  }

  const randomColor = getRandomColor();
  usedColors[randomColor] = true;
  sale['color'] = randomColor;
}

function readSalesFromFile() {
  const promise = new Promise((resolve, reject) => {
    fs.readFile('./data/sales.json', 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }

      let json = {};
      try {
        json = JSON.parse(data);
      } catch (err) {
        console.log(err);
      }

      console.log('Данные успешно прочитаны');
      resolve(json);
    });
  });

  return promise;
}

function writeSalesToFile(data) {
  let string = '';
  try {
    string = JSON.stringify(data);
  } catch (err) {
    console.log(err);
  }

  const promise = new Promise((resolve, reject) => {
    fs.writeFile('./data/sales.json', string, 'utf8', (err) => {
      if (err) {
        return reject(err);
      }

      console.log('Данные успешно записаны');
      resolve(data);
    });
  });

  return promise;
}

function round1Decimal(num) {
  return Math.round(num * 10) / 10;
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

module.exports = {
  convertToJson,
  formatSales,
  mergeSalesFile
};
