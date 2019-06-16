const multer = require('multer');
const { convertToJson, formatSales, mergeSalesFile } = require('../utils/utils');

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
        res.end('ok');
    })
  });
}

function getResponseData(fileNames) {
  const promises = fileNames.map(name => convertToJson(name));
  return Promise.all(promises)
    .then(sales => formatSales(sales))
    .then(sales => mergeSalesFile(sales))
}

module.exports = function(app) {
  add(app);
};


