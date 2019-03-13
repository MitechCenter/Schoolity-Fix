app.controller('hoSoHocSinhCtrl',async function($scope,$http){
        $scope.gridOptions = {
        enableSelectAll: true,
        enableRowHeaderSelection: true,
        enableFullRowSelection : true,
        enableColumnMenus: false,
        selectedItems: $scope.selections,
        enableRowSelection: true,
        rowHeight : 30,
        columnDefs: [
            { field: 'id', displayName : 'STT' },
            { field: 'maHs' , displayName : ' Mã học sinh'},
            { field: 'hoTen',displayName : 'Họ và tên' },
            { field: 'ngaySinh' , displayName : 'Ngày sinh'},
            { field: 'gioiTinh' , displayName : 'Giới tính'},
            { field: 'lop' , displayName : 'Tên lớp'},
            { field: 'trangThai' , displayName : 'Trạng thái'},
            ],
    }
    await $http.get('https://saigonmaster.herokuapp.com/danhSachHocSinh').then(function(response){
        $scope.gridOptions.data = response.data;
        $scope.totalRow = response.data.length
    })
});
