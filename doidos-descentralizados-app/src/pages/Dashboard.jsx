import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BlockQuery from "../components/BlockQuery";
import TransactionQuery from "../components/TransactionQuery";
import WalletBalanceQuery from "../components/WalletBalanceQuery";
import Container from "../components/Container";
import Main from "../components/Main";
import { Card, CardTitle, CardValue }  from "../components/Card";
import axios from "../services/api";

const DashboardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: -15px 15px 20px;
  flex-wrap: wrap;
`;

function Dashboard({stats}) {
  
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
    const transactionsInterval = setInterval(fetchTransactions, 50000);
    const walletsInterval = setInterval(fetchWallets, 10000);
    
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
         {/* <Dashboard  stats={{
            blocks,
            transactions,
            wallets,
          }} /> */}
          <DashboardWrapper>
          <Card bgColor="#3498db"> {}
              <CardTitle>{t("dashboard_blocks_title")}</CardTitle>
              <CardValue>{blocks}</CardValue>
            </Card>
            <Card bgColor="#2ecc71"> {}
              <CardTitle>{t("dashboard_transactions_title")}</CardTitle>
              <CardValue>{transactions}</CardValue>
            </Card>
            <Card bgColor="#e67e22"> {}
              <CardTitle>{t("dashboard_wallet_title")}</CardTitle>
              <CardValue>{wallets}</CardValue>
            </Card>     
            </DashboardWrapper>
          <BlockQuery />
          <TransactionQuery />
          <WalletBalanceQuery />     
        </Main>
        <Footer />
      </Container>
  );
}

export default Dashboard;
