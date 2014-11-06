'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('listAllMachinesApp'));

    var MainCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
    }));

    it('should attach showDetails on scope', function () {
        expect(typeof(scope.showDetails)).toBe('function');
    });
});
