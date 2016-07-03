// User Controller
pintitApp.controller('userController', function userController($scope, $route, rest) {
  $scope.collection = [];
  // Load Masonry Grid
  angular.element(document).ready(function () {
    $('.grid').masonry({
      itemSelector: '.grid-item',
      columnWidth: 160
    });
  });
  // GET User id
  var id = $route.current.params.id;
  // DELETE User pin
  $scope.delPin = function(pin, pos) {
    // Call API
    rest.delPin(pin._id).then(function(data) {
      if (data.error) {
        console.log(data.message);
      } else {
        $scope.collection.splice(pos, 1);
      }
    })
  }
  // Load User Pin
  rest.getPinUser(id).then(function(data) {
    if (!data.error) {
      $scope.collection = data;
    }
  });
});
