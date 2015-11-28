angular.module('angularity')
  .filter('firstParagraph', function() {
    return function(string) {
      var array = string.split('</p>'),
        first = array[0].replace('<p>', '');

      return first;
    };
  });
