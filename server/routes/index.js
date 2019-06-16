const dbRoutes = require('./db_routes');
module.exports = function(app) {
  dbRoutes(app);
};
