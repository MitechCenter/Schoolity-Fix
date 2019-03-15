(function(){
    app.config(function($stateProvider){
        $stateProvider.state('hosohocsinh',{
            url : '/nghiep-vu/quan-ly-ho-so/ho-so-hoc-sinh',
            templateUrl : '/app/nghiepvu/quanlyhoso/ho-so-hoc-sinh.html' 
        }).state('hosocanbo',{
            url : '/nghiep-vu/quan-ly-ho-so/ho-so-can-bo',
            templateUrl : '/app/nghiepvu/quanlyhoso/ho-so-can-bo.html'
        }).state('phanconggiangday',{
            url : '/nghiep-vu/phan-cong-cong-tac/phan-cong-giang-day',
            templateUrl : 'app/nghiepvu/phancongcongtac/phan-cong-giang-day.html'
        }).state('phancongkhac',{
            url : '/nghiep-vu/phan-cong-cong-tac/phan-cong-khac',
            templateUrl : 'app/nghiepvu/phancongcongtac/phan-cong-khac.html'
        }).state('tkbhocsinh',{
            url : '/nghiep-vu/thoi-khoa-bieu/thoi-khoa-bieu-hoc-sinh',
            templateUrl : '/app/nghiepvu/quanlytkb/thoi-khoa-bieu-hoc-sinh.html'
        }).state('tkbgiaovien',{
            url : '/nghiep-vu/thoi-khoa-bieu/thoi-khoa-bieu-giao-vien',
            templateUrl : '/app/nghiepvu/quanlytkb/thoi-khoa-bieu-giao-vien.html'
        }).state('sodiemtongket',{
           url : '/nghiep-vu/quan-ly-so-diem/so-diem-tong-ket',
           templateUrl : '/app/nghiepvu/quanlysodiem/so-diem-tong-ket.html'
        }).state('sodiemquatrinh',{
            url  : '/nghiep-vu/quan-ly-so-diem/so-diem-qua-trinh',
            templateUrl : 'app/nghiepvu/quanlysodiem/so-diem-qua-trinh.html'
        }).state('tongquan',{
            url : '/nghiep-vu/tong-ket-ket-qua/tong-quan',
            templateUrl : '/app/nghiepvu/tongketketqua/tong-quan.html'
        }).state('xephanhkiem',{
            url : '/nghie-vu/tong-ket-ket-qua/xep-loai-hanh-kiem',
            templateUrl : '/app/nghiepvu/tongketketqua/xep-loai-hanh-kiem.html'
        })
    });
})();