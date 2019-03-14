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
        });
    });
})();