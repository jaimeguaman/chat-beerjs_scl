(function () {
  'use strict';

  angular
    .module('beerjsChat')
    .config(statesConfig);

  /** @ngInject */
  function statesConfig($stateProvider, $urlRouterProvider) {
    var states = {};

    states.beer = {
      name: 'beer',
      url: '/',
      abstract: true,
      templateUrl: 'app/beer/index.html'
    }

    states.signin = {
      name: 'beer.signin',
      parent: states.beer,
      url: 'signin',
      templateUrl: 'app/signin/index.html',
      controller: 'SigninController',
      controllerAs: 'vm'
    }

    states.chat = {
      name: 'beer.chat',
      parent: states.beer,
      url: 'chat/:room',
      templateUrl: 'app/chat/index.html',
      controller: 'ChatController',
      controllerAs: 'vm',
    }

    $stateProvider.state(states.beer);
    $stateProvider.state(states.signin);
    $stateProvider.state(states.chat);

    $urlRouterProvider.otherwise('/signin');

  }

})();
