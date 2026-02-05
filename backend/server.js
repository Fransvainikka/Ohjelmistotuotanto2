const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json()); 

app.use(cors());

// Käyttäjäreitit
app.use("/api/users", userRoutes);

// Palvelimen käynnistäminen
const PORT = 5000;
app.listen(PORT, () => console.log(`Palvelin käynnissä portissa ${PORT}`));