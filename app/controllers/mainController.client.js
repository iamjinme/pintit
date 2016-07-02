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
      when('/my', {
        templateUrl: '/views/my.html',
        controller : 'myController',
        resolve: {
          "check":function(session, $location) {
            if (!session.logged) {
              $location.path('/');
            }
          }
        }
      }).
      otherwise('/');
  }
]);
// Define the main controller on the app module
pintitApp.controller('mainController', function mainController($scope, $http) {
  // Load Masonry Grid
  angular.element(document).ready(function () {
    $('.grid').masonry({
      itemSelector: '.grid-item',
      columnWidth: 160
    });
  });
});
