import React from "react";
import styled from "styled-components";

const Foot = styled.footer`
  background: #2c3e50;
  color: #ecf0f1;
  padding: 10px 20px;
  text-align: center;
`;

function Footer() {
  return <Foot>&copy; 2025 Blockchain Explorer</Foot>;
}

export default Footer;
