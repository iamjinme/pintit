// Define the app module
var pintitApp = angular.module('pintitApp', ['ngRoute']);
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
  $scope.pins = [];
  // Load Masonry Grid
  angular.element(document).ready(function () {
    $('.grid').masonry({
      itemSelector: '.grid-item',
      columnWidth: 160
    });
  });
  // Load All Pin
  rest.getPinAll().then(function(data) {
    if (!data.error) {
      $scope.pins = data;
    }
  });
});
