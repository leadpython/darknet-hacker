angular.module('darknet-hacker')

.factory('levelService', function() {
  var service = {};

  service.levels = [
    {
      name: 'credit card',
      reward: 1000,
      imageUrl: './img/credit.png'
    },
    {
      name: 'debit card',
      reward: 5000,
      imageUrl: './img/debit.png'
    },
    {
      name: 'local shop',
      reward: 25000,
      imageUrl: './img/shop.png'
    },
    {
      name: 'casino',
      reward: 125000,
      imageUrl: './img/casino.png'
    },
    {
      name: 'mafia',
      reward: 625000,
      imageUrl: './img/mafia.png'
    },
    {
      name: 'CIA',
      reward: 3125000,
      imageUrl: './img/cia.png'
    },
    {
      name: 'multinational corporation',
      reward: 15625000,
      imageUrl: './img/corporation.png'
    },
    {
      name: 'central bank',
      reward: 78125000,
      imageUrl: './img/bank.png'
    },
    {
      name: 'rogue hacker',
      reward: 390625000,
      imageUrl: './img/rogue.png'
    }
  ];

  return service;
});