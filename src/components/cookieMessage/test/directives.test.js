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
    describe('cookieMessage directive', function() {

        var $cookies,
            cookieMessage,
            hiddenCookieMessage;

        beforeEach(function() {

            angular.mock.inject(function($injector) {
                $cookies = $injector.get('$cookies');
            });


            $cookies.remove('hideCookieMessage');
            cookieMessage = compileDirective('<div data-cookie-message></div>', $scope);


        });

        it('should render the cookie message', function() {

            expect(cookieMessage.find('p')).toBeTruthy();
            expect(cookieMessage.find('button')).toBeTruthy();

            expect(cookieMessage.css('display')).toBe('');

        });


        it('should hide the cookie message', function() {

            $cookies.put('hideCookieMessage', true);
            hiddenCookieMessage = compileDirective('<div data-cookie-message></div>', $scope);

            expect(hiddenCookieMessage.css('display')).toBe('none');

            expect(cookieMessage.css('display')).toBe('');
            $scope.$broadcast('cookie_message_hidden');
            expect(cookieMessage.css('display')).toBe('none');

        });

    });
});
