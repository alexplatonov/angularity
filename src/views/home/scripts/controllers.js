angular.module('angularity')

    .controller('HomeController', function($scope) {
        $scope.$root.viewName = 'Home';
        $scope.$root.viewCssClass = 'home';

        $scope.bodyText = 'Duis tincidunt quam venenatis tellus efficitur, a scelerisque orci volutpat. Aenean sapien justo, feugiat sit amet bibendum in, sodales vulputate sem. Proin vel auctor eros. Praesent sit amet justo purus. Nullam quis mollis nunc, pulvinar cursus sem. Integer dignissim arcu in erat aliquet dapibus. Duis imperdiet, felis non dignissim dignissim, mauris ex sagittis metus, quis malesuada nisl justo eu mi. Ut at est neque. Maecenas ut massa quis dui gravida sodales. Mauris pulvinar diam at pellentesque maximus.';

    });
