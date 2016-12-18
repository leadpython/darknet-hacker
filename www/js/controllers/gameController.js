angular.module('darknet-hacker')

.controller('gameController', function($scope, $location, $interval, gameService) {
  $scope.$on('$ionicView.enter', () => {
    $scope.gameOptions = {
      name: '',
      imageUrl: '',
      mode: '',
      reward: 0,
      tries: 0,
      timeLimit: 90,
      drainRate: 0.01
    };
    setGameOptions();
    beginGame();
  });
  $scope.goTo = (location) => {
    $location.path('/' + location);
  }
  let beginGame = () => {
    // check if triangulation mode is on
    if ($scope.gameOptions.mode === 'triangulation') {
      initiateTimeLimit();
    }
    // check if darknet mode is on
    if ($scope.gameOptions.mode === 'darknet') {
      initiateDrainDefense();
    }
  }
  let setGameOptions = () => {
    $scope.gameOptions.mode = gameService.selectedLevel.mode;
    $scope.gameOptions.reward = gameService.selectedLevel.reward;
    $scope.gameOptions.name = gameService.selectedLevel.name;
    $scope.gameOptions.imageUrl = gameService.selectedLevel.imageUrl;
  }
  let initiateTimeLimit = () => {
    $scope.animations.timeLimitAnimation = $interval(() => {
      $scope.gameOptions.timeLimit--;
      if ($scope.gameOptions.timeLimit <= 0) {
        $interval.cancel($scope.animations.timeLimitAnimation);
      }
    }, 1000);
  }
  let initiateDrainDefense = () => {
    $scope.animations.drainDefenseAnimation = $interval(() => {
      $scope.gameOptions.reward = $scope.gameOptions.reward * (1.0 - $scope.gameOptions.drainRate);
      if ($scope.gameOptions.reward <= 1) {
        $scope.gameOptions.reward
        $interval.cancel($scope.animations.drainDefenseAnimation);
      }
    }, 1000);
  }
  let stopDefenseAnimations = () => {
    $interval.cancel($scope.animations.timeLimitAnimation);
    $interval.cancel($scope.animations.drainDefenseAnimation);
  }
})