/* Sisältää:
- Lomakkeen sähköpostille ja salasanalle
- Napin kirjautumista varten
- Lähettää tiedot backendille tarkistettavaksi
- Onnistuneen kirjautumisen jälkeen tallentaa käyttäjän AuthContextiin
*/

import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Kirjaudu sisään</h1>
      <LoginForm />
      <div style={styles.buttonContainer}>
        {/* Palaa etusivulle nappi */}
        <button 
          onClick={() => navigate("/")} 
          style={styles.button}>
          Palaa etusivulle
        </button>
        {/* Rekisteröi nappi */}
        <button 
          onClick={() => navigate("/register")} 
          style={styles.buttonAlt}>
          Rekisteröidy
        </button>
      </div>
    </div>
  );
};

const styles = {
  buttonContainer: {
    marginTop: "20px",
    display: "flex", // Asetetaan napit vaakasuoraan
    justifyContent: "center", // Keskitetään kontainer
    gap: "10px", // Nappien väliin pieni tila
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

export default LoginPage;