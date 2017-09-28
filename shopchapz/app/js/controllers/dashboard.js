(function () {
    'use strict';

    var controllerId = 'dashboard';

    angular
        .module('app')
        .controller(controllerId, dashboard)
    dashboard.$inject = ['$rootScope', '$scope', '$timeout', '$state', '$location', 'loginRegisterService', 'merchantService', '$mdDialog'];
    function dashboard($rootScope, $scope, $timeout, $state, $location, loginRegisterService, merchantService, $mdDialog) {

        // if (!localStorage.getItem("loginStatus")) {
        //     $location.path('/login');
        // }

        $rootScope.particularStoreId = '';


        $scope.searchStore = $rootScope.searchStore1;
        $scope.storesArray = [];


        if (localStorage.getItem('loginStatus')) {
            $scope.loginStatus = true;
        }
        $timeout(function () {
            $scope.inject();
        }, 1000);

        $scope.inject = function(){
            $(document).ready(function(){
                $('[data-toggle="tooltip"]').tooltip();   
            });
        }
      

        $timeout(function () {
            $scope.slider();
        }, 1000);

        // recommended stores slider 
        $scope.slider = function () {
            $(document).ready(function () {
                $('.merchants-logos').slick({
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    arrows: false,
                    dots: false,
                    pauseOnHover: false,
                    responsive: [{
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 4
                        }
                    }, {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 3
                        }
                    }]
                });
            });
        }


        //////////////////////////////////////// Add No of Clicks  ////////////////////////////


        $scope.addNoOfClicks = function () {
            loginRegisterService.addClicks({ store_id: $rootScope.particularStoreId }).success(function (response) {
                if (response.status == 105 || response.status == '105') {
                    console.log(response);
                }
                else {
                    console.log("error in add clicks");
                }
            })
        }


        ///////////////////////////////////////////////////////////////////////////////////////////


        $scope.func = function (index) {
            console.log("func class");
            $rootScope.particularStoreId = index;
            console.log($rootScope.particularStoreId);
            localStorage.setItem('userstore', $rootScope.particularStoreId);
            $scope.addNoOfClicks();

        }



        /////////////////////////////// Get list of All Stores //////////////////////////////////

        $scope.arrayforRecommendation = [];

        $scope.getListofAllStores = function () {
            loginRegisterService.getlistofstores().success(function (response) {
                if (response.status == 105 || response.status == '105') {

                    // console.log(response);
                    var increment = 0;
                    $scope.storesArray = response.data;
                    for (var i = 0; i < response.data.length; i++) {
                        if (response.data[i].store.status == 1) {
                            increment = increment + 1;
                            for (var j = increment - 1; j <= increment - 1; j++) {
                                $scope.arrayforRecommendation[increment - 1] = response.data[i].store;
                            }

                        }
                    }

                    console.log("Array for recommnedation");
                    console.log($scope.arrayforRecommendation);

                    for (var i = 0; i < response.data.length; i++) {

                        $scope.storesArray[i].store.rating = response.data[i].rating[0].avg_rating;
                        // response.data[i].store
                    }
                    console.log($scope.storesArray);


                }
                else {
                    console.log("error");
                }

            })
        }

        $scope.getListofAllStores();


        ////////////////////////////////////// Search function /////////////////////////////


        // $scope.searchValue = '';
        // $scope.searchValueCall = function () {
        //     $rootScope.searchedValue = $scope.searchValue;
        //     if ($scope.searchValue != '' && $scope.searchValue != null) {
        //         $state.go("search-results");
        //     }
        // }


        ////////////////////////////////////   End   /////////////////////////////////////////

    }
})();
