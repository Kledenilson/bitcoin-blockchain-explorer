import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "../services/api";
import { getError } from "../services/helpers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
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
  TableTable,
} from "../components/Styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Modal from "../components/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wallets = () => {
  const { t } = useTranslation();
  const [wallets, setWallets] = useState([]);
  const [newWalletName, setNewWalletName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMainModalOpen, setIsMainModalOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walletDetails, setWalletDetails] = useState(null);
  const [transactionDetails, setTransactionDetails] = useState({
    address: "",
    amount: "",
  }); 
  const itemsPerPage = 10; 
  const navigate = useNavigate();

  const fetchWallets = async () => {
    try {
      const res = await axios.get("/wallet/count");
      setWallets(res.data.wallets);
    } catch (error) {
      toast.error(t("error_wallet_list") + " " + getError(error), {
        position: "bottom-right",
        autoClose: 3000,
      });
      console.error(t("error_wallet_list"), +getError(error));
    }
  };

  const fetchWalletDetails = async (walletName) => {
    try {
      const res = await axios.get(`/wallet/details/${walletName}`);
      setWalletDetails(res.data);
      setIsModalOpen(true); // Abre a modal
    } catch (error) {
      toast.error(t("error_fetching_wallet_details") + " " + getError(error), {
        position: "bottom-right",
        autoClose: 3000,
      });
      console.error(t("error_fetching_wallet_details"), +getError(error));
    }
  };

  const sendTransaction = async () => {
    try {
      const { address, amount } = transactionDetails;
      if (!address || !amount) {
        toast.error(t("transaction_missing_fields"), {
          position: "bottom-right",
          autoClose: 3000,
        });
        return;
      }

      const res = await axios.post("/transaction/send", {
        wallet: walletDetails.name,
        address,
        amount: parseFloat(amount),
      });
      toast.success(t("transaction_success") + ` TXID: ${res.data.txid}`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(t("error_sending_transaction") + " " + getError(error), {
        position: "bottom-right",
        autoClose: 3000,
      });
      console.error(t("error_sending_transaction"), getError(error));
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
      toast.error(t("error_create_wallet") + " " + getError(error), {
        position: "bottom-right",
        autoClose: 3000,
      });
      console.error(t("error_create_wallet"), +getError(error));
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
      <Header/>
      <Modal
          isOpen={isMainModalOpen}
          onClose={() => setIsMainModalOpen(false)}
          title={""}
        >
        <Title>{t("wallets_list")}</Title>
        <InputWrapper style={{ padding: "20px" }}>
          <Input
            type="text"
            value={newWalletName}
            onChange={(e) => setNewWalletName(e.target.value)}
            placeholder={t("new_wallet_name")}
            style={{margin: '10px'}}
          />
          <Button 
          onClick={createWallet}
          style={{margin: '10px'}}          
          ><FontAwesomeIcon icon={faPlusCircle}/></Button>
        </InputWrapper>
        {wallets.length > 0 ? (
          <TableTable>
            <TableHeader>
              <tr>
                <th style={{textAlign: 'center'}}>{t("wallet_name")}</th>
                <th style={{textAlign: 'center'}}>{t("action")}</th>
              </tr>
            </TableHeader>
            <tbody>
              {paginatedWallets.map((wallet, index) => (
                <TableRow key={index}>
                  <TableCell style={{textAlign: 'center'}}>{wallet}</TableCell>
                  <TableCell>
                    <Button onClick={() => fetchWalletDetails(wallet)}>
                      <FontAwesomeIcon icon={faSearch}/>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </TableTable>
        ) : (
          <p style={{textAlign: 'center'}}>{t("no_wallet_found")}.</p>
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
        </Modal>
      </Main>
      <Footer />
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={t("wallet_details")}
        >
          <pre>{JSON.stringify(walletDetails, null, 2)}</pre>
          <InputWrapper>
            <Input              
              type="text"
              placeholder={t("transaction_address")}
              value={transactionDetails.address}
              onChange={(e) =>
                setTransactionDetails({ ...transactionDetails, address: e.target.value })
              }
              style={{margin:'10px'}}
            />
            <Input
              type="number"
              placeholder={t("transaction_amount")}
              value={transactionDetails.amount}
              onChange={(e) =>
                setTransactionDetails({ ...transactionDetails, amount: e.target.value })
              }
            />
          </InputWrapper>
          <Button onClick={sendTransaction} style={{marginLeft: '43%'}}>{t("send_transaction")}</Button>
        </Modal>
      )}
    </Container>
  );
};

export default Wallets;
