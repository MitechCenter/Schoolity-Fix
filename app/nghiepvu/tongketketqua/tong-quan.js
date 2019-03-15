app.controller('tongQuanCtrl',async function($scope,$http,$mdDialog){
    $scope.gridOptions = {
    enableColumnMenus: false,
    selectedItems: $scope.selections,
    enableColumnResizing: true,
    enableRowSelection: true,
    rowHeight : 30,
    columnDefs: [
        { width:'10%',headerCellTemplate: '<input ng-model="checkAll"    type="checkbox">',field:'checkbox', cellTemplate: '<input ng-checked="checkAll" type="checkbox" class="p-0 m-0">'},
        { field: 'id',width:'10%', displayName : 'STT' },
        { field: 'khoi',displayName : 'Khối' },
        { field: 'lop' , displayName : 'Lớp'},
        { field: 'tinhTrang' , displayName : 'Trình trạng'},
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
