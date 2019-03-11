SchoolityApp.controller('danhGiaXepLoaiCtr', function ($scope, $http, $rootScope) {
    // BredcrumPath
    $rootScope.BredcrumPath1 = "Giáo viên";
    $rootScope.BredcrumPath2 = "Đánh giá xếp loại";
    $rootScope.showPath1 = $rootScope.showPath2 = true;
    let danhgiaxl = this;
    //header
    $scope.header = ['STT', 'Họ và tên', 'Chuẩn nghề nghiệp', 'Đánh giá viên chức', 'Bồi dưỡng thường xuyên', 'Giáo viên dạy giỏi'];
    // --------------------- PHÂN TRANG ----------------------------
    let urlDanhGia = (start, limit) => `https://slt-puppet.herokuapp.com/giaoViens?_start=${start}&_limit=${limit}`;
    let urlDanhGiaToBoMon = (start, limit, idToBoMon) => `https://slt-puppet.herokuapp.com/giaoViens?toBoMon.id=${idToBoMon}&_start=${start}&_limit=${limit}`;

    const maxButtons = 5;
    danhgiaxl.giaoVienList = [];
    danhgiaxl.currentSelected = 1;
    danhgiaxl.totalItems = 0;
    danhgiaxl.itemsPerPage = 10;
    danhgiaxl.totalPages = 1;
    danhgiaxl.itemsPerPageOptions = [...Array(3).keys()].map(number => (number + 1) * danhgiaxl.itemsPerPage);
    danhgiaxl.pagesRange = danhgiaxl.totalPages > maxButtons ? [...Array(maxButtons).keys()].map(number => number + 1) : [...Array(danhgiaxl.totalPages).keys()].map(number => number + 1);
    //Tinh chi so index max cua 1 trang
    $scope.cuoicung = function () { //Tính chỉ số dòng cuối trang
        idThaydoi = []; //Lưu id giáo viên có thay đổi thông tin
        danhgiaxl.indexLastPage = danhgiaxl.totalItems - (danhgiaxl.totalPages - 1) * danhgiaxl.itemsPerPage;
        danhgiaxl.indexMax = danhgiaxl.currentSelected == danhgiaxl.totalPages ? danhgiaxl.indexLastPage : danhgiaxl.itemsPerPage;
        danhgiaxl.cuoicung = (danhgiaxl.currentSelected - 1) * danhgiaxl.itemsPerPage + danhgiaxl.indexMax;
    }
    // Load dữ liệu trang 1
    if (danhgiaxl.boMonSelected) {
        $http.get(urlDanhGiaToBoMon(0, danhgiaxl.itemsPerPage, danhgiaxl.boMonSelected.id)).then(response => {
            danhgiaxl.giaoVienList = response.data;
            danhgiaxl.totalItems = +response.headers()["x-total-count"];
            danhgiaxl.totalPages = Math.ceil(danhgiaxl.totalItems / danhgiaxl.itemsPerPage);
            $scope.cuoicung();
        });
    }
    else {
        $http.get(urlDanhGia(0, danhgiaxl.itemsPerPage)).then(response => {
            danhgiaxl.giaoVienList = response.data;
            danhgiaxl.totalItems = +response.headers()["x-total-count"];
            danhgiaxl.totalPages = Math.ceil(danhgiaxl.totalItems / danhgiaxl.itemsPerPage);
            $scope.cuoicung();
        });
    }
    $scope.soTrang = function () {
        $scope.$watch('danhgiaxl.totalPages', function (newValue, oldValue) {
            let n = danhgiaxl.currentSelected;
            let totalPages = danhgiaxl.totalPages;
            if (n < maxButtons) {
                danhgiaxl.pagesRange = totalPages < maxButtons ?
                    [...Array(totalPages).keys()].map(number => number + 1) :
                    [...Array(maxButtons).keys()].map(number => number + 1);
            }
            else if (n > totalPages - maxButtons) {
                danhgiaxl.pagesRange = [...Array(maxButtons).keys()].map(number => number + totalPages - maxButtons + 1);
            }
            else {
                danhgiaxl.pagesRange = [...Array(maxButtons).keys()].map(number => number + n);
            };
        });
    }
    // Load dữ liệu khi chuyển trang
    $scope.$watchGroup(['danhgiaxl.itemsPerPage', 'danhgiaxl.currentSelected'], function (newValues, oldValues) {
        let page = newValues[1];
        let noItems = newValues[0];
        if (newValues[0] != oldValues[0]) {
            danhgiaxl.currentSelected = 1;
            oldValues[0] = newValues[0];
            viewMax = newValues[0];
            danhgiaxl.isView = newArray(viewMax, true);
            danhgiaxl.isEdit = newArray(viewMax, false);
        }
        // Load dữ liệu với trang tương ứng
        if (danhgiaxl.boMonSelected) {
            $http.get(urlDanhGiaToBoMon((page - 1) * noItems, noItems, danhgiaxl.boMonSelected.id)).then(response => {
                danhgiaxl.giaoVienList = response.data;
                danhgiaxl.totalItems = +response.headers()["x-total-count"];
                danhgiaxl.totalPages = Math.ceil(danhgiaxl.totalItems / danhgiaxl.itemsPerPage);
                $scope.cuoicung();
            });
            // Tạo số trang loc theo to bo mon
            $scope.soTrang();
        }
        else {
            $http.get(urlDanhGia((page - 1) * noItems, noItems)).then(response => {
                danhgiaxl.giaoVienList = response.data;
                danhgiaxl.totalItems = +response.headers()["x-total-count"];
                danhgiaxl.totalPages = Math.ceil(danhgiaxl.totalItems / danhgiaxl.itemsPerPage);
                $scope.cuoicung();
            });
            // Tạo số trang k co loc
            $scope.soTrang();
        }
    });

    // Chuyển trang 
    danhgiaxl.next = function () {
        danhgiaxl.currentSelected < danhgiaxl.totalPages && danhgiaxl.currentSelected++;
    }
    danhgiaxl.prev = function () {
        danhgiaxl.currentSelected > 1 && danhgiaxl.currentSelected--;
    }
    danhgiaxl.first = function () {
        danhgiaxl.currentSelected = 1;
    }
    danhgiaxl.last = function () {
        danhgiaxl.currentSelected = danhgiaxl.totalPages;
    }
    //---LOC THEO BO MON---
    danhgiaxl.filterToBoMon = function () {
        if (danhgiaxl.boMonSelected) {
            $http.get(urlDanhGiaToBoMon(0, danhgiaxl.itemsPerPage, danhgiaxl.boMonSelected.id)).then(response => {
                danhgiaxl.giaoVienList = response.data;
                danhgiaxl.totalItems = +response.headers()["x-total-count"];
                danhgiaxl.totalPages = Math.ceil(danhgiaxl.totalItems / danhgiaxl.itemsPerPage);
                danhgiaxl.currentSelected = 1;
                $scope.cuoicung();
            });
        }
        else {
            $http.get(urlDanhGia(0, danhgiaxl.itemsPerPage)).then(response => {
                danhgiaxl.giaoVienList = response.data;
                danhgiaxl.totalItems = +response.headers()["x-total-count"];
                danhgiaxl.totalPages = Math.ceil(danhgiaxl.totalItems / danhgiaxl.itemsPerPage);
                danhgiaxl.currentSelected = 1;
                $scope.cuoicung();
            });
        }
    }
    // Tổ Bộ Môn
    $http.get('https://slt-puppet.herokuapp.com/toBoMons').then(function (response) {
        danhgiaxl.toBoMonList = response.data;
    });
    //Save
    $scope.xepLoaiGiaoVien = function () {
        var total = idThaydoi.length;
        for (i = 0; i < total; i++) {
            if (idThaydoi[i]) {
                $http.put('https://slt-puppet.herokuapp.com/giaoViens/' + idThaydoi[i], danhgiaxl.giaoVienList[i]).then(function (response) {
                });
            }
        };
        $("#alert-thanhcong").show().delay(2000).fadeOut();
    }
    //Lay index dong co thay doi
    $scope.thayDoi = function (kq, index) {
        idThaydoi[index] = kq.id;
    }
    //Danh sách các select
    $http.get('https://slt-puppet.herokuapp.com/chuanNgheNghieps').then(function (response) {
        $scope.chuanNgheNghiepList = response.data;
    });
    $http.get('https://slt-puppet.herokuapp.com/danhGiaVienChucs').then(function (response) {
        $scope.danhGiaVienChucList = response.data;
    });
    $http.get('https://slt-puppet.herokuapp.com/boiDuongThuongXuyens').then(function (response) {
        $scope.boiDuongThuongXuyenList = response.data;
    });
    $http.get('https://slt-puppet.herokuapp.com/capDayGiois').then(function (response) {
        $scope.capDayGioiList = response.data;
    });
})