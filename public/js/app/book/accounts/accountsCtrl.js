(function () {
    'use strict';

    angular.module('Book').controller('accountsCtrl', ['$scope', 'accountsApi', 'Time', function($scope, accountsApi, Time) {

        $scope.accounts = [];

        $scope.$watch(function() {
            return Time.getMonth();
        }, function(newValue){
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

        $scope.newAccount = null;
        $scope.showAddAccountForm = function() {
            $scope.newAccount = {
                name: '',
                money: ''
            }
        };

        $scope.cancelAddAccount = function() {
            $scope.newAccount = null;
        };

        $scope.addAccount = function() {
            $scope.newAccount.order_num = $scope.accounts.length + 1;
            accountsApi.addAccount($scope.newAccount).then(function(account) {
                $scope.accounts.push(account);
            });
            $scope.newAccount = null;
        };

        var getAccounts = function() {
            accountsApi.getAccounts().then(function(accounts) {
                $scope.accounts  = accounts;
            });
        };

    }]);

})();
