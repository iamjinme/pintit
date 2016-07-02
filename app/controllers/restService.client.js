// REST Service
pintitApp.factory('rest', function($http){
  var rest = {};

  // POST change password
  rest.getIsLogged = function(user) {
    var promise = $http.get('/api/islogged')
      .then(function(response) {
        return response.data;
      });
    return promise;
  }

  return rest;
});
