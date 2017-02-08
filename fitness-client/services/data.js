(function() {

  angular
    .module('fitness')
    .service('fitData', fitData);

  fitData.$inject = ['$http', 'authentication'];
  function fitData ($http, authentication) {

    var getProfile = function () {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    return {
      getProfile : getProfile
    };
  }

})();
