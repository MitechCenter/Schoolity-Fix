SchoolityApp.controller('bangHoSoKyLuat',function($scope,$rootScope,$http){
    $http.get('/shared/json/solankyluat.json').then(function(res)
    {
        $scope.dsKyLuat = res.data;
    })
    // Watch giá trị biến checkAll
    $scope.selectedItem= new Array();
    $scope.$watch('checkAll',function(val){
        if(val){
            $scope.selectedItem = [...$scope.dsKyLuat];
        }else{
            $scope.selectedItem = new Array();
        }
    });
    // Thêm object vào array selectedIem khi checkbox
    $scope.insertOrDelete = function(event,val){
        if(event.target.checked === true){
            if($scope.selectedItem.includes(val)==false){
                $scope.selectedItem.push(val);
            }
            
        }else{
            $scope.selectedItem = $scope.selectedItem.filter(function(item,index){
                return item !== val;
            })
            
        }  
    } 
    // Xoá 
    $scope.Delete = function(){
        $scope.dsKyLuat = $scope.dsKyLuat.filter(item => !$scope.selectedItem.includes(item));
    }
    // Filter lớp theo khối
    $scope.currentKhoi = "10";
    $scope.$watch('currentKhoi',function(){
        $rootScope.lopHoc = $rootScope.dsLopHoc.filter(item => item.tenLopHoc.toString().match($scope.currentKhoi,/.*/));
    },true);
})
