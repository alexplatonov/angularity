describe('core', function() {
  describe('dataService', function() {

    var $rootScope,
      $httpBackend,
      $q,
      $window,
      service,
      authService,
      answerService,
      deferred;

    beforeEach(function() {
      $window = {};

      angular.mock.module('angularity');
      angular.mock.module(function($provide) {
        $provide.value('$window', $window);
      });

      angular.mock.inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $httpBackend = $injector.get('$httpBackend');

        dataService = $injector.get('dataService');

      });

      $window.appConfig = {
        appName: 'test'
      };

      spyOn($rootScope, '$broadcast').and.callThrough();
      spyOn(dataService, 'getTxt').and.callThrough();


    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    describe('getTxt method', function() {

      beforeEach(function() {

        $rootScope.locale = 'en_GB';
        $rootScope.txt = undefined;

      });

      it('should request the locale txt file', function() {

        $httpBackend.when('GET', '/i18n/en_GB.json')
          .respond({
            text: 'localized text'
          });

        dataService.getTxt();

        $httpBackend.expectGET('/i18n/en_GB.json');
        $httpBackend.flush();

        expect($rootScope.txt).toEqual({
          text: 'localized text'
        });

      });

      it('should throw an error', function() {

        $httpBackend.when('GET', '/i18n/en_GB.json').respond(404);

        dataService.getTxt();
        $httpBackend.expectGET('/i18n/en_GB.json');
        $httpBackend.flush();

        expect($rootScope.txt).toBeUndefined();

      });

    });


  });

  describe('queryString service', function() {
    var queryString,
      testObj;

    beforeEach(function() {

      angular.mock.module('angularity');
      angular.mock.inject(function($injector) {
        queryString = $injector.get('queryString');
      });

      spyOn(queryString, 'getQueryString').and.returnValue('c=EN_us&question=b968a729-0463-4699-869f-c58543cb449d&fish=hat');
    });

    describe('getAllQueryParams', function() {
      it('should return all the query parameters in a url', function() {
        expect(queryString.getAllQueryParams()).toEqual({
          c: 'EN_us',
          question: 'b968a729-0463-4699-869f-c58543cb449d',
          fish: 'hat'
        });
      });
    });

    describe('getQueryParam method', function() {
      it('should return the value of the given query string parameter', function() {
        expect(queryString.getQueryParam('c')).toBe('EN_us');
        expect(queryString.getQueryParam('question')).toBe('b968a729-0463-4699-869f-c58543cb449d');
        expect(queryString.getQueryParam('fish')).toBe('hat');
      });

      it('should return the empty string if the parameter is not present', function() {
        expect(queryString.getQueryParam('hat')).toBe('');
      });
    });

    describe('fromObject method', function() {
      beforeEach(function() {
        testObj = {
          testKey: 'val1',
          anotherTestKey: 'val2',
          options: 'choice1'
        };
      });

      it('should create query string from an object', function() {
        expect(queryString.fromObject(testObj)).toBe('testKey=val1&anotherTestKey=val2&options=choice1');
      });

      it('should change key format from cammelcase to underscore', function() {
        expect(queryString.fromObject(testObj, 'toUnderscore')).toBe('test_key=val1&another_test_key=val2&options=choice1');
      });

      it('should devide multiple choices into separate query string parameters', function() {

        testObj.options = ['choice1', 'choice2', 'choice3'];

        expect(queryString.fromObject(testObj)).toBe('testKey=val1&anotherTestKey=val2&options=choice1&options=choice2&options=choice3');
      });

      it('should encode identification string', function() {

        testObj.identification = 'string with spaces';

        expect(queryString.fromObject(testObj, 'toUnderscore')).toBe('test_key=val1&another_test_key=val2&options=choice1&identification=string%20with%20spaces');
      });
    });
  });
});
