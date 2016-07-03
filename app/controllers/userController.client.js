// User Controller
pintitApp.controller('userController', function userController($scope, $route, rest) {
  $scope.collection = {};
  var id = $route.current.params.id;
  // Load User Pin
  rest.getPinUser(id).then(function(data) {
    if (!data.error) {
      $scope.collection = data;
    }
  });
});
