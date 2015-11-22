angular.module('angularity')
    .factory('dataService', function($rootScope, $http, $q) {

        var dataService = {},
            txtData = false;

        dataService.getTxt = function() {
            var deferred = $q.defer();

            if (!txtData) {

                var getTxtJson = function(locale) {
                    $http({
                        url: '/i18n/' + locale + '.json',
                        method: 'GET'
                    }).success(function(data) {
                        txtData = data;
                        deferred.resolve(txtData);
                        $rootScope.txt = txtData;
                    }).error(function(data, status) {
                        deferred.resolve('error');
                        console.log('Failed to get locale txt: ' + status);
                    });
                };

                getTxtJson($rootScope.locale);

            } else {
                deferred.resolve(txtData);
            }

            return deferred.promise;
        };

        return dataService;
    })

    .service('queryString', function($window) {

        // Wrapper function for window.location.search, which cannot
        // be stubbed unless you wrap it in a function
        this.getQueryString = function() {
            return $window.location.search.substring(1);
        };

        this.getQueryParam = function(key) {
            var query = this.getQueryString();
            var vars = query.split('&');
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');
                if (pair[0] === key) {
                    return pair[1];
                }
            }
            return ('');
        };

        this.getAllQueryParams = function() {
            var query = this.getQueryString(),
                vars = query.split('&'),
                queryParams = {},
                pair;

            for (var i = 0; i < vars.length; i++) {
                pair = vars[i].split('=');
                queryParams[pair[0]] = pair[1];
            }
            return queryParams;
        };

        this.fromObject = function(obj, keyFormat, encode) {
            var array = [],
                format = function(str) {
                    if (keyFormat === 'toUnderscore') {
                        return str.replace(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase();
                    } else {
                        return str;
                    }
                };
            for (var prop in obj) {
                var key = prop,
                    val = obj[key];

                if (keyFormat) {
                    key = format(key);
                }

                if (encode) {
                    key = encodeURIComponent(key);
                    val = encodeURIComponent(val);
                }

                if (typeof val === 'object') {
                    for (var v in val) {
                        array.push(key + '=' + val[v]);
                    }
                } else if (key === 'identification' || key === 'url' || key === 'referrer') {
                    array.push(key + '=' + encodeURIComponent(val));
                } else {
                    array.push(key + '=' + val);
                }
            }
            return array.join('&');
        };
    })
    .service('googleAnalytics', function($rootScope, $location, $window) {
        var googleAnalytics = {};

        googleAnalytics.trackEvent = function(eventCategory, eventType, eventLabel) {
            $window.ga(
                'send',
                'event',
                eventCategory,
                eventType,
                label
            );
        };

        return googleAnalytics;
    });
