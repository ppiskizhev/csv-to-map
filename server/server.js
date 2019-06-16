const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 80;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
require('./routes')(app);
app.use(express.static('../client/build'));

app.listen(PORT, function (e) {
  if (e) throw e;

  console.log(`Server listening on port ${PORT}`);
});
