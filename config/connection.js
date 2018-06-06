// Setting up connection, requiring pg promises and dbConfig
const pg = require('pg-promise')();
const config = {
  host: 'localhost',
  port: 5432,
  database: 'artbase_db'
}
const db
 = pg(process.env.DATABASE_URL || config);
module.exports = db;


// const db = pgp(config);

// module.exports = process.env.DATABASE_URL || {
//   host: process.env.DB_HOST || 'localhost',
//   port: process.env.DB_PORT || 5432,
//   database: process.env.DB_NAME || 'artbase_db',
// };


// }
