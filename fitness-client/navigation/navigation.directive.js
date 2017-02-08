(function () {

  angular
    .module('fitness')
    .directive('navigation', navigation);

  function navigation () {
    return {
      restrict: 'EA',
      templateUrl: '/navigation/navigation.html',
      controller: 'navigationCtrl as navvm'
    };
  }

})();
