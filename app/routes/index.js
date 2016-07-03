'use strict';

var path = process.cwd();
var PintIt = require(path + '/app/controllers/pintIt.server.js');

module.exports = function (app, passport) {

	var pintIt = new PintIt();

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

  app.get('/login/twitter',
    passport.authenticate('twitter'));

  app.get('/login/twitter/return',
    passport.authenticate('twitter', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/');
    });

  app.get('/logout',
    function(req, res) {
      req.session.destroy();
      res.redirect('/');
    });

	app.route('/api/islogged')
	  .get(function(req, res) {
	    if (typeof req.user !== 'undefined') {
	      res.json({ islogged: true, user: req.user });
	    } else {
	      res.json({ islogged: false });
	    }
	  });

	app.route('/api/pin')
		.post(pintIt.addPin)
		.get(pintIt.getPinAll);

	app.route('/api/user/:id/pin')
		.get(pintIt.getPinUser);

};
