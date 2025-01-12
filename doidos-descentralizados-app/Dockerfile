# Use uma imagem Node.js como base
FROM node:18-alpine

# Cria um diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos de dependências (package.json e package-lock.json)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Instala a biblioteca de multi linguagem
RUN npm install i18next react-i18next i18next-browser-languagedetector 

# Instala as bibliotecas para estilizar fontes e ícones
#RUN npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core
RUN yarn add @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta usada pela aplicação
EXPOSE 3000
CMD ["npm", "start"]
