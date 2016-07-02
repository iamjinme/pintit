'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pin = new Schema({
  title: String,
  src: String,
  date: Date,
  user_id: Number,
  likes: Array,
  repin: Array,
  type: Number // Image or Video
});

module.exports = mongoose.model('Pin', Pin);
