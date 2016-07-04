'use strict';

var path = process.cwd();
var PintIt = require(path + '/app/controllers/pintIt.server.js');

module.exports = function (app, passport, io) {

	var pintIt = new PintIt();

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	// Sockets.io in real time
	io.on('connection', function (socket) {
		socket.on('push', function(data){
			console.log('push:', data)
			data.code = data.code.toUpperCase();
			ioStock.saveCode(data);
			io.emit('push', data);
		});
		socket.on('pop', function(data){
			console.log('pop:', data)
			data.code = data.code.toUpperCase();
			ioStock.removeCode(data);
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
	    if (typeof req.user !== 'undefined') {
	      res.json({ islogged: true, user: req.user });
	    } else {
	      res.json({ islogged: false });
	    }
	  });

	app.route('/api/pin')
		.post(pintIt.addPin)
		.get(pintIt.getPinAll);

	app.delete('/api/pin/:id', pintIt.delPin);

	app.route('/api/user/:id/pin')
		.get(pintIt.getPinUser);

};
