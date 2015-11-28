angular.module('angularity')

  .controller('Error404Controller', function($scope) {
    $scope.$root.viewName = '404';
    $scope.$root.viewCssClass = 'error404';

    $scope.bodyText = 'Nothing to see here, move along..';

  });
