const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "127.0.0.1",          // Palvelimen osoite
  user: "root",               // Oletuskäyttäjä
  password: "root",       // Asetettu salasana, itse asetettu
  database: "toimitilavuokra" // Tietokanta
});

module.exports = pool;