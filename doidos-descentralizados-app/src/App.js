import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Wallets from "./pages/Wallets";
import Dashboard from "./pages/Dashboard";

function App() {
  const { t } = useTranslation();
  const [blocks, setBlocks] = useState(0);
  const [transactions, setTransactions] = useState(0);
  const [wallets, setWallets] = useState(0);

   useEffect(() => {
    // buscar o número de blocos
    const fetchBlocks = async () => {
      try {
        const response = await axios.get("/block/count");
        setBlocks(response.data.block_count || 0);
      } catch (error) {
        console.error("Erro ao buscar número de blocos:", error);
      }
    };

    // buscar o número de transações
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("/transaction/count");
        setTransactions(response.data.transaction_count || 0);
      } catch (error) {
        console.error("Erro ao buscar número de transações:", error);
      }
    };

    // buscar o número de carteiras
    const fetchWallets = async () => {
      try {
        const response = await axios.get("/wallet/count");
        setWallets(response.data.wallet_count || 0);
      } catch (error) {
        console.error("Erro ao buscar número de carteiras:", error);
      }
    };

    fetchBlocks();
    fetchTransactions();
    fetchWallets();
    
    const blocksInterval = setInterval(fetchBlocks, 20000);
    const transactionsInterval = setInterval(fetchTransactions, 10000);
    const walletsInterval = setInterval(fetchWallets, 50000);
    
    return () => {
      clearInterval(blocksInterval);
      clearInterval(transactionsInterval);
      clearInterval(walletsInterval);
    };
  }, []);

return (
  
    <Router>      
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/wallets" element={<Wallets />} />
          {/* <Route path="/addresses" element={<Addresses />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/mining" element={<Mining />} /> */}
        </Routes>  
    </Router>
);

}

export default App;
