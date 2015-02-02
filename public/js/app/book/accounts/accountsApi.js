(function () {
    'use strict';

    angular.module('Book').service('accountsApi', ['$http', '$q', 'Time', 'bookService', function($http, $q, Time, bookService) {

        var me = this;
        var mode = 'accounts';

        me.get = function(){
            return bookService.getTableData(mode);
        };

        me.add = function(newAccount) {
            return bookService.addRow(newAccount, mode);

        };

        me.deleteRow = function(accountId) {
            return bookService.deleteRow(accountId, mode);
        };

        me.edit = function(account) {
            return bookService.editRow(account, mode);
        };

    }]);

})();
