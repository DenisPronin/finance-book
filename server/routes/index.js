module.exports = function (app) {
    require('./home')(app);
    require('./auth')(app);
    require('./accounts')(app);
    require('./income')(app);
    require('./debts')(app);
    require('./costs')(app);
};

