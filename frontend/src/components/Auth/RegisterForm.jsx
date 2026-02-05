//kommentit

import React, { useState } from "react";

const RegisterForm = () => {
  // Alustetaan lomakkeen tilat käyttäjän tiedoille
  const [formData, setFormData] = useState({
    FullName: "", // Käyttäjän nimi
    Email: "",    // Käyttäjän sähköposti
    Password: "", // Käyttäjän salasana
    Role: "vuokranantaja", // Oletusrooli ("vuokranantaja")
    Areas: [],    // Käyttäjän valitsemat alueet pilkulla eroteltuna
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
        // Ilmoitus onnistuneesta rekisteröinnistä
        alert("Rekisteröinti onnistui!");
        // Lomakkeen tyhjennys
        setFormData({ FullName: "", Email: "", Password: "", Role: "vuokranantaja", Areas: [] });
      } else {
        // Ilmoitus epäonnistuneesta rekisteröinnistä
        alert("Rekisteröinti epäonnistui!");
      }
    } catch (error) {
      // Käsitellään mahdolliset virheet
      console.error("Virhe:", error);
    }
  };

  // Lomakkeen kenttien arvojen tallentaminen tilaan
  const handleChange = (e) => {
    const { name, value } = e.target;
    
     setFormData((prevState) => ({
    ...prevState,
    [name]: name === "Email" ? value.toLowerCase() : value, // Jos kenttä on Email, muutetaan pieniksi kirjaimiksi
  }));
  };

  // Aluekentän arvon muokkaus (pilkulla eroteltu lista) ja tallennus tilaan
  const handleAreasChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      Areas: e.target.value.split(",").map((area) => area.trim()), // Pilkulla eroteltu teksti muutetaan taulukoksi ja ylimääräiset välilyönnit poistetaan
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nimi:</label>
        <input
          type="text"
          name="FullName"
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
          name="Email"
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
          name="Password"
          value={formData.Password}
          placeholder="Salasana"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Käyttäjärooli:</label>
        <select name="Role" value={formData.Role} onChange={handleChange}>
          <option value="vuokranantaja">Vuokranantaja</option>
          <option value="vuokraaja">Vuokraaja</option>
        </select>
      </div>
      <div>
        <label>Alueet:</label>
        <input
          type="text"
          placeholder="Kirjoita alueet pilkulla eroteltuna (esim. Helsinki, Espoo, Vantaa)"
          value={formData.Areas.join(", ")} // Näyttää pilkulla erotellut alueet lomakkeessa
          onChange={handleAreasChange}
          required
        />
      </div>
      <button type="submit">Rekisteröidy</button>
    </form>
  );
};

export default RegisterForm;