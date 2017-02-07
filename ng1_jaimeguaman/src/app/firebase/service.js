(function () {
  'use strict';

  angular
    .module('beerjsChat')
    .factory('FirebaseWrapper', Service);

  /** @ngInject */
  function Service(FIREBASE_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_DATABASE_URL) {

    function constructor() {
      var config = {
        apiKey: FIREBASE_KEY,
        authDomain: FIREBASE_AUTH_DOMAIN,
        databaseURL: FIREBASE_DATABASE_URL
      };

      var _user = {
        name: undefined,
        user_image_url: 'http://lorempixe.com/200/200'
      }

      firebase.initializeApp(config);

      function getRoomPath(room){
        return ['rooms/', room, '/messages'].join('');
      }

      this.isAuthenticated = function(){
        return _user.name !== undefined;
      }

      this.signin = function(user){
        return firebase.auth().signInAnonymously()
          .then(function(response){
            _user.name = user.username;
          })
          .catch(function(error) {
            console.log('error type', error.code);
            console.log('error message', error.message);
          });
      }

      this.getRooms = function(){
        return firebase.database()
                .ref('rooms')
                .once('value')
                .then(function(snap){
                  var rooms = [];
                  snap.forEach(function(child, key){
                    rooms.push(child.key);
                  });
                  return rooms;
                })
      }

      this.onMessage = function(room, callback){
        firebase.database().ref(getRoomPath(room)).on('child_added', function(message){
          var _message = message.val();
          _message.timestamp = decode(message.key);

          if(_message.timestamp != NaN && _message.timestamp != undefined){
            _message.timestamp = parseFloat(_message.timestamp);
            callback(_message);
          }

          function decode(id) {
            var PUSH_CHARS = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";
            id = id.substring(0,8);
            var timestamp = 0;
            for (var i=0; i < id.length; i++) {
              var c = id.charAt(i);
              timestamp = timestamp * 64 + PUSH_CHARS.indexOf(c);
            }
            return timestamp;
          }
        });
      }

      this.sendMessage = function(room, message){
        var newMessage = {
          author: _user,
          text: message,
          timestamp: new Date().getTime()
        }

        firebase.database().ref(getRoomPath(room)).push(newMessage);
      }

    }

    return new constructor();
  }
})();
