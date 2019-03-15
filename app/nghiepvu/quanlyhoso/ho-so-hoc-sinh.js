app.controller('hoSoHocSinhCtrl',async function($scope,$http,$mdDialog){
        $scope.gridOptions = {
        enableColumnMenus: false,
        selectedItems: $scope.selections,
        enableColumnResizing: true,
        enableRowSelection: true,
        rowHeight : 30,
        columnDefs: [
            { width:'10%',headerCellTemplate: '<input ng-model="checkAll"    type="checkbox">',field:'checkbox', cellTemplate: '<input ng-checked="checkAll" type="checkbox" class="p-0 m-0">'},
            { field: 'id',width:'10%', displayName : 'STT' },
            { field: 'maHs' , displayName : ' Mã học sinh' },
            { field: 'hoTen',displayName : 'Họ và tên',width:'25%' },
            { field: 'ngaySinh' , displayName : 'Ngày sinh'},
            { field: 'gioiTinh' , displayName : 'Giới tính'},
            { field: 'lop' , displayName : 'Tên lớp'},
            { field: 'trangThai' , displayName : 'Trạng thái'},
            ],
    }
    $scope.gridOptions.onRegisterApi = function(gridApi){
        $scope.gridApi = gridApi;
     }; 
  
    await $http.get('https://saigonmaster.herokuapp.com/danhSachHocSinh').then(function(response){
        $scope.gridOptions.data = response.data;
        $scope.totalRow = response.data.length
    });
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
