SchoolityApp.controller('soDiemCtr',function($scope,$rootScope,$http){
    $http.get('/shared/json/sodiem.json').then(function(res){
        $scope.dsSoDiem = res.data;
        $scope.dsSoDiem.map(val=>{
            val.edited = false;
        });
        console.log($scope.dsSoDiem);
    })
    // Watch giá trị biến checkAll
    $scope.selectedItem= new Array();
    $scope.$watch('checkAll',function(val){
        if(val){
            $scope.selectedItem = [...$scope.dsSoDiem];
        }else{
            $scope.selectedItem = new Array();
        }
    });
    // Thêm object vào array selectedIem khi checkbox
    $scope.insertOrDelete = function(event,val){
        // Trả về trạng thái ban đầu của object
        if(event.target.checked === false){
            val.edited = false;
        }
        // Khi checked thì thêm object vào mảng những item đc chọn
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

        $scope.dsSoDiem = $scope.dsSoDiem.filter(item => !$scope.selectedItem.includes(item));
    }
    // Filter lớp theo khối
    $scope.currentKhoi = "10";
    $scope.$watch('currentKhoi',function(){
        $rootScope.lopHoc = $rootScope.dsLopHoc.filter(item => item.tenLopHoc.toString().match($scope.currentKhoi,/.*/));
    },true);
    // Chỉnh sửa
    $scope.edit = function(){
        $scope.selectedItem.map(val=>{
            val.edited ? val.edited = false : val.edited = true;
        });
    }
});