(function () {

  angular
    .module('fitness')
    .service('authentication', authentication);

    authentication.$inject = ['$http', '$window'];

    function authentication ($http, $window) {

      //Saves a token to localStorage
      var saveToken = function (token) {
        $window.localStorage['mean-token'] = token;
      };

      //Get JWT from localStorage
      var getToken = function () {
        return $window.localStorage['mean-token'];
      };

      //Delete the JWT from local storage on logout
      logout = function() {
        $window.localStorage.removeItem('mean-token');
      };

      //Check if a user is logged in by looking for their token
      var isLoggedIn = function() {
        var token = getToken();

        var payload;

        //Split token into header, payload and signature to get payload
        if (typeof token === 'undefined'){
          return false;
        } else {
          payload = token.split('.')[1];

          payload = $window.atob(payload);
        
          payload = JSON.parse(payload);

          return payload.exp > Date.now() / 1000;
        }
      };

      var currentUser = function() {
        if(isLoggedIn()){
          var token = getToken();
          var payload = token.split('.')[1];
          payload = $window.atob(payload);
          payload = JSON.parse(payload);
          console.log("email: " + payload.email);
          console.log("name: " + payload.name);
          return {
            email : payload.email,
            name : payload.name
          };
        }
      };

  //Register or login users and save the created token:
      register = function(user) {
        return $http.post('/api/register', user).success(function(data){
          saveToken(data.token);
        });
      };

      login = function(user) {
        return $http.post('/api/login', user).success(function(data) {
          console.log(data.token);
          saveToken(data.token);
        });
      };

      return {
        saveToken : saveToken,
        getToken : getToken,
        logout : logout,
        isLoggedIn : isLoggedIn,
        currentUser : currentUser,
        register : register,
        login : login
      };

    }
})();
