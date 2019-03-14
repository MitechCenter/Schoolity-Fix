var app = angular.module('app', ['ngMaterial', 'ngMessages', 'ui.router', 'ui.grid']);
(function () {
  app.controller('indexCtrl', function ($scope,$http, $mdSidenav) {
    $http.get('/json/menu.json').then(function(response){
      $scope.menu = response.data;  
    });
    $scope.toggleLeft = buildToggler('left');
    function buildToggler(componentId) {
      return function () {
        $mdSidenav(componentId).toggle();
      };
    }
    $scope.getSubmenu1 = function(number){
        $scope.open1 = number;
    }
    $scope.getSubmenu2 = function(number){
      console.log(number)
      $scope.open2 = number;
    }
  });
})();
