describe('angularity', function() {

    var $scope,
        $compile,
        compileDirective = function (markup, scope) {
            var el = $compile(markup)(scope);
            scope.$digest();
            return el;
        };

    beforeEach(function() {

        angular.mock.module('angularity');

        angular.mock.inject(function($injector) {
            $scope = $injector.get('$rootScope').$new();
            $compile = $injector.get('$compile');
        });

    });

    describe('bodyClasses directive', function() {

        var directive,
            bodyElement;

        beforeEach(function() {

            $scope.viewCssClass = '';

        });

        it('should change the css class on the body element', function() {

            bodyElement = compileDirective('<div data-body-classes></div>', $scope);

            $scope.viewCssClass = 'home';
            $scope.$digest();

            expect(bodyElement.hasClass('home')).toBeTruthy();

            bodyElement = compileDirective('<div data-body-classes></div>', $scope);
            $scope.viewCssClass = 'about';
            $scope.$digest();

            expect(bodyElement.hasClass('about')).toBeTruthy();

        });


    });


});
