import React, { useState } from "react";
import styled from "styled-components";
import axios from "../services/api";
import { useTranslation } from "react-i18next";
import SearchButton from "./SearchButtom";
import Modal from "./Modal";

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

function BlockQuery() {
  const [blockNumber, setBlockNumber] = useState("");
  const [blockData, setBlockData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBlock = async () => {
    try {
      const response = await axios.get(`/block/${blockNumber}`);
      setBlockData(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching block:", error);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const { t } = useTranslation();

  const placeholderContent = `${t("block_query_title")} > ${t("block_query_placeholder")}`;

  return (
    <Wrapper>
      <Input
        type="text"
        placeholder={placeholderContent}
        value={blockNumber}
        onChange={(e) => setBlockNumber(e.target.value)}
      />
      <SearchButton onClick={fetchBlock} />
      
      {isModalOpen && (
        <Modal
         isOpen={isModalOpen}
         onClose={() => setIsModalOpen(false)}
         title={t("block_query_title")}
       >
         <pre>{JSON.stringify(blockData, null, 2)}</pre>
       </Modal>
      )}
    </Wrapper>
  );
}

export default BlockQuery;
