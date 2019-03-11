(function () {
    // config multiple routes
    SchoolityApp.config(function ($stateProvider, $locationProvider) {
        // ✡ Add routes here ✡
        __data.routeData.forEach(x => {
            $stateProvider.state(x.state, {
                url: x.url,
                views: x.views
            });
        });
        // $locationProvider.html5Mode({
        //     enabled: true,
        //     requireBase: false
        // });
    })
})()