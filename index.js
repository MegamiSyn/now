require('dotenv').config()
const express = require('express');
const app = express();

const DB_USER = process.env.DB_USER
const DB_PASS = encodeURIComponent(process.env.DB_PASS)

app.get('/api/', (req, res) => {
  res.send({ message: '=)' });
});

app.get('/user/', (req, res) => {
    res.send({ message: DB_PASS });
});

app.get('/pass/', (req, res) => {
    res.send({ message: DB_USER });
});


app.all('*', (req, res) => {
  res.status(404).send({ message: 'route not defined!' });
});

module.exports = app;