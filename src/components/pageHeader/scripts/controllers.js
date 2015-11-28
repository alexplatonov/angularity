angular.module('angularity')
  .controller('MainNavController', function($scope) {
    $scope.mainNavLinks = [
      {
        label: 'Home',
        href: '/'
      },
      {
        label: 'About',
        href: '/about'
      }
    ]
  })
