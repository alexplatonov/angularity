angular.module('angularity')

  .directive('bodyClasses', function() {
    return {
      link: function(scope, element) {
        var replaceClass = function(newVal, oldVal) {
          element.removeClass(oldVal);
          element.addClass(newVal);
        };

        // Page name class
        scope.$watch('viewCssClass', replaceClass);
      }
    }
  });
