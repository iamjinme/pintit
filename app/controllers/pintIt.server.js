'use strict';

var path = process.cwd();
var Pin = require('../models/pins.js');

function PintIt () {

  this.delPin = function(req, res) {
    var id = req.params.id;
    Pin.findOne({ '_id': id }, function(err, result) {
      if (err) throw err;
      if (result) {
        if (req.user.twitter.id === result.user.id) {
          result.remove();
          res.json(result);
        } else {
          res.json({ error: true, message: 'You are not the owner'});
        }
      } else {
        res.json({ error: true, message: 'Pin not found'});
      }
    });
	}

  this.getPinUser = function(req, res) {
    var id = req.params.id;
    Pin
      .find({'user.id': id }, { __v: false })
      .sort({'date': -1})
      .exec(function(err, pins) {
        res.json(pins);
      });
  };

  this.getPinAll = function(req, res) {
    console.log(req.isAuthenticated());
    Pin
	  	.find({}, { __v: false })
	    .sort({'date': -1})
			.limit(60)
	    .exec(function(err, pins) {
	    	res.json(pins);
	   	});
  };

  this.addPin = function(req, res) {
    if(req.body.title) {
      if(req.body.src) {
        var pin = {
          'title': req.body.title,
          'src': req.body.src,
          'date': new Date(),
          'user': { 'id': req.user.twitter.id, 'name': req.user.twitter.name },
          'format': 0
        };
        var options = { upsert: true, new: true, setDefaultsOnInsert: true };
        Pin.findOneAndUpdate({ 'src': req.body.src,  'user.id': req.user.twitter.id }, pin, options, function(err, result) {
          if (err) { throw err; }
          res.json(result);
        });
      } else {
        res.json({ error: true, message: 'Source invalid' });
      }
    } else {
      res.json({ error: true, message: 'Title is required' });
    }
	}

}

module.exports = PintIt;
