const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const url = "mongodb://localhost:27017";
let _db;

const mongoConnect = callback => {
  MongoClient.connect(url)
    .then(client => {
      console.log("DB Connected");
      _db = client.db("node-guide");
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
