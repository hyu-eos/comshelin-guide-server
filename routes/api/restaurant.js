let router = require('express').Router();
let dbHandler = require('../../common/handler')(false);

/* GET home page. */
router.get('/', function (req, res, next) {
    dbHandler.dbConnect(req, res, function (conn, callback) {
        conn.query("SELECT * FROM restaurant", [], function (err, rows) {
            if (err) {
                callback(null, err);
            }
            callback(rows);
        });
    });
});

router.post('/', function (req, res, next) {
    var value = req.body;
    dbHandler.dbConnect(req, res, function (conn, callback) {
        conn.query("INSERT INTO restaurant SET ?", value, function (err, rows) {
            if (err) {
                callback(null, err);
            }
            callback(rows);
        });
    });
});

module.exports = router;
