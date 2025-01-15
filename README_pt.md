
# Bem-vindo ao Bitcoin Block Explorer - Doidos Descentralizados 🚀

Este explorador de blockchain Bitcoin foi desenvolvido para oferecer aos usuários uma experiência moderna, intuitiva e multilíngue ao interagir com o Bitcoin Core. Com esta aplicação, você pode explorar blocos, transações e carteiras de forma interativa ou por meio de comandos da blockchain diretamente pela interface de terminal.

---

## 🔧 Stacks Utilizadas

### Frontend
- **React 18** com **Typescript**

### Backend
- **Python**
- **Shell Script**
- **Bitcoin Core RPC**

### Infraestrutura / DevOps
- **Docker** (para containerização)
- **Docker Compose** (para orquestração de contêineres)

---

## 📋 Pré-requisitos
Certifique-se de que os seguintes componentes estejam instalados e configurados:
- **Docker** e **Docker Compose**
- Um nó **Bitcoin Core** em modo **regtest**
- **Node.js 20+**
- **Python 3** com os pacotes `flask` e `bitcoinrpc.authproxy`

---

## 🚀 Como Iniciar a Aplicação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Kledenilson/bitcoin-blockchain-explorer
   ```

2. Acesse o diretório:
   ```bash
   cd bitcoin-blockchain-explorer
   ```

3. Inicie os serviços:
   ```bash
   docker-compose up
   ```

### Endereços Disponíveis:
- **Frontend:** [http://localhost:3000](http://localhost:3000/)
- **Bitcoin Core Regtest:** [http://localhost:18443](http://localhost:18443)
- **API Python:** [http://localhost:5000/api](http://localhost:5000/api)

---

## 🛠️ Configuração Inicial
1. Acesse o contêiner do Bitcoin Regtest:
   ```bash
   docker exec -it bitcoin-regtest bash
   ```

2. Execute o script de inicialização:
   ```bash
   sh init.sh
   ```

3. Utilize o terminal interativo da aplicação para executar comandos diretamente na blockchain, sem precisar usar o `bitcoin-cli -regtest`. Exemplos:
   ```
   getblockchaininfo
   listwallets
   generatetoaddress 101 <address>
   ```

---

## 🌟 Funcionalidades
- **Busca de Blocos:** Pesquise blocos pelo número.
- **Busca de Transações:** Encontre transações pelo hash.
- **Consulta de Carteiras:** Verifique saldos de carteiras pelo endereço.
- **Terminal Interativo:** Execute comandos da blockchain diretamente pela aplicação.
- **Multilíngue:** Alternância dinâmica entre português e inglês.

---

## 🛡️ Contribuições
Este projeto está em constante evolução, e sua contribuição é bem-vinda! 
- Relate problemas ou sugira melhorias na aba [Issues](https://github.com/Kledenilson/bitcoin-blockchain-explorer/issues).
---

## 🏆 Agradecimentos
Obrigado por utilizar o **Bitcoin Block Explorer - Doidos Descentralizados**! Sua colaboração ajuda a tornar a interação com a blockchain mais acessível e poderosa.
