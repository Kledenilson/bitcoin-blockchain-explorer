import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "../services/api";
import { getError } from "../services/helpers";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import {
  Button,
  Container,
  Input,
  InputWrapper,
  Main,
  Title,
} from "../components/Styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Mining = () => {
  const { t } = useTranslation();
  const [address, setAddress] = useState("");
  const [blockCount, setBlockCount] = useState("");
  const [isMainModalOpen, setIsMainModalOpen] = useState(true);
  const [miningInProgress, setMiningInProgress] = useState(false);
  const navigate = useNavigate();

  // Função para minerar blocos
  const mineBlocks = async () => {
    if (!address || !blockCount) {
      toast.error(t("mining_missing_fields"), {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    if (isNaN(blockCount) || blockCount <= 0) {
      toast.error(t("mining_invalid_block_count"), {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    setMiningInProgress(true);
    try {
      const res = await axios.post("/block/generate", {
        address,
        num_blocks: parseInt(blockCount),
      });

      toast.success(
        t("mining_success") + ` ${res.data.message}`,
        {
          position: "bottom-right",
          autoClose: 3000,
        }
      );
    } catch (error) {
      toast.error(t("mining_error") + " " + getError(error), {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      setMiningInProgress(false); 
    }
  };

  return (
    <Container>
      <Navbar />
      <Main>
      <Header/>
        <Modal
         isOpen={isMainModalOpen}
         onClose={() => setIsMainModalOpen(false)}
         title={""}
         >
        <Title>{t("mining_interface")}</Title>
        <InputWrapper style={{ padding: "20px" }}>
          <Input
            type="text"
            placeholder={t("reward_address")}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{margin: '10px'}}
          />
          <Input
            type="number"
            placeholder={t("block_count")}
            value={blockCount}
            onChange={(e) => setBlockCount(e.target.value)}
            style={{margin: '10px'}}
          />
          <Button 
          onClick={mineBlocks} disabled={miningInProgress}
          style={{margin: '10px'}}
          >
            {miningInProgress ? t("mining_in_progress") : t("mine_blocks")}
          </Button>
        </InputWrapper>
        <ToastContainer />
        </Modal>
      </Main>
      <Footer />
    </Container>
  );
};

export default Mining;
