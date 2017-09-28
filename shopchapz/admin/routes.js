

(function() {
    'use strict';
    var app = angular.module('app');

    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', configureState]);

    function configureState($stateProvider, $urlRouterProvider, $locationProvider) {
        //$locationProvider.html5Mode(true);
        $stateProvider

        .state("login", {
            url: '/login',
            views: {
                "content@": {
                    templateUrl: 'app/templates/login.html',
                },
            }
        })
        .state("signup", {
            url: '/signup',
            views: {
                "content@": {
                    templateUrl: 'app/templates/signup.html',
                },
            }
        })


        .state("forgot", {
            url: '/forgot',
            views: {
                "content@": {
                    templateUrl: 'app/templates/forgot.html',
                },
            }
        })
        .state("updatepassword", {
            url: '/updatepassword',
            views: {
                "content@": {
                    templateUrl: 'app/templates/updatepassword.html',
                },
            }
        })
        .state("home", {
            url: '/home',
            views: {
                "content@": {
                    templateUrl: 'app/templates/home.html',
                },
            }
        })

       

        $urlRouterProvider.otherwise('/login');






    }
})();






// var app = angular.module("app", ["ngRoute",
//     "ngAnimate",
//     "ngMaterial",
//     "ngMessages",
//     "ngStorage"

// ]);
// app.config(function ($routeProvider, $locationProvider) {
//     $routeProvider
//         .when("/login", {
//             templateUrl: "app/templates/login.html",
//             controller: "login"
//         })
//         .when("/signup", {
//             templateUrl: "app/templates/signup.html",
//             controller: "signup"
//         })
//         .when("/forgot", {
//             templateUrl: "app/templates/forgot.html",
//             controller: "forgot"
//         })
//         .when("/home", {
//             templateUrl: "app/templates/home.html",
//             controller: "home"
//         })

//         .otherwise({
//             // templateUrl : "Templates/main.html",
//             templateUrl: "app/templates/login.html"

//         });

// });

// app.controller("login", function ($scope, $location) {
//     $scope.gotohome = function () {
//         console.log("func called");
//         $location.path("/home");
//     }

    

// });
// app.controller("signup", function ($scope) {

// });
// app.controller("forgot", function ($scope) {

// });
// app.controller("home", function ($scope,$timeout,$location) {

//     var vm = this;



//     this.logout =function(){
//         console.log("logout called");
//         $location.path("/login");
//     }


//     vm.logo = {
//         image: ""
//     }

//     vm.relevantImages = {
//         image1:""
//     } 

//     $scope.change = function (files, status) {


//         if (files != null) {
//             var file = files[0];
//             $timeout(function () {
//                 var fileReader = new FileReader();
//                 fileReader.readAsDataURL(file);
//                 fileReader.onload = function (e) {
//                     $timeout(function () {
//                         console.log($scope.statusofaddimages);
//                         console.log(status);

//                          if (status == "Logo image") {
//                             vm.Logotext = true;
//                             vm.logo.image = e.target.result;
//                         }
//                         else if (status == "relevant image1") {
//                             vm.relevanttext1 = true;
//                             vm.relevantImages.image1 = e.target.result;
//                         }
                       






//                     });
//                 }
//             });
//         }
//     };

// });
