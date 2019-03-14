app.controller('phanCongGiangDayCtrl',async function($scope,$http,$mdDialog){
    $scope.gridOptions = {
    enableColumnMenus: false,
    selectedItems: $scope.selections,
    enableRowSelection: true,
    rowHeight : 30,
    columnDefs: [
        { headerCellTemplate: '<input ng-model="checkAll"    type="checkbox">',field:'checkbox', cellTemplate: '<input ng-checked="checkAll" type="checkbox" class="p-0 m-0">'},
        { field: 'id', displayName : 'STT' },
        { field: 'hoTen',displayName : 'Họ và tên' },
        { field: 'toBoMon' , displayName : 'Tổ bộ '},
        { field: 'hk1' , displayName : 'Phân công học kỳ I'},
        { field: 'hk2' , displayName : 'Phân công học kỳ II'},
        ],
}
$scope.gridOptions.onRegisterApi = function(gridApi){
    $scope.gridApi = gridApi;
 }; 

$scope.gridOptions.data = [
    {
        'id' : '1',
        'hoTen' : 'Hà Đức Anh',
        'toBoMon' : "Địa-Tin-GDCD -Văn phòng",
        'hk1' : 'Địa lí: 10A1,10A3,10A4,10A5,10A6,11B4,11B5,11B6',
        'hk2' : 'Địa lí: 10A1,10A3,10A4,10A5,10A6,11B4,11B5,11B6',


    },
    {
        'id' : '1',
        'hoTen' : 'Hà Đức Anh',
        'toBoMon' : "Địa-Tin-GDCD -Văn phòng",
        'hk1' : 'Địa lí: 10A1,10A3,10A4,10A5,10A6,11B4,11B5,11B6',
        'hk2' : 'Địa lí: 10A1,10A3,10A4,10A5,10A6,11B4,11B5,11B6',
        

    },
    {
        'id' : '1',
        'hoTen' : 'Hà Đức Anh',
        'toBoMon' : "Địa-Tin-GDCD -Văn phòng",
        'hk1' : 'Địa lí: 10A1,10A3,10A4,10A5,10A6,11B4,11B5,11B6',
        'hk2' : 'Địa lí: 10A1,10A3,10A4,10A5,10A6,11B4,11B5,11B6',
        

    },
    {
        'id' : '1',
        'hoTen' : 'Hà Đức Anh',
        'toBoMon' : "Địa-Tin-GDCD -Văn phòng",
        'hk1' : 'Địa lí: 10A1,10A3,10A4,10A5,10A6,11B4,11B5,11B6',
        'hk2' : 'Địa lí: 10A1,10A3,10A4,10A5,10A6,11B4,11B5,11B6',
        

    },
    {
        'id' : '1',
        'hoTen' : 'Hà Đức Anh',
        'toBoMon' : "Địa-Tin-GDCD -Văn phòng",
        'hk1' : 'Địa lí: 10A1,10A3,10A4,10A5,10A6,11B4,11B5,11B6',
        'hk2' : 'Địa lí: 10A1,10A3,10A4,10A5,10A6,11B4,11B5,11B6',
        

    },
    {
        'id' : '1',
        'hoTen' : 'Hà Đức Anh',
        'toBoMon' : "Địa-Tin-GDCD -Văn phòng",
        'hk1' : 'Địa lí: 10A1,10A3,10A4,10A5,10A6,11B4,11B5,11B6',
        'hk2' : 'Địa lí: 10A1,10A3,10A4,10A5,10A6,11B4,11B5,11B6',
        

    },
    {
        'id' : '1',
        'hoTen' : 'Hà Đức Anh',
        'toBoMon' : "Địa-Tin-GDCD -Văn phòng",
        'hk1' : 'Địa lí: 10A1,10A3,10A4,10A5,10A6,11B4,11B5,11B6',
        'hk2' : 'Địa lí: 10A1,10A3,10A4,10A5,10A6,11B4,11B5,11B6',
        

    },
    {
        'id' : '1',
        'hoTen' : 'Hà Đức Anh',
        'toBoMon' : "Địa-Tin-GDCD -Văn phòng",
        'hk1' : 'Địa lí: 10A1,10A3,10A4,10A5,10A6,11B4,11B5,11B6',
        'hk2' : 'Địa lí: 10A1,10A3,10A4,10A5,10A6,11B4,11B5,11B6',
        

    },
    {
        'id' : '1',
        'hoTen' : 'Hà Đức Anh',
        'toBoMon' : "Địa-Tin-GDCD -Văn phòng",
        'hk1' : 'Địa lí: 10A1,10A3,10A4,10A5,10A6,11B4,11B5,11B6',
        'hk2' : 'Địa lí: 10A1,10A3,10A4,10A5,10A6,11B4,11B5,11B6',
        

    }
]
// Nút thêm
$scope.showAdd = function(ev){
    $mdDialog.show({
        controller: DialogController,
        templateUrl: '/app/nghiepvu/quanlyhoso/them-ho-so-can-bo.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
}
function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
// Nút xoá
$scope.showDelete = function(ev) {
    var confirm = $mdDialog.confirm()
          .textContent('Bạn chắc chắc muốn xoá không !')
          .ariaLabel('Xoá học sinh')
          .targetEvent(ev)
          .ok('Xoá')
          .cancel('Huỷ bỏ');

    $mdDialog.show(confirm).then(function() {
      $scope.status = 'You decided to get rid of your debt.';
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });
  };
});
