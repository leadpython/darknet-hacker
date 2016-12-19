angular.module('darknet-hacker')

.factory('dataService', function($window) {
  let service = {};
  let changeTrigger = () => {
    service.saveUser();
    service.loadUser();
  }

  service.user = {};

  service.saveUser = () => {
    $window.localStorage.setItem('darknet-hacker-data', JSON.stringify(service.user));
  }
  service.loadUser = () => {
    service.user = JSON.parse($window.localStorage.setItem('darknet-hacker-data'));
  }
  service.resetUser = () => {
    service.user = {};
    service.user.name = '';
    service.user.money = {
      dollars: 0,
      cryptocoin: 0
    };
    service.user.toolbox = {
      burnerPhone: 0,
      speed: 0,
      disrupt: 0,
      keylogger: 0
    };
    service.user.completed = [
      {
        normal: 0,
        triangulation: 0,
        darknet: 0,
        completed: false
      },
      {
        normal: 0,
        triangulation: 0,
        darknet: 0,
        completed: false
      },
      {
        normal: 0,
        triangulation: 0,
        darknet: 0,
        completed: false
      },
      {
        normal: 0,
        triangulation: 0,
        darknet: 0,
        completed: false
      },
      {
        normal: 0,
        triangulation: 0,
        darknet: 0,
        completed: false
      },
      {
        normal: 0,
        triangulation: 0,
        darknet: 0,
        completed: false
      },
      {
        normal: 0,
        triangulation: 0,
        darknet: 0,
        completed: false
      },
      {
        normal: 0,
        triangulation: 0,
        darknet: 0,
        completed: false
      },
      {
        normal: 0,
        triangulation: 0,
        darknet: 0,
        completed: false
      }
    ];
    service.saveUser();
  }

  // when a tool is used
  service.useTool = (toolName) => {
    if (service.user.toolbox[toolName] <= 0) {
      return;
    }
    service.user.toolbox[toolName]--;
  }

  return service;
})