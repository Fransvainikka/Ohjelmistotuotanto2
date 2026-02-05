/* Rekisteröinti: Backendi vastaanottaa frontin pyynnön
Salasana Hashataan bcryptillä, Tallennetaan käyttäjät tauluun (löytyy router.post("/register", async (req, res))
-> saadaan käyttäjän uusi ID. 
Käyttäjän alueet tallennetaan tauluun (TÄTÄ VOIDAAN MIETTIÄ VIEL) */

const express = require("express");
const pool = require("../config/db"); // MariaDB-yhteys
const { hashPassword, comparePassword } = require("../utils/passwordUtils");
const router = express.Router();

// Käyttäjän rekisteröinti
router.post("/register", async (req, res) => {
  const { fullName, email, password, role, areas } = req.body;

  try {
    if (!fullName || !email || !password || !role || !areas) {
      return res.status(400).json({ error: "Kaikki kentät ovat pakollisia." });
    }

    // Muutetaan sähköposti pieniksi kirjaimiksi ennen tallennusta, yritän välttää sen et isot kirjaimet vaikuttas kirjautumiseen
    const cleanEmail = email.trim().toLowerCase();

    // Hashataan käyttäjän salasana suojausta varten
    const hashedPassword = await hashPassword(password);

    const connection = await pool.getConnection();
    
    // TARKISTETAAN, onko sähköposti jo käytössä
    const existingUsers = await connection.query(
      "SELECT * FROM kayttajat WHERE Email = ?",
      [cleanEmail]
    );

    if (existingUsers.length > 0) {
      connection.release();
      return res.status(409).json({ error: "Sähköposti on jo käytössä." });
    }

    // Tallennetaan käyttäjän perustiedot kayttajat-tauluun
    const result = await connection.query(
      "INSERT INTO kayttajat (FullName, Email, Salasana, Role) VALUES (?, ?, ?, ?)",
      [fullName.trim(),cleanEmail, hashedPassword, role.trim()] // Käytetään hashattua salasanaa ja poistetaan välilyönnit
    );
    const userId = result.insertId; // Käyttäjän automaattisesti luotu ID

    // Tallennetaan alueet kolmekaupunkia-tauluun (TÄMÄ VIEL KYSSÄRI)
    for (let i = 0; i < areas.length; i += 3) {
      const [kaupunki1, kaupunki2, kaupunki3] = areas.slice(i, i + 3); // Ryhmitetään alueet kolmeen kaupunkiin
      await connection.query(
        "INSERT INTO kolmekaupunkia (KayttajaID, KaupunkiYKsi, KaupunkiKaksi, KaupunkiKolme) VALUES (?, ?, ?, ?)",
        [
          userId,
          kaupunki1?.trim() || null,
          kaupunki2?.trim() || null,
          kaupunki3?.trim() || null,
        ] // Jos kenttä puuttuu, tallennetaan NULL, ja trimmataan välilyönnit
      );
    }

    connection.release();

    // Palautetaan onnistumisviesti
    res.status(201).json({ message: "Rekisteröinti onnistui!" });
  } catch (err) {
    console.error("Virhe rekisteröinnissä:", err);
    res.status(500).json({ error: "Rekisteröinti epäonnistui." });
  }
});

/*Kirjautuminen backend: Backend hakee tietokannasta tiedot käyttäjän sposti perusteella (asetettu pieniin kirjaimiin)
SELECT * FROM kayttajat WHERE Email = ?
Jos ei löydy -> Virhe
Jos löytyy -> verrataan syötettyä salista hashattyyn salikseen (bcrypt.compare)
--> jos nämä täsmää palautetaan käyttäjän tiedot ja token --> frontti tallentaa tokenin ja siirtyy etusivulle */

// Käyttäjän kirjautuminen
router.post("/login", async (req, res) => {

  console.log("REQ BODY:", req.body); //konsoliin tarkastuksia (tukena ulossyötössä)

  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Sähköposti ja salasana ovat pakollisia." });
    }
  
    // Muutetaan syötetty sähköposti pieniksi kirjaimiksi hakua varten
    const cleanEmail = email.trim().toLowerCase();

    const connection = await pool.getConnection();

 // Haetaan käyttäjä sähköpostin perusteella
const users = await connection.query(
  "SELECT * FROM kayttajat WHERE Email = ?",
  [cleanEmail] // Poistetaan välilyönnit sähköpostista
);
    connection.release();

    console.log("DB RESULT:", users); //Tukena vaan tarkastuksessa, mitä syöttää

    if (users.length === 0) {
      // Käyttäjää ei löytynyt sähköpostin perusteella
      return res.status(401).json({ error: "Virheellinen sähköposti tai salasana." });
    }

    const user = users[0];

    console.log("HASH FROM DB:", user.Salasana); //Debuggia taas

    // Syötetty salasana verrataan tietokannan hashattuun salasanaan
    const validPassword = await comparePassword(password, user.Salasana);

    console.log("PASSWORD MATCH:", validPassword); //Debuggia jos salis ok niin eteneepi

    if (!validPassword) {
      // Salasana ei täsmää hashin kanssa
      return res.status(401).json({ error: "Virheellinen sähköposti tai salasana." });
    }

    // Salasana täsmää, palautetaan käyttäjä
    res.status(200).json({
      message: "Kirjautuminen onnistui!",
      user: {
        ID: user.ID,
        FullName: user.FullName,
        Email: user.Email,
        Role: user.Role,
      },
          token: "demo-token"
    });
  } catch (err) {
    console.error("Virhe kirjautumisessa:", err);
    res.status(500).json({ error: "Kirjautuminen epäonnistui." });
  }
});

/* Hae kaikki käyttäjät (TESTIÄ varten) --> poistoon lopullisessa
router.get("/", async (req, res) => {
  console.log("GET USERS HIT");

  try {
    const connection = await pool.getConnection();
    const rows = await connection.query("SELECT * FROM kayttajat");
    connection.release();

    res.json(rows);

  } catch (err) {
    console.error("Virhe käyttäjien haussa:", err);
    res.status(500).json({ error: "Tietokantavirhe" });
  }
});
 */
module.exports = router;