import React from "react";
import styled from "styled-components";
import NavbarWithDropdown from "./NavbarWithDropdown ";

const Nav = styled.nav`
  background: #2c3e50;
  color: #ecf0f1;
  padding: 0px 10px;
  display: flex;
  justify-content: space-between;  
  align-items: center;  
`;

function Navbar() {  
  return (
    <Nav>    
      <NavbarWithDropdown/>   
    </Nav>
  );
}

export default Navbar;
