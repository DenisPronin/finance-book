(function () {
    'use strict';

    angular.module('Book').controller('costsCtrl', ['$scope', 'costsApi', 'Time', function($scope, costsApi, Time) {

        $scope.costs = [];

        $scope.$watch(function() {
            return Time.getMonth();
        }, function(newValue, oldValue){
            if(newValue) {
                getCosts();
            }
        });

        $scope.$watch(function() {
            return Time.getYear();
        }, function(newValue, oldValue){
            if(newValue !== oldValue) {
                getCosts();
            }
        });

        var getCosts = function() {
            costsApi.getCosts().then(function(costs) {
                $scope.costs  = costs;
            });
        };

    }]);

})();
