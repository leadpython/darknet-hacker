angular.module('darknet-hacker')

.controller('levelController', function($scope, $location, levelService, $ionicModal) {
  $scope.goTo = (location) => {
    $location.path('/' + location);
  }
  $scope.getLevels = () => {
    return levelService.levels;
  }
  $scope.selectLevel = (level, mode) => {
    $scope.selectedLevel = level;
    $scope.selectedLevel.mode = mode;
    $scope.levelModal.show();
  }
  $scope.hideLevelModal = () => {
    $scope.levelModal.hide();
  }
  // Modal shown when checking for level details
  $ionicModal.fromTemplateUrl('../../templates/modals/level-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.levelModal = modal;
  });
})