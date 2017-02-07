(function () {
    'use strict';

    angular
      .module('beerjsChat')
      .controller('ChatController', constructor);

    /** @ngInject */
    function constructor($scope, $state, FirebaseWrapper) {
      var vm = this;
      var room = $state.params.room;

      if(!FirebaseWrapper.isAuthenticated()){
        $state.go('beer.signin');
      }

      vm.model = {
        message: null
      };

      vm.messages = [];


      FirebaseWrapper.onMessage(room, function(message){
        function addMessage(message){
          vm.messages.push(message)
        }
        $scope.$$phase ? addMessage(message) : $scope.$apply(addMessage(message));
      })

      /*$scope.$emit('firebase:roomSelected', room);
      $scope.$on('firebase:incomingMessage', function(event, message){
        vm.messages.push(message)
      });*/

      vm.send = function(message){
        if(!message){
          return false;
        }
        FirebaseWrapper.sendMessage(room, message);
        vm.model.message = null;
      }
    }
  })();
