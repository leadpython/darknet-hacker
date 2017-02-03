angular.module('darknet-hacker')

.controller('manualController', function($scope, $interval, $location) {
  $scope.$on('$ionicView.enter', () => {
    $scope.selectTask(0);
  })
  $scope.goTo = (location) => {
    $location.path('/' + location);
  }
  $scope.taskImageUrl = '';
  $scope.taskInstructions = '';
  $scope.tasks = [
    {
      title: 'objective',
      imageUrls: [
        'img/tutorial/2.png'
      ],
      instructions: `The objective of the game is to crack the secret password by trying out different combinations, analyzing feedback data, and using deductive logic. Cracking the secret code gives you access to your target's bank account, which you can drain and take the money.`
    },
    {
      title: 'entering a combination',
      imageUrls: [
        'img/tutorial/1.png',
        'img/tutorial/togglepad.png',
        'img/tutorial/keypad.png',
      ],
      instructions: `Click the keypad button on the lower-right corner to toggle keypad, enter any combination, then press [enter] to make an attempt at cracking the secret code.`
    },
    {
      title: 'history log',
      imageUrls: [
        'img/tutorial/log.png'
      ],
      instructions: `When trying out combinations, you will receive feedback data that contains the combination you used, and a series of colored boxes. Green means you got a number in the right place. Yellow means you got a number right, but it is missplaced. Red simply means you have a wrong number. Having all green boxes mean you successfully solved it. The order of the boxes mean nothing.`
    },
    {
      title: 'limited tries',
      imageUrls: [
        'img/tutorial/tries.png'
      ],
      instructions: `You only have a limited number of tries before you get locked out, at which point you lose and cannot drain your target's bank account. The base amount of tries is 7, but you can increase it temporarily by buying hacking gadgets from the black market.`
    },
    {
      title: 'target balance',
      imageUrls: [
        'img/tutorial/funds.png'
      ],
      instructions: `This is your target's bank account balance. Successfully crack the secret combination, and you can take this money. In Dark.net Mode, your target will have a defense mechanism that drains his own bank account and transfers it somewhere else. Make sure to crack the secret combination before it's all gone. You do not lose when your target's account is empty, but you do not gain anything either.`
    },
    {
      title: 'triangulation',
      imageUrls: [
        'img/tutorial/time.png'
      ],
      instructions: `In triangulation mode, you only have 90 seconds to crack the secret combination before you are locked out.`
    },
    {
      title: 'hacker toolbox',
      imageUrls: [
        'img/tutorial/toolbox.png'
      ],
      instructions: `Your hacker toolbox is located on the right. You can buy these from the black market with cryptocoins. They give you tactical advantages on more difficult hacking targets.`
    }
  ];
  $scope.selectTask = (index) => {
    $interval.cancel($scope.imageAnimation);
    if (index >= $scope.tasks.length - 1) {
      $scope.goTo('dashboard');
      return;
    }
    $scope.selectedTask = $scope.tasks[index];
    $scope.taskInstructions = $scope.selectedTask.instructions;
    var imageIndex = 0;
    $scope.taskImageUrl = $scope.selectedTask.imageUrls[imageIndex];
    $scope.imageAnimation = $interval(() => {
      imageIndex++;
      if (imageIndex >= $scope.selectedTask.imageUrls.length) {
        imageIndex = 0;
      }
      $scope.taskImageUrl = $scope.selectedTask.imageUrls[imageIndex];
    }, 1000);
  }
})