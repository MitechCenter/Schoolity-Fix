(function () {
    SchoolityApp.controller('phanTrangCtrl', function ($scope, $rootScope, $http) {
        let xxx = this;
        // --------------------------- PHÂN TRANG --------------------------
        let allUrl = (start, limit) => `https://slt-puppet.herokuapp.com/giaoViens?_start=${start}&_limit=${limit}`;
        let urlToBoMon = (start, limit, idToBoMon) => `https://slt-puppet.herokuapp.com/giaoViens?toBoMon.id=${idToBoMon}&_start=${start}&_limit=${limit}`;
        const maxButtons = 3;
        $rootScope.dataList = [];
        xxx.currentSelected = 1;
        xxx.totalItems = 0;
        xxx.itemsPerPage = 5;
        xxx.totalPages = 1;
        xxx.itemsPerPageOptions = [...Array(3).keys()].map(number => (number + 1) * 5);
        xxx.pagesRange = xxx.totalPages > maxButtons ? [...Array(maxButtons).keys()].map(number => number + 1) : [...Array(xxx.totalPages).keys()].map(number => number + 1);
        //Tinh chi so index max cua 1 trang
        $scope.lastItem = function () {
            xxx.indexLastPage = xxx.totalItems - (xxx.totalPages - 1) * xxx.itemsPerPage;
            xxx.indexMax = xxx.currentSelected == xxx.totalPages ? xxx.indexLastPage : xxx.itemsPerPage;
            xxx.lastItem = (xxx.currentSelected - 1) * xxx.itemsPerPage + xxx.indexMax;
        }
        // Load dữ liệu trang 1
        $http.get(allUrl(0, xxx.itemsPerPage)).then(response => {
            $rootScope.dataList = response.data
            xxx.totalItems = response.headers()["x-total-count"];
            xxx.totalPages = Math.ceil(xxx.totalItems / xxx.itemsPerPage);
            $scope.lastItem();
        });
        // Load dữ liệu khi chuyển trang
        $scope.$watchGroup(['xxx.itemsPerPage', 'xxx.currentSelected'], function (newValues, oldValues) {
            let page = newValues[1];
            let noItems = newValues[0];
            if (newValues[0] != oldValues[0]) {
                xxx.currentSelected = 1;
                oldValues[0] = newValues[0];
            }
            // Load lại dữ liệu cho trang tương ứng
            if (xxx.toBoMon) {
                $http.get(urlToBoMon((page - 1) * noItems, noItems, xxx.toBoMon.id)).then(response => {
                    $rootScope.dataList = response.data;
                    xxx.totalItems = response.headers()["x-total-count"];
                    xxx.totalPages = Math.ceil(xxx.totalItems / xxx.itemsPerPage);
                    $scope.lastItem();
                });
            }
            else {
                $http.get(allUrl((page - 1) * noItems, noItems)).then(response => {
                    $rootScope.dataList = response.data;
                    xxx.totalItems = response.headers()["x-total-count"];
                    xxx.totalPages = Math.ceil(xxx.totalItems / xxx.itemsPerPage);
                    $scope.lastItem();
                });
            }
            $scope.pageNumber();
        });
        // Tạo số trang
        $scope.pageNumber = function () {
            $scope.$watch('xxx.totalPages', function () {
                let n = xxx.currentSelected;
                let totalPages = xxx.totalPages;
                if (n < maxButtons) {
                    xxx.pagesRange = totalPages < maxButtons ?
                        [...Array(totalPages).keys()].map(number => number + 1) :
                        [...Array(maxButtons).keys()].map(number => number + 1);
                }
                else if (n > totalPages - maxButtons) {
                    xxx.pagesRange = [...Array(maxButtons).keys()].map(number => number + totalPages - maxButtons + 1);
                }
                else {
                    xxx.pagesRange = [...Array(maxButtons).keys()].map(number => number + n);
                };
            });
        };
        // Chuyển trang
        xxx.next = function () {
            xxx.currentSelected < xxx.totalPages && xxx.currentSelected++;
        }
        xxx.prev = function () {
            xxx.currentSelected > 1 && xxx.currentSelected--;
        }
        xxx.first = function () {
            xxx.currentSelected = 1;
        }
        xxx.last = function () {
            xxx.currentSelected = xxx.totalPages;
        }
        // Lọc theo Tổ Bộ Môn
        xxx.filterToBoMon = function () {
            if (xxx.toBoMon) {
                $http.get(urlToBoMon(0, xxx.itemsPerPage, xxx.toBoMon.id)).then(response => {
                    $rootScope.dataList = response.data;
                    xxx.totalItems = response.headers()["x-total-count"];
                    xxx.totalPages = Math.ceil(xxx.totalItems / xxx.itemsPerPage);
                    xxx.currentSelected = 1;
                    console.log(xxx.totalPages)
                });
                $scope.pageNumber();
            }
            else {
                $http.get(allUrl(0, xxx.itemsPerPage)).then(function (response) {
                    $rootScope.dataList = response.data;
                    xxx.totalItems = response.headers()["x-total-count"];
                    xxx.totalPages = Math.ceil(xxx.totalItems / xxx.itemsPerPage);
                    xxx.currentSelected = 1;
                });
                $scope.pageNumber();
            }
        };
    });
})();