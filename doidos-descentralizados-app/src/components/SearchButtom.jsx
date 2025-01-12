import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Buttom = styled.button`
  padding: 8px;
  background:#2c92d6;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 10px;
  border-radius: 5px;

  &:hover {
    background:#0a466e;
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
