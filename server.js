const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//once the db is open, start listening
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for Social Network App running on port ${PORT}!`);
  });
});
