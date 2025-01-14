import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  color: gray;
  padding: 20px;
  border-radius: 10px;
  max-width: 800px;
  max-height: 90%;
  width: 90%;
  overflow-y: auto;
  text-align: left;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

const ModalTitle = styled.h2`
  font-size: 0.8rem;
  font-weight: 200;
  font-family: "Orbitron";  
`;

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalTitle>
          {title && <h2>{title}</h2>}
        </ModalTitle>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
}

export default Modal;
