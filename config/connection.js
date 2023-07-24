const { connect, connection } = require('mongoose');

//connection string
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialnetwork';

connect(connectionString);

module.exports = connection;
