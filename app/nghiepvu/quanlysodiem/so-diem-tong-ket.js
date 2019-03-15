app.controller('soDiemTongKetCtrl', async function ($scope, $http, $mdDialog) {
    $scope.gridOptions = {
        enableColumnMenus: false,
        selectedItems: $scope.selections,
        enableColumnResizing: true,
        enableRowSelection: true,
        rowHeight: 30,
        columnDefs: [{
                width: '10%',
                headerCellTemplate: '<input ng-model="checkAll"    type="checkbox">',
                field: 'checkbox',
                cellTemplate: '<input ng-checked="checkAll" type="checkbox" class="p-0 m-0">'
            },
            {
                field: 'id',
                width: '5%',
                displayName: 'STT'
            },
            {
                field: 'hoTen',
                displayName: 'Họ và tên',
                width: '25%'
            },
            {
                field: "toan",
                displayName: 'Toán'
            },
            {
                field: "ly",
                displayName: 'Lý'
            },
            {
                field: "hoa",
                displayName: 'Hoá'
            },
            {
                field: 'hanhKiem',
                displayName: 'Hạnh kiểm'
            },
            {
                field: "danhHieu",
                displayName: 'Danh hiệu'
            },
            {
                field: 'hang',
                displayName: 'Điểm'
            }

        ],
    }
    $scope.gridOptions.onRegisterApi = function (gridApi) {
        $scope.gridApi = gridApi;
    };
    $scope.gridOptions.data = [{
        "id": 1,
        "hoTen": "Nguyễn Thị Thuỳ Linh",
        "toan": 10,
        "ly": 10,
        "hoa": 10,
        "tbm": 10,
        "hanhKiem": "Tốt",
        "danhHieu": "Giỏi",
        "hang": 1
    }]
});
