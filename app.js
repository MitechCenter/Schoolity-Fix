var app = angular.module('app', ['ngMaterial', 'ngMessages', 'ui.router', 'ui.grid']);
(function () {
  app.controller('indexCtrl', function ($scope,$mdSidenav) {
    $scope.toggleLeft = buildToggler('left');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }
  });
})();
