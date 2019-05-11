const express = require('express');
const PORT = process.env.PORT || 3000;

// new express app
const app = express();

// middleware
app.use(express.static('../client/build'));

app.listen(PORT, function (e) {
  if (e) throw e

  console.log(`Server listening on port ${PORT}`);
})
