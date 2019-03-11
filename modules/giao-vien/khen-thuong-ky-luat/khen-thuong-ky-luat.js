(function () {
    SchoolityApp.controller('KhenThuongKyLuatCtrl', function ($scope, $rootScope, $http, $timeout) {
        // BredcrumPath
        $rootScope.BredcrumPath1 = "Giáo viên";
        $rootScope.BredcrumPath2 = "Khen thưởng - Kỷ luật";
        $rootScope.showPath1 = $rootScope.showPath2 = true;
        let ktkl = this;
        // ---------------------------- PHÂN TRANG ----------------------------------
        let urlDanhSachKTKL = (start, limit, idToBoMon) => `https://saigonmaster.herokuapp.com/khenthuongkyluat?_start=${start}&_limit=${limit}&toBoMon.id=${idToBoMon}&khenThuongKyLuat.id=${ktkl.idTab}`;
        let allUrlDanhSachKTKL = (start, limit) => `https://saigonmaster.herokuapp.com/khenthuongkyluat?khenThuongKyLuat.id=${ktkl.idTab}&_start=${start}&_limit=${limit}`;
        const maxButtons = 5;
        ktkl.danhSachKTKL = [];
        ktkl.currentSelected = 1;
        ktkl.totalItems = 0;
        ktkl.itemsPerPage = 10;
        ktkl.totalPages = 1;
        ktkl.itemsPerPageOptions = [...Array(3).keys()].map(number => (number + 1) * 5);
        ktkl.pagesRange = ktkl.totalPages > maxButtons ? [...Array(maxButtons).keys()].map(number => number + 1) : [...Array(ktkl.totalPages).keys()].map(number => number + 1);
        //Tinh chi so index max cua 1 trang
        $scope.lastItem = function () {
            ktkl.indexLastPage = ktkl.totalItems - (ktkl.totalPages - 1) * ktkl.itemsPerPage;
            ktkl.indexMax = ktkl.currentSelected == ktkl.totalPages ? ktkl.indexLastPage : ktkl.itemsPerPage;
            ktkl.lastItem = (ktkl.currentSelected - 1) * ktkl.itemsPerPage + ktkl.indexMax;
        };
        // Header Khen Thưởng Kỷ Luật
        ktkl.headerKhenThuong = ["Mã GV", "Họ tên", "Tổ Bộ Môn", "Hình Thức", "Thành Tích", "Quyết Định", "Ngày QĐ", "Ghi Chú", ""];
        ktkl.headerKyLuat = ["Mã GV", "Họ tên", "Tổ Bộ Môn", "Hình Thức", "Lý Do", "Quyết Định KL", "Ngày KL", "Ghi Chú", ""];
        // Mặc định Tab Khen Thưởng
        ktkl.themKhenThuongKyLuat = "themKhenThuong";
        ktkl.idTab = 1;
        // Chuyển Tab
        ktkl.changeTab = function (id) {
            switch (id) {
                case 1:
                    ktkl.tab = 1;
                    ktkl.idTab = 1;
                    ktkl.themKhenThuongKyLuat = "themKhenThuong";
                    break;
                case 2:
                    ktkl.tab = 2;
                    ktkl.idTab = 2;
                    ktkl.themKhenThuongKyLuat = "themKyLuat";
                    break;
            }
            $rootScope.$broadcast("idTab", ktkl.idTab); // truyền sang advanced-search.js
            if (ktkl.toBoMon) {
                $http.get(urlDanhSachKTKL(0, ktkl.itemsPerPage, ktkl.toBoMon.id)).then(function (response) {
                    ktkl.danhSachKTKL = response.data;
                    ktkl.totalItems = response.headers()["x-total-count"];
                    ktkl.totalPages = Math.ceil(ktkl.totalItems / ktkl.itemsPerPage);
                    ktkl.currentSelected = 1;
                });
                $http.get('https://slt-puppet.herokuapp.com/giaoViens?toBoMon.id=' + ktkl.toBoMon.id).then(function (response) {
                    ktkl.danhSachGiaoVien = response.data;
                });
            } else {
                $http.get(allUrlDanhSachKTKL(0, ktkl.itemsPerPage)).then(function (response) {
                    ktkl.danhSachKTKL = response.data;
                    ktkl.totalItems = response.headers()["x-total-count"];
                    ktkl.totalPages = Math.ceil(ktkl.totalItems / ktkl.itemsPerPage);
                    ktkl.currentSelected = 1;
                });
            }
            $scope.lastItem();
            $scope.pageNumber();
        }
        // Load dữ liệu khi chuyển trang
        $scope.$watchGroup(['ktkl.itemsPerPage', 'ktkl.currentSelected'], function (newValues, oldValues) {
            let page = newValues[1];
            let noItems = newValues[0];
            if (newValues[0] != oldValues[0]) {
                ktkl.currentSelected = 1;
                oldValues[0] = newValues[0];
            }
            // Load lại dữ liệu cho trang tương ứng
            if (ktkl.toBoMon) {
                $http.get(urlDanhSachKTKL((page - 1) * noItems, noItems, ktkl.toBoMon.id)).then(response => {
                    ktkl.danhSachKTKL = response.data;
                    ktkl.totalItems = response.headers()["x-total-count"];
                    ktkl.totalPages = Math.ceil(ktkl.totalItems / ktkl.itemsPerPage);
                    $scope.lastItem();
                });
                $scope.pageNumber();
            }
            else {
                $http.get(allUrlDanhSachKTKL((page - 1) * noItems, noItems)).then(response => {
                    ktkl.danhSachKTKL = response.data;
                    ktkl.totalItems = response.headers()["x-total-count"];
                    ktkl.totalPages = Math.ceil(ktkl.totalItems / ktkl.itemsPerPage);
                    $scope.lastItem();
                });
                $scope.pageNumber();
            }
            //Bỏ tich checkbox khi chuyển trang
            angular.forEach(ktkl.danhSachKTKL, function (data, index) {
                ktkl.tableSelection[index] = false;
                ktkl.isAll = false;
                count = 0;
            });
        });
        // Tạo số trang
        $scope.pageNumber = function () {
            $scope.$watch('ktkl.totalPages', function (newValue, oldValue) {
                let n = ktkl.currentSelected;
                let totalPages = ktkl.totalPages;
                if (n < maxButtons) {
                    ktkl.pagesRange = totalPages < maxButtons ?
                        [...Array(totalPages).keys()].map(number => number + 1) :
                        [...Array(maxButtons).keys()].map(number => number + 1);
                }
                else if (n > totalPages - maxButtons) {
                    ktkl.pagesRange = [...Array(maxButtons).keys()].map(number => number + totalPages - maxButtons + 1);
                }
                else {
                    ktkl.pagesRange = [...Array(maxButtons).keys()].map(number => number + n);
                };
            });
        };
        // Chuyển trang
        ktkl.next = function () {
            ktkl.currentSelected < ktkl.totalPages && ktkl.currentSelected++;
        }
        ktkl.prev = function () {
            ktkl.currentSelected > 1 && ktkl.currentSelected--;
        }
        ktkl.first = function () {
            ktkl.currentSelected = 1;
        }
        ktkl.last = function () {
            ktkl.currentSelected = ktkl.totalPages;
        }
        // ----------------- LỌC DANH SÁCH KHEN THƯỞNG KỶ LUẬT --------------------
        $http.get('https://slt-puppet.herokuapp.com/toBoMons').then(function (response) {
            ktkl.toBoMonSelect = response.data;
        });
        // Lọc theo Tổ bộ môn
        ktkl.getIdToBoMon = function () {
            ktkl.danhSachGiaoVien = {};
            if (ktkl.toBoMon) {
                $http.get(urlDanhSachKTKL(0, ktkl.itemsPerPage, ktkl.toBoMon.id)).then(function (response) {
                    ktkl.danhSachKTKL = response.data;
                    ktkl.totalItems = response.headers()["x-total-count"];
                });
                $http.get('https://slt-puppet.herokuapp.com/giaoViens?toBoMon.id=' + ktkl.toBoMon.id).then(function (response) {
                    ktkl.danhSachGiaoVien = response.data;
                });
            }
            else {
                $http.get(allUrlDanhSachKTKL(0, ktkl.itemsPerPage)).then(function (response) {
                    ktkl.danhSachKTKL = response.data;
                    ktkl.totalItems = response.headers()["x-total-count"];
                });
            };
            ktkl.totalPages = Math.ceil(ktkl.totalItems / ktkl.itemsPerPage);
            ktkl.currentSelected = 1;
        };
        // Lọc theo giáo viên
        ktkl.getIdGV = function () {
            if (ktkl.giaoVien) {
                $http.get('https://saigonmaster.herokuapp.com/khenthuongkyluat?giaoVien.id=' + ktkl.giaoVien.id + '&khenThuongKyLuat.id=' + ktkl.idTab).then(function (response) {
                    ktkl.danhSachKTKL = response.data;
                });
            }
            else if (ktkl.toBoMon) {
                $http.get(urlDanhSachKTKL(0, ktkl.itemsPerPage, ktkl.toBoMon.id)).then(function (response) {
                    ktkl.danhSachKTKL = response.data;
                    ktkl.totalItems = response.headers()["x-total-count"];
                });
            }
            else {
                $http.get(allUrlDanhSachKTKL(0, ktkl.itemsPerPage)).then(function (response) {
                    ktkl.danhSachKTKL = response.data;
                    ktkl.totalItems = response.headers()["x-total-count"];
                });
            };
            ktkl.totalPages = Math.ceil(ktkl.totalItems / ktkl.itemsPerPage);
            ktkl.currentSelected = 1;
        };
        // Search
        $http.get("https://saigonmaster.herokuapp.com/khenthuongkyluat?khenThuongKyLuat.id=1").then(function (response) {
            $rootScope.danhSachKTKL = response.data;
        });
        // Khi chuyển tab, danh sách KTKL thay đổi
        $rootScope.$on("idTab", function (evt, data) {
            $http.get("https://saigonmaster.herokuapp.com/khenthuongkyluat?khenThuongKyLuat.id=" + data).then(function (response) {
                $rootScope.danhSachKTKL = response.data;
            });
        });
        $scope.getKeyword = function (keyword) {
            var newKeyword = keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            $rootScope.result = [];
            angular.forEach($rootScope.danhSachKTKL, function (data) {
                // Lọc theo tên, tổ bộ môn, số điện thoại. 
                if (
                    data.giaoVien.tenCanBo.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(newKeyword.toLowerCase()) > -1 ||
                    data.toBoMon.tenToBoMon.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(newKeyword.toLowerCase()) > -1) {
                    $rootScope.result.push(data);
                }
            });
            $rootScope.$broadcast("searchKTKL", $rootScope.result);
        };
        $rootScope.$on("searchKTKL", function (evt, data, response) {
            ktkl.danhSachKTKL = data;
            ktkl.totalItems = data.length;
            ktkl.totalPages = 1;
            ktkl.currentSelected = 1;
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
            angular.forEach($rootScope.danhSachKTKL, function (data) {
                // Lọc theo tên GV chủ nhiệm, GV làm thay
                if (
                    data.giaoVien.tenCanBo.toLowerCase().indexOf(tenGiaoVien.toLowerCase()) > -1 &&
                    data.toBoMon.tenToBoMon.toLowerCase().indexOf(toBoMon.toLowerCase()) > -1) {
                    $rootScope.resultAdvanced.push(data);
                }
            });
            $rootScope.$broadcast("searchKTKL", $rootScope.resultAdvanced);
            $rootScope.searchClass = "fade-out";
        }
        // --------------------------- THÊM --------------------------------
        ktkl.themKTKL = { id: "", giaoVien: { id: "", tenCanBo: "" }, khenThuongKyLuat: { id: "" } };
        ktkl.getIdToBoMonThem = function () {
            if (ktkl.themKTKL.toBoMon) {
                $http.get('https://slt-puppet.herokuapp.com/giaoViens?toBoMon.id=' + ktkl.themKTKL.toBoMon.id).then(function (response) {
                    ktkl.danhSachGiaoVien = response.data;
                });
                ktkl.getIdGVThem = function () {
                    ktkl.SaveKT = function () {
                        if (ktkl.giaoVienKT) {
                            ktkl.themKTKL.khenThuongKyLuat.id = 1;
                            ktkl.themKTKL.giaoVien.id = ktkl.giaoVienKT.id;
                            ktkl.themKTKL.giaoVien.tenCanBo = ktkl.giaoVienKT.tenCanBo;
                            $http.post('https://saigonmaster.herokuapp.com/khenthuongkyluat', ktkl.themKTKL).then(function () {
                                event.preventDefault();
                                $rootScope.alertThanhCong = true;
                                $timeout(function () {
                                    $rootScope.alertThanhCong = false;
                                }, 3000);
                            });
                        }
                    };
                    ktkl.SaveKL = function () {
                        if (ktkl.giaoVienKL) {
                            ktkl.themKTKL.khenThuongKyLuat.id = 2;
                            ktkl.themKTKL.giaoVien.id = ktkl.giaoVienKL.id;
                            ktkl.themKTKL.giaoVien.tenCanBo = ktkl.giaoVienKL.tenCanBo;
                            $http.post('https://saigonmaster.herokuapp.com/khenthuongkyluat', ktkl.themKTKL).then(function () {
                                event.preventDefault();
                                $rootScope.alertThanhCong = true;
                                $timeout(function () {
                                    $rootScope.alertThanhCong = false;
                                }, 3000);
                            });
                        }
                    }
                }
            }
        }
        // --------------------------- XÓA --------------------------------
        var dem = 0;
        // Chọn tất cả để xóa
        ktkl.tableSelection = {};
        ktkl.isAll = false;
        ktkl.selectAllRows = function () {
            if (ktkl.isAll) {
                // Checked tất cả các records
                angular.forEach(ktkl.danhSachKTKL, function (data, index) {
                    ktkl.tableSelection[index] = true;
                });
                dem = ktkl.indexMax;
            } else {
                // Unchecked tất cả các records
                angular.forEach(ktkl.danhSachKTKL, function (data, index) {
                    ktkl.tableSelection[index] = false;
                });
                dem = 0;
            }
        };
        // Bỏ check all
        ktkl.demChecked = function ($index) {
            if (ktkl.tableSelection[$index]) dem++;
            else dem--;
            if (dem == ktkl.indexMax) ktkl.isAll = true;
            else ktkl.isAll = false;
        }
        // Xóa tất cả các records đã chọn (1 hoặc nhiều)
        ktkl.removeSelectedRows = function () {
            $scope.Delete = function () {
                var total = ktkl.danhSachKTKL.length - 1;
                for (var i = total; i >= 0; i--) {
                    var id = ktkl.danhSachKTKL[i].id;
                    if (ktkl.tableSelection[i]) {
                        // Xóa từng checked record
                        ktkl.danhSachKTKL.splice(i, 1);
                        delete ktkl.tableSelection[i];
                        $http.delete("https://saigonmaster.herokuapp.com/khenthuongkyluat/" + id);
                    }
                };
                $rootScope.alertThanhCong = true;
                $timeout(function () {
                    $rootScope.alertThanhCong = false;
                }, 3000);
            }
        };
        // Ẩn nút xóa khi chưa chọn
        ktkl.countChecked = function () {
            var count = 0;
            var total = ktkl.danhSachKTKL.length - 1;
            for (var i = 0; i <= total; i++) {
                if (ktkl.tableSelection[i]) {
                    count++;
                }
            }
            return count;
        };
        // ----------------------------- SỬA -------------------------------------
        ktkl.catchID = function (data) {
            $rootScope.suaKTKL = data;
            $http.get('https://slt-puppet.herokuapp.com/giaoViens?toBoMon.id=' + data.toBoMon.id).then(function (response) {
                $rootScope.danhSachGiaoVien = response.data;
            });
            $rootScope.EditKTKL = function () {
                $http.put("https://saigonmaster.herokuapp.com/khenthuongkyluat/" + data.id, $rootScope.suaKTKL).then(function () {
                    event.preventDefault();
                    $rootScope.alertThanhCong = true;
                    $timeout(function () {
                        $rootScope.alertThanhCong = false;
                    }, 3000);
                });
            }
        }
    });
})();