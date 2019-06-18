const multer = require('multer');
const bodyParser = require('body-parser');
const { convertToJson, formatSales, getBdData, updateData } = require('../utils/utils');
const { File } = require('../mongodb');

const jsonParser = bodyParser.json();

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
      .catch((err) => res.end('error'));
  });
}

function get(app) {
  app.get('/get', (req, res) => {
    File.find({}, (err, docs) => {
      if (err) {
        res.end('error');
      }

      res.json(docs);
    })
  })
}

function toggle(app) {
  app.post('/toggle', jsonParser, (req, res) => {
    const { name } = req.body;
    File.findOne({ name }, (err, doc) => {
      if (err) {
        res.end('error');
      }

      doc.isActive = !doc.isActive;
      doc.save((err) => {
        if (err) {
          res.end('error');
        } else {
          res.end('ok');
        }
      })
    })
  });
}

function remove(app) {
  app.post('/remove', jsonParser, (req, res) => {
    const { name } = req.body;
    File.deleteOne({ name }, function(err) {
      if (err) {
        res.end('error');
      } else {
        res.end('ok');
      }
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
  get(app);
  toggle(app);
  remove(app);
};


