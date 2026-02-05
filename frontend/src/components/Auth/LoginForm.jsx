/*Täällä tiivistettynä: Käyttäjä syöttää spostin ja salasanan
Lomake lähettää POST pyynnön osoitteeseen: http://localhost:5000/api/users/login
Jos tiedot ei täsmää kirjautuessa tulee virheviestejä
Jos tiedot oikein palaa käyttäjä etusivulle (Tähän vois keksiä jotain muutakin) */

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
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.user.FullName);
        localStorage.setItem("userRole", data.user.Role);
        localStorage.setItem("userId", data.user.ID);
        alert("Kirjautuminen onnistui!");

        // Vie käyttäjä etusivulle --> tähän tulee jatkossa sitten vienti "vuokranantaja/vuokraaja" sivu
        //tarvitsee silloin checkin käyttäjän roolista, toki nyt vähän käyty jo
        if (data.user.Role === "vuokraaja") {
          navigate("/tenant/dashboard");
        } else if (data.user.Role === "vuokranantaja") {
          navigate("/landlord/dashboard");
        } else {
          navigate("/");
        }
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

  // ulkoasua täs (vaatinee muokkailua)
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