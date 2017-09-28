(function () {
    'use strict';

    var controllerId = 'store';

    angular
        .module('app')
        .controller(controllerId, store)
    store.$inject = ['$rootScope', '$scope','$http','$mdDialog', '$mdMedia', 'loginRegisterService', '$state', '$location', '$timeout'];
    function store($rootScope, $scope,$http,$mdDialog, $mdMedia, loginRegisterService, $state, $location, $timeout) {

        var vm = this;
        $scope.storeId = localStorage.getItem('userstore');
        $scope.UserId = localStorage.getItem('usersUserId');

        $scope.overallDetailOfStore = {};
        //  $scope.storeId = $rootScope.particularStoreId;

        $scope.imagesarray = '';
        $scope.showProcessing = true;
        $scope.updationerror = false;
        $scope.updationsuccess = false;
        $scope.commentsArray = [];
        $scope.loginerror = false;






        // login status check
        $scope.loginStatus = false;
        if (localStorage.getItem('loginStatus')) {
            $scope.loginStatus = true;
        }


        $scope.userComments = {
            comment: '',
            status: '0',
            store_id: $scope.storeId,
            user_id: $scope.UserId
        }

        $scope.userRatings = {
            rating: '',
            status: '0',
            store_id: $scope.storeId,
            user_id: $scope.UserId
        }


        // store images slider



        // star rating
        $('#userReviewRating').rating();


        // search function
        $scope.searchValue = '';
        $scope.searchValueCall = function () {

            $rootScope.searchedValue = $scope.searchValue;
            if ($scope.searchValue != '' && $scope.searchValue != null) {
                $state.go("search-results");
            }
        }

        // $scope.myHTML =  "Rating is Required!";


        $scope.submitReviews = function () {
           
           
            var rate = $('#userReviewRating').val();
            if (rate == '') {
                document.getElementById("ratingRequired").innerHTML = "Rating is Required!";
                return false;
            }
            else {
                document.getElementById("ratingRequired").innerHTML = "";
                $scope.showProcessing = false;
                console.log(rate);
                $scope.userRatings.rating = rate;
                console.log($scope.userRatings);
                console.log($scope.userComments);

                loginRegisterService.submitComments($scope.userComments).success(function (response) {
                    if (response.status == 105 || response.status == '105') {
                        console.log(response);


                    }
                });

                loginRegisterService.submitRatings($scope.userRatings).success(function (response) {
                    if (response.status == 105 || response.status == '105') {
                        // console.log(response);
                        $scope.showProcessing = true;
                        $scope.updationsuccess = true;
                        $scope.showSuccess("Review Added Successfully");
                        $timeout(function(){
                            $("#rateStore").modal('hide');
                        },1000)
                        
                        $scope.getratingsAndComments();
                    }

                });
            }



        }

        $scope.reviewcounter = 5

        $scope.viewallreview = function () {
            $scope.reviewcounter = $scope.commentsArray.length

        }



        $scope.offlineRatingMode = function () {
            $scope.showError("Please Login First");
            $scope.loginerror = true;
            $timeout(function () {
                $location.path('/login');
            }, 4000)

        }

        $scope.imagess = [];

        ///////////////////////////// // Get store details ///////////////////////////////

        $scope.getStoreDetails = function () {
            loginRegisterService.getstoredetails({ access_token: '', store_id: $scope.storeId })
                .success(function (response) {

                    if (response.status == 105 || response.status == '105') {
                        // console.log(response.data.images);
                        // console.log(response.data.images[0].image);
                        $scope.overallDetailOfStore = response.data;
                        console.log(response.data);
                        $scope.imagesarray = response.data.images;
                        console.log($scope.imagesarray);
                        for (var i = 0; i < $scope.imagesarray.length; i++) {
                            $scope.imagess.push($scope.imagesarray[i].image);
                        }
                        //    console.log($scope.imagess);
                        //    console.log($scope.imagess.length);
                        //    if($scope.imagess.length < 3){
                        //       console.log("less than 3");
                        //    }
                        // console.log($scope.userRatings);
                        // console.log($scope.commentsArray);




                        $scope.slider = function () {
                            $(document).ready(function () {
                                $('.store-images').slick({
                                    slidesToShow: 3,
                                    slidesToScroll: 1,
                                    autoplay: false,
                                    autoplaySpeed: 3000,
                                    arrows: true,
                                    dots: false,
                                    pauseOnHover: false,
                                    responsive: [{
                                        breakpoint: 768,
                                        settings: {
                                            slidesToShow: 2
                                        }
                                    }, {
                                        breakpoint: 520,
                                        settings: {
                                            slidesToShow: 2
                                        }
                                    }]
                                });
                            });
                        }

                        $scope.slider();

                    }
                    else {
                        console.log("error");
                    }
                })
        }
        $scope.getStoreDetails();


        ///////////////////////////// Get rating and comments ///////////////////////////


        $scope.getratingsAndComments = function () {

            loginRegisterService.getRatingsAndComments({ store_id: $scope.storeId }).success(function (response) {
                if (response.status == 105 || response.status == '105') {
                    // console.log(response.data);
                    $scope.commentsArray = response.data.comments;

                    for (var i = 0; i < response.data.comments.length; i++) {
                        $scope.commentsArray[i].rating = response.data.ratings[i].rating;
                        $scope.commentsArray[i].avg_rating = response.data.ratings[i].average_rating;
                    }
                    console.log($scope.commentsArray);
                }

            })
        }

        $scope.getratingsAndComments();



        //////////////////////////////////////// Refer Friend /////////////////////////


        // $scope.openReferForm = openReferForm;
        // $scope.cancel = cancel;
        $scope.referUrl = 'http://www.shopchapz.com';
        $scope.showProcessing = true;
        $scope.showAlert = false;
        // $scope.totalRefferal = null,
        // $scope.sendInvitationFun = sendInvitationFun;
        $scope.sendInvitationLinkObj = {
            "email": null,
            "user_id": localStorage.getItem('usersUserId'),
            "username": 'Shopchapz',
            "refferallink": $scope.referUrl,
        }


          ////////////////////////////////////// Search function /////////////////////////////


         

       
        // if (localStorage.getItem('username'))
        // {
        //     $scope.sendInvitationLinkObj.username = localStorage.getItem('username');
        // }
        // $scope.getRefferalCountObj = {
        //     "user_id": localStorage.getItem('usersUserId'),
        // }
         
       
        // function cancel() {
        //     $mdDialog.cancel();
        // }
        // ;
        // function getRerralCountFun() {
        //     referFriendService.getReferFriendsCount($scope.getRefferalCountObj).success(function(response) {
        //         if (response.status == 105) {
        //             $scope.totalRefferal = response.data;
        //         } else {
        //         }
        //     });
        // }
        // ;
        // getRerralCountFun();
        // function sendInvitationFun() {
        //     $scope.showProcessing = false;
        //     referFriendService.sendInvitationLink(vm.sendInvitationLinkObj).success(function(response) {
        //         $scope.showProcessing = true;
        //         if (response.status == 105) {
        //             $scope.showAlert = true;
        //             $scope.alert = {type: 'success', msg: "Invitation link sent successfully.."};
        //             $timeout(function() {
        //                 $scope.showAlert = true;
        //                 $mdDialog.cancel();
        //             }, 1500);
        //         } else {
        //             $scope.showAlert = true;
        //             $scope.alert = {type: 'danger', msg: response.message};
        //             $timeout(function() {
        //                 $scope.showAlert = true;
        //                 $mdDialog.cancel();
        //             }, 1500);
        //         }
        //     });
        // }
        // ;






        ////////////////////////////////////////////////////////////////////////////


        $scope.showError = showError;
        $scope.showSuccess = showSuccess;

        function showError(message) {
            $(".alert-danger").html(message).show();
            $timeout(function () {
                $(".alert-danger").html("").hide();
            }, 4000)
        }

        function showSuccess(message) {
            $(".alert-success").html(message).show();
            $timeout(function () {
                $(".alert-success").html("").hide();
            }, 4000)
        }


    }
})();
