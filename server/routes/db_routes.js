const multer = require('multer');
const { convertToJson, formatSales, getBdData, updateData } = require('../utils/utils');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

function add(app) {
  app.post('/add', upload.array('file'), (req, res) => {
    const fileNames = req.files.map(file => file.originalname);
    getResponseData(fileNames).
      then(data => {
        console.log('Ответ успешно сформирован');
        res.json(data);
    })
  });
}

function getResponseData(fileNames) {
  const promises = fileNames.map(name => convertToJson(name));
  return Promise.all(promises)
    .then(sales => getBdData(sales))
    .then(({ sales, usedColors }) => formatSales(sales, usedColors))
    .then((newSales) => updateData(newSales))
    .catch(err => console.log(err))
}

module.exports = function(app) {
  add(app);
};


