(function () {
  'use strict';

  angular
    .module('beerjsChat')
    .config(config);

  /** @ngInject */
  function config($logProvider, $locationProvider) {
    $logProvider.debugEnabled(true);
  }


})();
