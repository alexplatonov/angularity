angular.module('angularity', [
        'ngSanitize',
        'ngCookies',
        'ngTouch',
        'ngRoute'
    ])
    .config(function($httpProvider, $routeProvider, $locationProvider) {

        // initialize get if not there
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }
        // disable IE ajax request caching
        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Sat, 01 Dec 2001 00:00:00 GMT';

        $routeProvider
            .when('/', {
                // template: $templateCache.get('home.html'),
                templateUrl: 'home/home.html',
                controller: 'HomeController',
            })
            .when('/about', {
                templateUrl: 'about/about.html',
                controller: 'AboutController'
            })
            .otherwise({
                templateUrl: '404/404.html',
                controller: 'Error404Controller'
            });

        $locationProvider.html5Mode(true);
    })

    .run(function($rootScope, $location, $timeout, $filter, $window, googleAnalytics, dataService) {

        var setRootParams = function() {
                $rootScope.appName = $window.appConfig.appName;
                // Hardcoding locale for now
                $rootScope.locale = 'en_GB';
            };

        $rootScope.loading = {
            start: function() {
                $rootScope.viewState = 'loading';
                $rootScope.$broadcast('loading_started');
            },
            stop: function() {
                $rootScope.viewState = 'ready';
                $rootScope.$broadcast('loading_complete');
            }
        };


        $rootScope.trackEvent = function(label, eventType) {
            googleAnalytics.trackEvent(label, eventType);
        };


        $rootScope.initApp = function() {
            setRootParams();
            dataService.getTxt().then(function() {
                $rootScope.loading.stop();
            })

        };


        $rootScope.loading.start();

    });
