SchoolityApp.controller('cauHinhPhanMonCtr', function ($scope, $http, $rootScope) {
    // BredcrumPath
    $rootScope.BredcrumPath1 = "Giáo viên";
    $rootScope.BredcrumPath2 = "Cấu hình phân môn";
    $rootScope.showPath1 = $rootScope.showPath2 = true;
    let phanmon = this;
    //header
    $scope.headerList = ['STT', 'Tên Phân môn', 'Môn học', 'Khối áp dụng', ''];
    // --------------------- PHÂN TRANG ----------------------------
    let urlphanMonKQ = (start, limit) => `https://saigonmaster.herokuapp.com/cauHinhPhanMon?_start=${start}&_limit=${limit}`;
    let urlfilterKhoiLop = (start, limit, idKhoiLop) => `https://saigonmaster.herokuapp.com/cauHinhPhanMon?khoiLop.id=${idKhoiLop}&_start=${start}&_limit=${limit}`;
    let urlfilterMonHoc = (start, limit, idMonHoc) => `https://saigonmaster.herokuapp.com/cauHinhPhanMon?monHoc.id=${idMonHoc}&_start=${start}&_limit=${limit}`;
    let urlfilterCaHai = (start, limit, idKhoiLop, idMonHoc) => `https://saigonmaster.herokuapp.com/cauHinhPhanMon?khoiLop.id=${idKhoiLop}&monHoc.id=${idMonHoc}&_start=${start}&_limit=${limit}`;
    const maxButtons = 5;
    phanmon.kqList = [];
    phanmon.currentSelected = 1;
    phanmon.totalItems = 0;
    phanmon.itemsPerPage = 5;
    phanmon.totalPages = 1;
    phanmon.itemsPerPageOptions = [...Array(3).keys()].map(number => (number + 1) * phanmon.itemsPerPage);
    phanmon.pagesRange = phanmon.totalPages > maxButtons ? [...Array(maxButtons).keys()].map(number => number + 1) : [...Array(phanmon.totalPages).keys()].map(number => number + 1);
    //Tinh chi so index max cua 1 trang
    $scope.cuoicung = function () {
        phanmon.indexLastPage = phanmon.totalItems - (phanmon.totalPages - 1) * phanmon.itemsPerPage;
        phanmon.indexMax = phanmon.currentSelected == phanmon.totalPages ? phanmon.indexLastPage : phanmon.itemsPerPage;
        phanmon.cuoicung = (phanmon.currentSelected - 1) * phanmon.itemsPerPage + phanmon.indexMax;
    }
    // Load dữ liệu trang 1
    if (phanmon.khoiLopSelected && !phanmon.monHocSelected) {
        $http.get(urlfilterKhoiLop(0, phanmon.itemsPerPage, phanmon.khoiLopSelected.id)).then(response => {
            phanmon.kqList = response.data;
            phanmon.totalItems = +response.headers()["x-total-count"];
            phanmon.totalPages = Math.ceil(phanmon.totalItems / phanmon.itemsPerPage);
            $scope.cuoicung();
        });
    }
    else if (!phanmon.khoiLopSelected && phanmon.monHocSelected) {
        $http.get(urlfilterMonHoc(0, phanmon.itemsPerPage, phanmon.monHocSelected.id)).then(response => {
            phanmon.kqList = response.data;
            phanmon.totalItems = +response.headers()["x-total-count"];
            phanmon.totalPages = Math.ceil(phanmon.totalItems / phanmon.itemsPerPage);
            $scope.cuoicung();
        });
    }
    else if (phanmon.khoiLopSelected && phanmon.monHocSelected) {
        $http.get(urlfilterCaHai(0, phanmon.itemsPerPage, phanmon.khoiLopSelected.id, phanmon.monHocSelected.id)).then(response => {
            phanmon.kqList = response.data;
            phanmon.totalItems = +response.headers()["x-total-count"];
            phanmon.totalPages = Math.ceil(phanmon.totalItems / phanmon.itemsPerPage);
            $scope.cuoicung();
        })
    }
    else if (!phanmon.khoiLopSelected && !phanmon.monHocSelected) {
        $http.get(urlphanMonKQ(0, phanmon.itemsPerPage)).then(response => {
            phanmon.kqList = response.data;
            phanmon.totalItems = +response.headers()["x-total-count"];
            phanmon.totalPages = Math.ceil(phanmon.totalItems / phanmon.itemsPerPage);
            $scope.cuoicung();
        });
    }

    $scope.soTrang = function () {
        $scope.$watch('phanmon.totalPages', function (newValue, oldValue) {
            let n = phanmon.currentSelected;
            let totalPages = phanmon.totalPages;
            if (n < maxButtons) {
                phanmon.pagesRange = totalPages < maxButtons ?
                    [...Array(totalPages).keys()].map(number => number + 1) :
                    [...Array(maxButtons).keys()].map(number => number + 1);
            }
            else if (n > totalPages - maxButtons) {
                phanmon.pagesRange = [...Array(maxButtons).keys()].map(number => number + totalPages - maxButtons + 1);
            }
            else {
                phanmon.pagesRange = [...Array(maxButtons).keys()].map(number => number + n);
            };
        });
    }
    // Load dữ liệu khi chuyển trang
    $scope.$watchGroup(['phanmon.itemsPerPage', 'phanmon.currentSelected'], function (newValues, oldValues) {
        let page = newValues[1];
        let noItems = newValues[0];
        if (newValues[0] != oldValues[0]) {
            phanmon.currentSelected = 1;
            oldValues[0] = newValues[0];
            viewMax = newValues[0];
            phanmon.isView = newArray(viewMax, true);
            phanmon.isEdit = newArray(viewMax, false);
        }
        // Load dữ liệu với trang tương ứng
        if (phanmon.khoiLopSelected && !phanmon.monHocSelected) {
            $http.get(urlfilterKhoiLop((page - 1) * noItems, noItems, phanmon.khoiLopSelected.id)).then(response => {

                phanmon.kqList = response.data;
                phanmon.totalItems = +response.headers()["x-total-count"];
                phanmon.totalPages = Math.ceil(phanmon.totalItems / phanmon.itemsPerPage);
                $scope.cuoicung();
            });
            $scope.soTrang();
        }
        else {
            if (!phanmon.khoiLopSelected && phanmon.monHocSelected) {
                $http.get(urlfilterMonHoc((page - 1) * noItems, noItems, phanmon.monHocSelected.id)).then(response => {

                    phanmon.kqList = response.data;
                    phanmon.totalItems = +response.headers()["x-total-count"];
                    phanmon.totalPages = Math.ceil(phanmon.totalItems / phanmon.itemsPerPage);
                    $scope.cuoicung();
                });
                $scope.soTrang();
            }
            else {
                if (phanmon.khoiLopSelected && phanmon.monHocSelected) {
                    $http.get(urlfilterCaHai((page - 1) * noItems, noItems, phanmon.khoiLopSelected.id, phanmon.monHocSelected.id)).then(response => {

                        phanmon.kqList = response.data;
                        phanmon.totalItems = +response.headers()["x-total-count"];
                        phanmon.totalPages = Math.ceil(phanmon.totalItems / phanmon.itemsPerPage);
                        $scope.cuoicung();
                    })
                    $scope.soTrang();

                }
                else {
                    $http.get(urlphanMonKQ((page - 1) * noItems, noItems)).then(response => {
                        phanmon.kqList = response.data;
                        phanmon.totalItems = +response.headers()["x-total-count"];
                        phanmon.totalPages = Math.ceil(phanmon.totalItems / phanmon.itemsPerPage);
                        $scope.cuoicung();
                    });
                    $scope.soTrang();
                }
            }
        }
        //Bỏ tich checkbox khi chuyển trang
        angular.forEach(phanmon.kqList, function (data, index) {
            phanmon.tableSelection[index] = false;
            phanmon.isAll = false;
            dem = 0;
        });

    });
    // Chuyển trang 
    phanmon.next = function () {
        phanmon.currentSelected < phanmon.totalPages && phanmon.currentSelected++;
    }
    phanmon.prev = function () {
        phanmon.currentSelected > 1 && phanmon.currentSelected--;
    }
    phanmon.first = function () {
        phanmon.currentSelected = 1;
    }
    phanmon.last = function () {
        phanmon.currentSelected = phanmon.totalPages;
    }

    //---LOC THEO KHOI LOP---
    phanmon.filter = function () {
        if (phanmon.khoiLopSelected && !phanmon.monHocSelected) {
            $http.get(urlfilterKhoiLop(0, phanmon.itemsPerPage, phanmon.khoiLopSelected.id)).then(response => {
                phanmon.kqList = response.data;
                phanmon.totalItems = +response.headers()["x-total-count"];
                phanmon.totalPages = Math.ceil(phanmon.totalItems / phanmon.itemsPerPage);
                $scope.cuoicung();
            });
        }
        else {
            if (!phanmon.khoiLopSelected && phanmon.monHocSelected) {
                $http.get(urlfilterMonHoc(0, phanmon.itemsPerPage, phanmon.monHocSelected.id)).then(response => {
                    phanmon.kqList = response.data;
                    phanmon.totalItems = +response.headers()["x-total-count"];
                    phanmon.totalPages = Math.ceil(phanmon.totalItems / phanmon.itemsPerPage);
                    $scope.cuoicung();
                });
            }
            else {
                if (phanmon.khoiLopSelected && phanmon.monHocSelected) {
                    $http.get(urlfilterCaHai(0, phanmon.itemsPerPage, phanmon.khoiLopSelected.id, phanmon.monHocSelected.id)).then(response => {
                        phanmon.kqList = response.data;
                        phanmon.totalItems = +response.headers()["x-total-count"];
                        phanmon.totalPages = Math.ceil(phanmon.totalItems / phanmon.itemsPerPage);
                        $scope.cuoicung();
                    })

                }
                else {
                    $http.get(urlphanMonKQ(0, phanmon.itemsPerPage)).then(response => {
                        phanmon.kqList = response.data;
                        phanmon.totalItems = +response.headers()["x-total-count"];
                        phanmon.totalPages = Math.ceil(phanmon.totalItems / phanmon.itemsPerPage);
                        $scope.cuoicung();
                    });
                }
            }
        }
        angular.forEach(phanmon.kqList, function (data, index) {
            phanmon.tableSelection[index] = false;
            phanmon.isAll = false;
        });
    }

    // --------------------------- XÓA --------------------------------
    var dem = 0;
    // checkAll = chọn tất cả tableSelection
    phanmon.tableSelection = {};
    phanmon.isAll = false;
    phanmon.selectAllRows = function () {
        if (phanmon.isAll) {
            angular.forEach(phanmon.kqList, function (data, index) {
                phanmon.tableSelection[index] = true;
            });
            dem = phanmon.indexMax;
        } else {
            dem = 0;
            angular.forEach(phanmon.kqList, function (data, index) {
                phanmon.tableSelection[index] = false;
            });
        }
    };
    // chọn tất cả tableSelection = checkAll
    phanmon.demChecked = function ($index) {
        if (phanmon.tableSelection[$index]) dem++;
        else dem--;
        if (dem == phanmon.indexMax) phanmon.isAll = true;
        else phanmon.isAll = false;
    }
    // Xóa tất cả các records đã chọn (1 hoặc nhiều)
    phanmon.removeSelectedRows = function () {
        $scope.Delete = function () {
            var total = phanmon.kqList.length - 1;
            for (var i = total; i >= 0; i--) {
                var id = phanmon.kqList[i].id;
                if (phanmon.tableSelection[i]) {
                    // Xóa từng checked record
                    phanmon.kqList.splice(i, 1);
                    delete phanmon.tableSelection[i];
                    $http.delete("https://saigonmaster.herokuapp.com/cauHinhPhanMon/" + id);
                }
            };
            $("#alert-thanhcong").show().delay(2000).fadeOut();
        }
    };

    // Ẩn nút xóa khi chưa chọn
    phanmon.countChecked = function () {
        var count = 0;
        var total = phanmon.kqList.length;
        for (var i = 0; i < total; i++) {
            if (phanmon.tableSelection[i]) {
                count++;
            }
        }
        return count;
    };
    // --------------SỬA TRỰC TIẾP------------------
    viewMax = phanmon.itemsPerPage;
    phanmon.isView = newArray(viewMax, true);
    phanmon.isEdit = newArray(viewMax, false);
    phanmon.catchID = function (index, kq) {
        phanmon.isView[index] = false;
        phanmon.isEdit[index] = true;
        $scope.tongChon = 0;
        for (i = 0; i < kq.khoiApDung.length; i++) {
            if (kq.khoiApDung[i].khoiLopSelected) $scope.tongChon++;;
        }
    };
    phanmon.Save = function (index, kq) {
        $http.put('https://saigonmaster.herokuapp.com/cauHinhPhanMon/' + kq.id, kq).then(function () {
            phanmon.isView[index] = true;
            phanmon.isEdit[index] = false;
        });
        $("#alert-thanhcong").show().delay(2000).fadeOut();
    };
    phanmon.cancel = function (index) {
        phanmon.isView[index] = true;
        phanmon.isEdit[index] = false;
    };
    //Thêm mới phân môn
    $scope.getIdMonHoc = function () {
        $http.get("https://slt-puppet.herokuapp.com/khoiLops").then(function (response) {
            phanmon.khoiLopList = response.data;
            for (i = 0; i < phanmon.khoiLopList.length; i++) {
                phanmon.khoiLopList[i].khoiLopSelected = false;
            }
        });
        $scope.tenPhanMon = "";
        $scope.tongChon = 0;
        $scope.phanMonKQ = {};
        //Thêm mới dữ liệu
        $scope.cauHinhPhanMon = function () {
            $scope.phanMonKQ.monHoc = $scope.monHocSelected;
            $scope.phanMonKQ.tenPhanMon = $scope.tenPhanMon;
            $scope.phanMonKQ.khoiApDung = phanmon.khoiLopList;
            $http.post('https://saigonmaster.herokuapp.com/cauHinhPhanMon', $scope.phanMonKQ).then(function () {
                $("#alert-thanhcong").show().delay(2000).fadeOut();
            })
        }
    };
    $scope.updateQuestionValue = function (khoiLop) {
        if (khoiLop.khoiLopSelected) {
            $scope.tongChon++;
        } else {
            $scope.tongChon--;
        }
    };
    $scope.getSelectedItems = function (item) {
        return item.khoiLopSelected;
    };
    $('.selected-items-box').bind('click', function (e) {
        $('.wrapper .list').slideToggle('fast');
    });
    //Danh sách 
    $http.get("https://slt-puppet.herokuapp.com/khoiLops").then(function (response) {
        phanmon.khoiLopList = response.data;
        $scope.tongChon = 0;
        for (i = 0; i < phanmon.khoiLopList.length; i++) {
            if (phanmon.khoiLopList[i].khoiLopSelected) $scope.tongChon++;
        }
    });
    $http.get("https://slt-puppet.herokuapp.com/monHoc").then(function (response) {
        phanmon.monHocList = response.data;
    });
})