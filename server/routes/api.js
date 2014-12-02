module.exports = function (app) {
    app.get('/api/name', function (req, res, next) {
        req.getConnection(function(err, connection){
            if (err) return next(err);
            connection.query('SELECT * from test', [], function(err, results) {
                if (err) return next(err);

                res.json(results);
            });

        });
    });

};
