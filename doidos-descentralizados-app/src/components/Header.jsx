import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import logo from "../assets/imgs/logos/logo.png";

const Container = styled.div`
  margin-top: -25px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center; 
  height: 100%; 
  padding: 20px;
`;

const Title = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  margin-top: 5px;
`;

const Subtitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  margin-top: -15px; 
  color: black;
`;


const Logo = styled.img`
  width: 20vw;
  max-width: 150px;
  height: auto;
`;

function Header() {
  const { t } = useTranslation();
  return (
    <Container>
      <Logo src={logo} alt="Logo" />
      <Title>Doidos Descentralizados</Title>
      <Subtitle>Bitcoin Blockchain Explorer</Subtitle>
    </Container>
  );
}

export default Header;
