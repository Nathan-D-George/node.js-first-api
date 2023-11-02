const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const animeSchema = new Schema ({
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    genre: {
      type: String,
      required: true
    }
  },{
    versionKey: false
  }
);

module.exports = mongoose.model('Anime', animeSchema);
