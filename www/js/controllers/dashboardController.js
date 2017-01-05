angular.module('darknet-hacker')

.controller('dashboardController', function($scope, $location, dataService) {
  $scope.goTo = (location) => {
    $location.path('/' + location);
  }
  $scope.getPlayerDollars = () => {
    return dataService.user.money.dollars;
  }
  $scope.getPlayerCryptocoin = () => {
    return dataService.user.money.cryptocoin;
  }
})