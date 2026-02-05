/* Sivulla käyttäjä:
- Syöttää koko nimensä
- Antaa sähköpostin ja salasanan
- Valitsee käyttäjäroolin (vuokraaja tai vuokranantaja)
- Valitsee kolme aluetta, joista haluaa tilaehdotuksia

Tiedot lähetetään backendille, jossa käyttäjä tallennetaan tietokantaan.
*/

import React from "react";
import RegisterForm from "../components/Auth/RegisterForm";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Rekisteröidy</h1>
      <RegisterForm />
      <div style={styles.buttonContainer}>
        {/* Palaa etusivulle nappi */}
        <button 
          onClick={() => navigate("/")} 
          style={styles.button}>
          Palaa etusivulle
        </button>
        {/* Kirjaudu nappi */}
        <button 
          onClick={() => navigate("/login")} 
          style={styles.buttonAlt}>
          Kirjaudu
        </button>
      </div>
    </div>
  );
};

const styles = {
  buttonContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between", // Nappien väliin jää tilaa
    gap: "10px", // Nappien väliin pieni väli
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  buttonAlt: {
    padding: "10px 20px",
    backgroundColor: "#28a745", // Vihreä nappi
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default RegisterPage;