import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Container, Input, InputWrapper, Main, Pagination, PaginationButton, Title, TransactionCell, TransactionHeader, TransactionRow, TransactionTable, Wrapper } from "../components/Styles";
import Modal from "../components/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TransactionQuery from "../components/TransactionQuery";

const Transactions = () => {

  const { t } = useTranslation();
  const [Transactions, setTransactions] = useState([]);
  const [newTransactionName, setNewTransactionName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Define o número de itens por página
  const navigate = useNavigate();

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("/transactions");
      setTransactions(res.data.Transaction);
    } catch (error) {
      toast.error(t("block_query_error") + " " + error, { 
        position: "bottom-right",
        autoClose: 3000,
      });
      console.error("Erro ao listar carteiras:", error);
    }
  };

  const createTransaction = async () => {
    try {
      await axios.post("/transaction/create", { Transaction_name: newTransactionName });
      setNewTransactionName("");
      toast.success(t("Transaction_created_success") + " " + error, { 
        position: "bottom-right",
        autoClose: 3000,
      });
      fetchTransactions();
    } catch (error) {
      console.error("Erro ao criar carteira:", error);
      toast.error(t("block_query_error") + " " + error, { 
        position: "bottom-right",
        autoClose: 3000,
      });
}
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Paginação
  const totalPages = Math.ceil(Transactions.length / itemsPerPage);
  const paginatedTransactions = Transactions.slice(
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
        <Title>{t("Transactions")}</Title>
        <TransactionQuery></TransactionQuery>
        <Wrapper>
          <Input
            type="text"
            value={newTransactionName}
            onChange={(e) => setNewTransactionName(e.target.value)}
            placeholder={t("new_address_send")}
          />
          <Button onClick={createTransaction}>{t("Send")}</Button>
        </Wrapper>
        {Transactions.length > 0 ? (
          <TableTable>
            <TableHeader>
              <tr>                
                <th>{t("address")}</th>               
              </tr>
            </TableHeader>
            <tbody>
              {paginatedTransactions.map((Transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{Transaction.txid}</TableCell>
                  <TableCell>{Transaction}</TableCell>
                  <TableCell>
                    <Button onClick={() => navigate(`/send/${Transaction.address}`)}>
                      Enviar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </TableTable>
        ) : (
            <p>{t("no_transaction_found")}.</p> 
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
    </Container> 
  );
};

export default Transactions;
