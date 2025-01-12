import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Foot = styled.footer`
  background: #2c3e50;
  color: #ecf0f1;
  padding: 10px 20px;
  text-align: center;
`;

function Header() {
  const { t } = useTranslation();
  return ( 
    <h1>{t("site_name")}</h1>   
  );
}

export default Header;
