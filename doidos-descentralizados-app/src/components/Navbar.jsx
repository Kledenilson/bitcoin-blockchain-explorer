import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Nav = styled.nav`
  background: #2c3e50;
  color: #ecf0f1;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
`;

const LanguageSelect = styled.select`
  padding: 5px;
  background: #ecf0f1;
  border: none;
  color: #2c3e50;
  cursor: pointer;
`;

function Navbar() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Nav>
      <Title>{t("navbar_title")}</Title>
      <LanguageSelect
        onChange={(e) => changeLanguage(e.target.value)}
        defaultValue={i18n.language}
      >
        <option value="en">🇺🇸 English</option>
        <option value="pt">🇧🇷 Português</option>
      </LanguageSelect>
    </Nav>
  );
}

export default Navbar;
