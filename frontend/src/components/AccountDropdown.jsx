//jotain tänne

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  //tarkistaa onko kirjautunut kun komponentti latautuu
    useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    const userRole = localStorage.getItem("userRole");
    
    if (token && userName) {
      setUser({ name: userName, role: userRole });
    }
  }, []); // Suoritetaan vain kerran kun komponentti latautuu

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  //uloskirjautuminen
    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    setUser(null);
    setIsOpen(false);
    navigate("/");
    alert("Olet kirjautunut ulos");
  };

  return (
    <div style={styles.container}>
      {/*Näytä eri sisältö kirjautuneille ja ei-kirjautuneille */}
      {user ? (
        // KIRJAUTUNUT KÄYTTÄJÄ
        <>
          <button style={styles.button} onClick={toggleDropdown}>
            {user.name} ▼
          </button>
          {isOpen && (
            <div style={styles.dropdown}>
              <div style={styles.userInfo}>
                <strong>{user.name}</strong>
                <span style={styles.role}>({user.role})</span>
              </div>
              <Link to="/profile" style={styles.link} onClick={() => setIsOpen(false)}>
                Profiili
              </Link>
              <Link to="/dashboard" style={styles.link} onClick={() => setIsOpen(false)}>
                Hallintapaneeli
              </Link>
              <button style={styles.logoutButton} onClick={handleLogout}>
                Kirjaudu ulos
              </button>
            </div>
          )}
        </>
      ) : (
        // EI KIRJAUTUNUT
        <>
          <button style={styles.button} onClick={toggleDropdown}>
            Kirjaudu
          </button>
          {isOpen && (
            <div style={styles.dropdown}>
              <Link to="/login" style={styles.link} onClick={() => setIsOpen(false)}>
                Kirjaudu sisään
              </Link>
              <Link to="/register" style={styles.link} onClick={() => setIsOpen(false)}>
                Rekisteröidy
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    display: "inline-block",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  dropdown: {
    position: "absolute",
    top: "40px",
    right: 0,
    backgroundColor: "#f4f4f4",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  },
  link: {
    display: "block",
    padding: "10px",
    textDecoration: "none",
    color: "#333",
    borderBottom: "1px solid #ddd",
    cursor: "pointer",
  },
};

export default AccountDropdown;