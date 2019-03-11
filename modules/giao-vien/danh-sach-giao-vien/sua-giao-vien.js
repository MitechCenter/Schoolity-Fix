SchoolityApp.controller('EditCtrl', function ($rootScope, $http, $rootScope, $timeout) {
    let edit = this;
    // GET DATA BY ID
    edit.catchID = function (data) {
        $rootScope.canBo = data;
        // DATE RE-FORMAT
        $rootScope.canBo.ngaySinh = new Date(data.ngaySinh);
        $rootScope.canBo.ngayCapCMND = new Date(data.ngayCapCMND);
        $rootScope.canBo.ngayVaoBienChe = new Date(data.ngayVaoBienChe);
        $rootScope.canBo.ngayTuyenDung = new Date(data.ngayTuyenDung);
        // GET SELECT DATA
        //Thông tin 1 SELECT
        $http.get('https://slt-puppet.herokuapp.com/gioiTinhs').then(function (response) {
            $rootScope.gioiTinhSelect = response.data;
        });
        $http.get('https://slt-puppet.herokuapp.com/danTocs').then(function (response) {
            $rootScope.danTocSelect = response.data;
        });
        // Tỉnh Thành
        $http.get('https://slt-puppet.herokuapp.com/tinhThanhs').then(function (response) {
            $rootScope.tinhThanhSelect = response.data;
        });
        // Quận Huyện
        var idTinh = data.tinhThanh.id;
        $http.get('https://slt-puppet.herokuapp.com/tinhThanhs/' + idTinh + '/quanHuyens').then(function (response) {
            $rootScope.quanHuyenSelect = response.data;
        });
        // Xã phường
        var idHuyen = data.quanHuyen.id;
        $http.get('https://slt-puppet.herokuapp.com/quanHuyens/' + idHuyen + '/xaPhuongs').then(function (response) {
            $rootScope.xaPhuongSelect = response.data;
        });
        // Thay đổi Tỉnh dẫn đến thay đổi Quận/Huyện và Xã/Phường
        $rootScope.getIdTinh = function () {
            $http.get('https://slt-puppet.herokuapp.com/tinhThanhs/' + $rootScope.canBo.tinhThanh.id + '/quanHuyens').then(function (response) {
                $rootScope.quanHuyenSelect = response.data;
                $rootScope.xaPhuongSelect = [];
            });
        }
        $rootScope.getIdHuyen = function () {
            if ($rootScope.canBo.quanHuyen) {
                $http.get('https://slt-puppet.herokuapp.com/quanHuyens/' + $rootScope.canBo.quanHuyen.id + '/xaPhuongs').then(function (response) {
                    $rootScope.xaPhuongSelect = response.data;
                });
            }
        };
        // PUT DATA
        $rootScope.Save = function () {
            event.preventDefault();
            $http.put('https://slt-puppet.herokuapp.com/giaoViens/' + data.id, $rootScope.canBo).then(function () {
                $rootScope.alertThanhCong = true;
                $timeout(function () {
                    $rootScope.alertThanhCong = false;
                }, 3000);
            });
        }
    }
    edit.step1 = function () {
        edit.stepActive2 = edit.stepActive3 = edit.stepActive4 = edit.stepActive5 = "";
    }
    edit.step2 = function () {
        // //Thông tin 2 SELECT
        edit.stepActive2 = "active";
        edit.stepActive3 = edit.stepActive4 = edit.stepActive5 = "";
        if (!edit.viTriLamViecSelect) {
            $http.get('https://slt-puppet.herokuapp.com/toBoMons').then(function (response) {
                edit.toBoMonSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/viTriLamViecs').then(function (response) {
                edit.viTriLamViecSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/chucVus').then(function (response) {
                edit.chucVuSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/hinhThucHopDongs').then(function (response) {
                edit.hinhThucHopDongSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/nhiemVuKiemNhiems').then(function (response) {
                edit.nhiemVuKiemNhiemSelect = response.data;
            });
        }
    }
    edit.step3 = function () {
        //Thông tin 3 SELECT
        edit.stepActive2 = edit.stepActive3 = "active";
        edit.stepActive4 = edit.stepActive5 = "";
        if (!edit.ngachHangSelect) {
            $http.get('https://slt-puppet.herokuapp.com/ngachHangs').then(function (response) {
                edit.ngachHangSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/bacLuongs').then(function (response) {
                edit.bacLuongSelect = response.data;
            });
        }
    }
    edit.step4 = function () {
        //Thông tin 4 SELECT
        edit.stepActive2 = edit.stepActive3 = edit.stepActive4 = "active";
        edit.stepActive5 = "";
        if (!edit.CMNVSelect) {
            $http.get('https://slt-puppet.herokuapp.com/trinhDos').then(function (response) {
                edit.CMNVSelect = response.data;
                edit.CMSelect = response.data;
                edit.CMKhacSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/trinhDoTinHocs').then(function (response) {
                edit.TinHocSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/trinhDoLyLuanChinhTris').then(function (response) {
                edit.LyLuanCTSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/trinhDoQLGiaoDucs').then(function (response) {
                edit.QLGDSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/trinhDoQLNhaNuocs').then(function (response) {
                edit.QLNNSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/chuyenNganhDaoTaos').then(function (response) {
                edit.chuyenNganhSelect = response.data;
                edit.chuyenNganhKhacSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/loaiHinhDaoTaos').then(function (response) {
                edit.LHDTSelect = response.data;
                edit.LHDTKhacSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/trinhDoVanHoas').then(function (response) {
                edit.VHSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/ngoaiNgus').then(function (response) {
                edit.NNChinhSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/trinhDoNgoaiNgus').then(function (response) {
                edit.trinhDoNNSelect = response.data;
            });
        }
    };
    edit.step5 = function () {
        //Thông tin 5 SELECT
        edit.stepActive2 = edit.stepActive3 = edit.stepActive4 = edit.stepActive5 = "active";
        if (!edit.capDayChinhSelect) {
            $http.get('https://slt-puppet.herokuapp.com/capDays').then(function (response) {
                edit.capDayChinhSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/monDayChinhs').then(function (response) {
                edit.monDayChinhSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/thanhPhanGiaDinhs').then(function (response) {
                edit.thanhPhanGDSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/tinhTrangHonNhans').then(function (response) {
                edit.HonNhanSelect = response.data;
            });
        }
    };
});