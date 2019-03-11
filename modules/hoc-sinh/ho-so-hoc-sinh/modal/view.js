SchoolityApp.controller('xemHoSoHocSinh',function($scope,$rootScope){
    $scope.$on('xemHoSoHocSinh',function(event,data){
        $scope.data = data;
        console.log($scope.data)
    });
});