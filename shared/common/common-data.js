//
const __data = {
    routeData: [
        {
            state : 'so-diem',
            url : '/hoc-sinh/so-diem',
            views :{
                'mainView' : {
                    templateUrl: "modules/hoc-sinh/so-diem/so-diem.html"
                }
            }
        },
        // Hồ sơ học sinh
        {
            state : 'bang-ho-so-hoc-sinh',
            url : '/hoc-sinh/ho-so-hoc-sinh/bang-ho-so-hoc-sinh',
            views : {
                'mainView' : {
                    templateUrl : "modules/hoc-sinh/ho-so-hoc-sinh/bang-ho-so-hoc-sinh.html"
                }
            }
        },
        {
            state : 'bang-ho-so-bao-luu',
            url : '/hoc-sinh/ho-so-hoc-hoc-sinh/bang-ho-so-bao-luu',
            views : {
                'mainView' : {
                    templateUrl : "modules/hoc-sinh/ho-so-hoc-sinh/bang-ho-so-bao-luu"
                }
            }
        },
        {
            state : 'bang-ho-so-ky-luat',
            url : '/hoc-sinh/ho-so-hoc-sinh/bang-ho-so-ky-luat',
            views : {
                'mainView' : {
                    templateUrl : 'modules/hoc-sinh/ho-so-hoc-sinh/bang-ho-so-ky-luat.html'
                }
            }
        },
        {
            state : 'bang-ho-so-khen-thuong',
            url : '/hoc-sinh/ho-so-hoc-sinh/bang-ho-so-khen-thuong',
            views : {
                'mainView' : {
                    templateUrl : 'modules/hoc-sinh/ho-so-hoc-sinh/bang-ho-so-khen-thuong.html'
                }
            }
        },
        {
            state : 'bang-ho-so-ca-biet',
            url : '/hoc-sinh/ho-so-hoc-sinh/bang-ho-so-ca-biet',
            views : {
                'mainView' : {
                    templateUrl : 'modules/hoc-sinh/ho-so-hoc-sinh/bang-ho-so-ca-biet.html'
                }
            }
        },
        {
            state  : 'bang-ho-so-mien-giam',
            url : '/hoc-sinh/hoc-so-hoc-sinh/bang-ho-so-mien-giam',
            views : {
                'mainView' : {
                    templateUrl : 'modules/hoc-sinh/ho-so-hoc-sinh/bang-ho-so-mien-giam.html'
                }
            }
        },
        //
        {
            state : 'diem-danh',
            url : '/hoc-sinh/diem-danh',
            views : {
                'mainView' : {
                    templateUrl : 'modules/hoc-sinh/diem-danh/diem-danh.html'
                }
            }
        },
        {
            state : 'vi-pham',
            url : '/hoc-sinh/vi-pham',
            views : {
                'mainView' : {
                    templateUrl : 'modules/hoc-sinh/vi-pham/vi-pham.html'
                }
            }
        },
        // Tổng kết điểm
        {
            state : 'diem-thi-hoc-ky',
            url : '/hoc-sinh/tong-ket-diem/diem-thi-hoc-ky',
            views : {
                'mainView' : {
                    templateUrl : 'modules/hoc-sinh/tong-ket-diem/diem-thi-hoc-ky.html'
                }
            }
        },
        {
            state : 'tong-ket-diem',
            url : '/hoc-sinh/tong-ket-diem/tong-ket-diem',
            views : {
                'mainView' : {
                    templateUrl : 'modules/hoc-sinh/tong-ket-diem/tong-ket-diem.html'
                }
            }
        },
        {
            state : 'xep-loai-theo-khoi',
            url : '/hoc-sinh/tong-ket-diem/xep-loai-theo-khoi',
            views : {
                'mainView' : {
                    templateUrl  : 'modules/hoc-sinh/tong-ket-diem/xep-loai-theo-khoi.html'
                }
            }
        },
        // Quản lý thi lại
        {
            state : 'cap-nhat-diem-thi-lai',
            url : '/hoc-sinh/quan-ly-thi-lai/cap-nhat-diem-thi-lai.html',
            views : {
                'mainView' : {
                    templateUrl : 'modules/hoc-sinh/quan-ly-thi-lai/cap-nhat-thi-lai.html'
                }
            }
        },
        {
            state : 'dang-ky-mon-thi-lai',
            url  : '/hoc-sinh/quan-ly-thi-lai/dang-ky-mon-thi-lai',
            views : {
                'mainView' : {
                    templateUrl : 'modules/hoc-sinh/quan-ly-thi-lai/dang-ky-mon-thi-lai.html'
                }
            }
        },
        {
            state : 'xu-ly-ket-qua-thi-lai',
            url : '/hoc-sinh/quan-ly-thi-lai/xu-ly-ket-qua-thi-lai',
            views : {
                'mainView' : {
                    templateUrl : 'modules/hoc-sinh/quan-ly-thi-lai/xu-ly-ket-qua-thi-lai'
                }
            }
        },
        // Xếp loại
        {
            state : 'xep-loai-hanh-kiem',
            url : '/hoc-sinh/xep-loai-hanh-kiem',
            views : {
                'mainView' : {
                    templateUrl : 'modules/hoc-sinh/xep-loai-hanh-kiem/xep-loai-hanh-kiem.html'
                }
            }
        },
        {
            state  : 'xep-loai-hoc-sinh',
            url : '/hoc-sinh/xep-loai-hoc-sinh',
            views : {
                'mainView' : {
                    templateUrl : 'modules/hoc-sinh/xep-loai-hoc-sinh/xep-loai-hoc-sinh.html'
                }
            }
        },
        // Giáo viên
        {
            state  : 'xep-loai-thi-dua',
            url  : '/hoc-sinh/xep-loai-thi-dua',
            views  : {
                'mainView' : {
                    templateUrl  : 'modules/hoc-sinh/xep-loai-thi-dua/xep-loai-thi-dua.html'
                }
            }
        },
        {
            state : 'xep-loai-hoc-luc',
            url : '/hoc-sinh/xep-loai-hoc-luc',
            views : {
                'mainView' : {
                    templateUrl : 'modules/hoc-sinh/xep-loai-hoc-luc/xep-loai-hoc-luc.html'
                }
            }
        },
        {
            state: 'danh-sach-giao-vien',
            url: "/giao-vien/danh-sach-giao-vien",
            views: {
                'mainView': {
                    templateUrl: "modules/giao-vien/danh-sach-giao-vien/danh-sach-giao-vien.html"
                }
            }
        },
        {
            state: 'phan-cong-giang-day',
            url: "/giao-vien/phan-cong-giang-day",
            views: {
                'mainView': {
                    templateUrl: "modules/giao-vien/phan-cong-giang-day/phan-cong-giang-day.html"
                },
            }
        },
        {
            state: 'phan-cong-giao-vu',
            url: "/giao-vien/phan-cong-giao-vu",
            views: {
                'mainView': {
                    templateUrl: "modules/giao-vien/phan-cong-giao-vu/phan-cong-giao-vu.html"
                },
            }
        },
        {
            state: 'phan-cong-kiem-nhiem',
            url: "/giao-vien/phan-cong-kiem-nhiem",
            views: {
                'mainView': {
                    templateUrl: "modules/giao-vien/phan-cong-kiem-nhiem/phan-cong-kiem-nhiem.html"
                },
            }
        },
        {
            state: 'phan-cong-chu-nhiem',
            url: "/giao-vien/phan-cong-chu-nhiem",
            views: {
                'mainView': {
                    templateUrl: "modules/giao-vien/phan-cong-chu-nhiem/phan-cong-chu-nhiem.html"
                },
            }
        },
        {
            state: 'lam-thay-chu-nhiem',
            url: "/giao-vien/lam-thay-chu-nhiem",
            views: {
                'mainView': {
                    templateUrl: "modules/giao-vien/lam-thay-chu-nhiem/lam-thay-chu-nhiem.html"
                },
            }
        },
        {
            state: 'khen-thuong-ky-luat',
            url: "/giao-vien/khen-thuong-ky-luat",
            views: {
                'mainView': {
                    templateUrl: "modules/giao-vien/khen-thuong-ky-luat/khen-thuong-ky-luat.html"
                },
            }
        },
        {
            state: 'sang-kien-kinh-nghiem',
            url: "/giao-vien/sang-kien-kinh-nghiem",
            views: {
                'mainView': {
                    templateUrl: "modules/giao-vien/sang-kien-kinh-nghiem/sang-kien-kinh-nghiem.html"
                },
            }
        },
        {
            state: 'danh-gia-xep-loai',
            url: "/giao-vien/danh-gia-xep-loai",
            views: {
                'mainView': {
                    templateUrl: "modules/giao-vien/danh-gia-xep-loai/danh-gia-xep-loai.html"
                },
            }
        },
        {
            state: 'danh-hieu-thi-dua',
            url: "/giao-vien/danh-hieu-thi-dua",
            views: {
                'mainView': {
                    templateUrl: "modules/giao-vien/danh-hieu-thi-dua/danh-hieu-thi-dua.html"
                },
            }
        },
        {
            state: 'danh-hieu-thi-dua-tap-the',
            url: "/giao-vien/danh-hieu-thi-dua-tap-the",
            views: {
                'mainView': {
                    templateUrl: "modules/giao-vien/danh-hieu-thi-dua-tap-the/danh-hieu-thi-dua-tap-the.html"
                },
            }
        },
        {
            state: 'lich-bao-giang',
            url: "/giao-vien/lich-bao-giang",
            views: {
                'mainView': {
                    templateUrl: "modules/giao-vien/lich-bao-giang/lich-bao-giang.html"
                },
            }
        },
        {
            state: 'quan-ly-lich-bao-giang',
            url: "/giao-vien/quan-ly-lich-bao-giang",
            views: {
                'mainView': {
                    templateUrl: "modules/giao-vien/quan-ly-lich-bao-giang/quan-ly-lich-bao-giang.html"
                },
            }
        },
        {
            state: 'cau-hinh-phan-mon',
            url: "/giao-vien/cau-hinh-phan-mon",
            views: {
                'mainView': {
                    templateUrl: "modules/giao-vien/cau-hinh-phan-mon/cau-hinh-phan-mon.html"
                },
            }
        },
        {
            state: 'phan-phoi-chuong-trinh',
            url: "/giao-vien/phan-phoi-chuong-trinh",
            views: {
                'mainView': {
                    templateUrl: "modules/giao-vien/phan-phoi-chuong-trinh/phan-phoi-chuong-trinh.html"
                },
            }
        }
    ]
}