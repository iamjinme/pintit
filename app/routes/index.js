'use strict';

var path = process.cwd();
var PintIt = require(path + '/app/controllers/pintIt.server.js');

module.exports = function (app, passport, io) {

	var pintIt = new PintIt();

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.json({ error: true, message: 'Unauthorized'});
		}
	}

	// Sockets.io in real time
	io.on('connection', function (socket) {
		socket.on('push', function(data){
			io.emit('push', data);
		});
		socket.on('pop', function(data){
			io.emit('pop', data);
		});
	});

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
	    if (req.isAuthenticated()) {
	      res.json({ islogged: true, user: req.user });
	    } else {
	      res.json({ islogged: false });
	    }
	  });

	app.route('/api/pin')
		.post(isLoggedIn, pintIt.addPin)
		.get(pintIt.getPinAll);

	app.delete('/api/pin/:id', isLoggedIn, pintIt.delPin);

	app.route('/api/user/:id/pin')
		.get(pintIt.getPinUser);

};
