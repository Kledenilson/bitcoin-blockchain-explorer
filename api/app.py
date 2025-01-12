import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from bitcoinrpc.authproxy import AuthServiceProxy, JSONRPCException

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

RPC_USER = os.getenv("RPC_USER", "user")
RPC_PASSWORD = os.getenv("RPC_PASSWORD", "pass")
RPC_HOST = os.getenv("RPC_HOST", "127.0.0.1")
RPC_PORT = os.getenv("RPC_PORT", "18443")

def get_rpc_connection():
    url = f"http://{RPC_USER}:{RPC_PASSWORD}@{RPC_HOST}:{RPC_PORT}"
    return AuthServiceProxy(url)

@app.route('/api/block/<int:block_number>', methods=['GET'])
def get_block_by_number(block_number):
    try:
        rpc = get_rpc_connection()
        block_hash = rpc.getblockhash(block_number)
        block = rpc.getblock(block_hash)
        return jsonify(block)
    except JSONRPCException as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/transaction/<string:txid>', methods=['GET'])
def get_transaction_by_hash(txid):
    try:
        rpc = get_rpc_connection()
        transaction = rpc.getrawtransaction(txid, True)
        return jsonify(transaction)
    except JSONRPCException as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/wallet/balance/<string:address>', methods=['GET'])
def get_balance_by_address(address):
    try:
        rpc = get_rpc_connection()
        utxos = rpc.listunspent(0, 9999999, [address])
        balance = sum(utxo['amount'] for utxo in utxos)
        return jsonify({'address': address, 'balance': balance})
    except JSONRPCException as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/transaction/create', methods=['POST'])
def create_transaction():
    try:
        sender_address = request.json.get('sender_address')
        recipient_address = request.json.get('recipient_address')
        amount = request.json.get('amount')
        if not sender_address or not recipient_address or not amount:
            return jsonify({'error': 'Parâmetros incompletos. Informe sender_address, recipient_address e amount.'}), 400
        rpc = get_rpc_connection()
        utxos = rpc.listunspent(0, 9999999, [sender_address])
        if not utxos:
            return jsonify({'error': f'Nenhum UTXO disponível para o endereço {sender_address}'}), 400
        inputs = []
        total_input = 0
        for utxo in utxos:
            inputs.append({'txid': utxo['txid'], 'vout': utxo['vout']})
            total_input += utxo['amount']
            if total_input >= amount:
                break
        if total_input < amount:
            return jsonify({'error': f'Saldo insuficiente no endereço {sender_address}. Saldo disponível: {total_input}'}), 400
        outputs = {recipient_address: amount}
        change = total_input - amount
        if change > 0:
            outputs[sender_address] = change
        raw_tx = rpc.createrawtransaction(inputs, outputs)
        signed_tx = rpc.signrawtransactionwithwallet(raw_tx)
        if not signed_tx.get('complete', False):
            return jsonify({'error': 'Erro ao assinar a transação'}), 500
        txid = rpc.sendrawtransaction(signed_tx['hex'])
        return jsonify({'txid': txid, 'inputs': inputs, 'outputs': outputs})
    except JSONRPCException as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/block/count', methods=['GET'])
def get_block_count():
    try:
        rpc = get_rpc_connection()
        block_count = rpc.getblockcount()
        return jsonify({'block_count': block_count})
    except JSONRPCException as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/transaction/count', methods=['GET'])
def get_transaction_count():
    try:
        rpc = get_rpc_connection()      
       
        block_count = rpc.getblockcount()        
      
        total_tx_count = 0
        for i in range(block_count + 1):
            block_hash = rpc.getblockhash(i)
            block = rpc.getblock(block_hash)
            total_tx_count += len(block.get('tx', []))
        
        return jsonify({'transaction_count': total_tx_count})
    except JSONRPCException as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/wallet/count', methods=['GET'])
def get_wallet_count():
    try:
        rpc = get_rpc_connection()
        wallets = rpc.listwallets()
        wallet_count = len(wallets)
        return jsonify({'wallet_count': wallet_count, 'wallets': wallets})
    except JSONRPCException as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
