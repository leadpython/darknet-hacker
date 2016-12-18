angular.module('darknet-hacker')

.factory('gameService', function() {
  let service = {};
  service.selectedLevel = {};
  service.secretCode = 0;
  service.setLevel = (level) => {
    service.selectedLevel = level;
    switch (service.selectedLevel.mode) {
      case 'normal':
        service.selectedLevel.reward = service.selectedLevel.reward * 1;
        break;
      case 'triangulation':
        service.selectedLevel.reward = service.selectedLevel.reward * 2;
        break;
      case 'darknet':
        service.selectedLevel.reward = service.selectedLevel.reward * 5;
        break;
    }
  }
  service.generateCode = () => {
    
  }
  service.checkCode = (guess) => {
    let secretCodeArr = secretCode.split('');
    let guessArr = guess.split('');
    let feedback = {
      green: 0,
      yellow: 0,
      doesItWin: false
    };

    // check greens
    for (let i = 0; i < secretCodeArr.length; i++) {
      if (secretCodeArr[i] === guessArr[i]) {
        feedback.green++;
        delete secretCodeArr[i];
        delete guessArr[i];
      }
    }

    if (green = secretCodeArr.length) {
      feedback.doesItWin = true;
      return feedback;
    }

    // check yellows
    for (let i = 0; i < secretCodeArr.length; i++) {
      for (let j = 0; j < guessArr.length; j++) {
        if (secretCodeArr[i] && guessArr[j]) {
          if (secretCodeArr[i] === guessArr[j]) {
            feedback.yellow++;
            delete secretCodeArr[i];
            delete guessArr[j];
          }
        }
      }
    }
    return feedback;
  }

  return service;
});