app.controller('soDiemQuaTrinhCtrl',async function($scope,$http,$mdDialog){
    $scope.gridOptions = {
    enableColumnMenus: false,
    selectedItems: $scope.selections,
    enableColumnResizing: true,
    enableRowSelection: true,
    rowHeight : 30,
    columnDefs: [
        { width:'10%',headerCellTemplate: '<input ng-model="checkAll"    type="checkbox">',field:'checkbox', cellTemplate: '<input ng-checked="checkAll" type="checkbox" class="p-0 m-0">'},
        { field: 'id',width:'10%', displayName : 'STT' },
        { field: 'hoTen',displayName : 'Họ và tên',width:'25%' },
        { field: 'diemMieng' , displayName : 'Điểm miệng',cellTemplate :'<div class="row justify-content-between w-100"><div class="text-center col" ng-repeat="item in row.entity.diemMieng">{{item.diem}}</div ></div>' },
        { field: 'diem15p' , displayName : 'Điểm 15p',cellTemplate :'<div class="row justify-content-between w-100"><div class="text-center col" ng-repeat="item in row.entity.diem15p">{{item.diem}}</div ></div>' },
        { field: 'diem1tiet' , displayName : 'Điểm 1 tiết', cellTemplate :'<div class="row justify-content-between w-100"><div class="text-center col" ng-repeat="item in row.entity.diem1tiet">{{item.diem}}</div ></div>' },
        { field: 'hocky ' , displayName : 'Thi học kỳ'},
        ],
}
$scope.gridOptions.onRegisterApi = function(gridApi){
    $scope.gridApi = gridApi;
 };
 $http.get('/json/bangdiem.json').then(function(response){
    $scope.gridOptions.data = response.data;
 });
 $http.get('/json/monhoc.json').then(function(response){
    $scope.monhoc = response.data;
 });
});
