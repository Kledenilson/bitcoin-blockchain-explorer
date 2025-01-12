import React from "react";
import styled from "styled-components";
import { useTranslation }  from "react-i18next";

const Foot = styled.footer`
  background: #2c3e50;
  color: #ecf0f1;
  padding: 10px 20px;
  text-align: center;
`;

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  return <Foot>&copy; {currentYear} {t("site_footer_name")}</Foot>;
}

export default Footer;
