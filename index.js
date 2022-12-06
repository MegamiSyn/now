require('dotenv').config()
const express = require('express');
const mongoose = require("mongoose")
const app = express();

const DB_USER = process.env.DB_USER
const DB_PASS = encodeURIComponent(process.env.DB_PASS)
const DB_HOST = process.env.DB_HOST

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
)

const personRoutes = require('./routes/personRoutes')
app.use('/person',personRoutes)

const movieRoutes = require('./routes/movieRoutes')
app.use('/movie',movieRoutes)

app.get('/', (req, res) => {
  res.send({ message: '=)' });
});

app.all('*', (req, res) => {
  res.status(404).send({ message: 'route not defined!' });
});

mongoose.connect('mongodb+srv://'+DB_USER+':'+DB_PASS+'@'+DB_HOST+'/?retryWrites=true&w=majority')
.then(() => {
    console.log('Conectado')
    app.listen(3000)
})
.catch((err) => console.log(err))

module.exports = app;