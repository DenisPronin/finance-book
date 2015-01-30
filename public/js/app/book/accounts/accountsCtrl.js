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
            $scope.editedAccount = null;
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

        $scope.editedAccount = null;
        $scope.showEditAccountForm = function(event, account) {
            event.stopPropagation();
            $scope.editedAccount = angular.copy(account);
        };

        $scope.cancelEditAccount = function() {
            event.stopPropagation();
            $scope.editedAccount = null;
            $scope.selectedAccount = null;
        };

        $scope.editAccount = function() {
            event.stopPropagation();
            if($scope.editedAccount) {
                accountsApi.editAccount($scope.editedAccount).then(function(accountId) {
                    for (var i = 0; i < $scope.accounts.length; i++) {
                        if($scope.accounts[i].id === accountId) {
                            $scope.accounts[i] = $scope.editedAccount;
                            break;
                        }
                    }
                    $scope.cancelEditAccount();
                }, function() {
                    alert('Account don\'t edited');
                    $scope.cancelEditAccount();
                });
            }
        };

        $scope.selectedAccount = null;
        $scope.selectRow = function(account) {
            if($scope.compareAccount($scope.editedAccount, account)) {
                return false;
            }
            $scope.editedAccount = null;
            $scope.selectedAccount = account;
        };

        $scope.compareAccount = function(account1, account2) {
            return (account1 && account2 && account1.id === account2.id)
        };

        var getAccounts = function() {
            accountsApi.getAccounts().then(function(accounts) {
                $scope.accounts  = accounts;
            });
        };

    }]);

})();
