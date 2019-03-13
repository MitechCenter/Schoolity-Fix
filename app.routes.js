(function(){
    app.config(function($stateProvider){
        $stateProvider.state('hosohocsinh',{
            url : '/nghiep-vu/quan-ly-ho-so/ho-so-hoc-sinh',
            templateUrl : '/app/nghiepvu/quanlyhoso/ho-so-hoc-sinh.html' 
        }).state('hosocanbo',{
            url : '/nghiep-vu/quan-ly-ho-so/ho-so-can-bo',
            templateUrl : '/app/nghiepvu/quanlyhoso/ho-so-can-bo.html'
        });
    });
})();