require('dotenv').config()
const express = require('express');
const app = express();

app.get('/api/', (req, res) => {
  res.send({ message: '=)' });
});

app.all('*', (req, res) => {
  res.status(404).send({ message: 'route not defined!' });
});

const DB_USER = process.env.DB_USER
const DB_PASS = encodeURIComponent(process.env.DB_PASS)

console.log(DB_PASS);
console.log(DB_USER);

module.exports = app;