
# Welcome to Bitcoin Block Explorer - Doidos Descentralizados 🚀

This Bitcoin blockchain explorer was designed to provide users with a modern, intuitive, and multilingual experience when interacting with Bitcoin Core. With this application, you can explore blocks, transactions, and wallets interactively or through blockchain commands directly via the terminal interface.

---

## 🔧 Tech Stack

### Frontend
- **React 18** with **Typescript**

### Backend
- **Python**
- **Shell Script**
- **Bitcoin Core RPC**

### Infrastructure / DevOps
- **Docker** (for containerization)
- **Docker Compose** (for container orchestration)

---

## 📋 Prerequisites
Ensure the following components are installed and configured:
- **Docker** and **Docker Compose**
- A **Bitcoin Core** node in **regtest** mode
- **Node.js 20+**
- **Python 3** with the `flask` and `bitcoinrpc.authproxy` packages

---

## 🚀 How to Start the Application

1. Clone the repository:
   ```bash
   git clone https://github.com/Kledenilson/bitcoin-blockchain-explorer
   ```

2. Navigate to the directory:
   ```bash
   cd bitcoin-blockchain-explorer
   ```

3. Start the services:
   ```bash
   docker-compose up
   ```

### Available URLs:
- **Frontend:** [http://localhost:3000](http://localhost:3000/)
- **Bitcoin Core Regtest:** [http://localhost:18443](http://localhost:18443)
- **Python API:** [http://localhost:5000/api](http://localhost:5000/api)

---

## 🛠️ Initial Setup
1. Access the Bitcoin Regtest container:
   ```bash
   docker exec -it bitcoin-regtest bash
   ```

2. Run the initialization script:
   ```bash
   sh init.sh
   ```

3. Use the application's interactive terminal to execute commands directly on the blockchain, without using `bitcoin-cli -regtest`. Examples:
   ```
   getblockchaininfo
   listwallets
   generatetoaddress 101 <address>
   ```

---

## 🌟 Features
- **Block Search:** Search for blocks by number.
- **Transaction Search:** Find transactions by hash.
- **Wallet Balance Check:** Verify wallet balances by address.
- **Interactive Terminal:** Execute blockchain commands directly through the application.
- **Multilingual:** Dynamic switching between Portuguese and English.

---

## 🛡️ Contributions
This project is under active development, and your contribution is welcome! 
- Report issues or suggest improvements in the [Issues](https://github.com/Kledenilson/bitcoin-blockchain-explorer/issues) tab.

---

## 🏆 Acknowledgments
Thank you for using **Bitcoin Block Explorer - Doidos Descentralizados**! Your collaboration helps make blockchain interaction more accessible and powerful.
