(function() {
    'use strict';
    var app = angular.module('app');

    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider','$authProvider', configureState]);

    function configureState($stateProvider, $urlRouterProvider, $locationProvider,$authProvider) {
        // $locationProvider.html5Mode(true);
        $stateProvider

        .state("login", {
            url: '/login',
            views: {
                "content@": {
                    templateUrl: 'app/templates/login.html',
                    controller: 'login'
                },

                "header@": {
                    templateUrl: 'app/templates/header.html',
                },

                "footer@": {
                    templateUrl: 'app/templates/footer.html',
                }
            }
        })
        .state("register", {
            url: '/register',
            views: {
                "content@": {
                    templateUrl: 'app/templates/register.html',
                    controller: 'register'
                },

                "header@": {
                    templateUrl: 'app/templates/header.html',
                },

                "footer@": {
                    templateUrl: 'app/templates/footer.html',
                }
            }
        })

        .state("update-profile", {
            url: '/update-profile',
            views: {
                "content@": {
                    templateUrl: 'app/templates/update-profile.html',
                    controller: 'updateprofile'
                },

                "header@": {
                    templateUrl: 'app/templates/header.html',
                },

                "footer@": {
                    templateUrl: 'app/templates/footer.html',
                }
            }
        })

        .state("forgotpassword", {
            url: '/forgotpassword',
            views: {
                "content@": {
                    templateUrl: 'app/templates/forgot-password.html',
                    controller: 'forgotpassword'
                },

                "header@": {
                    templateUrl: 'app/templates/header.html',
                },

                "footer@": {
                    templateUrl: 'app/templates/footer.html',
                }
            }
        })

        .state("changepassword", {
            url: '/changepassword',
            views: {
                "content@": {
                    templateUrl: 'app/templates/change-password.html',
                    controller: 'changepassword'
                },

                "header@": {
                    templateUrl: 'app/templates/header.html',
                },

                "footer@": {
                    templateUrl: 'app/templates/footer.html',
                }
            }
        })
        .state("updatepassword", {
            url: '/updatepassword',
            views: {
                "content@": {
                    templateUrl: 'app/templates/updatepassword.html',
                    controller: 'updatepassword'
                },

                "header@": {
                    templateUrl: 'app/templates/header.html',
                },

                "footer@": {
                    templateUrl: 'app/templates/footer.html',
                }
            }
        })

        .state("dashboard", {
            url: '/dashboard',
            views: {
                "content@": {
                    templateUrl: 'app/templates/dashboard.html',
                    controller: 'dashboard'
                },

                "header@": {
                    templateUrl: 'app/templates/header.html',
                },

                "footer@": {
                    templateUrl: 'app/templates/footer.html',
                }
            }
        })
        .state("search-results", {
            url: '/search-results',
            views: {
                "content@": {
                    templateUrl: 'app/templates/search-results.html',
                    controller: 'search'
                },

                "header@": {
                    templateUrl: 'app/templates/header.html',
                },

                "footer@": {
                    templateUrl: 'app/templates/footer.html',
                }
            }
        })

        .state("contact", {
            url: '/contact',
            views: {
                "content@": {
                    templateUrl: 'app/templates/contact.html',
                    controller: 'contact'
                },

                "header@": {
                    templateUrl: 'app/templates/header.html',
                },

                "footer@": {
                    templateUrl: 'app/templates/footer.html',
                }
            }
        })

        .state("store", {
            url: '/store',
            views: {
                "content@": {
                    templateUrl: 'app/templates/store.html',
                    controller: 'store'
                },

                "header@": {
                    templateUrl: 'app/templates/header.html',
                },

                "footer@": {
                    templateUrl: 'app/templates/footer.html',
                }
            }
        })

        .state("terms", {
            url: '/terms',
            views: {
                "content@": {
                    templateUrl: 'app/templates/terms.html',
                },

                "header@": {
                    templateUrl: 'app/templates/header.html',
                },

                "footer@": {
                    templateUrl: 'app/templates/footer.html',
                }
            }
        })

        .state("faq", {
            url: '/faq',
            views: {
                "content@": {
                    templateUrl: 'app/templates/faq.html',
                },

                "header@": {
                    templateUrl: 'app/templates/header.html',
                },

                "footer@": {
                    templateUrl: 'app/templates/footer.html',
                }
            }
        })

        .state("privacy-policy", {
            url: '/privacy-policy',
            views: {
                "content@": {
                    templateUrl: 'app/templates/privacy-policy.html',
                },

                "header@": {
                    templateUrl: 'app/templates/header.html',
                },

                "footer@": {
                    templateUrl: 'app/templates/footer.html',
                }
            }
        })

        .state("about", {
            url: '/about',
            views: {
                "content@": {
                    templateUrl: 'app/templates/about.html',
                },

                "header@": {
                    templateUrl: 'app/templates/header.html',
                },

                "footer@": {
                    templateUrl: 'app/templates/footer.html',
                }
            }
        })
        .state("howtosell", {
            url: '/howtosell',
            views: {
                "content@": {
                    templateUrl: 'app/templates/howtosell.html',
                },

                "header@": {
                    templateUrl: 'app/templates/header.html',
                },

                "footer@": {
                    templateUrl: 'app/templates/footer.html',
                }
            }
        })
        .state("terms-and-conditions", {
            url: '/terms-and-conditions',
            views: {
                "content@": {
                    templateUrl: 'app/templates/terms-and-conditions.html',
                },

                "header@": {
                    templateUrl: 'app/templates/header.html',
                },

                "footer@": {
                    templateUrl: 'app/templates/footer.html',
                }
            }
        })

        $urlRouterProvider.otherwise('/dashboard');

        //======================== Start satellizer ========================= \\

       $authProvider.facebook({
        clientId: '474822239568942' // ms
    });

    $authProvider.google({
        clientId: '789456698765-h0tb7k83dapsl3dhtalabb3qsli60ts3.apps.googleusercontent.com' //ms
    });

    $authProvider.github({
        clientId: '0ba2600b1dbdb756688b'
    });

    $authProvider.linkedin({
        clientId: '81pik89ylwj96h', //ms

    });

    $authProvider.yahoo({
        clientId: 'dj0yJmk9dkNGM0RTOHpOM0ZsJmQ9WVdrOVlVTm9hVk0wTkRRbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0wMA--'
    });

    $authProvider.live({
        clientId: '000000004C12E68D'
    });

    $authProvider.twitter({
        url: '/auth/twitter'
    });

    $authProvider.oauth2({
        name: 'foursquare',
        url: '/auth/foursquare',
        redirectUri: window.location.origin,
        clientId: 'MTCEJ3NGW2PNNB31WOSBFDSAD4MTHYVAZ1UKIULXZ2CVFC2K',
        authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate',
    });



    //======================== End satellizer ========================= \\


    }
})();
