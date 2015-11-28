angular.module('angularity')
  .directive('cookieMessage', function($templateCache, $cookies) {
    return {
      template: $templateCache.get('cookieMessage/cookieMessage.html'),
      restrict: 'A',
      controller: 'CookieMessageController',
      link: function(scope, element) {

        if ($cookies.get('hideCookieMessage')) {
          element.css({
            'display': 'none'
          });
        }
        scope.$on('cookie_message_hidden', function() {
          element.css({
            'display': 'none'
          });
        });
      }
    };
  });
