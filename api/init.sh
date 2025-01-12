#!/bin/bash

echo "Iniciando script de configuração do Bitcoin Core..."
while ! bitcoin-cli -regtest getblockchaininfo > /dev/null 2>&1; do
    echo "Aguardando o Bitcoin Core iniciar..."
    sleep 5
done

echo "Bitcoin Core está ativo!"

if ! bitcoin-cli -regtest listwallets | grep -q "doidos-descentralizados"; then
    echo "Criando a carteira 'doidos-descentralizados'..."
    WALLET_NAME="doidos-descentralizados"
    bitcoin-cli -regtest createwallet "$WALLET_NAME"
    #WALLET_CREATED=$(bitcoin-cli -regtest getwalletinfo)    
    #WALLET_HASH=$(jq -r '.lastprocessedblock.hash' <<< "$WALLET_CREATED")
    #echo "Esse é o hash da sua carteira: " $WALLET_CREATED
else
    echo "Carteira 'doidos-descentralizados' já existe."
fi

echo "Verificando blocos gerados..."
CURRENT_BLOCKS=$(bitcoin-cli  getblockcount)
if [ "$CURRENT_BLOCKS" -lt 200 ]; then
    echo "Gerando 200 blocos..."
    ADDRESS=$(bitcoin-cli -regtest getnewaddress)
    bitcoin-cli -regtest generatetoaddress 200 $ADDRESS
else
    echo "Blocos já gerados. Total de blocos: $CURRENT_BLOCKS"
fi

echo "Configuração concluída!"
