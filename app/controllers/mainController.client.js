// Define the app module
var pintitApp = angular.module('pintitApp', ['ngRoute', 'masonry']);
// Define the configuration of app
pintitApp.config(['$locationProvider' ,'$routeProvider',
  function config($locationProvider, $routeProvider) {
    // Define routes
    $routeProvider.
      when('/', {
        templateUrl: '/views/main.html',
        controller : 'mainController'
      }).
      when('/user/:id', {
        templateUrl: '/views/user.html',
        controller : 'userController'
      }).
      otherwise('/');
  }
]);
// Define the main controller on the app module
pintitApp.controller('mainController', function mainController($scope, $http, rest) {
  var socket = io();
  $scope.pins = [];
  // Load All Pin
  rest.getPinAll().then(function(data) {
    if (!data.error) {
      $scope.pins = data;
    }
  });
  // Socket POP
  socket.on('pop', function (data) {
    var pos = $scope.pins.findIndex(function(element) {
      return (element._id === data._id);
    });
    $scope.pins.splice(pos, 1);
    $scope.$apply();
  });
  // Socket PUSH
  socket.on('push', function (data) {
    $scope.pins.push(data);
    $scope.$apply();
  });
});
