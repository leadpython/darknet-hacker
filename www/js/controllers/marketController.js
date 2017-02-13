angular.module('darknet-hacker')

.controller('marketController', function($scope, $location, dataService) {
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

  // purchase methods
  $scope.purchase = (item) => {
    switch (item) {
      case 'cryptocoin':
        if (dataService.user.money.dollars >= 1000) {
          dataService.updateDollars(-1000);
          dataService.updateCryptocoin(1);
          soundService.play('buy');
        }
        break;
      case 'burnerPhone':
        if (dataService.user.money.cryptocoin >= 1) {
          dataService.updateCryptocoin(-1);
          dataService.user.toolbox.burnerPhone++;
          soundService.play('buy');
        }
        break;
      case 'disrupt':
        if (dataService.user.money.cryptocoin >= 2) {
          dataService.updateCryptocoin(-2);
          dataService.user.toolbox.disrupt++;
          soundService.play('buy');
        }
        break;
      case 'speed':
        if (dataService.user.money.cryptocoin >= 3) {
          dataService.updateCryptocoin(-5);
          dataService.user.toolbox.speed++;
          soundService.play('buy');
        }
        break;
      case 'keylogger':
        if (dataService.user.money.cryptocoin >= 10) {
          dataService.updateCryptocoin(-10);
          dataService.user.toolbox.keylogger++;
          soundService.play('buy');
        }
        break;
    }
  };
})