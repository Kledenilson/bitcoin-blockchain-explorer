import React, { useEffect, useRef, useState } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";
import axios from "./services/api";


const InteractiveTerminal = ( ) => {
    
    const backendUrl = '/rpc-command';
    const terminalRef = useRef(null);
    const [term, setTerm] = useState(null);
  
    useEffect(() => {
      
      const terminal = new Terminal({
        rows: 20,
        cols: 80,
        theme: {
          background: "#1e1e1e",
          foreground: "#ffffff",
        },
      });
      terminal.open(terminalRef.current);
      terminal.write("Bem-vindo ao terminal interativo da Blockchain Doidos Descentralizados!\r\n");
      terminal.write("Digite o comando e pressione ENTER.\r\n\r\n");
      setTerm(terminal);
        
      let command = "";
      
      terminal.onData((key) => {
        
        if (key === "\r") {
          
          terminal.write("\r\n");
          sendCommand(command, terminal);
          command = ""; 

        } else if (key === "\u007f") {
          
          if (command.length > 0) {

            command = command.slice(0, -1); 
            terminal.write("\b \b");
          }
        } else {
         
          command += key;
          terminal.write(key);
        }
      });
      
      
      return () => {

        terminal.dispose();

      };
    }, [backendUrl]);
  
    const sendCommand = async (command, terminalInstance) => {
      if (!terminalInstance) {
        console.error("Terminal não está inicializado.");
        return;
      }
    
      if (!command.trim()) {
        terminalInstance.write("Comando vazio. Tente novamente.\r\n");
        return;
      }

      const [cmd, ...args] = command.split(" ");    
   
      const filteredCmd = cmd === "bitcoin-cli" ? args.shift() : cmd;
      const filteredArgs = args.filter(arg => arg !== "-regtest");
    
      try {
        const response = await axios.post(backendUrl, {
          command: filteredCmd,
          args: filteredArgs,
        });
    
        if (response.data.error) {
      
          terminalInstance.write(`[Erro]: ${response.data.error}\r\n`);
        } else {
     
          const output =
            typeof response.data.result === "object"
              ? JSON.stringify(response.data.result, null, 2) // Formatação legível
              : response.data.result;
    
          output.split("\n").forEach((line) => {
            terminalInstance.write(`${line}\r\n`);
          });
        }
      } catch (error) {
       
        if (error.response && error.response.data && error.response.data.error) {
          terminalInstance.write(`[Erro]: ${error.response.data.error}\r\n`);
        } else {
          terminalInstance.write(`[Erro inesperado]: ${error.message}\r\n`);
        }
      }
      terminalInstance.write("\r\n> ");
    };  
  
    return (
      <div
        ref={terminalRef}
        style={{
          width: "100%",
          height: "auto",
          overflow: "hidden",
          border: "1px solid #333",
        }}
      ></div>
    );
  };

export default InteractiveTerminal;
