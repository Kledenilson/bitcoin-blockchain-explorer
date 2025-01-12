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

function WalletBalanceQuery() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);
  
  const fetchBalance = async () => {
    try {
      const response = await axios.get(`/wallet/balance/${address}`);
      setBalance(response.data);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };
  const { t } = useTranslation();
  
  return (
    <Wrapper>
      <h2>{t("wallet_query_title")}</h2>
      <Input
        type="text"
        placeholder={t("wallet_query_placeholder")}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Button onClick={fetchBalance}>Buscar</Button>
      {balance && <pre>{JSON.stringify(balance, null, 2)}</pre>}
    </Wrapper>
  );
}

export default WalletBalanceQuery;
