(function () {
  'use strict';

  angular
    .module('beerjsChat')
    .controller('SigninController', constructor);

  /** @ngInject */
  function constructor($scope, $state, FirebaseWrapper) {
    var vm = this;
    vm.rooms = [];
    vm.model = {
      username: null
    }

    FirebaseWrapper.getRooms()
      .then(function(rooms){
        $scope.$apply(function(){
          vm.rooms = rooms;
        })
      })

    vm.signin = function(user, room){
      if(!user.username){
        return false;
      }

      FirebaseWrapper.signin(user)
        .then(function(){
          $state.go('beer.chat',{room: room});
        })
        .catch(function(error){
          console.log(error);
          console.log('error');
        })
    }
  }
  })();
