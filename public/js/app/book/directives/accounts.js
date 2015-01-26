(function () {
    'use strict';

    angular.module('Book').directive('accounts', [function(){
        return {
            restrict: 'E',
            templateUrl: 'js/app/book/templates/accounts-tpl.html',
            replace: true
        }
    }]);

})();
