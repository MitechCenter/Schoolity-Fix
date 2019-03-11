(function () {
    SchoolityApp.controller('LamThayChuNhiemCtrl', function ($scope, $rootScope, $http, $timeout) {
        // BredcrumPath
        $rootScope.BredcrumPath1 = "Giáo viên";
        $rootScope.BredcrumPath2 = "Làm thay chủ nhiệm";
        $rootScope.showPath1 = $rootScope.showPath2 = true;
        let lt = this;
        // --------------------- PHÂN TRANG ----------------------------
        let urlDanSachCB = (start, limit) => `https://saigonmaster.herokuapp.com/lamThayChuNhiem?_start=${start}&_limit=${limit}`;
        const maxButtons = 5;
        lt.danhSachLamThay = [];
        lt.currentSelected = 1;
        lt.totalItems = 0;
        lt.itemsPerPage = 10;
        lt.totalPages = 1;
        lt.itemsPerPageOptions = [...Array(3).keys()].map(number => (number + 1) * 5);
        lt.pagesRange = lt.totalPages > maxButtons ? [...Array(maxButtons).keys()].map(number => number + 1) : [...Array(lt.totalPages).keys()].map(number => number + 1);
        //Tinh chi so index max cua 1 trang
        $scope.lastItem = function () {
            lt.indexLastPage = lt.totalItems - (lt.totalPages - 1) * lt.itemsPerPage;
            lt.indexMax = lt.currentSelected == lt.totalPages ? lt.indexLastPage : lt.itemsPerPage;
            lt.lastItem = (lt.currentSelected - 1) * lt.itemsPerPage + lt.indexMax;
        }
        // Header KiemNhiem
        lt.headerLamThay = ["Lớp", "GV Chủ Nhiệm", "GV Làm Thay", "Từ ngày", "Đến ngày", "Ghi chú", ""];
        // Load dữ liệu khi chuyển trang
        $scope.$watchGroup(['lt.itemsPerPage', 'lt.currentSelected'], function (newValues, oldValues) {
            let page = newValues[1];
            let noItems = newValues[0];
            if (newValues[0] != oldValues[0]) {
                lt.currentSelected = 1;
                oldValues[0] = newValues[0];
            }
            // Load dữ liệu với trang tương ứng
            $http.get(urlDanSachCB((page - 1) * noItems, noItems)).then(response => {
                lt.danhSachLamThay = response.data;
                lt.totalItems = +response.headers()["x-total-count"];
                lt.totalPages = Math.ceil(lt.totalItems / lt.itemsPerPage);
                $scope.lastItem();
            });
            $scope.pageNumber();
            //Bỏ tich checkbox khi chuyển trang
            angular.forEach(lt.danhSachLamThay, function (data, index) {
                lt.tableSelection[index] = false;
                lt.isAll = false;
                count = 0;
            });
        });
        // Tạo số trang
        $scope.pageNumber = function () {
            $scope.$watch('lt.totalPages', function (newValue, oldValue) {
                let n = lt.currentSelected;
                let totalPages = lt.totalPages;
                if (n < maxButtons) {
                    lt.pagesRange = totalPages < maxButtons ?
                        [...Array(totalPages).keys()].map(number => number + 1) :
                        [...Array(maxButtons).keys()].map(number => number + 1);
                }
                else if (n > totalPages - maxButtons) {
                    lt.pagesRange = [...Array(maxButtons).keys()].map(number => number + totalPages - maxButtons + 1);
                }
                else {
                    lt.pagesRange = [...Array(maxButtons).keys()].map(number => number + n);
                };
            });
        };
        // Chuyển trang
        lt.next = function () {
            lt.currentSelected < lt.totalPages && lt.currentSelected++;
        };
        lt.prev = function () {
            lt.currentSelected > 1 && lt.currentSelected--;
        };
        lt.first = function () {
            lt.currentSelected = 1;
        };
        lt.last = function () {
            lt.currentSelected = lt.totalPages;
        };
        // Search
        $http.get("https://saigonmaster.herokuapp.com/lamThayChuNhiem").then(function (response) {
            $rootScope.danhSachLT = response.data;
        });
        $scope.getKeyword = function (keyword) {
            var newKeyword = keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            $rootScope.result = [];
            angular.forEach($scope.danhSachLT, function (data) {
                // Lọc theo tên, tổ bộ môn, số điện thoại. 
                if (
                    data.giaoVien.tenCanBo.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(newKeyword.toLowerCase()) > -1 ||
                    data.giaoVienLamThay.tenCanBo.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(newKeyword.toLowerCase()) > -1) {
                    $rootScope.result.push(data);
                }
            });
            $rootScope.$broadcast("searchLamThay", $rootScope.result);
        };
        $rootScope.$on("searchLamThay", function (evt, data) {
            lt.danhSachLamThay = data;
            lt.totalItems = data.length;
            lt.totalPages = 1;
            lt.currentSelected = 1;
            $scope.lastItem();
            $scope.pageNumber();
        });
        $scope.advancedSearch = function (key1, key2) {
            if (key1) {
                var tenGVCN = key1;
            } else tenGVCN = "";
            if (key2) {
                var tenGVLT = key2;
            } else tenGVLT = "";
            $rootScope.resultAdvanced = [];
            angular.forEach($rootScope.danhSachLT, function (data) {
                // Lọc theo tên GV chủ nhiệm, GV làm thay
                if (
                    data.giaoVien.tenCanBo.toLowerCase().indexOf(tenGVCN.toLowerCase()) > -1 &&
                    data.giaoVienLamThay.tenCanBo.toLowerCase().indexOf(tenGVLT.toLowerCase()) > -1) {
                    $rootScope.resultAdvanced.push(data);
                }
            });
            $rootScope.$broadcast("searchLamThay", $rootScope.resultAdvanced);
            $rootScope.searchClass = "fade-out";
        }
        // --------------------------- THÊM -------------------------------
        // Danh Sách Khối
        $http.get('https://slt-puppet.herokuapp.com/khoiLops').then(function (response) {
            lt.danhSachKhoi = response.data;
        });
        // Danh Sách Lớp
        lt.getIdKhoi = function () {
            if (lt.khoiLop) {
                $http.get('https://slt-puppet.herokuapp.com/lopHocs?khoiLopId=' + lt.khoiLop.id).then(function (response) {
                    lt.danhSachLop = response.data;
                });
            }
        };
        // Danh sách Giáo viên chủ nhiệm
        $http.get('https://saigonmaster.herokuapp.com/phanCongGiaoVu').then(function (response) {
            lt.danhSachPCGV = response.data;
        });
        // Thêm mới
        lt.themLT = {
            id: null,
            giaoVien: {
                id: null,
                tenCanBo: ""
            },
            giaoVienLamThay: {
                id: null,
                tenCanBo: "",
                toBoMon: {}
            }
        }
        lt.getIdLop = function () {
            angular.forEach(lt.danhSachPCGV, function (data) {
                if (lt.themLT.lopHoc && data.GVChuNhiemLop[0] && data.GVChuNhiemLop[0].id == lt.themLT.lopHoc.id) {
                    lt.themLT.giaoVien.id = data.giaoVien.id;
                    lt.themLT.giaoVien.tenCanBo = data.giaoVien.tenCanBo;
                }
            });
        }
        // Danh Sách Tổ bộ môn
        $http.get('https://slt-puppet.herokuapp.com/toBoMons').then(function (response) {
            lt.toBoMonSelect = $rootScope.toBoMonSelect = response.data;
        });
        lt.getIdToBoMon = function () {
            $http.get('https://slt-puppet.herokuapp.com/giaoViens?toBoMon.id=' + lt.themLT.giaoVienLamThay.toBoMon.id).then(function (response) {
                lt.danhSachGiaoVienLT = response.data;
            });
        }
        lt.SaveLT = function () {
            lt.themLT.giaoVienLamThay.id = lt.giaoVienLT.id;
            lt.themLT.giaoVienLamThay.tenCanBo = lt.giaoVienLT.tenCanBo;
            $http.post('https://saigonmaster.herokuapp.com/lamThayChuNhiem', lt.themLT).then(function () {
                event.preventDefault();
                $rootScope.alertThanhCong = true;
                $timeout(function () {
                    $rootScope.alertThanhCong = false;
                }, 3000);
            });
        }
        // --------------------------- SỬA --------------------------------
        lt.catchID = function (giaoVien) {
            $rootScope.suaLT = giaoVien;
            $rootScope.khoiLop = lt.danhSachKhoi[giaoVien.lopHoc.khoiLopId - 1];
            $rootScope.giaoVienLT = giaoVien.giaoVienLamThay;
            $rootScope.suaLT.giaoVienLamThay.toBoMon = giaoVien.giaoVienLamThay.toBoMon;
            // Select
            $http.get('https://slt-puppet.herokuapp.com/lopHocs?khoiLopId=' + giaoVien.lopHoc.khoiLopId).then(function (response) {
                $rootScope.danhSachLop = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/giaoViens?toBoMon.id=' + $rootScope.suaLT.giaoVienLamThay.toBoMon.id).then(function (response) {
                $rootScope.danhSachGiaoVienLT = response.data;
            });
            lt.getIdToBoMon = function () {
                $http.get('https://slt-puppet.herokuapp.com/giaoViens?toBoMon.id=' + $rootScope.suaLT.giaoVienLamThay.toBoMon.id).then(function (response) {
                    $rootScope.danhSachGiaoVienLT = response.data;
                });
            }
            lt.getIdGVLT = function (id, tenCanBo) {
                $rootScope.suaLT.giaoVienLamThay.id = id;
                $rootScope.suaLT.giaoVienLamThay.tenCanBo = tenCanBo;
            }
            $rootScope.EditLT = function () {
                $http.put('https://saigonmaster.herokuapp.com/lamThayChuNhiem/' + giaoVien.id, $rootScope.suaLT).then(function (response) {
                    event.preventDefault();
                    $rootScope.alertThanhCong = true;
                    $timeout(function () {
                        $rootScope.alertThanhCong = false;
                    }, 3000);
                });
            }
        }
        // --------------------------- XÓA --------------------------------
        var dem = 0;
        // Chọn tất cả để xóa
        lt.tableSelection = {};
        lt.isAll = false;
        lt.selectAllRows = function () {
            if (lt.isAll) {
                // Checked tất cả các records
                angular.forEach(lt.danhSachLamThay, function (data, index) {
                    lt.tableSelection[index] = true;
                });
                dem = lt.indexMax;
            } else {
                // Unchecked tất cả các records
                angular.forEach(lt.danhSachLamThay, function (data, index) {
                    lt.tableSelection[index] = false;
                });
                dem = 0;
            }
        };
        // Bỏ check all
        lt.demChecked = function ($index) {
            if (lt.tableSelection[$index]) dem++;
            else dem--;
            if (dem == lt.indexMax) lt.isAll = true;
            else lt.isAll = false;
        }
        // Xóa tất cả các records đã chọn (1 hoặc nhiều)
        lt.removeSelectedRows = function () {
            $scope.Delete = function () {
                var total = lt.danhSachLamThay.length - 1;
                for (var i = total; i >= 0; i--) {
                    if (lt.tableSelection[i]) {
                        // Xóa từng checked record
                        $http.delete('https://saigonmaster.herokuapp.com/lamThayChuNhiem/' + lt.danhSachLamThay[i].id);
                        lt.danhSachLamThay.splice(i, 1);
                        lt.tableSelection[i] = false;
                    }
                };
                $rootScope.alertThanhCong = true;
                $timeout(function () {
                    $rootScope.alertThanhCong = false;
                }, 3000);
            }
        }
        // Ẩn nút xóa khi chưa chọn
        lt.countChecked = function () {
            var count = 0;
            var total = lt.danhSachLamThay.length - 1;
            for (var i = 0; i <= total; i++) {
                if (lt.tableSelection[i]) {
                    count++;
                }
            }
            return count;
        };
    });
})();