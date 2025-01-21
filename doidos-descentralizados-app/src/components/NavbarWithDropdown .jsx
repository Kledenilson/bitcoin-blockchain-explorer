import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Terminal from "../pages/Terminal";

const NavbarWithDropdown = () => {
  
const [dropdownOpen, setDropdownOpen] = useState(false);
const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
};

const { t, i18n } = useTranslation();
  
const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
};

const fontOrbitron = "'Orbitron', sans-serif";

  return (
    <nav style={styles.navbar}>      
      <div style={styles.menu}>        
        <div style={styles.dropdownContainer}>
          <button onClick={toggleDropdown} style={styles.dropdownToggle}>
          <div style={styles.brand}> {t("navbar_options_title")} </div>
          </button>
          {dropdownOpen && (
            <ul style={styles.dropdownMenu}>
              <li style={styles.dropdownItem}>
                <Link to="/" style={{ color: "black", textDecoration: "none", fontFamily: fontOrbitron }}>{t("Dashboard")}</Link>
              </li>
              <ul>
                <li style={styles.dropdownItem}>
                  <Link to="/wallets" style={{ color: "black", textDecoration: "none", fontFamily: fontOrbitron }}>{t("Wallet")}</Link>
                </li>
                <li style={styles.dropdownItem}>
                  <Link to="/cli" style={{ color: "black", textDecoration: "none", fontFamily: fontOrbitron }}>{t("WalletCLI")}</Link>
                </li>
                <li style={styles.dropdownItem}>
                  <Link to="/transactions" style={{ color: "black", textDecoration: "none", fontFamily: fontOrbitron }}>{t("Transactions")}</Link>
                </li>
                <li style={styles.dropdownItem}>
                  <Link to="/address" style={{ color: "black", textDecoration: "none", fontFamily: fontOrbitron }}>{t("Send")}</Link>
                </li>
              </ul>
              <li style={styles.dropdownItem}>
                <Link to="/mining" style={{ color: "black", textDecoration: "none", fontFamily: fontOrbitron }}>{t("Mining")}</Link>
              </li>
              <li style={styles.dropdownItem}>{t("Configurations")}</li>
              <li style={styles.dropdownItem}>{t("Exit")}</li>
            </ul>
          )}
        </div>
        <div style={styles.languageSelect}>
          <select value={i18n.language} 
          onChange={(e) => changeLanguage(e.target.value)}
          defaultValue={i18n.language} style={styles.select}>
            <option value="trans">🇺🇸 English</option>
            <option value="pt">🇧🇷 Português</option>      
          </select>
        </div>        
      </div>     
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "left",
    padding: "0px 10px",
    backgroundColor: "#2c3e50",
    color: "#fff",    
  },
  brand: {
    fontSize: "16px",
    fontWeight: "bold",  
    fontFamily: "Orbitron, sans-serif",  
  },
  menu: {
    display: "flex",
    alignItems: "center",    
  },
  dropdownContainer: {
    position: "relative",
  },
  dropdownToggle: {
    padding: "10px",
    backgroundColor: "#2c3e50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    left: "0",
    backgroundColor: "#fff",
    color: "#333",
    listStyle: "none",
    padding: "10px 0",
    margin: "5px 0 0",
    borderRadius: "4px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  dropdownItem: {
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "14px",
  },
  languageSelect: {
    color: "#fff",
  },
  select: {
    backgroundColor: "#2c3e50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "5px",
    cursor: "pointer",
  },
};

export default NavbarWithDropdown;
