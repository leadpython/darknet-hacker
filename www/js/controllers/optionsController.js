angular.module('darknet-hacker')

.controller('optionsController', function($scope, $location, $ionicModal, dataService) {
  $scope.goTo = (location) => {
    $location.path('/' + location);
  }
  $scope.reset = () => {
    dataService.resetUser();
    $location.path('/dashboard');
  }
  // credits modal
  $ionicModal.fromTemplateUrl('./templates/modals/credits.modal.html', {
    scope: $scope
  }).then((modal) => {
    $scope.creditsModal = modal;
  });
  $scope.showCredits = () => {
    $scope.creditsModal.show();
  }
  $scope.hideCredits = () => {
    $scope.creditsModal.hide();
  }
})