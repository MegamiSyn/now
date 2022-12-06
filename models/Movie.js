const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: { type: String, required: true },
    url_m: { type: String, unique: true, required: true },
    img_url: { type: String, required: true },
    versionKey: false
});

module.exports = Movie = mongoose.model('movie', movieSchema);