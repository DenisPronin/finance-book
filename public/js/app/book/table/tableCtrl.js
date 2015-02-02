(function () {
    'use strict';

    angular.module('Book').controller('tableCtrl', ['$scope', 'Time', 'currencyApi', 'accountsApi', 'incomeApi', function($scope, Time, currencyApi, accountsApi, incomeApi){

        $scope.currencyList = currencyApi.getCurrencyList();

        $scope.tables = {
            accounts: {
                service: accountsApi,
                fieldList: 'accounts',
                active: false
            },
            income: {
                service: incomeApi,
                fieldList: 'income',
                active: false
            }
        };


        $scope.$watch(function() {
            return Time.getMonth();
        }, function(newValue){
            if(newValue) {
                for (var mode in $scope.tables) {
                    getTableData($scope.tables[mode]);
                }
            }
        });

        $scope.$watch(function() {
            return Time.getYear();
        }, function(newValue){
            if(newValue) {
                for (var mode in $scope.tables) {
                    getTableData($scope.tables[mode]);
                }
            }
        });

        var getTableData = function(table) {
            table.service.get().then(function(data) {
                $scope[table.fieldList] = data;
            });
        };

        $scope.newRow = null;
        $scope.selectedRow = null;
        $scope.editedRow = null;

        $scope.showAddForm = function(propertiesObj) {
            $scope.selectedRow = null;
            $scope.editedRow = null;
            $scope.newRow = angular.copy(propertiesObj);
        };

        $scope.addRow = function(mode) {
            $scope.newRow.order_num = $scope[mode].length + 1;
            $scope.tables[mode].service.add($scope.newRow).then(function(rowId) {
                var row = $scope.newRow;
                row.id = rowId;
                $scope[mode].push(row);
                $scope.cancelAdding();
            });
        };

        $scope.cancelAdding = function() {
            $scope.newRow = null;
        };

        $scope.deleteRow = function(mode) {
            if($scope.selectedRow) {
                var rowId = $scope.selectedRow.id;
                var service = $scope.tables[mode].service;
                service.deleteRow(rowId).then(function() {
                    $scope[mode] = $scope[mode].filter(function(_row) {
                        return _row.id !== rowId;
                    });
                });
            }
        };

        $scope.showEditRowForm = function(event, row) {
            event.stopPropagation();
            $scope.editedRow = angular.copy(row);
        };

        $scope.cancelEditRow = function() {
            event.stopPropagation();
            $scope.editedRow = null;
            $scope.selectedRow = null;
        };

        $scope.editRow = function(mode) {
            event.stopPropagation();
            if($scope.editedRow) {
                var service = $scope.tables[mode].service;
                service.edit($scope.editedRow).then(function(rowId) {
                    for (var i = 0; i < $scope[mode].length; i++) {
                        if($scope[mode][i].id === rowId) {
                            $scope[mode][i] = $scope.editedRow;
                            break;
                        }
                    }
                    $scope.cancelEditRow();
                }, function() {
                    alert('Account don\'t edited');
                    $scope.cancelEditRow();
                });
            }
        };

        $scope.checkNewRow = function(mode) {
            return $scope.newRow && $scope.tables[mode].active;
        };

        $scope.selectRow = function(row, mode) {
            if($scope.compareRow($scope.editedRow, row, mode)) {
                return false;
            }
            $scope.editedRow = null;
            $scope.selectedRow = row;
        };

        $scope.activateTable = function(mode) {
            for (var _mode in $scope.tables) {
                $scope.tables[_mode].active = _mode === mode;
            }
        };

        $scope.compareRow = function(row1, row2, mode) {
            return (row1 && row2 && row1.id === row2.id && $scope.tables[mode].active)
        };

        $scope.showCurrencySign = function(currency_id) {
            var currency = currencyApi.getCurrencyById(currency_id);
            return currency.sign;
        };

        $scope.tdLength = function(props) {
            return Object.keys(props).length + 2;
        };
    }]);

})();
