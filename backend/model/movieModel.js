const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    img: { type: String },
    title: { type: String },
    description: { type: String },
    releaseDate: { type: Date },
    rating: { type: Number },
    totalRating: { type: Number, default: '10' },
});

const MovieModel = mongoose.model("movieModel", MovieSchema);

module.exports = MovieModel;