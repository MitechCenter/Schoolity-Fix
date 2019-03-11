(function () {
    SchoolityApp.controller('PCGiaoVuCtrl', function ($rootScope, $http, $timeout) {
        // BredcrumPath
        $rootScope.BredcrumPath1 = "Giáo viên";
        $rootScope.BredcrumPath2 = "Phân công giáo vụ";
        $rootScope.showPath1 = $rootScope.showPath2 = true;
        let pcgv = this;
        // Table Header
        pcgv.headerPCGiaoVu = ["STT", "Lớp", "Quyền GV Chủ Nhiệm", "Quyền GV Bộ Môn", "Quyền Giám thị"];
        if ($rootScope.pageSelected == "Phân công giáo vụ" || $rootScope.BredcrumPath2 == "Phân công giáo vụ") {
            // Tổ Bộ Môn
            $http.get('https://slt-puppet.herokuapp.com/toBoMons').then(function (response) {
                pcgv.toBoMonSelect = response.data;
            });
            // Danh sách lớp mặc định
            $http.get('https://slt-puppet.herokuapp.com/lopHocs?khoiLopId=1').then(function (response) {
                pcgv.danhSachLop = response.data;
            });
            // Danh sách khối
            $http.get('https://slt-puppet.herokuapp.com/khoiLops').then(function (response) {
                pcgv.danhSachKhoi = response.data;
            });
        };
        // Get ID Tổ BỘ Môn
        pcgv.getIdToBoMon = function () {
            $http.get('https://slt-puppet.herokuapp.com/giaoViens?toBoMon.id=' + pcgv.toBoMon.id).then(response => {
                pcgv.giaoVienSelect = response.data;
                // Convert id arrays to boolean arrays (20 = tong so lop)
                pcgv.quyenGVCN = newArray(20, false);
                pcgv.quyenGVBM = newArray(20, false);
                pcgv.quyenGiamThi = newArray(20, false);
            })
        };
        // Get ID Giáo Viên
        pcgv.getIdGV = function () {
            if (pcgv.giaoVien) {
                $http.get('https://saigonmaster.herokuapp.com/phanCongGiaoVu?giaoVien.id=' + pcgv.giaoVien.id).then(function (response) {
                    pcgv.PCGiaoVu = response.data[0];
                    if (!pcgv.PCGiaoVu) {
                        pcgv.PCGiaoVu = {
                            id: "",
                            giaoVien: {
                                id: pcgv.giaoVien.id,
                                tenCanBo: pcgv.giaoVien.tenCanBo
                            },
                            toBoMon: pcgv.toBoMon,
                            GVChuNhiemLop: [],
                            GVBoMonLop: [],
                            GiamThiLop: []
                        }
                    }
                });
            }
        };
        // Load Danh Sách Lớp
        pcgv.getIdKhoi = function () {
            if (pcgv.khoiLop) {
                $http.get('https://slt-puppet.herokuapp.com/lopHocs?khoiLopId=' + pcgv.khoiLop.id).then(function (response) {
                    pcgv.danhSachLop = response.data;
                    // PC Giáo Vụ
                    if (pcgv.PCGiaoVu.GVChuNhiemLop) {
                        var quyenGVCNLength = pcgv.PCGiaoVu.GVChuNhiemLop.length;
                        var quyenGVBMLength = pcgv.PCGiaoVu.GVBoMonLop.length;
                        var quyenGiamThiLength = pcgv.PCGiaoVu.GiamThiLop.length;
                    };
                    // Load Checked
                    for (var i = 0; i < quyenGVCNLength; i++) {
                        pcgv.quyenGVCN[pcgv.PCGiaoVu.GVChuNhiemLop[i].id - 1] = true;
                    };
                    for (var j = 0; j < quyenGVBMLength; j++) {
                        pcgv.quyenGVBM[pcgv.PCGiaoVu.GVBoMonLop[j].id - 1] = true;
                    }
                    for (var k = 0; k < quyenGiamThiLength; k++) {
                        pcgv.quyenGiamThi[pcgv.PCGiaoVu.GiamThiLop[k].id - 1] = true;
                    }
                });
            }
        };
        // Submit
        pcgv.submitPCGiaoVu = function () {
            // Reset all arrays
            pcgv.PCGiaoVu.GVChuNhiemLop = pcgv.PCGiaoVu.GVBoMonLop = pcgv.PCGiaoVu.GiamThiLop = [];
            // Danh sách tất cả các lớp
            $http.get('https://slt-puppet.herokuapp.com/lopHocs').then(function (response) {
                pcgv.lopHoc = response.data;
                // Write new id arrays
                for (var m = 0; m < 20; m++) {
                    if (pcgv.quyenGVCN[m] == true) {
                        var data = pcgv.lopHoc[m];
                        pcgv.PCGiaoVu.GVChuNhiemLop.push(data);
                    };
                    if (pcgv.quyenGVBM[m] == true) {
                        var data = pcgv.lopHoc[m];
                        pcgv.PCGiaoVu.GVBoMonLop.push(data);
                    };
                    if (pcgv.quyenGiamThi[m] == true) {
                        var data = pcgv.lopHoc[m];
                        pcgv.PCGiaoVu.GiamThiLop.push(data);
                    }
                };
                if (pcgv.PCGiaoVu.id) {
                    $http.put('https://saigonmaster.herokuapp.com/phanCongGiaoVu/' + pcgv.PCGiaoVu.id, pcgv.PCGiaoVu).then(function () {
                        $rootScope.alertThanhCong = true;
                        $timeout(function () {
                            $rootScope.alertThanhCong = false;
                        }, 3000);
                    });
                }
                else {
                    $http.post('https://saigonmaster.herokuapp.com/phanCongGiaoVu', pcgv.PCGiaoVu).then(function () {
                        $rootScope.alertThanhCong = true;
                        $timeout(function () {
                            $rootScope.alertThanhCong = false;
                        }, 3000);
                    })
                }
            });
        }
    });
})();