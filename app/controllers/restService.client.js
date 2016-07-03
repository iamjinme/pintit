// REST Service
pintitApp.factory('rest', function($http){
  var rest = {};

  // GET Is logged?
  rest.getIsLogged = function(user) {
    var promise = $http.get('/api/islogged')
      .then(function(response) {
        return response.data;
      });
    return promise;
  }

  // POST Add pin
  rest.postPin = function(pin) {
    var promise = $http.post('/api/pin', pin)
      .then(function(response) {
        return response.data;
      });
    return promise;
  }

  // GET Pin All
  rest.getPinAll = function() {
    var promise = $http.get('/api/pin')
      .then(function(response) {
        return response.data;
      });
    return promise;
  }

  // GET Pin User
  rest.getPinUser = function(id) {
    var promise = $http.get('/api/user/' + id + '/pin')
      .then(function(response) {
        return response.data;
      });
    return promise;
  }

  return rest;
});
