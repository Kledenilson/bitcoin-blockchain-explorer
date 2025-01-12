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
  const [stats, setStats] = useState({
    blocks: 0,
    transactions: 0,
    wallets: 0,
  });

  useEffect(() => {
    
    const fetchStats = async () => {
      try {
        const responseBlocks = await axios.get("/block/count");
        const responseTransactions = await axios.get("/transaction/count");
        const responseWallets = await axios.get("/wallet/count");

        setStats({
          blocks: responseBlocks.data.block_count || 0,
          transactions: responseTransactions.data.transaction_count || 0,
          wallets: responseWallets.data.wallet_count || 0,
        });
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
      }
    };

    fetchStats();

    const interval = setInterval(fetchStats, 50000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Navbar />
      <Main>
        <Header/>
        <Dashboard stats={stats} />
        <BlockQuery />
        <TransactionQuery />
        <WalletBalanceQuery />
      </Main>
      <Footer />
    </Container>
  );
}

export default App;
