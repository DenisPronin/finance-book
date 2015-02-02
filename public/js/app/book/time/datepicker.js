(function () {
    'use strict';

    angular.module('App').directive('datepicker', function(){
        return {
            restrict: 'A',
            scope: {
                ngModel: '='
            },
            link: function(scope, element, attrs) {
                var date =  moment(scope.ngModel, 'DD/MM/YYYY');
                $(element).datepicker({
                    autoclose: true,
                    format: 'dd/mm/yyyy'
                });
                $(element).datepicker('setDate', date.toDate())
            }
        };
    });

})();
