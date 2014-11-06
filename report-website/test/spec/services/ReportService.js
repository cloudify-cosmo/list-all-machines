'use strict';

describe('Service: Reportservice', function () {

    // load the service's module
    beforeEach(module('listAllMachinesApp'));

    // instantiate service
    var mReportService;
    beforeEach(inject(function (ReportService) {
        mReportService = ReportService;
    }));

    it('should digest content', function () {
        expect(!!mReportService).toBe(true);


        var data = mReportService.digest({
            'summary' : [
                { 'type' : 'softlayer', 'account' : 'softlayer acount', 'total' : 1 },
                { 'type' : 'softlayer', 'account' : 'softlayer acount 2', 'total' : 1 }
            ]
        });

        expect(data.summaryItems[0].total).toBe(2);
    });

});
