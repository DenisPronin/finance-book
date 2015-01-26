(function () {
    'use strict';

    angular.module('Book').directive('financeBook', [function(){
        return {
            restrict: 'E',
            templateUrl: 'js/app/book/finance-book-tpl.html',
            replace: true
        }
    }]);

})();
