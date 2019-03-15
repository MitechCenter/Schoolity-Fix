app.controller('xepLoaiHanhKiemCtrl',async function($scope,$http,$mdDialog){
    $scope.gridOptions = {
    enableColumnMenus: false,
    selectedItems: $scope.selections,
    enableColumnResizing: true,
    enableRowSelection: true,
    rowHeight : 30,
    columnDefs: [
        { width:'10%',headerCellTemplate: '<input ng-model="checkAll"    type="checkbox">',field:'checkbox', cellTemplate: '<input ng-checked="checkAll" type="checkbox" class="p-0 m-0">'},
        { field: 'id',width:'10%', displayName : 'STT' },
        { field: 'hoTen',displayName : 'Tên học sinh' },
        { field: 'danhGia' , displayName : 'Đánh giá'},
        { field: 'hanhKiem' , headerCellTemplate : '<select><option>Hạnh kiểm</option></select>'},
        ],
}
$scope.gridOptions.onRegisterApi = function(gridApi){
    $scope.gridApi = gridApi;
 };
 $scope.gridOptions.data = [
     {
         "id"  : 1,
         "khoi" : 6,
         "lop" : "6A1",
         "tinhTrang" : "Đủ điều kiện"
     }
 ]
 
});
