var app = angular.module('app', ['ngMaterial', 'ngMessages', 'ui.router', 'ui.grid']);
(function () {
  app.controller('indexCtrl', function ($scope) {
    $scope.data = [{
        name: 'Bob',
        title: 'CEO'
      },
      {
        name: 'Frank',
        title: 'Lowly Developer'
      }
    ];
  });
})();
