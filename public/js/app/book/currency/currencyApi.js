(function(){
    "use strict";

    angular.module('Book').service('currencyApi', [function(){
        var me = this;

        var currency = [{
            id: 1,
            name: 'dollar',
            nameRus: 'доллар',
            sign: '$'
        }, {
            id: 2,
            name: 'rouble',
            nameRus: 'рубль',
            sign: 'руб.'
        }];

        me.getCurrencyList = function(){
            return currency;
        };

        me.getCurrencyById = function(id) {
            var res = currency.filter(function(_cur) {
                return _cur.id === id;
            });
            if(res[0]) {
                return res[0];
            }
            return null;
        };

    }]);

})();