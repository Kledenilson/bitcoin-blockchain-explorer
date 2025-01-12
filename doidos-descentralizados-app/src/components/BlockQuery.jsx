import React, { useState } from "react";
import styled from "styled-components";
import axios from "../services/api";
import { useTranslation } from "react-i18next";

const Wrapper = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const Input = styled.input`
  margin-right: 10px;
  padding: 5px;
`;

const Button = styled.button`
  padding: 5px 10px;
  background: #3498db;
  color: white;
  border: none;
  cursor: pointer;
`;

function BlockQuery() {
  const [blockNumber, setBlockNumber] = useState("");
  const [blockData, setBlockData] = useState(null);
  
  const fetchBlock = async () => {
    try {
      const response = await axios.get(`/block/${blockNumber}`);
      setBlockData(response.data);
    } catch (error) {
      console.error("Error fetching block:", error);
    }
  };
  const { t } = useTranslation();

  return (
    <Wrapper>
      <h2>{t("block_query_title")}</h2>
      <Input
        type="text"
        placeholder={t("block_query_placeholder")}
        value={blockNumber}
        onChange={(e) => setBlockNumber(e.target.value)}
      />
      <Button onClick={fetchBlock}>{t("block_query_button")}</Button>
      {blockData && <pre>{JSON.stringify(blockData, null, 2)}</pre>}
    </Wrapper>
  );
}

export default BlockQuery;
