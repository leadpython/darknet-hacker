angular.module('darknet-hacker')

.factory('levelService', function() {
  var service = {};

  service.levels = [
    {
      name: 'credit card',
      reward: 1000,
      length: 4,
      imageUrl: './img/credit.png'
    },
    {
      name: 'debit card',
      reward: 5000,
      length: 5,
      imageUrl: './img/debit.png'
    },
    {
      name: 'local shop',
      reward: 25000,
      length: 6,
      imageUrl: './img/shop.png'
    },
    {
      name: 'casino',
      reward: 125000,
      length: 7,
      imageUrl: './img/casino.png'
    },
    {
      name: 'mafia',
      reward: 625000,
      length: 8,
      imageUrl: './img/mafia.png'
    },
    {
      name: 'CIA',
      reward: 3200000,
      length: 9,
      imageUrl: './img/cia.png'
    },
    {
      name: 'multinational corporation',
      reward: 1600000,
      length: 10,
      imageUrl: './img/corporation.png'
    },
    {
      name: 'central bank',
      reward: 80000000,
      length: 11,
      imageUrl: './img/bank.png'
    },
    {
      name: 'rogue hacker',
      reward: 400000000,
      length: 12,
      imageUrl: './img/rogue.png'
    }
  ];

  return service;
});