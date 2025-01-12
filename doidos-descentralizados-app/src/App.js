import React from "react";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BlockQuery from "./components/BlockQuery";
import TransactionQuery from "./components/TransactionQuery";
import WalletBalanceQuery from "./components/WalletBalanceQuery";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";

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
  return (
    <Container>
      <Navbar />
      <Main>
        <Header/>
        <BlockQuery />
        <TransactionQuery />
        <WalletBalanceQuery />
      </Main>
      <Footer />
    </Container>
  );
}

export default App;
