(function () {
    'use strict';

    angular.module('Book').service('Time', [function() {

        var me = this;
        var time = {};

        me.init = function() {
            var today = new Date();
            me.setMonth(today.getMonth());
            me.setYear(today.getFullYear());
        };
        
        me.setMonth = function(_monthId) {
            time.month = _monthId || 0;
        };

        me.setYear = function(_year) {
            time.year = _year || 2015;
        };

        me.getMonth = function() {
            var month = months.filter(function(_m) {
                return _m.id === time.month;
            })[0];
            return month;
        };

        me.getYear = function() {
            return time.year;
        };

        me.getMonthsList = function() {
            return months;
        };

        me.splitDate = function(formatDate) {
            var date = moment(formatDate, 'DD/MM/YYYY');
            return {
                day: date.date(),
                month: date.month(),
                year: date.year()
            }
        };

        var months = [
            {
                id: 0,
                ru: 'Январь',
                en: 'January'
            },
            {
                id: 1,
                ru: 'Февраль',
                en: 'February'
            },
            {
                id: 2,
                ru: 'Март',
                en: 'March'
            },
            {
                id: 3,
                ru: 'Апрель',
                en: 'April'
            },
            {
                id: 4,
                ru: 'Май',
                en: 'May'
            },
            {
                id: 5,
                ru: 'Июнь',
                en: 'June'
            },
            {
                id: 6,
                ru: 'Июль',
                en: 'July'
            },
            {
                id: 7,
                ru: 'Август',
                en: 'August'
            },
            {
                id: 8,
                ru: 'Сентябрь',
                en: 'September'
            },
            {
                id: 9,
                ru: 'Октябрь',
                en: 'October'
            },
            {
                id: 10,
                ru: 'Ноябрь',
                en: 'November'
            },
            {
                id: 11,
                ru: 'Декабрь',
                en: 'December'
            }
        ];

    }]);

})();
