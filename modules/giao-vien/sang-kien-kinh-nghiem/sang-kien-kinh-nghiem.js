(function () {
    SchoolityApp.controller('SangKienKinhNghiemCtrl', function ($scope, $rootScope, $http, $timeout) {
        // BredcrumPath
        $rootScope.BredcrumPath1 = "Giáo viên";
        $rootScope.BredcrumPath2 = "Sáng kiến kinh nghiệm";
        $rootScope.showPath1 = $rootScope.showPath2 = true;
        // Tổ Bộ Môn
        $http.get('https://slt-puppet.herokuapp.com/toBoMons').then(function (response) {
            sk.toBoMonSelect = response.data;
        });
        // Cấp đề tài
        $http.get("shared/json/capdetaisangkien.json").then(function (response) {
            sk.capDeTaiSangKien = response.data;
        });
        // Xếp loại đề tài
        $http.get("shared/json/xeploaidetaisangkien.json").then(function (response) {
            sk.xepLoaiDeTaiSangKien = response.data;
        });
        // Loại đề tài
        $http.get("shared/json/loaidetaisangkien.json").then(function (response) {
            sk.loaiDeTaiSangKien = response.data;
        });
        // ------------------------ PHÂN TRANG ------------------------------
        let sk = this;
        let allUrlDanhSachDeTai = (start, limit) => `https://saigonmaster.herokuapp.com/deTaiSangKien?_start=${start}&_limit=${limit}`;
        let urlDanhSachDeTaiByCap = (start, limit) => `https://saigonmaster.herokuapp.com/deTaiSangKien?capDeTai.id=${sk.capDeTai.id}&_start=${start}&_limit=${limit}`;
        let urlDanhSachDeTaiByXepLoai = (start, limit) => `https://saigonmaster.herokuapp.com/deTaiSangKien?xepLoai.id=${sk.xepLoaiDeTai.id}&_start=${start}&_limit=${limit}`;
        let urlDanhSachDeTaiBy2 = (start, limit) => `https://saigonmaster.herokuapp.com/deTaiSangKien?xepLoai.id=${sk.xepLoaiDeTai.id}&capDeTai.id=${sk.capDeTai.id}&_start=${start}&_limit=${limit}`;
        const maxButtons = 5;
        sk.danhSachDeTai = [];
        sk.currentSelected = 1;
        sk.totalItems = 0;
        sk.itemsPerPage = 10;
        sk.totalPages = 1;
        sk.itemsPerPageOptions = [...Array(3).keys()].map(number => (number + 1) * 5);
        sk.pagesRange = sk.totalPages > maxButtons ? [...Array(maxButtons).keys()].map(number => number + 1) : [...Array(sk.totalPages).keys()].map(number => number + 1);
        //Tinh chi so index max cua 1 trang
        $scope.lastItem = function () {
            sk.indexLastPage = sk.totalItems - (sk.totalPages - 1) * sk.itemsPerPage;
            sk.indexMax = sk.currentSelected == sk.totalPages ? sk.indexLastPage : sk.itemsPerPage;
            sk.lastItem = (sk.currentSelected - 1) * sk.itemsPerPage + sk.indexMax;
        }
        // Load dữ liệu khi chuyển trang
        $scope.$watchGroup(['sk.itemsPerPage', 'sk.currentSelected'], function (newValues, oldValues) {
            let page = newValues[1];
            let noItems = newValues[0];
            if (newValues[0] != oldValues[0]) {
                sk.currentSelected = 1;
                oldValues[0] = newValues[0];
            }
            // Load lại dữ liệu cho trang tương ứng
            if (sk.capDeTai && !sk.xepLoaiDeTai) {
                $http.get(urlDanhSachDeTaiByCap((page - 1) * noItems, noItems)).then(response => {
                    sk.danhSachDeTai = response.data;
                    sk.totalItems = response.headers()["x-total-count"];
                    sk.totalPages = Math.ceil(sk.totalItems / sk.itemsPerPage);
                    $scope.lastItem();
                });
                $scope.pageNumber();
            }
            else if (!sk.capDeTai && sk.xepLoaiDeTai) {
                $http.get(urlDanhSachDeTaiByXepLoai((page - 1) * noItems, noItems)).then(response => {
                    sk.danhSachDeTai = response.data;
                    sk.totalItems = response.headers()["x-total-count"];
                    sk.totalPages = Math.ceil(sk.totalItems / sk.itemsPerPage);
                    $scope.lastItem();
                });
                $scope.pageNumber();
            }
            else if (sk.capDeTai && sk.xepLoaiDeTai) {
                $http.get(urlDanhSachDeTaiBy2((page - 1) * noItems, noItems)).then(response => {
                    sk.danhSachDeTai = response.data;
                    sk.totalItems = response.headers()["x-total-count"];
                    sk.totalPages = Math.ceil(sk.totalItems / sk.itemsPerPage);
                    $scope.lastItem();
                });
                $scope.pageNumber();
            }
            else {
                $http.get(allUrlDanhSachDeTai((page - 1) * noItems, noItems)).then(response => {
                    sk.danhSachDeTai = response.data;
                    sk.totalItems = response.headers()["x-total-count"];
                    sk.totalPages = Math.ceil(sk.totalItems / sk.itemsPerPage);
                    $scope.lastItem();
                });
                $scope.pageNumber();
            }
            //Bỏ tich checkbox khi chuyển trang
            angular.forEach(sk.danhSachDeTai, function (data, index) {
                sk.tableSelection[index] = false;
                sk.isAll = false;
                count = 0;
            });
        });

        // Tạo số trang
        $scope.pageNumber = function () {
            $scope.$watch('sk.totalPages', function (newValue, oldValue) {
                let n = sk.currentSelected;
                let totalPages = sk.totalPages;
                if (n < maxButtons) {
                    sk.pagesRange = totalPages < maxButtons ?
                        [...Array(totalPages).keys()].map(number => number + 1) :
                        [...Array(maxButtons).keys()].map(number => number + 1);
                }
                else if (n > totalPages - maxButtons) {
                    sk.pagesRange = [...Array(maxButtons).keys()].map(number => number + totalPages - maxButtons + 1);
                }
                else {
                    sk.pagesRange = [...Array(maxButtons).keys()].map(number => number + n);
                };
            });
        };
        // Chuyển trang
        sk.next = function () {
            sk.currentSelected < sk.totalPages && sk.currentSelected++;
        }
        sk.prev = function () {
            sk.currentSelected > 1 && sk.currentSelected--;
        }
        sk.first = function () {
            sk.currentSelected = 1;
        }
        sk.last = function () {
            sk.currentSelected = sk.totalPages;
        }
        // Header Sáng kiến kinh nghiệm
        sk.headerSangKien = ["Mã GV", "Họ tên", "Tổ Bộ Môn", "Tên Đề Tài", "Loại Đề Tài", "Cấp Đề Tài", "Xếp Loại", "Ghi Chú", ""];
        // Danh sách
        sk.getIdCapDeTai = function () {
            if (sk.capDeTai && !sk.xepLoaiDeTai) {
                $http.get(urlDanhSachDeTaiByCap(0, sk.itemsPerPage)).then(function (response) {
                    sk.danhSachDeTai = response.data;
                    sk.totalItems = response.headers()["x-total-count"];
                    sk.totalPages = Math.ceil(sk.totalItems / sk.itemsPerPage);
                    sk.currentSelected = 1;
                });
            }
            else if (!sk.capDeTai && sk.xepLoaiDeTai) {
                $http.get(urlDanhSachDeTaiByXepLoai(0, sk.itemsPerPage)).then(function (response) {
                    sk.danhSachDeTai = response.data;
                    sk.totalItems = response.headers()["x-total-count"];
                    sk.totalPages = Math.ceil(sk.totalItems / sk.itemsPerPage);
                    sk.currentSelected = 1;
                });
            }
            else if (sk.capDeTai && sk.xepLoaiDeTai) {
                $http.get(urlDanhSachDeTaiBy2(0, sk.itemsPerPage)).then(function (response) {
                    sk.danhSachDeTai = response.data;
                    sk.totalItems = response.headers()["x-total-count"];
                    sk.totalPages = Math.ceil(sk.totalItems / sk.itemsPerPage);
                    sk.currentSelected = 1;
                });
            }
            else {
                $http.get(allUrlDanhSachDeTai(0, sk.itemsPerPage)).then(function (response) {
                    sk.danhSachDeTai = response.data;
                    sk.totalItems = response.headers()["x-total-count"];
                    sk.totalPages = Math.ceil(sk.totalItems / sk.itemsPerPage);
                    sk.currentSelected = 1;
                });
            }
        };
        sk.getIdXepLoaiDeTai = function () {
            if (sk.xepLoaiDeTai && !sk.capDeTai) {
                $http.get(urlDanhSachDeTaiByXepLoai(0, sk.itemsPerPage)).then(function (response) {
                    sk.danhSachDeTai = response.data;
                    sk.totalItems = response.headers()["x-total-count"];
                    sk.totalPages = Math.ceil(sk.totalItems / sk.itemsPerPage);
                    sk.currentSelected = 1;
                });
            }
            else if (!sk.xepLoaiDeTai && sk.capDeTai) {
                $http.get(urlDanhSachDeTaiByCap(0, sk.itemsPerPage)).then(function (response) {
                    sk.danhSachDeTai = response.data;
                    sk.totalItems = response.headers()["x-total-count"];
                    sk.totalPages = Math.ceil(sk.totalItems / sk.itemsPerPage);
                    sk.currentSelected = 1;
                });
            }
            else if (sk.xepLoaiDeTai && sk.capDeTai) {
                $http.get(urlDanhSachDeTaiBy2(0, sk.itemsPerPage)).then(function (response) {
                    sk.danhSachDeTai = response.data;
                    sk.totalItems = response.headers()["x-total-count"];
                    sk.totalPages = Math.ceil(sk.totalItems / sk.itemsPerPage);
                    sk.currentSelected = 1;
                });
            }
            else {
                $http.get(allUrlDanhSachDeTai(0, sk.itemsPerPage)).then(function (response) {
                    sk.danhSachDeTai = response.data;
                    sk.totalItems = response.headers()["x-total-count"];
                    sk.totalPages = Math.ceil(sk.totalItems / sk.itemsPerPage);
                    sk.currentSelected = 1;
                });
            };
        }
        // Search
        $http.get("https://saigonmaster.herokuapp.com/deTaiSangKien").then(function (response) {
            $rootScope.danhSachSK = response.data;
        });
        $scope.getKeyword = function (keyword) {
            var newKeyword = keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            $rootScope.result = [];
            angular.forEach($rootScope.danhSachSK, function (data) {
                // Lọc theo tên, Tổ bộ môn, Đề tài. 
                if (
                    data.giaoVien.tenCanBo.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(newKeyword.toLowerCase()) > -1 ||
                    data.toBoMon.tenToBoMon.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(newKeyword.toLowerCase()) > -1 ||
                    data.tenDeTai.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(newKeyword.toLowerCase()) > -1) {
                    $rootScope.result.push(data);
                }
            });
            $rootScope.$broadcast("searchDeTai", $rootScope.result);
        };
        $rootScope.$on("searchDeTai", function (evt, data) {
            sk.danhSachDeTai = data;
            sk.totalItems = data.length;
            sk.totalPages = 1;
            sk.currentSelected = 1;
            $scope.lastItem();
            $scope.pageNumber();
        });
        // Advanced search
        $scope.advancedSearch = function (key1, key2, key3) {
            if (key1) {
                var tenGiaoVien = key1;
            } else tenGiaoVien = "";
            if (key2) {
                var toBoMon = key2;
            } else toBoMon = "";
            if (key3) {
                var tenDeTai = key3;
            } else tenDeTai = "";
            $rootScope.resultAdvanced = [];
            angular.forEach($rootScope.danhSachSK, function (data) {
                // Lọc theo tên, tổ bộ môn, số điện thoại. 
                if (
                    data.giaoVien.tenCanBo.toLowerCase().indexOf(tenGiaoVien.toLowerCase()) > -1 &&
                    data.toBoMon.tenToBoMon.toLowerCase().indexOf(toBoMon.toLowerCase()) > -1 &&
                    data.tenDeTai.toLowerCase().indexOf(tenDeTai.toLowerCase()) > -1) {
                    $rootScope.resultAdvanced.push(data);
                }
            });
            $rootScope.$broadcast("searchDeTai", $rootScope.resultAdvanced);
            $rootScope.searchClass = "fade-out";
        }
        // ------------------------------- THÊM ------------------------------
        sk.themDeTai = {
            id: "",
            giaoVien: {
                id: "",
                tenCanBo: ""
            }
        };
        sk.getIdToBoMon = function () {
            $http.get('https://slt-puppet.herokuapp.com/giaoViens?toBoMon.id=' + sk.themDeTai.toBoMon.id).then(function (response) {
                sk.danhSachGiaoVien = response.data;
            });
            sk.getIdGV = function () {
                if (sk.giaoVien) {
                    sk.themDeTai.giaoVien.id = sk.giaoVien.id;
                    sk.themDeTai.giaoVien.tenCanBo = sk.giaoVien.tenCanBo
                }
            };
            sk.Save = function () {
                $http.post('https://saigonmaster.herokuapp.com/deTaiSangKien', sk.themDeTai).then(function () {
                    event.preventDefault();
                    $rootScope.alertThanhCong = true;
                    $timeout(function () {
                        $rootScope.alertThanhCong = false;
                    }, 3000);
                });
            }
        }
        // ---------------------------- SỬA ---------------------------------
        sk.catchID = function (deTai) {
            $rootScope.suaDeTai = deTai;
            $rootScope.EditSK = function () {
                $http.put("https://saigonmaster.herokuapp.com/deTaiSangKien/" + deTai.id, $rootScope.suaDeTai).then(function () {
                    event.preventDefault();
                    $rootScope.alertThanhCong = true;
                    $timeout(function () {
                        $rootScope.alertThanhCong = false;
                    }, 3000);
                });
            }
        }
        // ---------------------------- XÓA -------------------------------
        var dem = 0;
        // Chọn tất cả để xóa
        sk.tableSelection = {};
        sk.isAll = false;
        sk.selectAllRows = function () {
            if (sk.isAll) {
                // Checked tất cả các records
                angular.forEach(sk.danhSachDeTai, function (data, index) {
                    sk.tableSelection[index] = true;
                });
                dem = sk.indexMax;
            } else {
                // Unchecked tất cả các records
                angular.forEach(sk.danhSachDeTai, function (data, index) {
                    sk.tableSelection[index] = false;
                });
                dem = 0;
            }
        };
        // Bỏ check all
        sk.demChecked = function ($index) {
            if (sk.tableSelection[$index]) dem++;
            else dem--;
            if (dem == sk.indexMax) sk.isAll = true;
            else sk.isAll = false;
        }
        // Xóa tất cả các records đã chọn (1 hoặc nhiều)
        sk.removeSelectedRows = function () {
            $scope.Delete = function () {
                var total = sk.danhSachDeTai.length - 1;
                for (var i = total; i >= 0; i--) {
                    var id = sk.danhSachDeTai[i].id;
                    if (sk.tableSelection[i]) {
                        // Xóa từng checked record
                        sk.danhSachDeTai.splice(i, 1);
                        delete sk.tableSelection[i];
                        $http.delete("https://saigonmaster.herokuapp.com/deTaiSangKien/" + id);
                    }
                };
                $rootScope.alertThanhCong = true;
                $timeout(function () {
                    $rootScope.alertThanhCong = false;
                }, 3000);
            }
        };
        // Ẩn nút xóa khi chưa chọn
        sk.countChecked = function () {
            var count = 0;
            var total = sk.danhSachDeTai.length - 1;
            for (var i = 0; i <= total; i++) {
                if (sk.tableSelection[i]) {
                    count++;
                }
            }
            return count;
        };
    });
})();