//lisää kommentit
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  // Alustetaan lomakkeen tilat kirjautumistiedoille
  const [email, setEmail] = useState("");       // Sähköposti
  const [password, setPassword] = useState(""); // Salasana
  const navigate = useNavigate();

  // Lomakkeen lähetys
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Lähetetään POST-pyyntö kirjautumispalveluun
      const response = await fetch("http://localhost:5000/api/users/login", {  //tähän laitettu /users/login väliin
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // Lähetetään lomakkeen tiedot JSON-muodossa
      });

      if (response.ok) {
        const data = await response.json(); // Vastauksen tiedot
        alert("Kirjautuminen onnistui!");
        localStorage.setItem("token", data.token);

        // Vie käyttäjä etusivulle
        navigate("/");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Sähköposti tai salasana on virheellinen.");
      }
    } catch (error) {
      // Käsitellään mahdolliset virheet
      console.error("Virhe:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Sähköposti:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())} // Tallennetaan sähköposti tilaan
          required
        />
      </div>
      <div>
        <label>Salasana:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Tallennetaan salasana tilaan
          required
        />
      </div>
      <button type="submit">Kirjaudu</button>
    </form>
  );
};

export default LoginForm;