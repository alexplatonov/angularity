
describe('angularity', function () {

    var $filter;

    beforeEach(function () {
        angular.mock.module('angularity');
        angular.mock.inject(function($injector) {
            $filter = $injector.get('$filter');
        });
    });

    it('has a firstParagraph filter', function() {
        expect($filter('firstParagraph')).not.toBeNull();
    });


    describe('firstParagraph filter', function() {
        var firstParagraphFilter;

        beforeEach(function () {
            angular.mock.inject(function($injector) {
                firstParagraphFilter = $injector.get('firstParagraphFilter');
            });
        });

        it('should return the first paragraph (without tags)', function() {

            expect(firstParagraphFilter('<p>First paragraph</p><p>Second paragraph</p><p>Third paragraph</p>')).toBe('First paragraph');

        });

    });

});
