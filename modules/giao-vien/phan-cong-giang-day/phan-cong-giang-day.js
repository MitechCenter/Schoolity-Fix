
SchoolityApp.filter('propsFilter', function () {
    return function (items, props) {
        var out = [];
        if (angular.isArray(items)) {
            var keys = Object.keys(props);

            items.forEach(function (item) {
                var itemMatches = false;

                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }
                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            out = items;
        }
        return out;
    };
});
SchoolityApp.controller('phanCongGiangDayCtr', function ($scope, $http, $rootScope, $timeout) {
    // BredcrumPath
    $rootScope.BredcrumPath1 = "Giáo viên";
    $rootScope.BredcrumPath2 = "Phân công giảng dạy";
    $rootScope.showPath1 = $rootScope.showPath2 = true;
    var pcgiang = this;
    //header
    $scope.headerList = ['STT', 'Mã GV', 'Họ và tên', 'Bộ môn', 'Môn học', 'Lớp học', 'HĐ'];
    // --------------------- PHÂN TRANG ----------------------------
    let urlphanCongKQ = (start, limit) => `https://saigonmaster.herokuapp.com/phanCongGiangDay?_start=${start}&_limit=${limit}`;
    let urlphanCongToBoMon = (start, limit, idToBoMon) => `https://saigonmaster.herokuapp.com/phanCongGiangDay?toBoMon.id=${idToBoMon}&_start=${start}&_limit=${limit}`;
    let urlfilterGiaoVien = (start, limit, idGiaoVien) => `https://saigonmaster.herokuapp.com/phanCongGiangDay?giaoVien.id=${idGiaoVien}&_start=${start}&_limit=${limit}`;
    const maxButtons = 5;
    pcgiang.kqList = [];
    pcgiang.currentSelected = 1;
    pcgiang.totalItems = 0;
    pcgiang.itemsPerPage = 10;
    pcgiang.totalPages = 1;
    pcgiang.itemsPerPageOptions = [...Array(3).keys()].map(number => (number + 1) * pcgiang.itemsPerPage);
    pcgiang.pagesRange = pcgiang.totalPages > maxButtons ? [...Array(maxButtons).keys()].map(number => number + 1) : [...Array(pcgiang.totalPages).keys()].map(number => number + 1);
    //Tinh chi so index max cua 1 trang
    $scope.cuoicung = function () { //Hàm không có nghĩa nữa
        pcgiang.indexLastPage = pcgiang.totalItems - (pcgiang.totalPages - 1) * pcgiang.itemsPerPage;
        pcgiang.indexMax = pcgiang.currentSelected == pcgiang.totalPages ? pcgiang.indexLastPage : pcgiang.itemsPerPage;
        pcgiang.cuoicung = (pcgiang.currentSelected - 1) * pcgiang.itemsPerPage + pcgiang.indexMax;
    }
    // Load dữ liệu trang 1
    if (pcgiang.boMonSelected) {
        $http.get(urlphanCongToBoMon(0, pcgiang.itemsPerPage, pcgiang.boMonSelected.id)).then(response => {
            pcgiang.kqList = response.data;
            pcgiang.totalItems = +response.headers()["x-total-count"];
            pcgiang.totalPages = Math.ceil(pcgiang.totalItems / pcgiang.itemsPerPage);
            $scope.cuoicung();
        });
    }
    else {
        $http.get(urlphanCongKQ(0, pcgiang.itemsPerPage)).then(response => {
            pcgiang.kqList = response.data;
            pcgiang.totalItems = +response.headers()["x-total-count"];
            pcgiang.totalPages = Math.ceil(pcgiang.totalItems / pcgiang.itemsPerPage);
            $scope.cuoicung();
        });
    }
    $scope.soTrang = function () {
        $scope.$watch('pcgiang.totalPages', function (newValue, oldValue) {
            let n = pcgiang.currentSelected;
            let totalPages = pcgiang.totalPages;
            if (n < maxButtons) {
                pcgiang.pagesRange = totalPages < maxButtons ?
                    [...Array(totalPages).keys()].map(number => number + 1) :
                    [...Array(maxButtons).keys()].map(number => number + 1);
            }
            else if (n > totalPages - maxButtons) {
                pcgiang.pagesRange = [...Array(maxButtons).keys()].map(number => number + totalPages - maxButtons + 1);
            }
            else {
                pcgiang.pagesRange = [...Array(maxButtons).keys()].map(number => number + n);
            };
        });
    }
    // Load dữ liệu khi chuyển trang
    $scope.$watchGroup(['pcgiang.itemsPerPage', 'pcgiang.currentSelected'], function (newValues, oldValues) {
        let page = newValues[1];
        let noItems = newValues[0];
        if (newValues[0] != oldValues[0]) {
            pcgiang.currentSelected = 1;
            oldValues[0] = newValues[0];
            viewMax = newValues[0];
            pcgiang.isView = newArray(viewMax, true);
            pcgiang.isEdit = newArray(viewMax, false);
        }
        // Load dữ liệu với trang tương ứng
        if (pcgiang.giaoVienSelected) {
            $http.get(urlfilterGiaoVien((page - 1) * noItems, noItems, pcgiang.giaoVienSelected.id)).then(response => {
                pcgiang.kqList = response.data;
                pcgiang.totalItems = +response.headers()["x-total-count"];
                pcgiang.totalPages = Math.ceil(pcgiang.totalItems / pcgiang.itemsPerPage);
                $scope.cuoicung();
            });
        } else {
            if (pcgiang.boMonSelected) {
                $http.get(urlphanCongToBoMon((page - 1) * noItems, noItems, pcgiang.boMonSelected.id)).then(response => {
                    pcgiang.kqList = response.data;
                    pcgiang.totalItems = +response.headers()["x-total-count"];
                    pcgiang.totalPages = Math.ceil(pcgiang.totalItems / pcgiang.itemsPerPage);
                    $scope.cuoicung();
                });
                // Tạo số trang loc theo to bo mon
                $scope.soTrang();
            }
            else {
                $http.get(urlphanCongKQ((page - 1) * noItems, noItems)).then(response => {
                    pcgiang.kqList = response.data;
                    pcgiang.totalItems = +response.headers()["x-total-count"];
                    pcgiang.totalPages = Math.ceil(pcgiang.totalItems / pcgiang.itemsPerPage);
                    $scope.cuoicung();
                });
                // Tạo số trang k co loc
                $scope.soTrang();
            }
        }
        //Bỏ tich checkbox khi chuyển trang
        angular.forEach(pcgiang.kqList, function (data, index) {
            pcgiang.tableSelection[index] = false;
            pcgiang.isAll = false;
            dem = 0;
        });

    });
    // Chuyển trang 
    pcgiang.next = function () {
        pcgiang.currentSelected < pcgiang.totalPages && pcgiang.currentSelected++;
    }
    pcgiang.prev = function () {
        pcgiang.currentSelected > 1 && pcgiang.currentSelected--;
    }
    pcgiang.first = function () {
        pcgiang.currentSelected = 1;
    }
    pcgiang.last = function () {
        pcgiang.currentSelected = pcgiang.totalPages;
    }

    //---LOC THEO BO MON---
    pcgiang.filterToBoMon = function () {
        if (pcgiang.boMonSelected) {
            $http.get(urlphanCongToBoMon(0, pcgiang.itemsPerPage, pcgiang.boMonSelected.id)).then(response => {
                pcgiang.kqList = response.data;
                pcgiang.totalItems = +response.headers()["x-total-count"];
                pcgiang.totalPages = Math.ceil(pcgiang.totalItems / pcgiang.itemsPerPage);
                pcgiang.currentSelected = 1;
                $scope.cuoicung();
            });
            $http.get('https://slt-puppet.herokuapp.com/giaoViens?toBoMon.id=' + pcgiang.boMonSelected.id).then(function (response) {
                pcgiang.giaoVienList = response.data;
            });
        }
        else {
            $http.get(urlphanCongKQ(0, pcgiang.itemsPerPage)).then(function (response) {
                pcgiang.kqList = response.data;
                pcgiang.totalItems = +response.headers()["x-total-count"];
                pcgiang.totalPages = Math.ceil(pcgiang.totalItems / pcgiang.itemsPerPage);
                pcgiang.currentSelected = 1;
                $scope.cuoicung();
            });
            pcgiang.giaoVienList = {};
        }
        angular.forEach(pcgiang.kqList, function (data, index) {
            pcgiang.tableSelection[index] = false;
            pcgiang.isAll = false;
        });
    }
    //---------LỌC THEO GIÁO VIÊN------
    pcgiang.filterGiaoVien = function () {
        if (pcgiang.giaoVienSelected) {
            $http.get(urlfilterGiaoVien(0, pcgiang.itemsPerPage, pcgiang.giaoVienSelected.id)).then(response => {
                pcgiang.kqList = response.data;
                pcgiang.totalItems = +response.headers()["x-total-count"];
                pcgiang.totalPages = Math.ceil(pcgiang.totalItems / pcgiang.itemsPerPage);
                pcgiang.currentSelected = 1;
                $scope.cuoicung();
            });
        }
        else {
            pcgiang.filterToBoMon();
        }
        angular.forEach(pcgiang.kqList, function (data, index) {
            pcgiang.tableSelection[index] = false;
            pcgiang.isAll = false;
        });
    }
    // --------------------------- XÓA --------------------------------
    var dem = 0;
    // checkAll = chọn tất cả tableSelection
    pcgiang.tableSelection = {};
    pcgiang.isAll = false;
    pcgiang.selectAllRows = function () {
        if (pcgiang.isAll) {
            angular.forEach(pcgiang.kqList, function (data, index) {
                pcgiang.tableSelection[index] = true;
            });
            dem = pcgiang.indexMax;
        } else {
            dem = 0;
            angular.forEach(pcgiang.kqList, function (data, index) {
                pcgiang.tableSelection[index] = false;
            });
        }
    };
    // chọn tất cả tableSelection = checkAll
    pcgiang.demChecked = function ($index) {
        if (pcgiang.tableSelection[$index]) dem++;
        else dem--;
        if (dem == pcgiang.indexMax) pcgiang.isAll = true;
        else pcgiang.isAll = false;
    }
    // Xóa tất cả các records đã chọn (1 hoặc nhiều)
    pcgiang.removeSelectedRows = function () {
        $scope.Delete = function () {
            var total = pcgiang.kqList.length - 1;
            for (var i = total; i >= 0; i--) {
                var id = pcgiang.kqList[i].id;
                if (pcgiang.tableSelection[i]) {
                    // Xóa từng checked record
                    pcgiang.kqList.splice(i, 1);
                    delete pcgiang.tableSelection[i];
                    $http.delete("https://saigonmaster.herokuapp.com/phanCongGiangDay/" + id);
                }
            };
            $rootScope.alertThanhCong = true;
            $timeout(function () {
                $rootScope.alertThanhCong = false;
            }, 3000);
        }
    };

    // Ẩn nút xóa khi chưa chọn
    pcgiang.countChecked = function () {
        var count = 0;
        var total = pcgiang.kqList.length;
        for (var i = 0; i < total; i++) {
            if (pcgiang.tableSelection[i]) {
                count++;
            }
        }
        return count;
    };
    // --------------SỬA TRỰC TIẾP------------------
    viewMax = pcgiang.itemsPerPage;
    pcgiang.isView = newArray(viewMax, true);
    pcgiang.isEdit = newArray(viewMax, false);
    pcgiang.catchID = function (index, kq) {
        pcgiang.isView[index] = false;
        pcgiang.isEdit[index] = true;
        $http.get("https://saigonmaster.herokuapp.com/lopHoc").then(function (response) {
            pcgiang.lopHocs = response.data;
        });
    };
    pcgiang.Save = function (index, kq) {
        $http.put('https://saigonmaster.herokuapp.com/phanCongGiangDay/' + kq.id, kq).then(function () {
            pcgiang.isView[index] = true;
            pcgiang.isEdit[index] = false;
        });
        $rootScope.alertThanhCong = true;
        $timeout(function () {
            $rootScope.alertThanhCong = false;
        }, 3000);
    };
    pcgiang.cancel = function (index) {
        pcgiang.isView[index] = true;
        pcgiang.isEdit[index] = false;
    };
    // Danh sách Tổ Bộ Môn
    $http.get('https://slt-puppet.herokuapp.com/toBoMons').then(function (response) {
        pcgiang.toBoMonList = response.data;
    });
    $scope.getIdBoMon = function (toBoMon) {
        $scope.danhSachGiaoVien = [];
        $scope.monHocs = [];
        pcgiang.khoiLopList = [];
        pcgiang.lopHocs = [];
        pcgiang.lopHocDamNhiem = [];
        if (toBoMon) {
            var boMonId = toBoMon.id;
            $http.get('https://slt-puppet.herokuapp.com/giaoViens?toBoMon.id=' + boMonId).then(function (response) {
                $scope.danhSachGiaoVien = response.data;
            });
        }
    };
    $scope.getIdGiaoVien = function (giaoVienSelected) {
        $scope.monHocs = [];
        pcgiang.khoiLopList = [];
        pcgiang.lopHocs = [];
        pcgiang.lopHocDamNhiem = [];
        if (giaoVienSelected) {
            var boMonId = giaoVienSelected.toBoMon.id;
            $http.get('https://slt-puppet.herokuapp.com/toBoMons/' + boMonId + '/monHoc').then(function (response) {
                $scope.monHocs = response.data;
            });
        }
    };
    $scope.getIdkhoiLop = function (khoiLopSelected) {
        if (khoiLopSelected) {
            khoiLopId = khoiLopSelected.id;
            $http.get("https://saigonmaster.herokuapp.com/khoiLop/" + khoiLopId + "/lopHoc").then(function (response) {
                pcgiang.lopHocs = response.data;
            });
        }
        else {
            $http.get("https://saigonmaster.herokuapp.com/lopHoc").then(function (response) {
                pcgiang.lopHocs = response.data;
            });
        }
    }
    $scope.getIdMonHoc = function (monHocSelected, giaoVienSelected) {
        pcgiang.lopHocDamNhiem = [];
        if (monHocSelected) {
            $http.get("https://saigonmaster.herokuapp.com/khoiLop").then(function (response) {
                pcgiang.khoiLopList = response.data;
            });
            $http.get("https://saigonmaster.herokuapp.com/lopHoc").then(function (response) {
                pcgiang.lopHocs = response.data;
            });
            $http.get('https://saigonmaster.herokuapp.com/phanCongGiangDay?giaoVien.id=' + giaoVienSelected.id + '&&monHocSelected.id=' + monHocSelected.id).then(function onSuccess(response) {
                pcgiang.lopHocDamNhiem = response.data[0].lopHocDamNhiem;
                $scope.phanCong = response.data[0];
                //Cập nhật dữ liệu
                $scope.phanCongGiang = function () {
                    $scope.phanCong.toBoMon = $scope.boMonSelected;
                    giaoVien = {};
                    giaoVien.id = $scope.giaoVienSelected.id;
                    giaoVien.tenCanBo = $scope.giaoVienSelected.tenCanBo;
                    $scope.phanCong.giaoVien = giaoVien;
                    $scope.phanCong.monHocSelected = $scope.monHocSelected;
                    $scope.phanCong.lopHocDamNhiem = pcgiang.lopHocDamNhiem;
                    $http.put('https://saigonmaster.herokuapp.com/phanCongGiangDay/' + $scope.phanCong.id, $scope.phanCong).then(function () {
                        $rootScope.alertThanhCong = true;
                        $timeout(function () {
                            $rootScope.alertThanhCong = false;
                        }, 3000);
                    })
                }
            }).catch(function onError(response) {
                $scope.phanCong = {};
                //Thêm mới dữ liệu
                $scope.phanCongGiang = function () {
                    $scope.phanCong.toBoMon = $scope.boMonSelected;
                    giaoVien = {};
                    giaoVien.id = $scope.giaoVienSelected.id;
                    giaoVien.tenCanBo = $scope.giaoVienSelected.tenCanBo;
                    $scope.phanCong.giaoVien = giaoVien;
                    $scope.phanCong.monHocSelected = $scope.monHocSelected;
                    $scope.phanCong.lopHocDamNhiem = pcgiang.lopHocDamNhiem;
                    $http.post('https://saigonmaster.herokuapp.com/phanCongGiangDay', $scope.phanCong).then(function () {
                        $rootScope.alertThanhCong = true;
                        $timeout(function () {
                            $rootScope.alertThanhCong = false;
                        }, 3000);
                    })
                }
            })
        }
    };
});
