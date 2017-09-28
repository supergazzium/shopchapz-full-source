(function() {
    'use strict';

    var controllerId = 'search';

    angular
            .module('app')
            .controller(controllerId, search)
            search.$inject = ['$rootScope', '$scope', '$timeout', '$state', '$location', 'loginRegisterService', '$mdDialog', '$filter'];
    function search($rootScope, $scope, $timeout, $state, $location, loginRegisterService, $mdDialog, $filter) {

       
        $scope.storesArray = [];


        //////////////////////////////////////// Add no of clicks ////////////////////////////


        $scope.addNoOfClicks = function(){
            loginRegisterService.addClicks({store_id : $rootScope.particularStoreId}).success(function(response){
             if(response.status == 105 || response.status == '105'){
                 console.log(response);
             }
             else{
                 console.log("error in add clicks");
             }
            })
         }


         ///////////////////////////////////////////////////////////////////////////////////////////


         $scope.func = function(index){
            console.log("func class");
            $rootScope.particularStoreId = index;
            console.log( $rootScope.particularStoreId);
            localStorage.setItem('userstore',$rootScope.particularStoreId);
            $scope.addNoOfClicks();

        }



        ///////////////////////////////////// Get list of Stores////////////////////////////////////

        $scope.getListofAllStores = function(){
            loginRegisterService.getlistofstores().success(function(response){
                if(response.status == 105 || response.status == '105'){
                    // console.log(response);
                    $scope.storesArray = response.data;
                    // console.log(response.data[0].rating[0].avg_rating);
                    // console.log( $scope.storesArray);
                    for(var i=0;i<response.data.length;i++){
                        
                        $scope.storesArray[i].store.rating = response.data[i].rating[0].avg_rating;
                        // response.data[i].store
                    }
                    console.log( $scope.storesArray);
                    
                }
                else{
                    console.log("error");
                }

            })
        }
   
        $scope.getListofAllStores();
        
        console.log($rootScope.searchedValue);
        $scope.searchedStore = $rootScope.searchedValue;
        console.log($scope.searchedStore);


        /////////////////////////////////   End   //////////////////////////////////////////////


        // $scope.filterResults = [];

        // $scope.searchArray = function(val) {
        //     angular.forEach($scope.storesArray, function(value, key){
        //         // console.log(value.store);
        //         // console.log(key);
                
        //         // $scope.filterResults = $filter('filter')(value, {store_name:val});
        //     });
        //     // 
        //     // console.log($scope.filterResults);
        //     // console.log($scope.storesArray);
        
        // }

        


   	  


      

    }

})();