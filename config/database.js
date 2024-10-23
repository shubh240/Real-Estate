const { Client } = require('pg');
const { IS_PRODUCTION } = require('./constants');
let con = {}

if (IS_PRODUCTION) {
    console.log("local");
    con = new Client({
        user: process.env.DATABASE_USER,
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASS,
        port: 5432,
    });
} else {
    console.log("live");
    con = new Client({
        user: process.env.DATABASE_USER_LIVE,
        host: process.env.DATABASE_HOST_LIVE,
        database: process.env.DATABASE_NAME_LIVE,
        password: process.env.DATABASE_PASS_LIVE,
        port: 5432,
        ssl: {
            rejectUnauthorized: false
        }
    });
}

con.connect().then(() => {
    console.log('\x1b[4mSuccess\x1b[0m');
}).catch((err) => {
    console.log("error db", err);
});

module.exports = con;