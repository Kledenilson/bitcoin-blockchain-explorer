import React from "react";
import styled from "styled-components";
import NavbarWithDropdown from "./NavbarWithDropdown ";
import Terminal from "../pages/Terminal";
import Menu from "./Menu";

const Nav = styled.nav`
  background: #2c3e50;
  color: #ecf0f1;
  padding: 0px 10px;
  display: flex;
  justify-content: left;
  vertical-align: center;  
  align-items: center;  
`;

const TerminalWrapper = styled.div`
  margin-left: auto; /* Empurra o Terminal para o lado direito */
  margin-right:20px;
  margin-bottom:-15px;  
`;

function Navbar() {  
  return (
    <Nav>    
      <NavbarWithDropdown/>   
      <TerminalWrapper>      
      </TerminalWrapper>
    </Nav>
     
  );
}

export default Navbar;
