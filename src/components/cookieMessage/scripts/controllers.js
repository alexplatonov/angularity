
angular.module('angularity')
    .controller('CookieMessageController', function($scope, $cookies) {
        $scope.hideCookieMessage = function() {
            $cookies.put('hideCookieMessage', true);
            $scope.$root.$broadcast('cookie_message_hidden');
        };
    });
