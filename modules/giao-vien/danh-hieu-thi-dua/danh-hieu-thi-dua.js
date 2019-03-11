SchoolityApp.controller('danhHieuThiDuaCtr', function ($scope, $http, $rootScope) {
    // BredcrumPath
    $rootScope.BredcrumPath1 = "Giáo viên";
    $rootScope.BredcrumPath2 = "Danh hiệu thi đua";
    $rootScope.showPath1 = $rootScope.showPath2 = true;
    let thiduacn = this;
    //header
    $scope.headerList = ['STT', 'Mã CB', 'Tên Cán bộ', 'Tổ bộ môn', 'Danh hiệu thi đua', 'Ghi chú', ''];

    // --------------------- PHÂN TRANG ----------------------------
    let urlDanhHieu = (start, limit) => `https://slt-puppet.herokuapp.com/danhHieuThiDua?_start=${start}&_limit=${limit}`;
    let urlDanhHieuToBoMon = (start, limit, idToBoMon) => `https://slt-puppet.herokuapp.com/danhHieuThiDua?toBoMon.id=${idToBoMon}&_start=${start}&_limit=${limit}`;

    const maxButtons = 5;
    thiduacn.danhHieuThiDuaKQ = [];
    thiduacn.currentSelected = 1;
    thiduacn.totalItems = 0;
    thiduacn.itemsPerPage = 10;
    thiduacn.totalPages = 1;
    thiduacn.itemsPerPageOptions = [...Array(3).keys()].map(number => (number + 1) * thiduacn.itemsPerPage);
    thiduacn.pagesRange = thiduacn.totalPages > maxButtons ? [...Array(maxButtons).keys()].map(number => number + 1) : [...Array(thiduacn.totalPages).keys()].map(number => number + 1);
    //Tinh chi so index max cua 1 trang
    $scope.cuoicung = function () { //Tính chỉ số dòng cuối trang
        thiduacn.indexLastPage = thiduacn.totalItems - (thiduacn.totalPages - 1) * thiduacn.itemsPerPage;
        thiduacn.indexMax = thiduacn.currentSelected == thiduacn.totalPages ? thiduacn.indexLastPage : thiduacn.itemsPerPage;
        thiduacn.cuoicung = (thiduacn.currentSelected - 1) * thiduacn.itemsPerPage + thiduacn.indexMax;
    }
    // Load dữ liệu trang 1
    if (thiduacn.boMonSelected) {
        $http.get(urlDanhHieuToBoMon(0, thiduacn.itemsPerPage, thiduacn.boMonSelected.id)).then(response => {
            thiduacn.danhHieuThiDuaKQ = response.data;
            thiduacn.totalItems = +response.headers()["x-total-count"];
            thiduacn.totalPages = Math.ceil(thiduacn.totalItems / thiduacn.itemsPerPage);
            $scope.cuoicung();
        });
    }
    else {
        $http.get(urlDanhHieu(0, thiduacn.itemsPerPage)).then(response => {
            thiduacn.danhHieuThiDuaKQ = response.data;
            thiduacn.totalItems = +response.headers()["x-total-count"];
            thiduacn.totalPages = Math.ceil(thiduacn.totalItems / thiduacn.itemsPerPage);
            $scope.cuoicung();
        });
    }
    $scope.soTrang = function () {
        $scope.$watch('thiduacn.totalPages', function (newValue, oldValue) {
            let n = thiduacn.currentSelected;
            let totalPages = thiduacn.totalPages;
            if (n < maxButtons) {
                thiduacn.pagesRange = totalPages < maxButtons ?
                    [...Array(totalPages).keys()].map(number => number + 1) :
                    [...Array(maxButtons).keys()].map(number => number + 1);
            }
            else if (n > totalPages - maxButtons) {
                thiduacn.pagesRange = [...Array(maxButtons).keys()].map(number => number + totalPages - maxButtons + 1);
            }
            else {
                thiduacn.pagesRange = [...Array(maxButtons).keys()].map(number => number + n);
            };
        });
    }
    // Load dữ liệu khi chuyển trang
    $scope.$watchGroup(['thiduacn.itemsPerPage', 'thiduacn.currentSelected'], function (newValues, oldValues) {
        let page = newValues[1];
        let noItems = newValues[0];
        if (newValues[0] != oldValues[0]) {
            thiduacn.currentSelected = 1;
            oldValues[0] = newValues[0];
            viewMax = newValues[0];
            thiduacn.isView = newArray(viewMax, true);
            thiduacn.isEdit = newArray(viewMax, false);
        }
        // Load dữ liệu với trang tương ứng
        if (thiduacn.boMonSelected) {
            $http.get(urlDanhHieuToBoMon((page - 1) * noItems, noItems, thiduacn.boMonSelected.id)).then(response => {
                thiduacn.danhHieuThiDuaKQ = response.data;
                thiduacn.totalItems = +response.headers()["x-total-count"];
                thiduacn.totalPages = Math.ceil(thiduacn.totalItems / thiduacn.itemsPerPage);
                $scope.cuoicung();
            });
            // Tạo số trang loc theo to bo mon
            $scope.soTrang();
        }
        else {
            $http.get(urlDanhHieu((page - 1) * noItems, noItems)).then(response => {
                thiduacn.danhHieuThiDuaKQ = response.data;
                thiduacn.totalItems = +response.headers()["x-total-count"];
                thiduacn.totalPages = Math.ceil(thiduacn.totalItems / thiduacn.itemsPerPage);
                $scope.cuoicung();
            });
            // Tạo số trang k co loc
            $scope.soTrang();
        }
        //Bỏ tich checkbox khi chuyển trang
        angular.forEach(thiduacn.danhHieuThiDuaKQ, function (data, index) {
            thiduacn.tableSelection[index] = false;
            thiduacn.isAll = false;
            dem = 0;
        });

    });

    // Chuyển trang 
    thiduacn.next = function () {
        thiduacn.currentSelected < thiduacn.totalPages && thiduacn.currentSelected++;
    }
    thiduacn.prev = function () {
        thiduacn.currentSelected > 1 && thiduacn.currentSelected--;
    }
    thiduacn.first = function () {
        thiduacn.currentSelected = 1;
    }
    thiduacn.last = function () {
        thiduacn.currentSelected = thiduacn.totalPages;
    }

    //Danh hiệu thi đua
    $http.get('https://slt-puppet.herokuapp.com/danhHieuThiDuas').then(function (response) {
        $scope.danhHieuThiDuaList = response.data;
    });

    //---LOC THEO BO MON---
    thiduacn.filterToBoMon = function () {
        if (thiduacn.boMonSelected) {
            $http.get(urlDanhHieuToBoMon(0, thiduacn.itemsPerPage, thiduacn.boMonSelected.id)).then(response => {
                thiduacn.danhHieuThiDuaKQ = response.data;
                thiduacn.totalItems = +response.headers()["x-total-count"];
                thiduacn.totalPages = Math.ceil(thiduacn.totalItems / thiduacn.itemsPerPage);
                thiduacn.currentSelected = 1;
                $scope.cuoicung();
            });
        }
        else {
            $http.get(urlDanhHieu(0, thiduacn.itemsPerPage)).then(function (response) {
                thiduacn.danhHieuThiDuaKQ = response.data;
                thiduacn.totalItems = +response.headers()["x-total-count"];
                thiduacn.totalPages = Math.ceil(thiduacn.totalItems / thiduacn.itemsPerPage);
                thiduacn.currentSelected = 1;
                $scope.cuoicung();
            });
        }
        angular.forEach(thiduacn.danhHieuThiDuaKQ, function (data, index) {
            thiduacn.tableSelection[index] = false;
            thiduacn.isAll = false;
        });
    }
    // --------------------------- XÓA --------------------------------
    var dem = 0;
    // checkAll = chọn tất cả tableSelection
    thiduacn.tableSelection = {};
    thiduacn.isAll = false;
    thiduacn.selectAllRows = function () {
        if (thiduacn.isAll) {
            angular.forEach(thiduacn.danhHieuThiDuaKQ, function (data, index) {
                thiduacn.tableSelection[index] = true;
            });
            dem = thiduacn.indexMax;
        } else {
            dem = 0;
            angular.forEach(thiduacn.danhHieuThiDuaKQ, function (data, index) {
                thiduacn.tableSelection[index] = false;
            });
        }
    };
    // chọn tất cả tableSelection = checkAll
    thiduacn.demChecked = function ($index) {
        if (thiduacn.tableSelection[$index]) dem++;
        else dem--;
        if (dem == thiduacn.indexMax) thiduacn.isAll = true;
        else thiduacn.isAll = false;
    }

    // Xóa tất cả các records đã chọn (1 hoặc nhiều)
    thiduacn.removeSelectedRows = function () {
        $scope.Delete = function () {
            var total = thiduacn.danhHieuThiDuaKQ.length - 1;
            for (var i = total; i >= 0; i--) {
                var id = thiduacn.danhHieuThiDuaKQ[i].id;
                if (thiduacn.tableSelection[i]) {
                    // Xóa từng checked record
                    thiduacn.danhHieuThiDuaKQ.splice(i, 1);
                    delete thiduacn.tableSelection[i];
                    $http.delete("https://slt-puppet.herokuapp.com/danhHieuThiDua/" + thiduacn.danhHieuThiDuaKQ[i].id);
                }
            };
            $("#alert-thanhcong").show().delay(2000).fadeOut();
        }
    };
    // Ẩn nút xóa khi chưa chọn
    thiduacn.countChecked = function () {
        var count = 0;
        var total = thiduacn.danhHieuThiDuaKQ.length;
        for (var i = 0; i < total; i++) {
            if (thiduacn.tableSelection[i]) {
                count++;
            }
        }
        return count;
    };
    // --------------SỬA TRỰC TIẾP------------------
    viewMax = thiduacn.itemsPerPage;
    thiduacn.isView = newArray(viewMax, true);
    thiduacn.isEdit = newArray(viewMax, false);
    thiduacn.catchID = function (index) {
        thiduacn.isView[index] = false;
        thiduacn.isEdit[index] = true;
    };
    thiduacn.Save = function (index, kq) {
        $http.put('https://slt-puppet.herokuapp.com/danhHieuThiDua/' + kq.id, kq).then(function () {
            thiduacn.isView[index] = true;
            thiduacn.isEdit[index] = false;
        });
        $("#alert-thanhcong").show().delay(2000).fadeOut();
    };
    thiduacn.cancel = function (index) {
        thiduacn.isView[index] = true;
        thiduacn.isEdit[index] = false;
    };
    // Tổ Bộ Môn
    $http.get('https://slt-puppet.herokuapp.com/toBoMons').then(function (response) {
        thiduacn.toBoMonList = response.data;
    });
    // Giáo viên tương ứng với Tổ Bộ Môn - page them moi
    $scope.getIdBoMon = function (thiduacn) {
        var boMonId = thiduacn.boMonSelected.id;
        $http.get('https://slt-puppet.herokuapp.com/giaoViens?toBoMon.id=' + boMonId).then(function (response) {
            $scope.giaoVienList = response.data;
            $scope.soLuongGVBM = $scope.giaoVienList.length;
        });
        $scope.danhHieuThiDuaSelected = {};
        $scope.ghiChu = "";
        $scope.giaoVienSelected = {};
    }
    //Thông tin thi đua ứng với giáo viên ---SỬA Ỏ THÊM MỚI
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
    $scope.getIdGiaoVien = function (giaoVienSelected) {
        $http.get('https://slt-puppet.herokuapp.com/danhHieuThiDua/' + giaoVienSelected.id).then(function onSuccess(response) {
            $scope.danhHieuThiDuaSelected = response.data.danhHieu;
            $scope.ghiChu = response.data.ghiChu;
            //cap nhat dữ liệu
            $scope.danhHieuCaNhan = function () {
                $scope.danhHieuThiDua = {};
                $scope.danhHieuThiDua.id = giaoVienSelected.id;
                $scope.danhHieuThiDua.toBoMon = thiduacn.boMonSelected;
                $scope.danhHieuThiDua.danhHieu = $scope.danhHieuThiDuaSelected;
                $scope.danhHieuThiDua.ghiChu = ($scope.ghiChu != "") ? $scope.ghiChu : "Vào sổ ngày " + today;
                giaoVien = {};
                giaoVien.id = giaoVienSelected.id;
                giaoVien.tenCanBo = giaoVienSelected.tenCanBo;
                $scope.danhHieuThiDua.giaoVien = giaoVien;
                $http.put('https://slt-puppet.herokuapp.com/danhHieuThiDua/' + giaoVienSelected.id, $scope.danhHieuThiDua).then(function () {
                    $("#alert-thanhcong").show().delay(2000).fadeOut();
                })
            };
        }).catch(function onError(response) {
            $scope.danhHieuThiDuaSelected = {};
            $scope.ghiChu = "";
            //save dữ liệu
            $scope.danhHieuCaNhan = function () {
                $scope.danhHieuThiDua = {};
                $scope.danhHieuThiDua.id = giaoVienSelected.id;
                $scope.danhHieuThiDua.toBoMon = thiduacn.boMonSelected;
                $scope.danhHieuThiDua.danhHieu = $scope.danhHieuThiDuaSelected;
                $scope.danhHieuThiDua.ghiChu = ($scope.ghiChu != "") ? $scope.ghiChu : "Vào sổ ngày " + today;
                giaoVien = {};
                giaoVien.id = giaoVienSelected.id;
                giaoVien.tenCanBo = giaoVienSelected.tenCanBo;
                $scope.danhHieuThiDua.giaoVien = giaoVien;
                $http.post('https://slt-puppet.herokuapp.com/danhHieuThiDua', $scope.danhHieuThiDua).then(function () {
                    $("#alert-thanhcong").show().delay(2000).fadeOut();
                })
            };
        })
    }
})