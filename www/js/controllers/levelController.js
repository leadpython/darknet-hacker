angular.module('darknet-hacker')

.controller('levelController', function($scope, $interval, $location, dataService, levelService, $ionicModal, gameService) {
  $scope.goTo = (location) => {
    $location.path('/' + location);
  }
  $scope.getLevels = () => {
    return levelService.levels;
  }
  $scope.getMultiplier = (mode) => {
    switch (mode) {
      case 'normal':
        return 1;
      case 'triangulation':
        return 2;
      case 'darknet':
        return 5;
    }
  }
  $scope.setLevel = (level) => {
    if (dataService.user.money.dollars < (level.reward / 5)) {
      return;
    }
    dataService.updateDollars(-1 * level.reward / 5); 
    gameService.setLevel(level, $scope.selectedLevel.indexLevel);
    $scope.hideLevelModal();
    $scope.loadingBarProgress = 0;
    $scope.startLoadingWindow();
  }
  $scope.startLoadingWindow = () => {
    $scope.loadingModal.show();
    let loadingAnimation = $interval(() => {
      $scope.loadingBarProgress++;
      // go to game after done
      if ($scope.loadingBarProgress >= 100) {
        $interval.cancel(loadingAnimation);
        $scope.loadingModal.hide();
        $scope.goTo('game');
      }
    }, 20);
  }
  $scope.selectLevel = (level, mode, index) => {
    $scope.selectedLevel = level;
    $scope.selectedLevel.mode = mode;
    $scope.selectedLevel.indexLevel = index;
    $scope.levelModal.show();
  }
  $scope.hideLevelModal = () => {
    $scope.levelModal.hide();
  }

  // check level
  $scope.checkLevel = (index) => {
    if (index === 0) {
      return false;
    }
    return !(dataService.checkLevel(index));
  }
  // check mode
  $scope.checkMode = (index, mode) => {
    return dataService.user.completed[index][mode];
  }
  // MODALS
  // Modal shown when checking for level details
  $ionicModal.fromTemplateUrl('./templates/modals/level-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then((modal) => {
    $scope.levelModal = modal;
  });
  // Loading modal
  $ionicModal.fromTemplateUrl('./templates/modals/loading-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then((modal) => {
    $scope.loadingModal = modal;
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
  $scope.getPlayerDollars = () => {
    return dataService.user.money.dollars;
  }
});