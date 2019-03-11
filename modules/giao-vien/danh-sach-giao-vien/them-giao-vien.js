SchoolityApp.controller('AddCtrl', function ($scope, $rootScope, $http) {
    let add = this;
    add.canBo = {
        id: "",
        // Thông tin 1
        tenCanBo: "",
        maCanBo: "", // Tự sinh
        avatarUrl: "http://d38we5ntdyxyje.cloudfront.net/1081804/profile/VRXFYTQZ_avatar_medium_square.jpg",
        ngaySinh: "",
        gioiTinh: "",
        soCMND: "",
        ngayCapCMND: "",
        noiCapCMND: "",
        soDTDD: mobile, // tự sinh số ĐT, khi dùng sẽ để trống ""
        email: email, // tự sinh mail, khi dùng sẽ để trống ""
        diaChi: "",
        danToc: "",
        sucKhoe: "",
        queQuan: "",
        tinhThanh: "",
        quanHuyen: "",
        xaPhuong: "",
        // Thông tin 2
        toBoMon: "",
        viTriLamViec: "",
        chucVu: "",
        hinhThucHopDong: "",
        ngayTuyenDung: "",
        ngayVaoBienChe: "",
        coQuanTuyenDung: "",
        chucDanh: "",
        NNKhiDuocTuyen: "",
        soTietTrenTuan: "",
        nhiemVuKiemNhiem: "",
        soTietKiemNhiem: "",
        huanLuyenKNS: false,
        dayHocSinhKT: false,
        chuyenTrachDoanDoi: false,
        day12Buoi: "",  // mới thay đổi
        //Thông tin 3
        ngachHang: "",
        maNgach: "",
        PCThamNien: "",
        bacLuong: "",
        heSoLuong: "",
        vuotKhung: "",
        PCThuHutNghe: "",
        PCUuDaiNghe: "",
        ngayHuong: "",
        //Thông tin 4
        KQBoiDuong: "",
        trinhDoCMNV: "",
        trinhDoTinHoc: "",
        trinhDoLyLuanCT: "",
        trinhDoQLGD: "",
        trinhDoQLNN: "",
        chuyenNganh: "",
        trinhDoCM: "",
        loaiHinhDT: "",
        chuyenNganhKhac: "",
        trinhDoCMKhac: "",
        loaiHinhDTKhac: "",
        trinhDoVH: "",
        ngoaiNguChinh: "",
        trinhDoNNChinh: "",
        //Thông tin 5
        KQChuanNgheNghiep: "",
        danhGiaVienChuc: "",
        gvDayGioi: "",
        danhHieuGV: "",
        capDayChinh: "",
        monDayChinh: "",
        thanhPhanGD: "",
        tinhTrangHonNhan: "",
        hoTenBo: "",
        namSinhBo: "",
        ngheNghiepBo: "",
        coQuanBo: "",
        hoTenMe: "",
        namSinhMe: "",
        ngheNghiepMe: "",
        coQuanMe: "",
        boiDuongTX: false,
        nhaCongVu: false,
        thueNhaTro: false,
        dangKyNhaCongVu: false,
        ghiChuKhac: ""
    };
    //Thông tin 1 SELECT
    $rootScope.addData = function () {
        $http.get('https://slt-puppet.herokuapp.com/gioiTinhs').then(function (response) {
            add.gioiTinhSelect = response.data;
            add.canBo.gioiTinh = add.gioiTinhSelect[0];
        });
        $http.get('https://slt-puppet.herokuapp.com/danTocs').then(function (response) {
            add.danTocSelect = response.data;
            add.canBo.danToc = add.danTocSelect[26];
        });
        $http.get('https://slt-puppet.herokuapp.com/tinhThanhs').then(function (response) {
            add.tinhThanhSelect = response.data;
        });
        add.getIdTinh = function () {
            var tinhId = add.canBo.tinhThanh.id;
            $http.get('https://slt-puppet.herokuapp.com/tinhThanhs/' + tinhId + '/quanHuyens').then(function (response) {
                add.quanHuyenSelect = response.data;
                add.xaPhuongSelect = [];
            });
        };
        add.getIdHuyen = function () {
            if (add.canBo.quanHuyen) {
                var huyenId = add.canBo.quanHuyen.id;
                $http.get('https://slt-puppet.herokuapp.com/quanHuyens/' + huyenId + '/xaPhuongs').then(function (response) {
                    add.xaPhuongSelect = response.data;
                });
            }
        }
    }
    add.step1 = function () {
        add.stepActive2 = add.stepActive3 = add.stepActive4 = add.stepActive5 = "";
    }
    //Thông tin 2 SELECT
    add.step2 = function () {
        add.stepActive2 = "active";
        add.stepActive3 = add.stepActive4 = add.stepActive5 = "";
        if (!add.viTriLamViecSelect) {
            add.toBoMonSelect = $rootScope.toBoMonSelect;
            $http.get('https://slt-puppet.herokuapp.com/viTriLamViecs').then(function (response) {
                add.viTriLamViecSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/chucVus').then(function (response) {
                add.chucVuSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/hinhThucHopDongs').then(function (response) {
                add.hinhThucHopDongSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/nhiemVuKiemNhiems').then(function (response) {
                add.nhiemVuKiemNhiemSelect = response.data;
            });
        }
    }
    //Thông tin 3 SELECT
    add.step3 = function () {
        add.stepActive2 = add.stepActive3 = "active";
        add.stepActive4 = add.stepActive5 = "";
        if (!add.ngachHangSelect) {
            $http.get('https://slt-puppet.herokuapp.com/ngachHangs').then(function (response) {
                add.ngachHangSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/bacLuongs').then(function (response) {
                add.bacLuongSelect = response.data;
            });
        }
    }
    //Thông tin 4 SELECT
    add.step4 = function () {
        add.stepActive2 = add.stepActive3 = add.stepActive4 = "active";
        add.stepActive5 = "";
        if (!add.CMNVSelect) {
            $http.get('https://slt-puppet.herokuapp.com/trinhDos').then(function (response) {
                add.CMNVSelect = response.data;
                add.CMSelect = response.data;
                add.CMKhacSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/trinhDoTinHocs').then(function (response) {
                add.TinHocSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/trinhDoLyLuanChinhTris').then(function (response) {
                add.LyLuanCTSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/trinhDoQLGiaoDucs').then(function (response) {
                add.QLGDSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/trinhDoQLNhaNuocs').then(function (response) {
                add.QLNNSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/chuyenNganhDaoTaos').then(function (response) {
                add.chuyenNganhSelect = response.data;
                add.chuyenNganhKhacSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/loaiHinhDaoTaos').then(function (response) {
                add.LHDTSelect = response.data;
                add.LHDTKhacSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/trinhDoVanHoas').then(function (response) {
                add.VHSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/ngoaiNgus').then(function (response) {
                add.NNChinhSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/trinhDoNgoaiNgus').then(function (response) {
                add.trinhDoNNSelect = response.data;
            });
        }
    }
    //Thông tin 5 SELECT
    add.step5 = function () {
        add.stepActive2 = add.stepActive3 = add.stepActive4 = add.stepActive5 = "active";
        if (!add.capDayChinhSelect) {
            $http.get('https://slt-puppet.herokuapp.com/capDays').then(function (response) {
                add.capDayChinhSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/monDayChinhs').then(function (response) {
                add.monDayChinhSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/thanhPhanGiaDinhs').then(function (response) {
                add.thanhPhanGDSelect = response.data;
            });
            $http.get('https://slt-puppet.herokuapp.com/tinhTrangHonNhans').then(function (response) {
                add.HonNhanSelect = response.data;
            });
        }
    }
    // POST DATA
    add.submitCB = function () {
        event.preventDefault();
        $http.post('https://slt-puppet.herokuapp.com/giaoViens', add.canBo).then(function () {
            $rootScope.alertThanhCong = true;
            $timeout(function () {
                $rootScope.alertThanhCong = false;
            }, 3000);
        });
    };
});
// RANDOM PHONE NUMBER
var mobile = "098" + (Math.floor(Math.random() * 9000000) + 1000000);
var email = mobile + "@gmail.com";
var landline = "0321" + (Math.floor(Math.random() * 9000000) + 1000000);