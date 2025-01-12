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

function TransactionQuery() {
  const [txHash, setTxHash] = useState("");
  const [transactionData, setTransactionData] = useState(null);
  
  const fetchTransaction = async () => {
    try {
      const response = await axios.get(`/transaction/${txHash}`);
      setTransactionData(response.data);
    } catch (error) {
      console.error("Error fetching transaction:", error);
    }
  };
  
  const { t } = useTranslation();
  
  return (
    <Wrapper>
      <h2>{t("transaction_query_title")}</h2>
      <Input
        type="text"
        placeholder={t("transaction_query_placeholder")}
        value={txHash}
        onChange={(e) => setTxHash(e.target.value)}
      />
      <Button onClick={fetchTransaction}>Buscar</Button>
      {transactionData && <pre>{JSON.stringify(transactionData, null, 2)}</pre>}
    </Wrapper>
  );
}

export default TransactionQuery;
