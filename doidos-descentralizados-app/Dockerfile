# Use uma imagem Node.js como base
FROM node:18-alpine

# Cria um diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos de dependências (package.json e package-lock.json)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

RUN npm install i18next react-i18next i18next-browser-languagedetector

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta usada pela aplicação
EXPOSE 3000

# Comando para iniciar o servidor React
CMD ["npm", "start"]
