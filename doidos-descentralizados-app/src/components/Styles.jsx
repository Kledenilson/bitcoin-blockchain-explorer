import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f7f9fc;
`;

export const Main = styled.main`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
  font-size: 0.9rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.8rem;
  font-weight: 400;
  font-family: "Orbitron";
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  flex: 1;
  padding: 5px;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
  }
`;

export const Button = styled.button`
  background: transparent; //#3498db;
  color: gray;
  font-size: 0.8rem;
  padding: 8px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    //background: #2980b9;
    color: #3498db;
  }
`;

export const TableTable = styled.table`
  width: 100%;
  max-width: 800px;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

export const TableHeader = styled.thead`
  background: gray; //#2c3e50;
  color: white; 
  font-size: 1rem;
  font-weight: 100;
  font-family: "Orbitron";
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ecf0f1;

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td`
  padding: 5px 25px;
  text-align: left;
  color: #2c3e50;

  &:last-child {
    text-align: center;
  }
`;

export const Pagination = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

export const PaginationButton = styled.button`
  background: ${({ active }) => (active ? "#ecf0f1"
    //"#3498db" 
    : "transparent")};
  color: ${({ active }) => (active ? "gray" : "#2c3e50")};
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background: ${({ active }) => (active ? "#2980b9" : "#bdc3c7")};
  }
`;
