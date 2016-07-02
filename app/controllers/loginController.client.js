// Login Controller
pintitApp.controller('loginController', function loginController($scope, $http, rest) {
  $scope.user = {};
  $scope.login = {
    in: false,
    is_login: true,
    title: '',
    subtitle: '',
    message: '',
    error: false
  };
  // Show Modal
  $scope.showAddPin = function() {
    $('#add_modal').addClass('active');
  }
  // Verify Login
  rest.getIsLogged().then(function(data) {
    if (data.islogged) {
      $scope.user = data.user;
      $scope.login.in = true;
    }
  });
});
