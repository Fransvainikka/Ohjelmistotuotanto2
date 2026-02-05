//jotain tänne

import React, { useState } from "react";
import { Link } from "react-router-dom";

const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={toggleDropdown}>
        Kirjaudu
      </button>
      {isOpen && (
        <div style={styles.dropdown}>
          <Link to="/login" style={styles.link}>Kirjaudu sisään</Link>
          <Link to="/register" style={styles.link}>Rekisteröidy</Link>
        </div>
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