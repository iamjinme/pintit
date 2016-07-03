'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pin = new Schema({
  title: String,
  src: String,
  date: Date,
  user: {
    id: Number,
    name: String
  },
  likes: Array,
  repin: Array,
  type: Number // Image or Video
});

module.exports = mongoose.model('Pin', Pin);
