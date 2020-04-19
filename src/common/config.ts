let dbConfig = {
    DEV: { // dev server common info
        host: '',
        user: '',
        password: '',
        port: 3306,
        database: '',
        connectionLimit: 50
    },
    REAL: { // real server common info
        host: '15.164.234.43',
        user: 'comshelin',
        password: 'comshelin123!@#',
        port: 3306,
        database: 'comshelin',
        connectionLimit: 50
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

let accessKey = "D54E8A6ADEB3A3F801D5E6A3FB6F22B0E4E9C66A";

let currentConfig = config["DEV"];

export default currentConfig;