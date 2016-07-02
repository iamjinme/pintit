// Add Pin Controller
pintitApp.controller('addController', function addController($scope, $http, rest) {
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

});
