// User Controller
pintitApp.controller('userController', function userController($scope, $route, rest) {
  var socket = io();
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
        socket.emit('pop', data);
      }
    })
  }
  // Load User Pin
  rest.getPinUser(id).then(function(data) {
    if (!data.error) {
      $scope.collection = data;
    }
  });
  // Socket POP
  socket.on('pop', function (data) {
    var pos = $scope.collection.findIndex(function(element) {
      return (element._id === data._id);
    });
    $scope.collection.splice(pos, 1);
    $scope.$apply();
    $('.grid').masonry('reloadItems');
    $('.grid').masonry('layout');
  });
  // Socket PUSH
  socket.on('push', function (data) {
    $scope.collection.push(data);
    $scope.$apply();
    $('.grid').masonry('reloadItems');
    $('.grid').masonry('layout');
  });
});
