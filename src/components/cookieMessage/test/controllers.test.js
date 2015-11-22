
describe('CookieMessageController', function() {

    var $scope,
        $cookies;

    beforeEach(function() {

        angular.mock.module('angularity');

        angular.mock.inject(function($injector, $controller) {
            $scope = $injector.get('$rootScope').$new();
            $cookies = $injector.get('$cookies');
            $controller('CookieMessageController', {$scope: $scope});
        });

        spyOn($scope.$root, '$broadcast').and.stub();
        spyOn($scope.loading, 'start').and.stub();
        spyOn($scope.loading, 'stop').and.stub();

    });

    describe('hideCookieMessage method', function() {
        it('should broadcast event and add an item to local storage', function() {

            spyOn($scope, 'hideCookieMessage').and.callThrough();
            $scope.hideCookieMessage();

            expect($scope.$root.$broadcast).toHaveBeenCalledWith('cookie_message_hidden');
            expect($cookies.get('hideCookieMessage')).toBe('true');

        });
    });

});