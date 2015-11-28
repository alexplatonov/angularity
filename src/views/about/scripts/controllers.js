angular.module('angularity')

  .controller('AboutController', function($scope) {
    $scope.$root.viewName = 'About';
    $scope.$root.viewCssClass = 'about';

    $scope.bodyText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras semper est vel nibh porttitor molestie. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec sollicitudin convallis elementum. In rutrum nisi erat, ut efficitur nibh egestas at. Aenean at velit eu diam vehicula aliquam. In scelerisque tellus metus, in efficitur eros consequat eget. Sed sed lobortis mi, ut ornare tortor. Maecenas vel nisi vel arcu tincidunt dignissim eget sit amet ipsum. Integer erat orci, pretium in eros commodo, euismod venenatis arcu. Vivamus sodales, erat sit amet accumsan porta, nibh metus feugiat lectus, at malesuada augue nibh sit amet elit. Sed vehicula ultrices erat, sed auctor sapien commodo a. Sed id dolor pretium, posuere ante vel, feugiat lorem. Aliquam diam nisl, accumsan et nulla nec, consectetur elementum odio.';

  });
