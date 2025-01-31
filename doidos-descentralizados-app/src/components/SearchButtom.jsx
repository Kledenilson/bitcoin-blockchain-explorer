import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Buttom = styled.button`
  padding: 8px;
  background: transparent;//#2c92d6;
  color: gray;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 10px;
  border-radius: 5px;

  &:hover {
   // background:#3498db //#0a466e;
   color: #3498db;
  }
`;

function SearchButton({ onClick }) {
  const { t } = useTranslation();
  return (
    <Buttom onClick={onClick}>
      <FontAwesomeIcon icon={faSearch} />
    </Buttom>
  );
}

export default SearchButton;
