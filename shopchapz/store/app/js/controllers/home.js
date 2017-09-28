(function () {
    'use strict';

    var controllerId = 'home';

    angular
        .module('app')
        .controller(controllerId, home)
    home.$inject = ['$rootScope', '$scope', '$timeout', '$state', 'loginSignupService', 'uploadImageService', '$location', '$mdDialog'];
    function home($rootScope, $scope, $timeout, $state, loginSignupService, uploadImageService, $location, $mdDialog) {

        var userToken = localStorage.getItem("storeadmintoken");
        var storeId = localStorage.getItem("store");
        var imageUrl;

        $scope.storeStatus = [];
        $scope.myData = [];
        $scope.getValueFromStore = [];
        $scope.active = false;
        $scope.activeInactiveStore = {};
        $scope.storeStatusAD = {};
        $scope.allRatingsAndReviews = {};
        $scope.allNameAndComments = {};
        $scope.newarray = [];
        $scope.storeName = '';
        $scope.noOfClicks = '';
        $scope.commentLength = '';
        $scope.ratingLength = '';
        $scope.averagerating = '';
        $scope.ratingIsNull = false;
        $scope.showall = false;

        if (!localStorage.getItem("storeadmintoken")) {
            $state.go("login");
        }


        var loader = "app/content/images/loading_blue.gif";
        var vm = this;

        vm.changedSuccessfully = false;
        vm.registeredSuccessfully = false;
        vm.wrongPassword = false;
        vm.showProcessing = true;

        var LogoImageUrl = '';
        vm.processingProfile = true;

        vm.loadingimage = true;
        vm.loadertype = loader;


        $scope.imageids = [];

        $scope.updateProfileInputs = {
            'userid': '',
            'storeid': '',
            'storename': '',
            'shopownername': '',
            'producttype': '',
            'digitsid': '',
            'subdistrict': '',
            'district': '',
            'phonenoowner': '',
            'phonenostore': '',
            'lineid': '',
            'email': '',
            'fburl': '',
            'instaurl': '',
            'website': '',
            'description': '',
            'storelink': '',
            'storelogo': '',
            'imageid': '',
            'storeimages': '',
            'status': ''
        }


        $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip();   
        });

        ///////////////////////// Get Ratings And Comments ////////////////////////



        $scope.getRatingAndReviews = function () {

            loginSignupService.getratingandreviews({ store_id: storeId }).success(function (response) {

                if (response.status == "105" || response.status == 105) {
                    $scope.arrayofComments = [];
                    console.log(response);
                    console.log(response.data);
                    if(response.data.ratings.length == 0){
                        console.log("it is null");
                        $scope.ratingIsNull = true;
                    }
                    else{
                        $scope.averagerating = response.data.ratings[0].average_rating;  
                    }
                    // $scope.averagerating = response.data.ratings[0].average_rating;
                    $scope.newarray = response.data.comments;
                    // $scope.allNameAndComments = response.data.comments;
                    // $scope.allRatingsAndReviews = response.data.ratings;
                    // console.log($scope.allRatingsAndReviews);
                    // console.log($scope.allRatingsAndReviews);
                    $scope.storeName = response.data.store.store_name;
                    $scope.noOfClicks = response.data.store.clicks;
                    $scope.commentLength = response.data.comments.length;
                    $scope.ratingLength = response.data.ratings.length;
                    for (var i = 0; i < $scope.commentLength; i++) {
                        $scope.newarray[i].rating = response.data.ratings[i].rating;

                    }
                    console.log($scope.newarray);
                }
            })

        }

        $scope.reviewcounter = 5;

        $scope.viewAllComments = function(){
            $scope.reviewcounter = $scope.newarray.length
            $scope.showall = true;
        }

        $scope.viewLessComments = function(){
            $scope.reviewcounter = 5;
            $scope.showall = false;
        }

        $scope.savedetails = function () {

            vm.processingProfile = false;
            var setval = [];
            var relevantImageId = [];
            $scope.updateProfileInputs.storelogo = LogoImageUrl;
            for (var i = 0; i < $scope.imageids.length; i++) {
                setval.push($scope.imageids[i].image);
                relevantImageId.push($scope.imageids[i].image_id)
            }

            console.log(setval);
            console.log(relevantImageId);
            var relevantImage = relevantImageId.join("##")
            imageUrl = setval.join("##");
            console.log(relevantImage);
            console.log("imageUrl");
            console.log(imageUrl);
            $scope.updateProfileInputs.storeimages = imageUrl;
            $scope.updateProfileInputs.imageid = relevantImage;

            var update = $scope.updateProfileInputs;
            $scope.updateProfiledata = {
                user_id: update.userid,
                store_id: update.storeid,
                store_name: update.storename,
                store_owner_name: update.shopownername,
                product_type: update.producttype,
                id: update.digitsid,
                sub_district: update.subdistrict,
                district: update.district,
                owner_phone_number: update.phonenoowner,
                store_phone_number: update.phonenostore,
                line_id: update.lineid,
                email: update.email,
                facebook_url: update.fburl,
                instagram_id: update.instaurl,
                website: update.website,
                store_description: update.description,
                store_link: update.storelink,
                store_logo: update.storelogo,
                image_id: update.imageid,
                store_images: update.storeimages
            }
            console.log($scope.updateProfiledata);

            loginSignupService.editprofile($scope.updateProfiledata).success(function (response) {

                if (response.status == 105 || response.status == "105") {
                    console.log("api hit successful");
                    vm.processingProfile = true;
                    vm.registeredSuccessfully = true;
                    vm.showSuccess("Saved successfully");
                    $scope.getprofile();

                }
                else {
                    console.log("hit not successful");
                }
            })

        }

        var imagesarray = [];

        $scope.getprofiledata = {
            access_token: userToken,
            store_id: storeId
        }

        $scope.getprofile = function () {
            // var refreshStoreLogo = '';
            // if(refreshStoreLogo != ''){
            //     vm.logo.image = loader;
            //     vm.Logotext = true;

            // }


            // console.log( $scope.getprofiledata);
            loginSignupService.getStoreDetails($scope.getprofiledata).success(function (response) {

                if (response.status == 105 || response.status == "105") {


                    // vm.loadingimage = false;
                    console.log(response);
                    console.log(response.data);
                    console.log(response.data.store_details[0].store_name);

                    var storeDetails = response.data.store_details[0];
                    LogoImageUrl = response.data.store_details[0].store_logo;
                    $scope.updateProfileInputs = {
                        'userid': storeDetails.user_id,
                        'storeid': storeDetails.store_id,
                        'storename': storeDetails.store_name,
                        'shopownername': storeDetails.store_owner_name,
                        'producttype': storeDetails.product_type,
                        'digitsid': storeDetails.id,
                        'subdistrict': storeDetails.sub_district,
                        'district': storeDetails.district,
                        'phonenoowner': response.data.owner_details[0].owner_phone_number,
                        'phonenostore': storeDetails.store_phone_number,
                        'lineid': storeDetails.line_id,
                        'email': response.data.owner_details[0].email,
                        'fburl': storeDetails.facebook_url,
                        'instaurl': storeDetails.instagram_id,
                        'website': storeDetails.website,
                        'description': storeDetails.store_description,
                        'storelink': storeDetails.store_link,
                        'storelogo': storeDetails.store_logo,
                        'imageid': response.data.images,
                        'storeimages': '',
                        'status': storeDetails.status
                    }

                    $scope.storeStatusAD = storeDetails;
                    console.log("store detail status");
                    console.log($scope.storeStatusAD);


                    $scope.imageids = response.data.images;
                    console.log("image ids");
                    console.log($scope.imageids);

                    // for (var i = 0; i < response.data.images.length; i++) {
                    //     imagesarray[i] = response.data.images[i].image_id;
                    //     console.log(imagesarray[i]);
                    // }
                    // $scope.updateProfileInputs.imageid = imagesarray.join("##");
                    // console.log($scope.updateProfileInputs.imageid);
                    // refreshStoreLogo = response.data.store_details[0].store_logo;


                    // if (response.data.images[0].image == '' || response.data.images[0].image == null) {
                    //     console.log("null image");
                    //     vm.relevanttext1 = false;
                    // }
                    // else {
                    //     console.log("not empty relevant image");
                    //     vm.relevanttext1 = true;
                    //     vm.relevantImages.image1 = response.data.images[0].image;
                    // }

                    // if (response.data.images[1].image == '' || response.data.images[1].image == null) {
                    //     console.log("null image");
                    //     vm.relevanttext2 = false;
                    // }
                    // else {
                    //     console.log("not empty relevant image");
                    //     vm.relevanttext2 = true;
                    //     vm.relevantImages.image2 = response.data.images[1].image;
                    // }
                    // if (response.data.images[2].image == '' || response.data.images[2].image == null) {
                    //     console.log("null image");
                    //     vm.relevanttext3 = false;
                    // }
                    // else {
                    //     console.log("not empty relevant image");
                    //     vm.relevanttext3 = true;
                    //     vm.relevantImages.image3 = response.data.images[2].image;
                    // }
                    // if (response.data.images[3].image == '' || response.data.images[3].image == null) {
                    //     console.log("null image");
                    //     vm.relevanttext4 = false;
                    // }
                    // else {
                    //     console.log("not empty relevant image");
                    //     vm.relevanttext4 = true;
                    //     vm.relevantImages.image4 = response.data.images[3].image;
                    // }
                    // if (response.data.images[4].image == '' || response.data.images[4].image == null) {
                    //     console.log("null image");
                    //     vm.relevanttext5 = false;
                    // }
                    // else {
                    //     console.log("not empty relevant image");
                    //     vm.relevanttext5 = true;
                    //     vm.relevantImages.image5 = response.data.images[4].image;
                    // }
                    // if (response.data.images[5].image == '' || response.data.images[5].image == null) {
                    //     console.log("null image");
                    //     vm.relevanttext6 = false;
                    // }
                    // else {
                    //     console.log("not empty relevant image");
                    //     vm.relevanttext6 = true;
                    //     vm.relevantImages.image6 = response.data.images[5].image;
                    // }




                    // if (response.data.store_details[0].store_logo == null) {
                    //     console.log("not empty");


                    // }
                    // else {
                    //     vm.logo.image = storeDetails.store_logo;
                    //     vm.Logotext = true;
                    // }

                }

                vm.loadingimage = false;


            });

        }

        $scope.getprofile();




        $scope.user = {
            'old_password': '',
            'new_password': '',
            'access_token': userToken
        }



        // angular.ForEach(vm.relevantImages,function(value, key){
        //     console.log("for each called");
        // })


        $scope.deleteitem = function (index) {
            console.log("delete item ");
            // console.log($scope.imageids[0]);
            // console.log(vm.relevantImages.image1);
            console.log(index);
            console.log($scope.imageids);
            if (confirm('Are you sure you want to delete this Image')) {

                // if (index.image_id == $scope.imageids[0].image_id) {
                //     vm.relevanttext1 = true;
                //     vm.relevantImages.image1 = loader;
                // }
                // else if (index.image_id == $scope.imageids[1].image_id) {
                //     vm.relevanttext2 = true;
                //     vm.relevantImages.image2 = loader;
                // }
                // else if (index.image_id == $scope.imageids[2].image_id) {
                //     vm.relevanttext3 = true;
                //     vm.relevantImages.image3 = loader;
                // }
                // else if (index.image_id == $scope.imageids[3].image_id) {
                //     vm.relevanttext4 = true;
                //     vm.relevantImages.image4 = loader;
                // }
                // else if (index.image_id == $scope.imageids[4].image_id) {
                //     vm.relevanttext5 = true;
                //     vm.relevantImages.image5 = loader;
                // }
                // else if (index.image_id == $scope.imageids[5].image_id) {
                //     vm.relevanttext6 = true;
                //     vm.relevantImages.image6 = loader;
                // }

                loginSignupService.deleteitemfromDB( {image_id:$scope.imageids[index].image_id.toString() }).success(function (response) {

                    if (response.status == 105 || response.status == "105") {
                        $scope.imageids[index].image = "";
                        console.log("deleted successfully");
                        // $scope.getprofile();
                        // vm.relevanttext1 = false;

                    }
                    else {
                        console.log("error");
                    }

                });



            } else {
                // Do nothing!
                return false;
            }



        }


        this.logout = function () {
            console.log("logout called");
            localStorage.removeItem("storeadmintoken");
            $location.path("/login");
        }

        $scope.newPasswordRequest = function () {
            console.log("new pass");
            vm.showProcessing = false;
            // console.log(passToken);
            loginSignupService.newpassword($scope.user).success(function (response) {

                if (response.status == 105 || response.status == '105') {
                    console.log('response from newpassword');
                    console.log(response);
                    vm.showProcessing = true;
                    vm.changedSuccessfully = true;
                    vm.showSuccess("Password Changed successfully");
                    $scope.user.old_password = '';
                    $scope.user.new_password = '';
                    $scope.confirmpassword = '';
                }
                else {
                    console.log("wrong pass");
                    vm.showProcessing = true;
                    vm.wrongPassword = true;
                    vm.showError(response.message);
                }

            });
        }

        vm.showError = showError;
        vm.showSuccess = showSuccess;

        function showSuccess(message) {
            $(".alert-success").html(message).show();
            $timeout(function () {
                $(".alert-success").html("").hide();
            }, 4000)
        }

        function showError(message) {
            $(".alert-danger").html(message).show();
            $timeout(function () {
                $(".alert-danger").html("").hide();
            }, 4000)
        }


        vm.logo = {
            image: ""
        }

        vm.relevantImages = {
            image1: "",
            image2: "",
            image3: "",
            image4: "",
            image5: "",
            image6: ""
        }

        $scope.change = function (files, status) {
            console.log("called");


            if (files != null) {
                var file = files[0];
                $timeout(function () {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(file);
                    fileReader.onload = function (e) {
                        $timeout(function () {
                            console.log(status);

                            if (status == "Logo image") {
                                console.log("logo");
                                vm.Logotext = true;
                                $scope.updateProfileInputs.storelogo = loader;
                                console.log(vm.logo.image);
                                console.log(vm.logoupload);

                                uploadImageService.uploadFileToUrl(vm.logoupload).success(function (response) {
                                    $scope.updateProfileInputs.storelogo = response.data;
                                    LogoImageUrl = response.data;
                                    console.log('response from upload image');
                                    console.log(response);
                                    console.log("logo image url");
                                    console.log(LogoImageUrl);

                                });

                            }
                            else if (status == "relevant image1") {
                                vm.relevanttext1 = true;
                                $scope.imageids[0].image = loader;
                                uploadImageService.uploadFileToUrl(vm.relevantImage1Upload).success(function (response) {
                                    $scope.imageids[0].image = response.data;
                                    // imageId = response.data;
                                    console.log('response from upload relevant image');
                                    console.log(response);

                                });
                                // vm.relevantImages.image1 = e.target.result;
                            }
                            else if (status == "relevant image2") {
                                vm.relevanttext2 = true;
                                $scope.imageids[1].image = loader;
                                uploadImageService.uploadFileToUrl(vm.relevantImage2Upload).success(function (response) {
                                    $scope.imageids[1].image = response.data;
                                    // imageId = response.data;
                                    console.log('response from upload relevant image');
                                    console.log(response);

                                });
                                // vm.relevantImages.image2 = e.target.result;
                            }
                            else if (status == "relevant image3") {
                                vm.relevanttext3 = true;
                                $scope.imageids[2].image = loader;
                                uploadImageService.uploadFileToUrl(vm.relevantImage3Upload).success(function (response) {
                                    $scope.imageids[2].image = response.data;
                                    // imageId = response.data;
                                    console.log('response from upload relevant image');
                                    console.log(response);

                                });
                                // vm.relevantImages.image3 = e.target.result;
                            }
                            else if (status == "relevant image4") {
                                vm.relevanttext4 = true;
                                $scope.imageids[3].image = loader;
                                uploadImageService.uploadFileToUrl(vm.relevantImage4Upload).success(function (response) {
                                    $scope.imageids[3].image = response.data;
                                    // imageId = response.data;
                                    console.log('response from upload relevant image');
                                    console.log(response);

                                });
                                // vm.relevantImages.image4 = e.target.result;
                            }
                            else if (status == "relevant image5") {
                                vm.relevanttext5 = true;
                                $scope.imageids[4].image = loader;
                                uploadImageService.uploadFileToUrl(vm.relevantImage5Upload).success(function (response) {
                                    $scope.imageids[4].image = response.data;
                                    // imageId = response.data;
                                    console.log('response from upload relevant image');
                                    console.log(response);

                                });
                                // vm.relevantImages.image5 = e.target.result;
                            }
                            else if (status == "relevant image6") {
                                vm.relevanttext6 = true;
                                $scope.imageids[5].image = loader;
                                uploadImageService.uploadFileToUrl(vm.relevantImage6Upload).success(function (response) {
                                    $scope.imageids[5].image = response.data;
                                    // imageId = response.data;
                                    console.log('response from upload relevant image');
                                    console.log(response);

                                });
                                // vm.relevantImages.image6 = e.target.result;
                            }







                        });
                    }
                });
            }
        };


    }
})();