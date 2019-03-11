SchoolityApp.controller('danhHieuTapTheCtr', function ($scope, $http, $rootScope) {
    // BredcrumPath
    $rootScope.BredcrumPath1 = "Giáo viên";
    $rootScope.BredcrumPath2 = "Danh hiệu thi đua tập thể";
    $rootScope.showPath1 = $rootScope.showPath2 = true;
    var thiduatt = this;
    thiduatt.danhHieuTapTheKQ = [];
    //header
    $scope.headerList = ['STT', 'Tổ bộ môn', 'Danh hiệu thi đua', 'Ghi chú', 'HĐ'];
    //view list
    $http.get("http://slt-puppet.herokuapp.com/danhHieuThiDuaTapThe").then(function (response) {
        thiduatt.danhHieuTapTheKQ = response.data;
        viewMax = thiduatt.danhHieuTapTheKQ.length;
        thiduatt.isView = newArray(viewMax, true);
        thiduatt.isEdit = newArray(viewMax, false);
    });
    // --------------------------- XÓA --------------------------------
    var dem = 0;
    // checkAll = chọn tất cả tableSelection
    thiduatt.tableSelection = {};
    thiduatt.isAll = false;
    thiduatt.selectAllRows = function () {
        if (thiduatt.isAll) {
            angular.forEach(thiduatt.danhHieuTapTheKQ, function (data, index) {
                thiduatt.tableSelection[index] = true;
            });
            dem = thiduatt.danhHieuTapTheKQ.length;
        } else {
            dem = 0;
            angular.forEach(thiduatt.danhHieuTapTheKQ, function (data, index) {
                thiduatt.tableSelection[index] = false;
            });
        }
    };
    // chọn tất cả tableSelection = checkAll
    thiduatt.demChecked = function ($index) {
        if (thiduatt.tableSelection[$index]) dem++;
        else dem--;
        if (dem == thiduatt.danhHieuTapTheKQ.length) thiduatt.isAll = true;
        else thiduatt.isAll = false;
    }

    // Xóa tất cả các records đã chọn (1 hoặc nhiều)
    thiduatt.removeSelectedRows = function () {
        $scope.Delete = function () {
            var total = thiduatt.danhHieuTapTheKQ.length - 1;
            for (var i = total; i >= 0; i--) {
                var id = thiduatt.danhHieuTapTheKQ[i].id;
                if (thiduatt.tableSelection[i]) {
                    // Xóa từng checked record
                    thiduatt.danhHieuTapTheKQ.splice(i, 1);
                    delete thiduatt.tableSelection[i];
                    $http.delete('https://slt-puppet.herokuapp.com/danhHieuThiDuaTapThe/' + id);
                }
            };
            $("#alert-thanhcong").show().delay(2000).fadeOut();
        }
    };
    // Ẩn nút xóa khi chưa chọn
    thiduatt.countChecked = function () {
        var count = 0;
        var total = thiduatt.danhHieuTapTheKQ.length;
        for (var i = 0; i < total; i++) {
            if (thiduatt.tableSelection[i]) {
                count++;
            }
        }
        return count;
    };

    // --------------SỬA TRỰC TIẾP------------------
    thiduatt.catchID = function (index) {
        thiduatt.isView[index] = false;
        thiduatt.isEdit[index] = true;

    };
    thiduatt.Save = function (index, kq) {
        $http.put('https://slt-puppet.herokuapp.com/danhHieuThiDuaTapThe/' + kq.id, kq).then(function () {
            thiduatt.isView[index] = true;
            thiduatt.isEdit[index] = false;
        });
        $("#alert-thanhcong").show().delay(2000).fadeOut();
    };
    thiduatt.cancel = function (index) {
        thiduatt.isView[index] = true;
        thiduatt.isEdit[index] = false;
    };
    //page thêm mới
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = dd + '/' + mm + '/' + yyyy;
    // Tổ Bộ Môn
    $http.get('https://slt-puppet.herokuapp.com/toBoMons').then(function (response) {
        $scope.toBoMonList = response.data;
    });
    $scope.getIdBoMon = function (boMonSelected) {
        $http.get('https://slt-puppet.herokuapp.com/danhHieuThiDuaTapThe/' + boMonSelected.id).then(function (response) {
            $scope.danhHieuTapTheSelected = response.data.danhHieu;
            $scope.ghiChu = response.data.ghiChu;
            $scope.danhHieuThiDuaTapThe = function () {
                $scope.danhHieuTapThe = {};
                $scope.danhHieuTapThe.id = boMonSelected.id;
                $scope.danhHieuTapThe.boMon = boMonSelected.tenToBoMon;
                $scope.danhHieuTapThe.danhHieu = $scope.danhHieuTapTheSelected;
                $scope.danhHieuTapThe.ghiChu = ($scope.ghiChu != "") ? $scope.ghiChu : "Vào sổ ngày " + today;
                $http.put('https://slt-puppet.herokuapp.com/danhHieuThiDuaTapThe/' + $scope.boMonSelected.id, $scope.danhHieuTapThe).then(function () {
                    $("#alert-thanhcong").show().delay(2000).fadeOut();
                })
            };
        }).catch(function onError(response) {
            $scope.danhHieuTapTheSelected = {};
            $scope.ghiChu = "";
            $scope.danhHieuThiDuaTapThe = function () {
                $scope.danhHieuTapThe = {};
                $scope.danhHieuTapThe.id = boMonSelected.id;
                $scope.danhHieuTapThe.boMon = boMonSelected.tenToBoMon;
                $scope.danhHieuTapThe.danhHieu = $scope.danhHieuTapTheSelected;
                $scope.danhHieuTapThe.ghiChu = ($scope.ghiChu != "") ? $scope.ghiChu : "Vào sổ ngày " + today;
                $http.post('https://slt-puppet.herokuapp.com/danhHieuThiDuaTapThe', $scope.danhHieuTapThe).then(function () {
                    $("#alert-thanhcong").show().delay(2000).fadeOut();
                })
            };
        })
    }

    //Danh hiệu thi đua
    $http.get('https://slt-puppet.herokuapp.com/danhHieuThiDuaTapThes').then(function (response) {
        $scope.danhHieuTapTheList = response.data;
    });

})