#!/bin/bash

echo "Iniciando script de configuração do Bitcoin Core..."
while ! bitcoin-cli -regtest getblockchaininfo > /dev/null 2>&1; do
    echo "Aguardando o Bitcoin Core iniciar..."
    sleep 5
done

echo "Bitcoin Core está ativo!"

# Nome do arquivo com a lista de carteiras
arquivo="createtWallets.txt"

# Loop para percorrer cada linha do arquivo
while IFS= read -r nome; do
    if [ -n "$nome" ]; then
        echo "Verificando carteira: $nome"

        if bitcoin-cli -regtest -rpcwallet="$nome" getwalletinfo > /dev/null 2>&1; then
            echo "Carteira $nome já existe. Pulando criação."
        else
            echo "Criando carteira para: $nome"
            if bitcoin-cli -regtest createwallet "$nome" > /dev/null 2>&1; then
                echo "Carteira $nome criada com sucesso."
            else
                echo "Erro ao criar a carteira $nome."
            fi
        fi
    fi
done < "$arquivo"

echo "Carteiras criadas com sucesso!"

echo "Minerando blocos iniciais..."
CURRENT_BLOCKS=$(bitcoin-cli -regtest getblockcount)
NUMBER_BLOCKS=$(shuf -i 1000-10000 -n 1)
if [ "$CURRENT_BLOCKS" -lt "$NUMBER_BLOCKS" ]; then
    echo "Gerando $NUMBER_BLOCKS blocos..."
    
    # Use a primeira carteira como exemplo
    carteira_ativa=$(head -n 1 "$arquivo")

    # Gera um novo endereço a partir da carteira especificada
    ADDRESS=$(bitcoin-cli -regtest -rpcwallet="$carteira_ativa" getnewaddress)
    
    # Gera os blocos para o endereço
    if bitcoin-cli -regtest -rpcwallet="$carteira_ativa" generatetoaddress $NUMBER_BLOCKS $ADDRESS; then
        echo "$NUMBER_BLOCKS blocos gerados com sucesso!"
    else
        echo "Erro ao gerar os blocos."
    fi
else
    echo "Blocos já gerados. Total de blocos: $CURRENT_BLOCKS"
fi

echo "Configuração concluída!"
