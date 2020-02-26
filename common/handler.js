let mysql = require('mysql');
let config = require('./config');
let mysqlPool = mysql.createPool(config["database"]);

let accessKey = "D54E8A6ADEB3A3F801D5E6A3FB6F22B0E4E9C66A";

function sendResult(res, body, error, errorMessage) {
    let resultCode = (error === true) ? 400 : 200;
    let serverTime = new Date().getTime();
    let result = {
        statusCode: resultCode,
        serverTime: serverTime,
        body: body
    };
    if (error) {
        result["errorMessage"] = errorMessage ? errorMessage : error;
    }
    res.status(200).send(result);
}

function dbConnect(needAuthorize, req, res, bodyFunction) { // bodyFunction: Function(con: connection, callback: function)
    if (needAuthorize && config["isPrivate"] && req.headers["access-key"] !== accessKey) {
        res.status(401).send({
            statusCode: 401,
            errorMessage: "401 Unauthorized Error."
        });
        return;
    }
    mysqlPool.getConnection(function (err, connection) {
        if (err) {
            console.log(err);
            res.status(500).send({
                statusCode: 500,
                errorMessage: "500 Internal Server Error."
            });
        } else {
            bodyFunction(connection, function (body, error, errorMessage) {
                sendResult(res, body, error, errorMessage);
                connection.release();
            });
        }
    });
}

module.exports = function (needAuthorize) {
    return {
        dbConnect: function (req, res, bodyFunction) {
            dbConnect(needAuthorize, req, res, bodyFunction);
        },
        sendResult: function (res, body, error, errorMessage) {
            sendResult(res, body, error, errorMessage)
        }
    }
};