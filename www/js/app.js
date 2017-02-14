angular.module('darknet-hacker', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.hide();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.views.transition('none');
  $ionicConfigProvider.views.swipeBackEnabled(false);
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
    .state('options', {
      url: '/options',
      templateUrl: 'templates/pages/options.html',
      controller: 'optionsController'
    })
    .state('market', {
      url: '/market',
      templateUrl: 'templates/pages/market.html',
      controller: 'marketController'
    })
    .state('manual', {
      url: '/manual',
      templateUrl: 'templates/pages/manual.html',
      controller: 'manualController'
    })
  $urlRouterProvider.otherwise('/dashboard');
});