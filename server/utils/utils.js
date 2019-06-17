const csv = require('csvtojson');
const { File } = require('../mongodb');
const { standartColors } = require('../constants');


function convertToJson(fileName) {
  const converter = csv({ noheader: true });
  const promise = converter
    .fromFile(`./uploads/${fileName}`)
    .then(strings => {
      const points = strings.slice(1);
      const sale = {
        name: fileName,
        points
      }

      return sale;
    })
    .catch(err => console.log('Ошибка конвертации', err));

  return promise;
}

function formatSales(sales, bdData) {
  sales.forEach(sale => sale.name = sale.name.replace(/\.csv/, ''))
  const salesNames = sales.map(sale => sale.name);
  const availableColors = getAvailibleColors(salesNames, bdData);

  const formatedSales = sales.map(({ name, points }) => ({
      name,
      points: formatPoints(points),
      isActive: false,
      color: getColor(availableColors)
  }));

  return formatedSales;
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

function getBdData(sales) {
  return new Promise((resolve, reject) => {
    File.find({}, 'name color', function(err, usedColors) {
      if (err) {
        reject(err);
      }

      resolve({ sales, usedColors });
    })
  })
}


function round1Decimal(num) {
  return Math.round(num * 10) / 10;
}

function getColor(colors) {
  return colors.length ? colors.pop() : getRandomColor();
}

function getAvailibleColors(salesNames, bdData) {
  const colorNameMap = {};

  bdData.forEach(({ name, color }) => colorNameMap[color] = name);

  const availableColors = standartColors.filter(color => {
    const name = colorNameMap[color];
    if (name && !salesNames.includes(name)) {
      return false;
    }

    return true;
  });

  return availableColors;
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updateData(sales) {
  return new Promise((resolve, reject) => {
    const namesToDelete = sales.map(({ name }) => name).join('|');
    const rxp = new RegExp(namesToDelete);
    console.log('namesToDelete', namesToDelete);
    File.deleteMany({ name: rxp }, function(err) {
      if (err) {
        console.log('Ошибка при удалении');
        reject(err);
      }

      File.insertMany(sales, function(err, docs) {
        if (err) {
          console.log('Ошибка при добавлении в бд');
          reject(err);
        }

        resolve(docs);
      })
    })
  })
}

module.exports = {
  convertToJson,
  formatSales,
  getBdData,
  updateData
};
