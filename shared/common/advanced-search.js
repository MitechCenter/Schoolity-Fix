(function () {
    SchoolityApp.controller('searchCtrl', function ($scope, $rootScope, $http) {
        // Open Search Box
        $rootScope.searchClass = "fade-out";
        $scope.showDialog = function () {
            if ($rootScope.searchClass === "fade-out") {
                $rootScope.searchClass = "fade-in";
            } else {
                $rootScope.searchClass = "fade-out";
            }
        }
        $scope.hideDialog = function () {
            $rootScope.searchClass = "fade-out";
        }
    });
})();
