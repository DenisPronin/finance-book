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
            $scope.selectedAccount = null;
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
            accountsApi.addAccount($scope.newAccount).then(function(accountId) {
                var account = $scope.newAccount;
                account.id = accountId;
                $scope.accounts.push(account);
                $scope.newAccount = null;
            });
        };

        $scope.deleteAccount = function() {
            if($scope.selectedAccount) {
                var accountId = $scope.selectedAccount.id;
                accountsApi.deleteAccount(accountId).then(function() {
                    $scope.accounts = $scope.accounts.filter(function(_account) {
                        return _account.id !== accountId;
                    });
                });
            }
        };

        $scope.showEditAccountForm = function() {
            if($scope.selectedAccount) {
            }
        };

        $scope.editAccount = function() {
            if($scope.selectedAccount) {
            }
        };

        $scope.selectedAccount = null;
        $scope.selectRow = function(account) {
            $scope.selectedAccount = account;
        };

        var getAccounts = function() {
            accountsApi.getAccounts().then(function(accounts) {
                $scope.accounts  = accounts;
            });
        };

    }]);

})();
