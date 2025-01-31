import React, { useState } from "react";
import styled from "styled-components";
import axios from "../services/api";
import { useTranslation } from "react-i18next";
import SearchButton from "./SearchButtom";
import Modal from "./Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
  font-size: 0.9rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 5px;
  font-size: 0.9rem;
`;

function WalletBalanceQuery() {
  const [address, setAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBalance = async () => {
    try {
<<<<<<< HEAD
      const response = await axios.get(`/wallet/balance?address=${address}`);
=======
      const response = await axios.get(`/wallet/balance/${address}`);
      console.log('Balance: ',response);
>>>>>>> 4bcfc3a59ba317b7e205d74b304223484390ff06
      setWalletBalance(response.data.balance);
      setIsModalOpen(true);
    } catch (error) {      
      console.error("Error fetching wallet balance:", error);
       toast.error(t("balance_query_error"), { 
                    position: "bottom-right",
                    autoClose: 3000,
            });      
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const { t } = useTranslation();

  const placeholderContent = `${t("wallet_query_title")} > ${t("wallet_query_placeholder")}`;

  return (
    <Wrapper>
      <Input
        type="text"
        placeholder={placeholderContent}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <ToastContainer/>
      <SearchButton onClick={fetchBalance}>{t("wallet_query_button")}</SearchButton>      
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={t("wallet_query_title")}
        >
          <pre>{JSON.stringify(walletBalance, null, 2)}</pre>
        </Modal>
      )}
    </Wrapper>
  );
}

export default WalletBalanceQuery;
