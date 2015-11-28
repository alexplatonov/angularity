describe('angularity', function() {

  var $rootScope,
    $window,
    dataService,
    deferred;

  beforeEach(function() {
    $window = {};

    angular.mock.module('angularity');
    angular.mock.module(function($provide) {
      $provide.value('$window', $window);
    });

    angular.mock.inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $q = $injector.get('$q');

      dataService = $injector.get('dataService');
    });

    deferred = $q.defer();

    $window.appConfig = {
      appName: 'test'
    };

    spyOn($rootScope, '$broadcast').and.callThrough();

    spyOn($rootScope, 'initApp').and.callThrough();
    spyOn(dataService, 'getTxt').and.callFake(function() {
      return deferred.promise;
    });

  });

  describe('setRootParams method', function() {

    it('should set root params when the structure is loaded', function() {
      $rootScope.initApp();
      expect($rootScope.appName).toBeDefined();
    });

  });

  describe('loading functions', function() {

    beforeEach(function(){
      spyOn($rootScope.loading, 'start').and.callThrough();
      spyOn($rootScope.loading, 'stop').and.callThrough();
    });

    it('should start loading', function() {
      $rootScope.loading.start();
      expect($rootScope.$broadcast).toHaveBeenCalledWith('loading_started');
      expect($rootScope.viewState).toBe('loading');
    });

    it('should stop loading', function() {
      $rootScope.loading.stop();
      expect($rootScope.$broadcast).toHaveBeenCalledWith('loading_complete');
      expect($rootScope.viewState).toBe('ready');
    });

  });


  describe('initApp method', function() {

    it('should call getTxt function', function() {
      $rootScope.initApp();
      expect(dataService.getTxt).toHaveBeenCalled();
    });

    it('should stop loading when got Txt', function() {

      spyOn($rootScope.loading, 'stop').and.stub();

      $rootScope.initApp();
      expect(dataService.getTxt).toHaveBeenCalled();

      deferred.resolve('test_localised_txt');
      $rootScope.$digest();

      expect($rootScope.loading.stop).toHaveBeenCalled();

    });
  });

});

