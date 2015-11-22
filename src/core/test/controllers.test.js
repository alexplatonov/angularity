describe('CoreController', function() {

    var $scope,
        $window;

    beforeEach(function() {
        $window = {};

        angular.mock.module('angularity');
        angular.mock.module(function($provide) {
            $provide.value('$window', $window);
        });

        angular.mock.inject(function($injector, $controller) {
            $scope = $injector.get('$rootScope').$new();
            $controller('CoreController', {$scope: $scope});
        });

        spyOn($scope.$root, '$broadcast').and.stub();
        spyOn($scope.loading, 'start').and.stub();
        spyOn($scope.loading, 'stop').and.stub();

    });

    describe('hello method', function() {
        beforeEach(function() {

        });

        it('should say hello', function(){

            expect($scope.hello).toBe('Hello Universe!');

        });


    });


});

