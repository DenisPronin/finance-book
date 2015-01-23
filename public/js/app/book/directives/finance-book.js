(function () {
    'use strict';

    angular.module('Book').directive('financeBook', [function(){
        return {
            restrict: 'E',
            templateUrl: 'js/app/book/templates/finance-book-tpl.html',
            replace: true
        }
    }]);

})();
