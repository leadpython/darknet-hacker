angular.module('darknet-hacker')

.controller('dashboardController', function($scope, $location) {
  $scope.goTo = (location) => {
    $location.path('/' + location);
  }
})