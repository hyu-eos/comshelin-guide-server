let variant = require('./variant');

let dbConfig = {
    DEV: { // dev server common info
        host: '',
        user: '',
        password: '',
        port: 3306,
        database: '',
        connectionLimit : 50
    },
    REAL: { // real server common info
        host: 'localhost',
        user: '',
        password: '',
        port: 3306,
        database: '',
        connectionLimit : 50
    }
};

let config = {
    DEV: {
        debug: true,
        isPrivate: false,
        database: dbConfig.DEV
    },
    REAL: {
        debug: false,
        isPrivate: true,
        database: dbConfig.REAL
    }
};

var currentConfig = config[variant()];

module.exports = currentConfig;
