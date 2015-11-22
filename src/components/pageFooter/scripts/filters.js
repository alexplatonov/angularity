angular.module('angularity')
    .filter('setCurrentYear', function() {
        return function(text) {
            if (text !== undefined) {
                var currentDate = new Date();

                text = text.replace(
                    '{currentYear}',
                    currentDate.getFullYear()
                );
            }

            return text;
        };
    });
