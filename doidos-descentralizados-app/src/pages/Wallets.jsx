import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  Button, 
  Container, 
  Input, 
  InputWrapper, 
  Main, 
  Pagination, 
  PaginationButton, 
  Title, 
  TableCell, 
  TableHeader, 
  TableRow, 
  TableTable 
} from "../components/Styles";
import Modal from "../components/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wallets = () => {
  const { t } = useTranslation();
  const [wallets, setWallets] = useState([]);
  const [newWalletName, setNewWalletName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle da modal
  const [walletDetails, setWalletDetails] = useState(null); // Detalhes da carteira
  const itemsPerPage = 10; // Define o número de itens por página
  const navigate = useNavigate();

  const fetchWallets = async () => {
    try {
      const res = await axios.get("/wallet/count");
      setWallets(res.data.wallets);
    } catch (error) {
      toast.error(t("block_query_error") + " " + error, { 
        position: "bottom-right",
        autoClose: 3000,
      });
      console.error("Erro ao listar carteiras:", error);
    }
  };

  const fetchWalletDetails = async (walletName) => {
    try {
      const res = await axios.get(`/wallet/details/${walletName}`); // Endpoint para buscar detalhes da carteira
      setWalletDetails(res.data);
      setIsModalOpen(true); // Abre a modal      
    } catch (error) {
      toast.error(t("error_fetching_wallet_details") + " " + error, {
        position: "bottom-right",
        autoClose: 3000,
      });
      console.error("Erro ao buscar detalhes da carteira:", error);
    }
  };

  const sendTransaction = async () => {
    try {
      const res = await axios.post("/transaction/send", { wallet: walletDetails.name }); // Exemplo de envio
      toast.success(t("transaction_success") + ` TXID: ${res.data.txid}`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(t("error_sending_transaction") + " " + error, {
        position: "bottom-right",
        autoClose: 3000,
      });
      console.error("Erro ao enviar transação:", error);
    }
  };

  const createWallet = async () => {
    try {
      await axios.post("/wallet/create", { wallet_name: newWalletName });
      setNewWalletName("");
      toast.success(t("wallet_created_success"), { 
        position: "bottom-right",
        autoClose: 3000,
      });
      fetchWallets();
    } catch (error) {
      console.error("Erro ao criar carteira:", error);
      toast.error(t("block_query_error") + " " + error, { 
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  // Paginação
  const totalPages = Math.ceil(wallets.length / itemsPerPage);
  const paginatedWallets = wallets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (   
    <Container>
      <Navbar />
      <Main>
        <Title>{t("wallets_list")}</Title>
        <InputWrapper style={{ padding: '20px' }}>
          <Input
            type="text"
            value={newWalletName}
            onChange={(e) => setNewWalletName(e.target.value)}
            placeholder={t("new_wallet_name")}
          />
          <Button onClick={createWallet}>{t("create_wallet")}</Button>
        </InputWrapper>
        {wallets.length > 0 ? (
          <TableTable>
            <TableHeader>
              <tr>
                <th>{t("wallet_name")}</th>
                <th>{t("action")}</th>
              </tr>
            </TableHeader>
            <tbody>
              {paginatedWallets.map((wallet, index) => (
                <TableRow key={index}>
                  <TableCell>{wallet}</TableCell>
                  <TableCell>
                    <Button onClick={() => fetchWalletDetails(wallet)}>
                      {t("view_wallet")}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </TableTable>
        ) : (
          <p>{t("no_wallet_found")}.</p>
        )}
        <Pagination>
          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationButton
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </PaginationButton>
          ))}
        </Pagination>
        <ToastContainer />
      </Main>
      <Footer />  
      {isModalOpen && (
        <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}       
        title={t("wallet_details")}
        >
          <pre>{JSON.stringify(walletDetails, null, 2)}</pre>
          <Button onClick={sendTransaction}>{t("send_transaction")}</Button>
        </Modal>
      )}
    </Container> 
  );
};

export default Wallets;
