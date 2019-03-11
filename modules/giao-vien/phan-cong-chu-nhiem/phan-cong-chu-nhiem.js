(function () {
    SchoolityApp.controller('PCChuNhiemCtrl', function ($rootScope, $http, $timeout) {
        // BredcrumPath
        $rootScope.BredcrumPath1 = "Giáo viên";
        $rootScope.BredcrumPath2 = "Phân công chủ nhiệm";
        $rootScope.showPath1 = $rootScope.showPath2 = true;
        let pccn = this;
        // Danh sách Giáo Viên và Lớp
        $http.get('https://saigonmaster.herokuapp.com/phanCongGiaoVu').then(function (response) {
            pccn.danhSachGiaoVien = response.data;
            pccn.quyenGVCN = [];
            angular.forEach(pccn.danhSachGiaoVien, function (data) {
                pccn.quyenGVCN[data.id - 1] = newArray(20, false);
                angular.forEach(data.GVChuNhiemLop, function (data2) {
                    pccn.quyenGVCN[data.id - 1][data2.id - 1] = true;
                });
            });
        });
        $http.get('https://slt-puppet.herokuapp.com/lopHocs').then(function (response) {
            pccn.danhSachLop = response.data;
        });
        // Lọc theo Tổ bộ môn
        pccn.filtertoBoMon = function (data) {
            return data.toBoMon.id === 1;
        };
        pccn.getIdToBoMon = function () {
            if (pccn.toBoMon) {
                pccn.filtertoBoMon = function (data) {
                    return data.toBoMon.id === pccn.toBoMon.id;
                };
            }
            else {
                pccn.filtertoBoMon = function (data) {
                    return data;
                };
            }
        };

        // Lọc theo khối
        pccn.filterLop = function (data) {
            return data.khoiLopId === "1";
        };
        pccn.getIdKhoi = function () {
            pccn.filterLop = function (data) {
                return data.khoiLopId === pccn.khoiLop.id;
            };
        }
        // Tổ Bộ Môn
        $http.get('https://slt-puppet.herokuapp.com/toBoMons').then(function (response) {
            pccn.toBoMonSelect = response.data;
        });
        // Khối lớp
        $http.get('https://slt-puppet.herokuapp.com/khoiLops').then(function (response) {
            pccn.danhSachKhoi = response.data;
        });
        // ----------------------- THÊM, SỬA, XÓA -----------------------------
        pccn.Save = function () {
            angular.forEach(pccn.danhSachGiaoVien, function (dataGV, indexGV) {
                dataGV.GVChuNhiemLop = [];
                angular.forEach(pccn.danhSachLop, function (dataLop, indexLop) {
                    if (pccn.quyenGVCN[dataGV.id - 1][indexLop] == true) {
                        dataGV.GVChuNhiemLop.push(pccn.danhSachLop[indexLop]);
                    }
                });
                $http.put('https://saigonmaster.herokuapp.com/phanCongGiaoVu/' + dataGV.id, dataGV);
            });
            $rootScope.alertThanhCong = true;
            $timeout(function () {
                $rootScope.alertThanhCong = false;
            }, 3000);
        }
    })
})();