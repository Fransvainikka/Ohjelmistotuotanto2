/*Idea tässä: Käyttäjä täyttää lomakkeen rekisteröintisivulla const RegisterForm alla tarvittavat tiedot
Lomake lähettää POST pyynnön http://localhost:5000/api/users/register
Lisäilee JSON dataa tohon myös missä sit lomakkeen tiedot */

import React, { useState } from "react";

const RegisterForm = () => {
  // Alustetaan lomakkeen tilat käyttäjän tiedoille
  const [formData, setFormData] = useState({
    fullName: "", // Käyttäjän nimi
    email: "",    // Käyttäjän sähköposti
    password: "", // Käyttäjän salasana
    role: "vuokranantaja", // Oletusrooli ("vuokranantaja")
    areas: [],    // Käyttäjän valitsemat alueet pilkulla eroteltuna --> tämä osio vaatii viel vähän pohdintaa
  });

  // Lomakkeen lähetys
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Lähetetään POST-pyyntö rekisteröintipalveluun
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Lähetetään lomakkeen tiedot JSON-muodossa
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setFormData({ fullName: "", email: "", password: "", role: "vuokranantaja", areas: [] });
      } else {
        // Haetaan virheviesti backendistä
        const errorData = await response.json();
        
        // Näytetään tarkka virheviesti käyttäjälle
        if (response.status === 400) {
          alert("Virheellinen syöte: " + errorData.error);
        } else if (response.status === 409) {
          alert(errorData.error); // "Sähköposti on jo käytössä"
        } else if (response.status === 500) {
          alert("Palvelinvirhe: " + errorData.error);
        } else {
          alert("Rekisteröinti epäonnistui: " + (errorData.error || "Tuntematon virhe"));
        }
        
        // Tulostetaan virhe konsoliin kehittäjälle
        console.error("Rekisteröintivirhe:", {
          status: response.status,
          error: errorData
        });
      }
    } catch (error) {
      // Verkkovirheet (esim. backend ei vastaa)
      console.error("Verkkovirhe:", error);
      alert("Verkkovirhe: Palvelin ei vastaa. Tarkista että backend on käynnissä.");
    }
  };

  // Lomakkeen kenttien arvojen tallentaminen tilaan
  const handleChange = (e) => {
    const { name, value } = e.target;
    
     setFormData((prevState) => ({
    ...prevState,
    [name]: name === "email" ? value.toLowerCase() : value, // Jos kenttä on Email, muutetaan pieniksi kirjaimiksi varmuuden vuoks
  }));
  };

  // Aluekentän arvon muokkaus (pilkulla eroteltu lista) ja tallennus tilaan.
  // Tätä kohtaa vois viel kattoa, vähän "hölmön" näkönen nyt!!
  const handleAreasChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      areas: e.target.value.split(",").map((area) => area.trim()), // Pilkulla eroteltu teksti muutetaan taulukoksi ja ylimääräiset välilyönnit poistetaan
    }));
  };

  //Tässäpä sit ulkoasu, jota tarvii hioa vielä

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nimi:</label>
        <input
          type="text"
          name="fullName"
          value={formData.FullName}
          placeholder="Kokonimi"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Sähköposti:</label>
        <input
          type="email"
          name="email"
          value={formData.Email}
          placeholder="Sähköposti"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Salasana:</label>
        <input
          type="password"
          name="password"
          value={formData.Password}
          placeholder="Salasana"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Käyttäjärooli:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="vuokranantaja">Vuokranantaja</option>
          <option value="vuokraaja">Vuokraaja</option>
        </select>
      </div>
      <div>
        <label>Alueet:</label>
        <input
          type="text"
          placeholder="Kirjoita alueet pilkulla eroteltuna (esim. Helsinki, Espoo, Vantaa)"
          value={formData.areas.join(", ")} // Näyttää pilkulla erotellut alueet lomakkeessa
          onChange={handleAreasChange}
          required
        />
      </div>
      <button type="submit">Rekisteröidy</button>
    </form>
  );
};

export default RegisterForm;