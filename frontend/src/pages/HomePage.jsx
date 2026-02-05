//Tarvetta?

import React from "react";
import AccountDropdown from "../components/AccountDropdown";

const HomePage = () => {
  return (
    <div>
      <header style={styles.header}>
        {/* Dropdown-painike (kirjautumisvalikko) */}
        <AccountDropdown />
      </header>
      <main style={{ padding: "20px" }}>
        <h1>Tervetuloa vuokratilojen alustalle!</h1>
        <p>Vuokratiloja löydät helposti tästä alustalta.</p>
      </main>
    </div>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "10px 20px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#f4f4f4",
  },
};

export default HomePage;