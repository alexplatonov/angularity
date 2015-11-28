angular.module('angularity')
  .directive('pageHeader',
    function($rootScope, $templateCache) {
      return {
        restrict: 'A',
        template: $templateCache.get('pageHeader/pageHeader.html'),
        replace: true
      };
    }
  )
  .directive('mainNav',
    function($rootScope, $templateCache) {
      return {
        restrict: 'A',
        template: $templateCache.get('pageHeader/mainNav.html'),
        controller: 'MainNavController',
        replace: true
      };
    }
  );
