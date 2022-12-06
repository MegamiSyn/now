const mongoose = require("mongoose");

const Movie = mongoose.model('Movie',{
    name: String,
    url_m: String,
    img_url: String,
})

module.exports = Movie