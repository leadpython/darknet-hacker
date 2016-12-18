angular.module('darknet-hacker')

.factory('gameService', function() {
  let service = {};

  service.selectedLevel = {};
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

  return service;
});