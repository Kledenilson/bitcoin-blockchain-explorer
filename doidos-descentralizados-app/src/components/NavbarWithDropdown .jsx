import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const NavbarWithDropdown = () => {
  
const [dropdownOpen, setDropdownOpen] = useState(false);
const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
};

const { t, i18n } = useTranslation();
  
const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
};

  return (
    <nav style={styles.navbar}>      
      <div style={styles.menu}>        
        <div style={styles.dropdownContainer}>
          <button onClick={toggleDropdown} style={styles.dropdownToggle}>
          <div style={styles.brand}> {t("navbar_options_title")} </div>
          </button>
          {dropdownOpen && (
            <ul style={styles.dropdownMenu}>
              <li style={styles.dropdownItem}>{t("Wallet")}</li>
              <li style={styles.dropdownItem}>{t("Transactions")}</li>
              <li style={styles.dropdownItem}>{t("Send")}</li>
              <li style={styles.dropdownItem}>{t("Sign")}</li>
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
