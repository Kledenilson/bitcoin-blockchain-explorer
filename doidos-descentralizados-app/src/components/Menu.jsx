import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <nav style={{ background: "#333", padding: "10px", color: "white" }}>
      <ul style={{ display: "flex", listStyleType: "none", margin: 0, padding: 0 }}>
        <li style={{ margin: "0 10px" }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link>
        </li>
        <li style={{ margin: "0 10px" }}>
          <Link to="/wallets" style={{ color: "white", textDecoration: "none" }}>Carteiras</Link>
        </li>
        <li style={{ margin: "0 10px" }}>
          <Link to="/addresses" style={{ color: "white", textDecoration: "none" }}>Endereços</Link>
        </li>
        <li style={{ margin: "0 10px" }}>
          <Link to="/transactions" style={{ color: "white", textDecoration: "none" }}>Transações</Link>
        </li>
        <li style={{ margin: "0 10px" }}>
          <Link to="/mining" style={{ color: "white", textDecoration: "none" }}>Minerar</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
