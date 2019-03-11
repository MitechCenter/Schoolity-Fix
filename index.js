var SchoolityApp = angular.module('ShoolityApp', ['ui.router', 'ui.select', 'ngSanitize']);
(function () {
    SchoolityApp.controller('indexCtrl', function ($scope, $rootScope, $http) {
        // Danh mục menu
        $http.get("shared/json/menu.json").then(function (response) {
            $scope.LeftMenu = response.data;
        });
        // Tải lớp học 
        $http.get('/shared/json/lophoc.json').then(function(res){
            $rootScope.dsLopHoc = res.data.lophoc;
            $rootScope.lopHoc = res.data.lophoc;
            $rootScope.lopHoc = $rootScope.lopHoc.filter(res=> res.tenLopHoc.toString().match(/10.*/));
        })
        // Alert
        $rootScope.alertThanhCong = false;
        $rootScope.alertDienThongTin = false;
        // Breadcrumb and class menu
        $scope.getPath1 = function (name) {
            $rootScope.BredcrumPath1 = name;
            $rootScope.showPath1 = true;
            $rootScope.showPath2 = false;
        };
        // Active menu
        $rootScope.idSelected = null;
        $scope.getPath2 = function (name, id) {
            $scope.idSelected = id;
        };

    });
})();
