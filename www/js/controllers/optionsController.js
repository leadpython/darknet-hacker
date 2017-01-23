angular.module('darknet-hacker')

.controller('optionsController', function($scope, $location, dataService) {
  $scope.goTo = (location) => {
    $location.path('/' + location);
  }
  $scope.reset = () => {
    dataService.resetUser();
  }
})