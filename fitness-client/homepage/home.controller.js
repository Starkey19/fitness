(function() {

  angular
    .module('fitness')
    .controller('homeCtrl', homeCtrl);

    function homeCtrl () {
      console.log('Home controller is running');
    }

})();
