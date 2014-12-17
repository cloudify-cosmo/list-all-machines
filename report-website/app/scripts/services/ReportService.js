'use strict';

angular.module('listAllMachinesApp')
    .service('ReportService', function ReportService($http) {
        this.getReport = function () {
            return $http.get('/list-all-machines-report.json');
        };


        this.digest = function (rawReport) {
            var result = { summaryItems: [] };

            var summaryAgg = {};

            _.each(rawReport.summary, function (item) {
                if (!summaryAgg.hasOwnProperty(item.type)) {
                    summaryAgg[item.type] = { 'title': item.type, 'total': 0, subItems: [] };
                }

                summaryAgg[item.type].total += item.total;
                summaryAgg[item.type].subItems.push({ 'title': item.account, 'total': item.total });

            });

            result.summaryItems = _.map(summaryAgg, function (item) {
                return item;
            });
            return result;
        };

        this.getTotal = function(rawReport){
            var summaryItems = this.digest(rawReport).summaryItems;
            var total = 0;

            for (var i = 0; i < summaryItems.length; i++) {
                var item = summaryItems[i];
                total += item.total;
            }

            return total;
        }

    });


