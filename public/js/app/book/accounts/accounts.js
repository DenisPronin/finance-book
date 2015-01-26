(function () {
    'use strict';

    angular.module('Book').directive('accounts', [function(){
        return {
            restrict: 'E',
            templateUrl: 'js/app/book/accounts/accounts-tpl.html',
            replace: true
        }
    }]);

})();
