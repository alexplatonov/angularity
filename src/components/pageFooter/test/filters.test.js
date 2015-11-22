
describe('angularity', function () {

    var $filter;

    beforeEach(function () {
        angular.mock.module('angularity');
        angular.mock.inject(function($injector) {
            $filter = $injector.get('$filter');
        });
    });

    it('has a setCurrentYear filter', function() {
        expect($filter('setCurrentYear')).not.toBeNull();
    });


    describe('setCurrentYear filter', function() {
        var setCurrentYearFilter;

        beforeEach(function() {
            angular.mock.inject(function($injector) {
                setCurrentYearFilter = $injector.get('setCurrentYearFilter');
            });
        });

        it('should replace {currentYear} with the current year', function() {
            var currentYear = (new Date()).getFullYear();

            expect(setCurrentYearFilter('The year is {currentYear}')).toBe('The year is ' + currentYear.toString());
        });

        it('should return a string not containing {currentYear} unchanged', function() {
            var testString = 'Test string that should not be changed.';

            expect(setCurrentYearFilter(testString)).toBe(testString);
        });

        it('should not throw an error if the string is undefined', function() {
            expect(setCurrentYearFilter(undefined)).toBeUndefined();
        });
    });
});
