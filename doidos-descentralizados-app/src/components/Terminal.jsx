import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faComputer } from "@fortawesome/free-solid-svg-icons";
import InteractiveTerminal from "../InteractiveTerminal";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
  font-size: 0.9rem;
`;

const Buttom = styled.button`
  padding: 10px;
  background:#0a466e;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin-left: 10px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 200;
  font-family: "Orbitron";

  &:hover {
    background:#3498db;
  }
`;

function Terminal() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const title = `${t("Interactive Terminal")}`;

  return (
    <Wrapper>
         <Buttom onClick={()=>setIsModalOpen(true)}>
          {title}           
          </Buttom>
      {isModalOpen && (
        <Modal
         isOpen={isModalOpen}
         onClose={() => setIsModalOpen(false)}
         title={title}
       >
        <InteractiveTerminal/>
       </Modal>
      )}
    </Wrapper>
  );
}

export default Terminal;
