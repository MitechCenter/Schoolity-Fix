(function () {
	SchoolityApp.controller('danhSachGVCtrl', function ($scope, $http, $rootScope, $timeout) {
		// BredcrumPath
		$rootScope.BredcrumPath1 = "Giáo viên";
		$rootScope.BredcrumPath2 = "Danh sách giáo viên";
		$rootScope.showPath1 = $rootScope.showPath2 = true;
		// --------------------------- PHÂN TRANG --------------------------
		let cb = this;
		let allUrlDanhSachCB = (start, limit) => `https://slt-puppet.herokuapp.com/giaoViens?_start=${start}&_limit=${limit}`;
		let urlDanhSachCBToBoMon = (start, limit, idToBoMon) => `https://slt-puppet.herokuapp.com/giaoViens?toBoMon.id=${idToBoMon}&_start=${start}&_limit=${limit}`;
		const maxButtons = 5;
		cb.danhsachCB = [];
		cb.currentSelected = 1;
		cb.totalItems = 0;
		cb.itemsPerPage = 10;
		cb.totalPages = 1;
		cb.itemsPerPageOptions = [...Array(3).keys()].map(number => (number + 1) * 5);
		cb.pagesRange = cb.totalPages > maxButtons ? [...Array(maxButtons).keys()].map(number => number + 1) : [...Array(cb.totalPages).keys()].map(number => number + 1);
		// Load dữ liệu khi chuyển trang
		$scope.$watchGroup(['cb.itemsPerPage', 'cb.currentSelected'], function (newValues, oldValues) {
			let page = newValues[1];
			let noItems = newValues[0];
			if (newValues[0] != oldValues[0]) {
				cb.currentSelected = 1;
				oldValues[0] = newValues[0];
			}
			// Tổ Bộ Môn
			$http.get('https://slt-puppet.herokuapp.com/toBoMons').then(function (response) {
				cb.toBoMonSelect = $rootScope.toBoMonSelect = response.data;
			});
			// Load dữ liệu cho trang tương ứng
			if (cb.toBoMon) {
				$http.get(urlDanhSachCBToBoMon((page - 1) * noItems, noItems, cb.toBoMon.id)).then(response => {
					cb.danhsachCB = response.data;
					cb.totalItems = response.headers()["x-total-count"];
					cb.totalPages = Math.ceil(cb.totalItems / cb.itemsPerPage);
					$scope.lastItem();
				});
				$scope.pageNumber();
			}
			else {
				$http.get(allUrlDanhSachCB((page - 1) * noItems, noItems)).then(response => {
					cb.danhsachCB = response.data;
					cb.totalItems = response.headers()["x-total-count"];
					cb.totalPages = Math.ceil(cb.totalItems / cb.itemsPerPage);
					$scope.lastItem();
				});
				$scope.pageNumber();
			}
			//Bỏ tich checkbox khi chuyển trang
			angular.forEach(cb.danhsachCB, function (data, index) {
				cb.tableSelection[index] = false;
				cb.isAll = false;
				count = 0;
			});

		});
		//Tinh chi so index max cua 1 trang
		$scope.lastItem = function () {
			cb.indexLastPage = cb.totalItems - (cb.totalPages - 1) * cb.itemsPerPage;
			cb.indexMax = cb.currentSelected == cb.totalPages ? cb.indexLastPage : cb.itemsPerPage;
			cb.lastItem = (cb.currentSelected - 1) * cb.itemsPerPage + cb.indexMax;
		}
		// Tạo số trang
		$scope.pageNumber = function () {
			$scope.$watch('cb.totalPages', function (newValue, oldValue) {
				let n = cb.currentSelected;
				let totalPages = cb.totalPages;
				if (n < maxButtons) {
					cb.pagesRange = totalPages < maxButtons ?
						[...Array(totalPages).keys()].map(number => number + 1) :
						[...Array(maxButtons).keys()].map(number => number + 1);
				}
				else if (n > totalPages - maxButtons) {
					cb.pagesRange = [...Array(maxButtons).keys()].map(number => number + totalPages - maxButtons + 1);
				}
				else {
					cb.pagesRange = [...Array(maxButtons).keys()].map(number => number + n);
				};
			});
		};
		// Chuyển trang
		cb.next = function () {
			cb.currentSelected < cb.totalPages && cb.currentSelected++;
		}
		cb.prev = function () {
			cb.currentSelected > 1 && cb.currentSelected--;
		}
		cb.first = function () {
			cb.currentSelected = 1;
		}
		cb.last = function () {
			cb.currentSelected = cb.totalPages;
		}
		// ------------------------ LỌC DANH SÁCH CÁN BỘ -------------------------

		// Table Header
		cb.header = ["Mã GV", "Họ Tên", "Tổ Bộ Môn", "Email", "Số Điện Thoại", ""];
		// Lọc theo Tổ Bộ Môn
		cb.filterToBoMon = function () {
			if (cb.toBoMon) {
				$http.get(urlDanhSachCBToBoMon(0, cb.itemsPerPage, cb.toBoMon.id)).then(response => {
					cb.danhsachCB = response.data;
					cb.totalItems = response.headers()["x-total-count"];
					cb.totalPages = Math.ceil(cb.totalItems / cb.itemsPerPage);
					cb.currentSelected = 1;
				});
			}
			else {
				$http.get(allUrlDanhSachCB(0, cb.itemsPerPage)).then(function (response) {
					cb.danhsachCB = response.data;
					cb.totalItems = response.headers()["x-total-count"];
					cb.totalPages = Math.ceil(cb.totalItems / cb.itemsPerPage);
					cb.currentSelected = 1;
				});
			}
		};
		// Search
		$http.get("https://slt-puppet.herokuapp.com/giaoViens/").then(function (response) {
			$rootScope.danhSachGV = response.data;
		});
		$scope.getKeyword = function (keyword) {
			var newKeyword = keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
			$rootScope.result = [];
			angular.forEach($rootScope.danhSachGV, function (data) {
				// Lọc theo tên, tổ bộ môn, số điện thoại. 
				if (
					data.tenCanBo.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(newKeyword.toLowerCase()) > -1 ||
					data.toBoMon.tenToBoMon.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(newKeyword.toLowerCase()) > -1 ||
					data.soDTDD.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(newKeyword.toLowerCase()) > -1) {
					$rootScope.result.push(data);
				}
			});
			$rootScope.$broadcast("searchGiaoVien", $rootScope.result);
		};
		$rootScope.$on("searchGiaoVien", function (evt, data) {
			cb.danhsachCB = data;
			cb.totalItems = data.length;
			cb.totalPages = 1;
			cb.currentSelected = 1;
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
				var soDTDD = key3;
			} else soDTDD = "";
			$rootScope.resultAdvanced = [];
			angular.forEach($rootScope.danhSachGV, function (data) {
				// Lọc theo tên, tổ bộ môn, số điện thoại. 
				if (
					data.tenCanBo.toLowerCase().indexOf(tenGiaoVien.toLowerCase()) > -1 &&
					data.toBoMon.tenToBoMon.toLowerCase().indexOf(toBoMon.toLowerCase()) > -1 &&
					data.soDTDD.toLowerCase().indexOf(soDTDD.toLowerCase()) > -1) {
					$rootScope.resultAdvanced.push(data);
				}
			});
			$rootScope.$broadcast("searchGiaoVien", $rootScope.resultAdvanced);
			$rootScope.searchClass = "fade-out";
		}
		// ----------------------------- XEM -------------------------------
		cb.viewDetail = function (data) {
			$rootScope.view = data;
			$rootScope.view.ngaySinh = new Date(data.ngaySinh);
			$rootScope.view.ngayCapCMND = new Date(data.ngayCapCMND);
			$rootScope.view.ngayTuyenDung = new Date(data.ngayTuyenDung);
			$rootScope.view.ngayVaoBienChe = new Date(data.ngayVaoBienChe);
		}
		cb.step1 = function () {
			cb.stepActive2 = cb.stepActive3 = cb.stepActive4 = cb.stepActive5 = "";
		}
		cb.step2 = function () {
			cb.stepActive2 = "active";
			cb.stepActive3 = cb.stepActive4 = cb.stepActive5 = "";
		}
		cb.step3 = function () {
			cb.stepActive2 = cb.stepActive3 = "active";
			cb.stepActive4 = cb.stepActive5 = "";
		}
		cb.step4 = function () {
			cb.stepActive2 = cb.stepActive3 = cb.stepActive4 = "active";
			cb.stepActive5 = "";
		}
		cb.step5 = function () {
			cb.stepActive2 = cb.stepActive3 = cb.stepActive4 = cb.stepActive5 = "active";
		}
		// -------------------------------- XÓA ---------------------------------
		var dem = 0;
		// Chọn tất cả để xóa
		cb.tableSelection = [];
		cb.isAll = false;
		cb.selectAllRows = function () {
			if (cb.isAll) {
				// Checked tất cả các records
				angular.forEach(cb.danhsachCB, function (data, index) {
					cb.tableSelection[index] = true;
				});
				dem = cb.indexMax;
			} else {
				// Unchecked tất cả các records
				angular.forEach(cb.danhsachCB, function (data, index) {
					cb.tableSelection[index] = false;
				});
				dem = 0;
			}
		};
		// Bỏ check all
		cb.demChecked = function ($index) {
			if (cb.tableSelection[$index]) dem++;
			else dem--;
			if (dem == cb.indexMax) cb.isAll = true;
			else cb.isAll = false;
		}
		// Xóa tất cả các records đã chọn (1 hoặc nhiều)
		cb.removeSelectedRows = function () {
			$scope.Delete = function () {
				var total = cb.danhsachCB.length - 1;
				for (var i = total; i >= 0; i--) {
					var id = cb.danhsachCB[i].id;
					if (cb.tableSelection[i]) {
						// Xóa từng checked record
						cb.danhsachCB.splice(i, 1);
						delete cb.tableSelection[i];
						$http.delete("https://slt-puppet.herokuapp.com/giaoViens/" + id);
					}
				};
				// $("#alert-thanhcong").show().delay(2000).fadeOut();
				$rootScope.alertThanhCong = true;
				$timeout(function () {
					$rootScope.alertThanhCong = false;
				}, 3000);
			}
		};
		// Ẩn nút xóa khi chưa chọn
		cb.countChecked = function () {
			var count = 0;
			var total = cb.danhsachCB.length - 1;
			for (var i = 0; i <= total; i++) {
				if (cb.tableSelection[i]) {
					count++;
				}
			}
			return count;
		};
	});
})();