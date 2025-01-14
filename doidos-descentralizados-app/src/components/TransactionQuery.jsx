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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  max-height: 90%;
  width: 90%;
  overflow-y: auto;
  text-align: left;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

function TransactionQuery() {
  const [txHash, setTxHash] = useState("");
  const [transactionData, setTransactionData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchTransaction = async () => {
    try {
      const response = await axios.get(`/transaction/${txHash}`);
      setTransactionData(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching transaction:", error);
      toast.error(t("transaction_query_error" + error), { 
              position: "bottom-right",
              autoClose: 3000,
      });      
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const { t } = useTranslation();

  const placeholderContent = `${t("transaction_query_title")} > ${t("transaction_query_placeholder")}`

  return (
    <Wrapper>
      <Input
        type="text"
        placeholder={placeholderContent}
        value={txHash}
        onChange={(e) => setTxHash(e.target.value)}
      />
      <ToastContainer />
      <SearchButton onClick={fetchTransaction}>{t("transaction_query_button")}</SearchButton>
     
      {isModalOpen && (
         <Modal
         isOpen={isModalOpen}
         onClose={() => setIsModalOpen(false)}
         title={t("transaction_query_title")}
       >
         <pre>{JSON.stringify(transactionData, null, 2)}</pre>
       </Modal>
      )}
    </Wrapper>
  );
}

export default TransactionQuery;
