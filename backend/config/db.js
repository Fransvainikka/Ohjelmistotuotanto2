const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "127.0.0.1",          // Palvelimen osoite
  user: "root",               // Oletuskäyttäjä
  password: "root",       // Asetettu salasana, itse asetettu -- ei hyvä salis mut nyt tässä ":D"
  database: "toimitilavuokra" // Tietokanta
});

module.exports = pool;

/*  huomiona: - Muokattu taulukoita vähän
	- ID nouseva kokoajan, ettei tuu samaa id:tä kahdelle ID AI PK 
  - Salasanan varchar(255) - hashays tekee pitkän siitä 
  - Voi olla että jotain muokkauksia tein*/


  /* Node moduleita oli myös lisättynä, jotta homma toimii:
  npm install react-router-dom */