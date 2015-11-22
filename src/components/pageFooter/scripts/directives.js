angular.module('angularity')
    .directive('pageFooter',
        function($rootScope, $templateCache) {
            return {
                restrict: 'A',
                template: $templateCache.get('pageFooter/pageFooter.html'),
                replace: true
            };
        }
    );
