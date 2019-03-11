(function () {
    SchoolityApp.controller('KiemNhiemCtrl', function ($scope, $rootScope, $http, $timeout) {
        // BredcrumPath
        $rootScope.BredcrumPath1 = "Giáo viên";
        $rootScope.BredcrumPath2 = "Phân công kiêm nhiệm";
        $rootScope.showPath1 = $rootScope.showPath2 = true;
        let kn = this;
        // --------------------- PHÂN TRANG ----------------------------
        let allUrlDanSachCB = (start, limit) => `https://slt-puppet.herokuapp.com/giaoViens?nhiemVuKiemNhiem.id=1&nhiemVuKiemNhiem.id=2&nhiemVuKiemNhiem.id=3&_start=${start}&_limit=${limit}`;
        let urlDanSachCBToBoMon = (start, limit, toBoMonId) => `https://slt-puppet.herokuapp.com/giaoViens?nhiemVuKiemNhiem.id=1&nhiemVuKiemNhiem.id=2&nhiemVuKiemNhiem.id=3&toBoMon.id=${toBoMonId}&_start=${start}&_limit=${limit}`;
        const maxButtons = 5;
        kn.danhSachKiemNhiem = [];
        kn.currentSelected = 1;
        kn.totalItems = 0;
        kn.itemsPerPage = 10;
        kn.totalPages = 1;
        kn.itemsPerPageOptions = [...Array(3).keys()].map(number => (number + 1) * 10);
        kn.pagesRange = kn.totalPages > maxButtons ? [...Array(maxButtons).keys()].map(number => number + 1) : [...Array(kn.totalPages).keys()].map(number => number + 1);
        //Tinh chi so index max cua 1 trang
        $scope.lastItem = function () {
            kn.indexLastPage = kn.totalItems - (kn.totalPages - 1) * kn.itemsPerPage;
            kn.indexMax = kn.currentSelected == kn.totalPages ? kn.indexLastPage : kn.itemsPerPage;
            kn.lastItem = (kn.currentSelected - 1) * kn.itemsPerPage + kn.indexMax;
        }
        // Header KiemNhiem
        kn.headerKiemNhiem = ["Mã GV", "Họ Tên", "Tổ Bộ Môn", "Kiêm Nhiệm", ""];
        // Load dữ liệu khi chuyển trang
        $scope.$watchGroup(['kn.itemsPerPage', 'kn.currentSelected'], function (newValues, oldValues) {
            let page = newValues[1];
            let noItems = newValues[0];
            if (newValues[0] != oldValues[0]) {
                kn.currentSelected = 1;
                oldValues[0] = newValues[0];
            }
            kn.isView = newArray(kn.itemsPerPage, true);
            kn.isEdit = newArray(kn.itemsPerPage, false);
            // Load dữ liệu với trang tương ứng
            $http.get(allUrlDanSachCB((page - 1) * noItems, noItems)).then(response => {
                kn.danhSachKiemNhiem = response.data;
                kn.totalItems = +response.headers()["x-total-count"];
                kn.totalPages = Math.ceil(kn.totalItems / kn.itemsPerPage);
                $scope.lastItem();
            });
            $scope.pageNumber();
            // Nhiệm vụ kiêm nhiệm
            $http.get('https://slt-puppet.herokuapp.com/nhiemVuKiemNhiems').then(function (response) {
                kn.nhiemVuKiemNhiemSelect = response.data;
                $rootScope.nhiemVuKiemNhiemSelect = response.data;
            });
            // Tổ Bộ Môn
            $http.get('https://slt-puppet.herokuapp.com/toBoMons').then(function (response) {
                kn.toBoMonSelect = response.data;
                $rootScope.toBoMonSelect = response.data;
            });
            //Bỏ tich checkbox khi chuyển trang
            angular.forEach(kn.danhSachKiemNhiem, function (data, index) {
                kn.tableSelection[index] = false;
                kn.isAll = false;
                count = 0;
            });
        });
        // Tạo số trang
        $scope.pageNumber = function () {
            $scope.$watch('kn.totalPages', function (newValue, oldValue) {
                let n = kn.currentSelected;
                let totalPages = kn.totalPages;
                if (n < maxButtons) {
                    kn.pagesRange = totalPages < maxButtons ?
                        [...Array(totalPages).keys()].map(number => number + 1) :
                        [...Array(maxButtons).keys()].map(number => number + 1);
                }
                else if (n > totalPages - maxButtons) {
                    kn.pagesRange = [...Array(maxButtons).keys()].map(number => number + totalPages - maxButtons + 1);
                }
                else {
                    kn.pagesRange = [...Array(maxButtons).keys()].map(number => number + n);
                };
            });
        };
        // Chuyển trang
        kn.next = function () {
            kn.currentSelected < kn.totalPages && kn.currentSelected++;
        }
        kn.prev = function () {
            kn.currentSelected > 1 && kn.currentSelected--;
        }
        kn.first = function () {
            kn.currentSelected = 1;
        }
        kn.last = function () {
            kn.currentSelected = kn.totalPages;
        }
        // ------------------------ LỌC THEO TỔ BỘ MÔN --------------------------
        kn.getIdToBoMon = function () {
            if (kn.toBoMon) {
                $http.get(urlDanSachCBToBoMon(0, kn.itemsPerPage, kn.toBoMon.id)).then(response => {
                    kn.danhSachKiemNhiem = response.data;
                    kn.totalItems = response.headers()["x-total-count"];
                    kn.totalPages = Math.ceil(kn.totalItems / kn.itemsPerPage);
                });
            }
            else {
                $http.get(allUrlDanSachCB(0, kn.itemsPerPage)).then(response => {
                    kn.danhSachKiemNhiem = response.data;
                    kn.totalItems = response.headers()["x-total-count"];
                    kn.totalPages = Math.ceil(kn.totalItems / kn.itemsPerPage);
                });
            };
            kn.currentSelected = 1;
            $scope.pageNumber();
        }
        // Search
        $http.get("https://slt-puppet.herokuapp.com/giaoViens?nhiemVuKiemNhiem.id=1&nhiemVuKiemNhiem.id=2&nhiemVuKiemNhiem.id=3").then(function (response) {
            $rootScope.danhSachKN = response.data;
        });
        $scope.getKeyword = function (keyword) {
            var newKeyword = keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            $rootScope.result = [];
            angular.forEach($rootScope.danhSachKN, function (data) {
                // Lọc theo tên, tổ bộ môn, số điện thoại. 
                if (
                    data.tenCanBo.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(newKeyword.toLowerCase()) > -1 ||
                    data.toBoMon.tenToBoMon.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(newKeyword.toLowerCase()) > -1) {
                    $rootScope.result.push(data);
                }
            });
            $rootScope.$broadcast("searchKiemNhiem", $rootScope.result);
        };
        $rootScope.$on("searchKiemNhiem", function (evt, data) {
            kn.danhSachKiemNhiem = data;
            kn.totalItems = data.length;
            kn.totalPages = 1;
            kn.currentSelected = 1;
            $scope.lastItem();
            $scope.pageNumber();
        });
        // Advanced search
        $scope.advancedSearch = function (key1, key2) {
            if (key1) {
                var tenGiaoVien = key1;
            } else tenGiaoVien = "";
            if (key2) {
                var toBoMon = key2;
            } else toBoMon = "";
            $rootScope.resultAdvanced = [];
            angular.forEach($rootScope.danhSachKN, function (data) {
                // Lọc theo tên, tổ bộ môn. 
                if (
                    data.tenCanBo.toLowerCase().indexOf(tenGiaoVien.toLowerCase()) > -1 &&
                    data.toBoMon.tenToBoMon.toLowerCase().indexOf(toBoMon.toLowerCase()) > -1) {
                    $rootScope.resultAdvanced.push(data);
                }
            });
            $rootScope.$broadcast("searchKiemNhiem", $rootScope.resultAdvanced);
            $rootScope.searchClass = "fade-out";
        }
        // ------------------------ THÊM ----------------------------------------
        kn.themKN = function () {
            $http.get('https://slt-puppet.herokuapp.com/giaoViens').then(function (response) {
                $rootScope.danhSachGiaoVien = response.data;
            });
            $rootScope.getIdKiemNhiem = function (idKiemNhiem) {
                $rootScope.view = true;
                $rootScope.checkKiemNhiem = [];
                angular.forEach($rootScope.danhSachGiaoVien, function (data, index) {
                    if (data.nhiemVuKiemNhiem && data.nhiemVuKiemNhiem.id == idKiemNhiem) {
                        $rootScope.checkKiemNhiem[index] = true;
                    } else {
                        $rootScope.checkKiemNhiem[index] = false;
                    }
                });
            };
            $rootScope.filtertoBoMonThem = function (data) {
                return data.toBoMon.id === 1;
            };
            $rootScope.getIdToBoMonThem = function (toBoMonId) {
                $rootScope.filtertoBoMonThem = function (data) {
                    return data.toBoMon.id === toBoMonId;
                };
            };
            // Lưu
            $rootScope.clickKiemNhiem = function (data, kiemNhiem) {
                if (!$rootScope.checkKiemNhiem) {
                    $rootScope.view = "disabled";
                }
                else if ($rootScope.checkKiemNhiem && $rootScope.checkKiemNhiem[data.id - 1] == true) {
                    data.nhiemVuKiemNhiem = kiemNhiem;
                    $http.put('https://slt-puppet.herokuapp.com/giaoViens/' + data.id, data);
                }
                else if ($rootScope.checkKiemNhiem && $rootScope.checkKiemNhiem[data.id - 1] == false) {
                    data.nhiemVuKiemNhiem = {};
                    $http.put('https://slt-puppet.herokuapp.com/giaoViens/' + data.id, data);
                };
            };
            $rootScope.Close = function () {
                event.preventDefault();
                $rootScope.alertThanhCong = true;
                $timeout(function () {
                    $rootScope.alertThanhCong = false;
                }, 3000);
            };
        }
        // -------------------------- SỬA ---------------------------------
        kn.isView = newArray(kn.itemsPerPage, true);
        kn.isEdit = newArray(kn.itemsPerPage, false);
        kn.catchID = function (index) {
            kn.isView[index] = false;
            kn.isEdit[index] = true;
            kn.Save = function (giaoVien) {
                $http.put('https://slt-puppet.herokuapp.com/giaoViens/' + giaoVien.id, giaoVien).then(function () {
                    kn.isView[index] = true;
                    kn.isEdit[index] = false;
                });
                $rootScope.alertThanhCong = true;
                $timeout(function () {
                    $rootScope.alertThanhCong = false;
                }, 3000);
            };
            kn.Close = function (index) {
                kn.isView[index] = true;
                kn.isEdit[index] = false;
            }
        };
        // --------------------------- XÓA --------------------------------
        var dem = 0;
        // Chọn tất cả để xóa
        kn.tableSelection = {};
        kn.isAll = false;
        kn.selectAllRows = function () {
            if (kn.isAll) {
                // Checked tất cả các records
                angular.forEach(kn.danhSachKiemNhiem, function (data, index) {
                    kn.tableSelection[index] = true;
                });
                dem = kn.indexMax;
            } else {
                // Unchecked tất cả các records
                angular.forEach(kn.danhSachKiemNhiem, function (data, index) {
                    kn.tableSelection[index] = false;
                });
                dem = 0;
            }
        };
        // Bỏ check all
        kn.demChecked = function ($index) {
            if (kn.tableSelection[$index]) dem++;
            else dem--;
            if (dem == kn.indexMax) kn.isAll = true;
            else kn.isAll = false;
        }
        // Xóa tất cả các records đã chọn (1 hoặc nhiều)
        kn.removeSelectedRows = function () {
            $scope.Delete = function () {
                var total = kn.danhSachKiemNhiem.length - 1;
                for (var i = total; i >= 0; i--) {
                    if (kn.tableSelection[i]) {
                        // Xóa từng checked record
                        kn.danhSachKiemNhiem[i].nhiemVuKiemNhiem = null;
                        $http.put('https://slt-puppet.herokuapp.com/giaoViens/' + kn.danhSachKiemNhiem[i].id, kn.danhSachKiemNhiem[i]);
                        kn.danhSachKiemNhiem.splice(i, 1);
                        delete kn.tableSelection[i];
                    }
                };
                // $("#alert-thanhcong").show().delay(3000).fadeOut();
                $rootScope.alertThanhCong = true;
                $timeout(function () {
                    $rootScope.alertThanhCong = false;
                }, 3000);
            }
        }
        // Ẩn nút xóa khi chưa chọn
        kn.countChecked = function () {
            var count = 0;
            var total = kn.danhSachKiemNhiem.length - 1;
            for (var i = 0; i <= total; i++) {
                if (kn.tableSelection[i]) {
                    count++;
                }
            }
            return count;
        };
    });
})();