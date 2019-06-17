const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect("mongodb+srv://Peter:G8hsBAtl2eWOk0nv@riviera-cywpe.mongodb.net/csvpointer?retryWrites=true&w=majority");

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected to DB')
});

const PointSchema = new Schema({
  coords: [Number],
  partner: String,
  address: String,
  weight: Number,
  sum: Number,
  task: String,
});

const FileSchema = new Schema({
  name: String,
  color: String,
  isActive: Boolean,
  points: [PointSchema]
});

const File = mongoose.model('File', FileSchema);

module.exports = {
  File
};

