import styled from "styled-components";

export const Card = styled.div`
  background: ${({ bgColor }) => bgColor || "#f0f0f0"};
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: left;
  width: 200px;
  min-height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center; 
`;

// Título do card
export const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 6px;
  font-weight: 200;
  font-family: "Orbitron";
`;

// Valor do card
export const CardValue = styled.span`
  font-size: 1.5rem;
  font-weight: bold;  
`;
