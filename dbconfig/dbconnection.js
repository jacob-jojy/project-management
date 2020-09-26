const mongo = require("mongodb").MongoClient;

const state = {
  db: null,
};
module.exports.connect = function (con) {
  const url = "mongodb://localhost:27017";
  const dbname = "project-management";

  mongo.connect(url, { useUnifiedTopology: true }, (err, data) => {
    if (err) {
      return con(err);
    }
    state.db = data.db(dbname);
    con();
  });
};
module.exports.get = function () {
  return state.db;
};
