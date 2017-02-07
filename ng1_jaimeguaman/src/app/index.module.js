(function () {
  'use strict';

  var moduleDependencies = ['ENVIRONMENT',
    'ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages',
    'ngAria', 'ngResource', 'ui.router', 'angularMoment'];

  angular
    .module('beerjsChat', moduleDependencies)
    .filter('trustAsResourceUrl', trustAsResourceUrl)

    /** @ngInject */
    function trustAsResourceUrl($sce){
      return function (val) {
        return $sce.trustAsResourceUrl(val);
      };
    }
})();
