SchoolityApp.controller('bangHoSoCaBiet',function($scope,$rootScope,$http){
    $http.get('/shared/json/cabiet.json').then(function(res){
        $scope.dsCaBiet = res.data;
    })
    // Watch giá trị biến checkAll
    $scope.selectedItem= new Array();
    $scope.$watch('checkAll',function(val){
        if(val){
            $scope.selectedItem = [...$scope.dsCaBiet];
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
        $scope.dsCaBiet = $scope.dsCaBiet.filter(item => !$scope.selectedItem.includes(item));
    }
    // Filter lớp theo khối
    $scope.currentKhoi = "10";
    $scope.$watch('currentKhoi',function(){
        $rootScope.lopHoc = $rootScope.dsLopHoc.filter(item => item.tenLopHoc.toString().match($scope.currentKhoi,/.*/));
    },true);
})