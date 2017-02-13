angular.module('darknet-hacker')

.controller('dashboardController', function($scope, $location, $ionicModal, dataService) {
  $scope.goTo = (location) => {
    $location.path('/' + location);
  }
  $scope.getUsername = () => {
    return dataService.user.name;
  }
  $scope.getPlayerDollars = () => {
    return dataService.user.money.dollars;
  }
  $scope.getPlayerCryptocoin = () => {
    return dataService.user.money.cryptocoin;
  }
  // statistics
  $scope.getGames = () => {
    return dataService.user.statistics.games;
  }
  $scope.getWins = () => {
    return dataService.user.statistics.wins;
  }
  $scope.getLosses = () => {
    return dataService.user.statistics.losses;
  }
  $scope.getSuccessRate = () => {
    if (dataService.user.statistics.games === 0 || dataService.user.statistics.wins === 0) {
      return 0;
    }
    return Math.floor(dataService.user.statistics.wins / dataService.user.statistics.games * 100);
  }
  $scope.hitKey = (letter) => {
    if (letter === 'delete') {
      $scope.username = $scope.username.substring(0, $scope.username.length-1);;
      return;
    } else if (letter === 'enter') {
      dataService.resetUser();
      dataService.user.name = $scope.username;
      dataService.saveUser();
      dataService.loadUser();
      $scope.loginModal.hide();
      return;
    }
    $scope.username += letter;
  }
  $ionicModal.fromTemplateUrl('./templates/modals/login.modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then((modal) => {
    $scope.loginModal = modal;
  });
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
  $scope.username = '';
  $scope.$on('$ionicView.enter', () => {
    if (dataService.user.name === '') {
      $scope.username = '';
      $scope.loginModal.show();
    }
  });
})