/*Tänne voi laittaa käsittelyn vielä esim: tokenin vanhenemisen tarkistusta, käyttäjän varmistusta myös
Tämän avulla myös voi duunailla roolipohjaisen suojauksen, joka pyörii annetun roolin kautta
--> voi vaatia unauthorized pagen tms
--> jos/kun tulee oma sivu vuokraaja/vuokranantaja niin voi tehdä tämän kautta nesallimiset
*/

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  //Tarkistaa onko käyttäjä kirjautunut
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;


//ei tarvitse huomioida atm
/* import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Tarkistetaan onko käyttäjä kirjautunut
  const token = localStorage.getItem("token");
  
  // Jos ei ole kirjautunut, ohjataan kirjautumissivulle
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // Jos on kirjautunut, näytetään suojattu sisältö
  return children;
};

export default ProtectedRoute;  */

//muistissa
/* import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole"); // Esim. "vuokraaja" tai "vuokranantaja"
  
  // Ei ole kirjautunut → kirjautumissivulle
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // On kirjautunut, mutta ei oikeaa roolia → estosivu
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  // Kaikki OK → näytä sivu
  return children;
};

export default ProtectedRoute; */