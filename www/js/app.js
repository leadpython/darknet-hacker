angular.module('darknet-hacker', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.views.transition('none');
  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'templates/pages/dashboard.html',
      controller: 'dashboardController'
    })
    .state('level', {
      url: '/level',
      templateUrl: 'templates/pages/level.html',
      controller: 'levelController'
    })
    .state('game', {
      url: '/game',
      templateUrl: 'templates/pages/game.html',
      controller: 'gameController'
    })
  $urlRouterProvider.otherwise('/dashboard');
});