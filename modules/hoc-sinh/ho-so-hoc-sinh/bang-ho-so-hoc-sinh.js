SchoolityApp.controller('bangHoSoHocSinhCtr',function($q,$rootScope,$scope,$http){
    // Tổng só trang
    $scope.total = null;
    // Trang đc chọn hiện tại
    $scope.selectedPage = 1;
    $scope.first = ($scope.selectPage-1)*10;
    $scope.limit = 10;
    // Lấy 10 data đầu tiên
    $http.get(`https://saigonmaster.herokuapp.com/danhSachHocSinh?_start=${$scope.first}&_limit=${$scope.limit}`).then(function(response){
        $scope.hsHocSinh = response.data;
    });
    // Khởi tạo trang với độ dài là 4
    $scope.numberPage = [...Array(5).keys()].filter(x=>x>0);
    //Chọn trang
    $scope.selectPage = function(number){
        // Đổi biến selectedPage theo number
        $scope.selectedPage = number;
    }
    // Watch selectedPage
    $scope.$watch('selectedPage',function(val){
        // Trả độ dài mảng
        val > 3 ? $scope.numberPage = [...Array(val+3).keys()].filter(x => x > val-3 && x>0 && x< Math.ceil($scope.total/10)) : $scope.numberPage = [...Array(5).keys()].filter(x => x>0);
        // Reset hsHocSinh về mặc định
        $scope.hsHocSinh = [];
        // Lấy data theo selectedPage
        $http.get(`https://saigonmaster.herokuapp.com/danhSachHocSinh?_start=${($scope.selectedPage-1)*10}&_limit=${$scope.limit}`).then(function(response){
        $scope.hsHocSinh = response.data;
        });
    });
    // Nút next
    $scope.next = function(){
        $scope.selectedPage += 1;
    }
    // Nút prev
    $scope.prev = function(){
        $scope.selectPage -= 1;
    }
    $http.get('https://saigonmaster.herokuapp.com/danhSachHocSinh').then(function(response){
        $scope.total = response.data.length;
    })
    $http.get('/shared/json/headerHoSoHocSinh.json').then(function(res){
        $scope.header = res.data;
    })
    
    // Mở modal xem hồ sơ
    $scope.catchID = function(mahs){
        var data = "";
        $scope.hsHocSinh.map(function(val){
            if(val.mahs === mahs){
                data = val; 
            }
        });
        $scope.$broadcast('xemHoSoHocSinh',data);
    }
    // Watch giá trị biến checkAll
    $scope.selectedItem= new Array();
    $scope.$watch('checkAll',function(val){
        if(val){
            $scope.selectedItem = [...$scope.hsHocSinh];
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
        $http.delete('https://saigonmaster.herokuapp.com/danhSachHocSinh',$scope.selectedItem).then(function(response){
            console.log(response);
        });
        // $scope.hsHocSinh = $scope.hsHocSinh.filter(item => !$scope.selectedItem.includes(item));
        $scope.checkAll = false;
    }
    // Filter lớp theo khối
    $scope.currentKhoi = "10";
    $scope.$watch('currentKhoi',function(){
        $rootScope.lopHoc = $rootScope.dsLopHoc.filter(item => item.tenLopHoc.toString().match($scope.currentKhoi,/.*/));
    },true);
})