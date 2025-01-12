import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Foot = styled.footer`
  background: #2c3e50;
  color: #ecf0f1;
  padding: 10px 20px;
  text-align: center;
`;

function Logo() {
  const { t } = useTranslation();
  return (    
      <Image
      src="./assets/imgs/logo_trans_bg.png"      
      />   
  );
}

export default Logo;
