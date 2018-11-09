var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var urlModel = new Schema({
  _id: Number,
  url: String
})

module.exports = mongoose.model('urlModel', urlModel);