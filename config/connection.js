//import mongoose, specifically connect and connection modules
const { connect, connection } = require('mongoose');

//connection string
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialnetwork';

//connect using the connectionString
connect(connectionString);

//export the connection to use in server.js
module.exports = connection;
