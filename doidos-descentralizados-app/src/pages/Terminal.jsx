import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, Container, InputWrapper, Main, Title, Wrapper } from "../components/Styles";
import Modal from "../components/Modal";
import InteractiveTerminal from "../InteractiveTerminal";

function Terminal() {

  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

  const commands = [
    { command: "getbestblockhash", example: "getbestblockhash", description: "getbestblockhash_descr" },
    { command: "getblock", example: "getblock <blockhash>", description: "getblock_descr" },
    { command: "getblockchaininfo", example: "getblockchaininfo", description: "getblockchaininfo_descr" },
    { command: "getblockcount", example: "getblockcount", description: "getblockcount_descr" },
    { command: "getblockhash", example: "getblockhash <height>", description: "getblockhash_descr" },
    { command: "getchaintips", example: "getchaintips", description: "getchaintips_descr" },
    { command: "getdifficulty", example: "getdifficulty", description: "getdifficulty_descr" },
    { command: "invalidateblock", example: "invalidateblock <blockhash>", description: "invalidateblock_descr" },
    { command: "preciousblock", example: "preciousblock <blockhash>", description: "preciousblock_descr" },
    { command: "reconsiderblock", example: "reconsiderblock <blockhash>", description: "reconsiderblock_descr" },
    { command: "submitblock", example: "submitblock <hexdata>", description: "submitblock_descr" },
    { command: "generatetoaddress", example: "generatetoaddress <nblocks> <address>", description: "generatetoaddress_descr" },
    { command: "getblocktemplate", example: "getblocktemplate", description: "getblocktemplate_descr" },
    { command: "getmininginfo", example: "getmininginfo", description: "getmininginfo_descr" },
    { command: "addpeeraddress", example: "addpeeraddress <address> <port>", description: "addpeeraddress_descr" },
    { command: "clearbanned", example: "clearbanned", description: "clearbanned_descr" },
    { command: "disconnectnode", example: "disconnectnode <address> <port>", description: "disconnectnode_descr" },
    { command: "getnetworkinfo", example: "getnetworkinfo", description: "getnetworkinfo_descr" },
    { command: "getpeerinfo", example: "getpeerinfo", description: "getpeerinfo_descr" },
    { command: "listbanned", example: "listbanned", description: "listbanned_descr" },
    { command: "ping", example: "ping", description: "ping_descr" },
    { command: "setban", example: "setban <subnet> <command>", description: "setban_descr" },
    { command: "getmempoolinfo", example: "getmempoolinfo", description: "getmempoolinfo_descr" },
    { command: "getrawmempool", example: "getrawmempool", description: "getrawmempool_descr" },
    { command: "createwallet", example: "createwallet <wallet_name>", description: "createwallet_descr" },
    { command: "getwalletinfo", example: "getwalletinfo", description: "getwalletinfo_descr" },
    { command: "importprivkey", example: "importprivkey <privkey>", description: "importprivkey_descr" },
    { command: "listunspent", example: "listunspent", description: "listunspent_descr" },
    { command: "listwallets", example: "listwallets", description: "listwallets_descr" },
    { command: "loadwallet", example: "loadwallet <wallet_name>", description: "loadwallet_descr" },
    { command: "sendtoaddress", example: "sendtoaddress <address> <amount>", description: "sendtoaddress_descr" },
    { command: "unloadwallet", example: "unloadwallet <wallet_name>", description: "unloadwallet_descr" },
    { command: "walletlock", example: "walletlock", description: "walletlock_descr" },
    { command: "walletpassphrase", example: "walletpassphrase <passphrase> <timeout>", description: "walletpassphrase_descr" },
    { command: "utxoupdatepsbt", example: "utxoupdatepsbt <psbt>", description: "utxoupdatepsbt_descr" },
    { command: "decoderawtransaction", example: "decoderawtransaction <hexstring>", description: "decoderawtransaction_descr" },
    { command: "getrawtransaction", example: "getrawtransaction <txid>", description: "getrawtransaction_descr" },
    { command: "setmocktime", example: "setmocktime <timestamp>", description: "setmocktime_descr" },
    { command: "stop", example: "stop", description: "stop_descr" }
];

  const filteredCommands = commands.filter((cmd) =>  
    cmd.command.toLowerCase().includes(searchTerm.toLowerCase())   
  );

  const walletCommandsTitle = t("WalletCLI")+ " - " + t("Commands");

  return (
    <Container>
      <Navbar />
      <Main>
      <Header/>      
        <Title>{t("WalletCLI")}</Title>     
          <Button style={{maginBottom: '20px'}} onClick={() => setIsModalOpen(true)}>{t("Help") + " - " +walletCommandsTitle}</Button>          
        <Wrapper>          
          <InteractiveTerminal />
        </Wrapper>    
      </Main>
      <Footer />
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={walletCommandsTitle}
        >
          <ModalContent>            
            <SearchBar
              type="text"
              placeholder={t("SearchCommands")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />            
            <CommandList>
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, index) => (
                  <CommandItem key={index}>
                    <h3>{cmd.index}</h3>
                    <h4>{cmd.command}</h4>
                    <p>
                      <strong>{t("Example")}:</strong> {cmd.example}
                    </p>
                    <p>{t(cmd.description)}</p>
                  </CommandItem>
                ))
              ) : (
                <NoResults>{t("no_commands")}</NoResults>
              )}
            </CommandList>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}

export default Terminal;

const ModalContent = styled.div`
  padding: 20px;
  max-height: 80vh;
  overflow-y: auto;
  text-align: left;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CommandList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CommandItem = styled.div`
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;

  h3 {
    margin: 0;
    font-size: 1.2rem;
    color: #333;
  }

  p {
    margin: 5px 0;
    font-size: 1rem;
    color: #555;
  }
`;

const NoResults = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #888;
`;
