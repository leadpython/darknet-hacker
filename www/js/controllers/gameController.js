angular.module('darknet-hacker')

.controller('gameController', function($scope, $location) {
  $scope.goTo = (location) => {
    $location.path('/' + location);
  }
})