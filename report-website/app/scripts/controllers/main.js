'use strict';

angular.module('listAllMachinesApp')
    .controller('MainCtrl', function ($scope, ReportService, $anchorScroll, $location) {
        ReportService.getReport().then(function (result) {
            $scope.raw = result.data;
            $scope.data = ReportService.digest(result.data);
            $scope.total = ReportService.getTotal(result.data);
            $scope.showDetails($scope.data.summaryItems[0].subItems[0]);
        }, function () {
            $scope.error = true;
        });


        $scope.showDetails = function (item) {
            $scope.details = _.find($scope.raw.details, { 'account': item.title });
            $location.hash('details');
            $anchorScroll();
        };
    });
