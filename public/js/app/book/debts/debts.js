(function () {
    'use strict';

    angular.module('Book').directive('debts', [function(){
        return {
            restrict: 'E',
            templateUrl: 'js/app/book/debts/debts-tpl.html',
            replace: true
        }
    }]);

})();
