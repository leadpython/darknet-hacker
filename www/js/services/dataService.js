angular.module('darknet-hacker')

.factory('dataService', function($window) {
  let service = {};
  let changeTrigger = () => {
    service.saveUser();
    service.loadUser();
  }

  service.user = {};

  service.initialize = () => {
    service.loadUser();
    if (service.user === null || service.user === undefined) {
      service.resetUser();
    }
  }
  service.saveUser = () => {
    $window.localStorage.setItem('darknet-hacker-data', JSON.stringify(service.user));
  }
  service.loadUser = () => {
    service.user = JSON.parse($window.localStorage.getItem('darknet-hacker-data'));
  }
  service.resetUser = () => {
    service.user = {};
    service.user.name = '';
    service.user.money = {
      dollars: 500,
      cryptocoin: 0
    };
    service.user.toolbox = {
      burnerPhone: 5,
      speed: 5,
      disrupt: 5,
      keylogger: 5
    };
    service.user.completed = [
      {
        normal: false,
        triangulation: false,
        darknet: false
      },
      {
        normal: false,
        triangulation: false,
        darknet: false
      },
      {
        normal: false,
        triangulation: false,
        darknet: false
      },
      {
        normal: false,
        triangulation: false,
        darknet: false
      },
      {
        normal: false,
        triangulation: false,
        darknet: false
      },
      {
        normal: false,
        triangulation: false,
        darknet: false
      },
      {
        normal: false,
        triangulation: false,
        darknet: false
      },
      {
        normal: false,
        triangulation: false,
        darknet: false
      },
      {
        normal: false,
        triangulation: false,
        darknet: false
      }
    ];
    service.saveUser();
  }

  // upon win, update
  service.uponLevelComplete = (index, mode) => {
    service.user.completed[index][mode] = true;
  }
  // check if level is completed
  service.checkLevel = (index) => {
    return service.user.completed[index-1].normal && service.user.completed[index-1].triangulation && service.user.completed[index-1].darknet && true; 
  }
  // when a tool is used
  service.useTool = (toolName) => {
    if (service.user.toolbox[toolName] <= 0) {
      return;
    }
    service.user.toolbox[toolName]--;
    changeTrigger();
  }
  service.updateDollars = (num) => {
    service.user.money.dollars += num;
    changeTrigger();
  }
  service.updateCryptocoin = (num) => {
    service.user.money.cryptocoin += num;
    changeTrigger();
  }

  service.initialize();

  return service;
})