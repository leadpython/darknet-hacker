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
    gameService.setLevel(level);
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
  $scope.selectLevel = (level, mode) => {
    $scope.selectedLevel = level;
    $scope.selectedLevel.mode = mode;
    $scope.levelModal.show();
  }
  $scope.hideLevelModal = () => {
    $scope.levelModal.hide();
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
});