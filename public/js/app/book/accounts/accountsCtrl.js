(function () {
    'use strict';

    angular.module('Book').controller('accountsCtrl', ['$scope', 'accountsApi', 'Time', function($scope, accountsApi, Time) {

        $scope.accounts = [];

        $scope.$watch(function() {
            return Time.getMonth();
        }, function(newValue, oldValue){
            if(newValue) {
                getAccounts();
            }
        });

        $scope.$watch(function() {
            return Time.getYear();
        }, function(newValue, oldValue){
            if(newValue !== oldValue) {
                getAccounts();
            }
        });

        var getAccounts = function() {
            accountsApi.getAccounts().then(function(accounts) {
                $scope.accounts  = accounts;
            });
        };

    }]);

})();
