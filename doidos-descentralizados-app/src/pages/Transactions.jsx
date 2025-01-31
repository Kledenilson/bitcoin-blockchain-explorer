import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "../services/api";
import { getError } from "../services/helpers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Container, Input, InputWrapper, Main, Pagination, PaginationButton, Title, TableTable, TableHeader, TableRow, TableCell, Wrapper } from "../components/Styles";
import Modal from "../components/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TransactionQuery from "../components/TransactionQuery";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import SearchButton from "../components/SearchButtom";

const Transactions = () => {

  const { t } = useTranslation();
  const [isMainModalOpen, setIsMainModalOpen] = useState(true);
  const [isTransactionModalOpen, setIsTransactionMainModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [transactionData, setTransactionData] = useState(null);
  const [amount, setAmount] = useState("");
  const [address, setNewTransactionName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  let hash;
 

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
      await axios.post("/transaction/send", { address: address, amount: amount });
      setAddres(address)
      setAmount(amount)
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

  const fetchTransaction = async (txHash) => {
    try {
      const res = await axios.get(`/transaction/${txHash}`);
      console.log("dados",res);    
      setTransactionData(res);
    } catch (error) {
      toast.error(t("transaction_query_error") + getError(error), { 
        position: "bottom-right",
        autoClose: 3000,
      });      
      console.error(t("transaction_query_error"), getError(error));
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
            value={address}
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
            ><FontAwesomeIcon icon={faPaperPlane} /></Button>
        </InputWrapper>
        {transactions.length > 0 ? (
          <TableTable>
             <TableHeader>
              <tr>
                <th style={{textAlign: 'center'}}>{t("hash")}</th>
                <th style={{textAlign: 'center'}}>{t("amount")}</th>
                {/* <th style={{textAlign: 'center'}}>{t("hash")}</th> */}
                <th></th>
              </tr>
            </TableHeader>
            <tbody style={{fontSize: '0.8em'}}>
              {paginatedTransactions.map((transaction, index) => (                
                <TableRow key={index}>
                  <TableCell style={{textAlign: 'center'}}>{transaction.txid}</TableCell>
                  <TableCell style={{textAlign: 'center'}}>{transaction.amount}</TableCell>
                  {/* <TableCell>{transaction.txid}</TableCell> */}
                  <TableCell>
                    <SearchButton  onClick={() => {setIsTransactionMainModalOpen(true); fetchTransaction(transaction.txid)}}>
                    {t("transaction_query_button")}
                    </SearchButton>
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
            {isTransactionModalOpen && (
              <Modal                
                isOpen={isTransactionModalOpen}
                onClose={() => setIsTransactionMainModalOpen(false)}
                title={t("transaction_query_title")}              >
                  <pre>{JSON.stringify(transactionData, null, 2)}</pre>
              </Modal>
              )}
      </Main>
      <Footer />
    </Container> 
  );
};

export default Transactions;
