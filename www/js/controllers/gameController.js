angular.module('darknet-hacker')

.controller('gameController', function($scope, $timeout, $ionicModal, $location, $interval, gameService, dataService) {
  $scope.$on('$ionicView.enter', () => {
    // for testing purposes
    dataService.resetUser();
    $scope.gameOptions = {
      name: '',
      imageUrl: '',
      mode: 'normal',
      reward: 0,
      tries: 7,
      timeLimit: 90,
      drainRate: 0.002,
      timeSpeedMultiplier: 1,
      disruptTime: 30
    };
    $scope.keypadButtonState = 'color: #00cc99; background-color: rgb(25,25,25)';
    initializeAssets();
    setGameOptions();
    initiateDefenses();
  });
  $scope.$on('$ionicView.leave', () => {
    stopDefenseAnimations();
  });

  // SCOPE METHODS/VARIABLES
  $scope.animations = {};
  $scope.goTo = (location) => {
    $location.path('/' + location);
  }
  $scope.getTryBoxes = () => {
    return new Array($scope.gameOptions.tries);
  }
  $scope.showKeypad = () => {
    $scope.keypadModal.show();
    $scope.keypadButtonState = 'color: black; background-color: #00cc99;';
  };
  $scope.hideKeypad = () => {
    $scope.keypadModal.hide();
    $scope.keypadButtonState = 'color: #00cc99; background-color: rgb(25,25,25)';
  };
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
  $scope.getRewardLeftPercentage = () => {
    return $scope.gameOptions.reward / $scope.gameOptions.maxReward * 100;
  }
  $scope.keyStroke = (num) => {
    $scope.playerGuess += num + '';
  }
  $scope.backspace = () => {
    $scope.playerGuess = $scope.playerGuess.slice(0, -1);
  }
  $scope.deleteAll = () => {
    $scope.playerGuess = '';
  }
  $scope.enter = () => {
    // do not execute when guess is empty
    if ($scope.playerGuess === '') {
      return;
    }
    if ($scope.gameState.done) {
      return;
    }

    let feedback = gameService.checkCode($scope.playerGuess);
    $scope.gameOptions.tries--;
    $scope.historyLog.unshift(feedback);
    $scope.hideKeypad();

    // trigger a win if guess was correct
    if (feedback.doesItWin) {
      triggerWin();
    } else if ($scope.gameOptions.tries <= 0) {
      triggerLoss();
    }
  }
  $scope.generateClueBoxes = (num) => {
    return new Array(num);
  }

  // GAME EVENTS
  function triggerWin() {
    $scope.gameState.done = true;
    stopDefenseAnimations();
    $scope.winModal.show();
    dataService.updateDollars($scope.gameOptions.reward);
  }
  function triggerLoss() {
    $scope.gameState.done = true;
    $scope.lossModal.show();
    console.log("GAME OVER!")
  }

  // GAME OPTIONS
  // set game options based on selected level
  function setGameOptions() {
    gameService.generateCode();
    $scope.gameOptions.mode = gameService.selectedLevel.mode;
    $scope.gameOptions.reward = gameService.selectedLevel.reward;
    $scope.gameOptions.name = gameService.selectedLevel.name;
    $scope.gameOptions.imageUrl = gameService.selectedLevel.imageUrl;
    $scope.gameOptions.maxReward = gameService.selectedLevel.reward;
  }

  // initialize game variables
  function initializeAssets() {
    $scope.gameState = {
      disrupted: false,
      slowed: false,
      keylogged: false,
      done: false
    }
    $scope.playerGuess = '';
    $scope.historyLog = [];
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
        triggerLoss();
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
  $scope.activateDisruption = () => {
    if ($scope.gameState.done) {
      return;
    }
    stopDefenseAnimations();
    $scope.gameState.disrupted = true;
    $timeout(() => {
      initiateDefenses();
      $scope.gameState.disrupted = false;
    }, 30000 * $scope.gameOptions.timeSpeedMultiplier);
    dataService.useTool('disrupt');
  }
  // when player uses speed hacking tool
  $scope.activateSpeed = () => {
    if ($scope.gameState.done) {
      return;
    }
    stopDefenseAnimations();
    $scope.gameState.slowed = true;
    $scope.gameOptions.timeSpeedMultiplier = 2;
    initiateDefenses();
    dataService.useTool('speed');
  }
  // when player uses burner phone
  $scope.activateBurnerPhone = () => {
    if ($scope.gameState.done) {
      return;
    }
    $scope.gameOptions.tries++;
    dataService.useTool('burnerPhone');
  }
  // when player uses keylogger
  $scope.activateKeylogger = () => {
    if ($scope.gameState.done) {
      return;
    }
    dataService.useTool('keylogger');
  }

  // MODALS
  // Win modal 
  $ionicModal.fromTemplateUrl('../../templates/modals/game-win.modal.html', {
    scope: $scope
  }).then((modal) => {
    $scope.winModal = modal;
  });
  // Loss modal 
  $ionicModal.fromTemplateUrl('../../templates/modals/game-loss.modal.html', {
    scope: $scope
  }).then((modal) => {
    $scope.lossModal = modal;
  });
  // Keypad modal 
  $ionicModal.fromTemplateUrl('../../templates/modals/game-keypad.modal.html', {
    scope: $scope
  }).then((modal) => {
    $scope.keypadModal = modal;
  });
})