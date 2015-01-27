module.exports = function (app) {
    require('./home')(app);
    require('./auth')(app);
    require('./accounts')(app);
    require('./income')(app);
    require('./debts')(app);
    require('./costs')(app);

    // handle 500 errors
    app.use(function(err, req, res, next){
        res.status(err.status || 500);
        console.error(err.stack);
        res.json({error: 'Internal Server Error', status: 500});
    });

};

