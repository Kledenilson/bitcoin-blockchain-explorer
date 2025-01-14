import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BlockQuery from "./components/BlockQuery";
import TransactionQuery from "./components/TransactionQuery";
import WalletBalanceQuery from "./components/WalletBalanceQuery";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import axios from "./services/api";
import api from './services/api';
import InteractiveTerminal from "./InteractiveTerminal";
import Terminal from "./components/Terminal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
`;

const Main = styled.main`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
    <Container>
      <Navbar />
      <Main>
        <Header/>
        <Dashboard  stats={{
          blocks,
          transactions,
          wallets,
        }} />
        <BlockQuery />
        <TransactionQuery />
        <WalletBalanceQuery />
        <Terminal/>
      </Main>
      <Footer />
    </Container>
  );
}

export default App;
