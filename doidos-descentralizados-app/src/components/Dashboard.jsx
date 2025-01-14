import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const DashboardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: -15px 15px 20px;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background: ${({ bgColor }) => bgColor || "#f0f0f0"};
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: left;
  width: 200px;
  min-height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center; 
`;

// Título do card
const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 6px;
  font-weight: 200;
  font-family: "Orbitron";
`;

// Valor do card
const CardValue = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  
`;

function Dashboard({ stats }) {
  const { t } = useTranslation();
  return (
    <DashboardWrapper>
      <Card bgColor="#3498db"> {}
        <CardTitle>{t("dashboard_blocks_title")}</CardTitle>
        <CardValue>{stats.blocks || 0}</CardValue>
      </Card>
      <Card bgColor="#2ecc71"> {}
        <CardTitle>{t("dashboard_transactions_title")}</CardTitle>
        <CardValue>{stats.transactions || 0}</CardValue>
      </Card>
      <Card bgColor="#e67e22"> {}
        <CardTitle>{t("dashboard_wallet_title")}</CardTitle>
        <CardValue>{stats.wallets || 0}</CardValue>
      </Card> 
    </DashboardWrapper>
  );
}

export default Dashboard;
