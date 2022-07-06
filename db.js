const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
let isConnected;

const url = `mongodb+srv://admin:ionev@cluster0.ie6xlqp.mongodb.net/?retryWrites=true`;

module.exports = connectToDatabase = () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return Promise.resolve();
  }

  console.log("=> using new database connection");
  return mongoose.connect(url).then((db) => {
    isConnected = db.connections[0].readyState;
  });
};
