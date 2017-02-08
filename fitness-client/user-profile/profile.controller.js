(function() {

  angular
    .module('fitness')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location', 'fitData'];
  function profileCtrl($location, fitData) {
    var vm = this;

    vm.user = {};

    fitData.getProfile()
      .success(function(data) {
        vm.user = data;
      })
      .error(function (e) {
        console.log(e);
      });
  }

})();
