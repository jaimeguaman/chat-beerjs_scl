(function () {
  'use strict';
  angular
    .module('beerjsChat')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, FirebaseWrapper) {

    /*$rootScope.$on('firebase:roomSelected', function(event, room){
      FirebaseWrapper.onMessage(room, function(message){
        $rootScope.$broadcast('firebase:incomingMessage', message);
      })
    });*/

  }

})();
