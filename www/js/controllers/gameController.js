angular.module('darknet-hacker')

.controller('gameController', function($scope, $timeout, $location, $interval, gameService, dataService) {
  $scope.$on('$ionicView.enter', () => {
    setGameOptions();
    initiateDefenses();
  });
  $scope.$on('$ionicView.leave', () => {
    stopDefenseAnimations();
  });

  // SCOPE METHODS/VARIABLES
  $scope.gameOptions = {
    name: '',
    imageUrl: '',
    mode: 'normal',
    reward: 0,
    tries: 7,
    timeLimit: 90,
    drainRate: 0.001,
    timeSpeedMultiplier: 1,
    disruptTime: 30
  };
  $scope.gameState = {
    disrupted: false,
    slowed: false,
    done: false
  }
  $scope.animations = {};
  $scope.goTo = (location) => {
    $location.path('/' + location);
  }
  $scope.getTryBoxes = () => {
    return new Array($scope.gameOptions.tries);
  }
  $scope.shouldTimeLimitShow = () => {
    if ($scope.gameOptions.mode === 'triangulation' || $scope.gameOptions.mode === 'darknet') {
      return true;
    }
    return false;
  }
  $scope.shouldDrainShow = () => {
    if ($scope.gameOptions.mode === 'darknet') {
      return true;
    }
    return false;
  }

  // GAME OPTIONS
  // set game options based on selected level
  function setGameOptions() {
    $scope.gameOptions.mode = gameService.selectedLevel.mode;
    $scope.gameOptions.reward = gameService.selectedLevel.reward;
    $scope.gameOptions.name = gameService.selectedLevel.name;
    $scope.gameOptions.imageUrl = gameService.selectedLevel.imageUrl;
  }

  // LEVEL DEFENSES
  // start level defenses, if any
  function initiateDefenses() {
    // check if triangulation mode is on
    if ($scope.gameOptions.mode === 'triangulation') {
      initiateTimeLimit();
    }
    // check if darknet mode is on
    if ($scope.gameOptions.mode === 'darknet') {
      initiateTimeLimit();
      initiateDrainDefense();
    }
  }
  // stop all level defenses
  function stopDefenseAnimations() {
    $interval.cancel($scope.animations.timeLimitAnimation);
    $interval.cancel($scope.animations.drainDefenseAnimation);
  }
  // start time limit
  function initiateTimeLimit() {
    $scope.animations.timeLimitAnimation = $interval(() => {
      $scope.gameOptions.timeLimit--;
      if ($scope.gameOptions.timeLimit <= 0) {
        $interval.cancel($scope.animations.timeLimitAnimation);
      }
    }, 1000 * $scope.gameOptions.timeSpeedMultiplier);
  }
  // start drain defense
  function initiateDrainDefense () {
    $scope.animations.drainDefenseAnimation = $interval(() => {
      $scope.gameOptions.reward = Math.floor($scope.gameOptions.reward * (1.0 - $scope.gameOptions.drainRate));
      if ($scope.gameOptions.reward <= 1) {
        $scope.gameOptions.reward = 0;
        $interval.cancel($scope.animations.drainDefenseAnimation);
      }
    }, 100 * $scope.gameOptions.timeSpeedMultiplier);
  }

  // HACKING TOOLS
  // when player uses disrupt hacking tool
  function activateDisruption() {
    stopDefenseAnimations();
    $timeout(() => {
      initiateDefenses();
    }, 30000 * $scope.gameOptions.timeSpeedMultiplier);
    dataService.useTool('disrupt');
  }
  // when player uses speed hacking tool
  function activateSpeed() {
    stopDefenseAnimations();
    $scope.gameOptions.timeSpeedMultiplier = 2;
    initiateDefenses();
    dataService.useTool('speed');
  }
  // when player uses burner phone
  function activateBurnerPhone() {
    $scope.gameOptions.tries++;
    dataService.useTool('burnerPhone');
  }
  // when player uses keylogger
  function activateKeylogger() {
    dataService.useTool('keylogger');
  }
})