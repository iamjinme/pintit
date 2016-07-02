'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

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

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
};
