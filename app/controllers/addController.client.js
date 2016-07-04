// Add Pin Controller
pintitApp.controller('addController', function addController($scope, $http, rest) {
  var socket = io();
  $scope.add_message = '';
  $scope.img_src = '/public/img/blank.png';
  // Clear buttons
  $('.btn-clear').click(function() {
    var modal = $(this).data('modal');
    if (modal) {
      $(modal).removeClass('active');
    } else {
      $(this).parent().addClass('hide');
    }
  });
  // Close button modal
  $('#modal_close').click(function() {
    $('#add_modal').removeClass('active');
  });
  // Watch Source URL
  $scope.$watch('src', function() {
    if ($scope.src) {
      $scope.img_src = $scope.src;
    } else {
      $scope.img_src = '/public/img/blank.png';
    }
  });
  // Add Pin
  $scope.addPin = function() {
    // Get data
    var data = {
      'title': $('input[name=title]').val(),
      'src': $('input[name=src]').val()
    }
    // Call API
    rest.postPin(data).then(function(data) {
      if (data.error) {
        $scope.add_message = data.message;
        $('#add_message').removeClass('hide');
      } else {
        socket.emit('push', data);
        $('#add_message').addClass('hide');
        $('#add_modal').removeClass('active');
      }
    })
  }
});
