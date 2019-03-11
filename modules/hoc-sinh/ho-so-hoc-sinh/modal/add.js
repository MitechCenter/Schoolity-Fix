SchoolityApp.controller('themHocSinhCtr',function($scope,$rootScope,$http){
    $scope.hocSinh = {
        "id" : "",
        "tenHocSinh" : "",
        "sdt" : "",
        "diaChi" : "",
        "email" : ""
       
    }
    $scope.submitHS = function(){
        console.log($scope.hocSinh)
        $http.post('https://saigonmaster.herokuapp.com/danhSachHocSinh',$scope.hocSinh).then(function(response){
            console.log(response);
        });
    }
})