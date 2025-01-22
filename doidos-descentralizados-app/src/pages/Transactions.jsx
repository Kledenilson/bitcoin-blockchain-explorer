import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "../services/api";
import { getError } from "../services/helpers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Container, Input, InputWrapper, Main, Pagination, PaginationButton, Title, TransactionCell, TransactionHeader, TransactionRow, TransactionTable, Wrapper } from "../components/Styles";
import Modal from "../components/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TransactionQuery from "../components/TransactionQuery";
import Header from "../components/Header";

const Transactions = () => {

  const { t } = useTranslation();
  const [isMainModalOpen, setIsMainModalOpen] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [newTransactionName, setNewTransactionName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("/transactions/list");
      setTransactions(res.data.transactions)
            
      console.log('resposta transactions', res.data.transactions);
    } catch (error) {
      toast.error(t("transaction_query_error") + " " + getError(error), { 
        position: "bottom-right",
        autoClose: 3000,
      });
      console.error(t("transaction_query_error") , getError(error));
    }
  };

  const createTransaction = async () => {
    try {
      await axios.post("/transaction/create", { Transaction_name: newTransactionName });
      setNewTransactionName("");
      toast.success(t("Transaction_created_success"), { 
        position: "bottom-right",
        autoClose: 3000,
      });
      fetchTransactions();
    } catch (error) {
      toast.error(t("transaction_create_error") + " " + getError(error), { 
        position: "bottom-right",
        autoClose: 3000,
      });
      console.log(t("transaction_create_error"), getError(error));
}
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Paginação
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const paginatedTransactions = transactions.slice(
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
        <Title>{t("Transactions")}</Title>
        <TransactionQuery></TransactionQuery>
        <InputWrapper>
          <Input
            type="text"
            value={newTransactionName}
            onChange={(e) => setNewTransactionName(e.target.value)}
            placeholder={t("new_address_send")} 
            style={{flex: '1', padding: '5px', fontSize: '0.9rem'}}           
          />
          <Input
            type="number"
            placeholder={t("transfer_amount")}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{margin: '10px'}}
          />
          <Button 
            onClick={createTransaction}
             style={{margin: '10px'}}
            >{t("Send")}</Button>
        </InputWrapper>
        {Transactions.length > 0 ? (
          <TableTable>
            <TableHeader>
              <tr>                
                <th>{t("address")}</th>               
              </tr>
            </TableHeader>
            <tbody>
              {paginatedTransactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{transaction.address}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.txid}</TableCell>
                  <TableCell>
                    <Button onClick={() => navigate(`/send/${transaction.address}`)}>
                      Enviar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </TableTable>
        ) : (
            <p style={{textAlign: 'center'}}>{t("no_transaction_found")}.</p> 
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
    </Container> 
  );
};

export default Transactions;
