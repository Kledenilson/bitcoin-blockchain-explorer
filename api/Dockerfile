# Base da imagem
FROM python:3.9-slim

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Criar diretório da aplicação
WORKDIR /app

# Copiar dependências
COPY requirements.txt requirements.txt

# Instalar dependências da API
RUN pip install --no-cache-dir -r requirements.txt

# Copiar o código da API
COPY . .

# Expor a porta 5000
EXPOSE 5000

# Comando para rodar o servidor
CMD ["python", "app.py"]
