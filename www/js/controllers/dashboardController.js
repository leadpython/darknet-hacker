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
  // commafy number
  $scope.commafy = (number) => {
    let numberArr = number.toString().split('');
    let commafied = [];

    for (let i = numberArr.length-1, j = 0; i >= 0; i--, j++) {
      commafied.unshift(numberArr[i]);
      if (j === 2 && i > 0) {
        j = -1;
        commafied.unshift(',');
      }
    }
    return commafied.join('');
  }
})