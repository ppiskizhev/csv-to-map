const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://Peter:G8hsBAtl2eWOk0nv@riviera-cywpe.mongodb.net/csvpointer?retryWrites=true&w=majority");

// Позволим Mongoose использовать глобальную библиотеку промисов
mongoose.Promise = global.Promise;

var db = mongoose.connection;

const Files = new mongoose.Schema({
  _id: String,
}, {
  collection: 'files',
});

module.exports = {
  Files: mongoose.model('files', Files),
};

//
// (async () => {
//
//        await mongoose.model('files', Files).collection.insertMany(lal);
//        const data = await mongoose.model('files', Files).find();
//
//        console.log('data', data);
// })();

