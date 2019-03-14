app.controller('tkbGiaoVienCtrl', async function ($scope, $http, $mdDialog) {
    $scope.gridOptions = {
      enableColumnMenus: false,
      selectedItems: $scope.selections,
      enableRowSelection: true,
      rowHeight: 30,
      columnDefs: [{
          field: 'buoihoc',
          headerCellTemplate: '<div></div>',
          cellTemplate: '<div></div>'
        },
        {
          field: 'tiet',
          displayName: 'Tiết'
        },
        {
          field: 't2',
          displayName: ' Thứ 2'
        },
        {
          field: 't3',
          displayName: '  Thứ 3'
        },
        {
          field: 't4',
          displayName: 'Thứ 4'
        },
        {
          field: 't5',
          displayName: 'Thứ 5'
        },
        {
          field: 't6',
          displayName: 'Thứ 6'
        },
        {
          field: 't7',
          displayName: 'Thứ 7'
        },
      ],
    }
    $scope.gridOptions.onRegisterApi = function (gridApi) {
      $scope.gridApi = gridApi;
    };
  });
  