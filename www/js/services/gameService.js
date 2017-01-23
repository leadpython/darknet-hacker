angular.module('darknet-hacker')

.factory('gameService', function() {
  let service = {};
  service.selectedLevel = {};
  service.secretCode = 0;
  service.setLevel = (level, index) => {
    service.selectedLevel = level;
    service.selectedLevel.levelIndex = index;
    switch (service.selectedLevel.mode) {
      case 'normal':
        service.selectedLevel.totalReward = service.selectedLevel.reward * 1;
        break;
      case 'triangulation':
        service.selectedLevel.totalReward = service.selectedLevel.reward * 2;
        break;
      case 'darknet':
        service.selectedLevel.totalReward = service.selectedLevel.reward * 5;
        break;
    }
  }
  service.generateCode = () => {
    let length = service.selectedLevel.length;
    let password = '';
    for (let i = 0; i < length; i++) {
      password += Math.floor(Math.random() * 10);
    }

    service.secretCode = password;
  }
  service.checkCode = (guess) => {
    let secretCodeArr = service.secretCode.split('');
    let guessArr = guess.split('');
    let feedback = {
      guess: guess,
      green: 0,
      yellow: 0,
      red: secretCodeArr.length,
      doesItWin: false
    };
    // check greens
    for (let i = 0; i < secretCodeArr.length; i++) {
      if (secretCodeArr[i] === guessArr[i] && typeof guessArr[i] === 'string') {
        feedback.green++;
        feedback.red--;
        delete secretCodeArr[i];
        delete guessArr[i];
      }
    }
    // check yellows
    for (let i = 0; i < secretCodeArr.length; i++) {
      for (let j = 0; j < guessArr.length; j++) {
        if (secretCodeArr[i] && guessArr[j]) {
          if (secretCodeArr[i] === guessArr[j]) {
            feedback.yellow++;
            feedback.red--;
            delete secretCodeArr[i];
            delete guessArr[j];
          }
        }
      }
    }
    if (feedback.green === secretCodeArr.length) {
      feedback.doesItWin = true;
    }
    console.log(service.secretCode, feedback);
    return feedback;
  }

  return service;
});