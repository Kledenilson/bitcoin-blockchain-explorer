import os
import subprocess
from flask import Flask, request, jsonify
from flask_cors import CORS
from bitcoinrpc.authproxy import AuthServiceProxy, JSONRPCException

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

RPC_USER = os.getenv("RPC_USER", "user")
RPC_PASSWORD = os.getenv("RPC_PASSWORD", "pass")
RPC_HOST = os.getenv("RPC_HOST", "127.0.0.1")
RPC_PORT = os.getenv("RPC_PORT", "18443")

# RPC connect
def get_rpc_connection():
    url = f"http://{RPC_USER}:{RPC_PASSWORD}@{RPC_HOST}:{RPC_PORT}"
    return AuthServiceProxy(url)

# Blocks
@app.route('/api/block/generate', methods=['POST'])
def generate_blocks():
    try:
        num_blocks = request.json.get('num_blocks')
        address = request.json.get('address')

        if not num_blocks or not address:
            return jsonify({'error': 'Parâmetros "num_blocks" e "address" são obrigatórios.'}), 400

        rpc = get_rpc_connection()
        block_hashes = rpc.generatetoaddress(num_blocks, address)
        return jsonify({'block_hashes': block_hashes})
    except JSONRPCException as e:
        return jsonify({'error': f'Erro RPC: {str(e)}'}), 400
    
@app.route('/api/block/count', methods=['GET'])
def get_block_count():
    try:
        rpc = get_rpc_connection()
        block_count = rpc.getblockcount()
        return jsonify({'block_count': block_count})
    except JSONRPCException as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/block/<int:block_number>', methods=['GET'])
def get_block_by_number(block_number):
    try:
        rpc = get_rpc_connection()
        block_hash = rpc.getblockhash(block_number)
        block = rpc.getblock(block_hash)
        return jsonify(block)
    except JSONRPCException as e:
        return jsonify({'error': str(e)}), 400

# Wallets   
@app.route('/api/wallet/newaddress', methods=['GET'])
def get_new_address():
    try:
        rpc = get_rpc_connection()
        address = rpc.getnewaddress()
        return jsonify({'address': address})
    except JSONRPCException as e:
        return jsonify({'error': f'Erro RPC: {str(e)}'}), 400

@app.route('/api/wallet/create', methods=['POST'])
def create_wallet():
    try:
        wallet_name = request.json.get('wallet_name')
        if not wallet_name:
            return jsonify({'error': 'Nome da carteira é obrigatório.'}), 400

        rpc = get_rpc_connection()
        result = rpc.createwallet(wallet_name)
        return jsonify(result)
    except JSONRPCException as e:
        return jsonify({'error': f'Erro RPC: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': f'Erro inesperado: {str(e)}'}), 500

@app.route('/api/wallets', methods=['GET'])
def list_wallets():
    try:
        rpc = get_rpc_connection()
        wallets = rpc.listwallets()
        return jsonify({'wallets': wallets})
    except JSONRPCException as e:
        return jsonify({'error': f'Erro RPC: {str(e)}'}), 400

@app.route('/api/wallet/count', methods=['GET'])
def get_wallet_count():
    try:
        rpc = get_rpc_connection()
        wallets = rpc.listwallets()
        wallet_count = len(wallets)
        return jsonify({'wallet_count': wallet_count, 'wallets': wallets})
    except JSONRPCException as e:
        return jsonify({'error': str(e)}), 400
    
@app.route('/api/wallet/balance', methods=['GET'])
def get_wallet_balance():
    try:
        rpc = get_rpc_connection()
        balance = rpc.getbalance()
        return jsonify({'balance': balance})
    except JSONRPCException as e:
        return jsonify({'error': f'Erro RPC: {str(e)}'}), 400

@app.route('/api/wallet/balance/<string:address>', methods=['GET'])
def get_balance_by_address(address):
    try:
        rpc = get_rpc_connection()
        utxos = rpc.listunspent(0, 9999999, [address])
        balance = sum(utxo['amount'] for utxo in utxos)
        return jsonify({'address': address, 'balance': balance})
    except JSONRPCException as e:
        return jsonify({'error': str(e)}), 400


# Transactions
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

@app.route('/api/transaction/send', methods=['POST'])
def send_transaction():
    try:
        address = request.json.get('address')
        amount = request.json.get('amount')

        if not address or not amount:
            return jsonify({'error': 'Parâmetros "address" e "amount" são obrigatórios.'}), 400

        rpc = get_rpc_connection()
        txid = rpc.sendtoaddress(address, amount)
        return jsonify({'txid': txid})
    except JSONRPCException as e:
        return jsonify({'error': f'Erro RPC: {str(e)}'}), 400

@app.route('/api/transaction/<string:txid>', methods=['GET'])
def get_transaction_by_hash(txid):
    try:
        rpc = get_rpc_connection()
        transaction = rpc.getrawtransaction(txid, True)
        return jsonify(transaction)
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


# RPC remote commands terminal
@app.route('/api/rpc-command', methods=['POST'])
def execute_rpc_command():
    try:        
        command = request.json.get('command')
        args = request.json.get('args', [])

        if not command:
            return jsonify({'error': 'Comando vazio não é permitido.'}), 400

        rpc = get_rpc_connection()

        method = getattr(rpc, command, None)
        if not method:
            return jsonify({'error': f'Comando {command} não reconhecido pelo Bitcoin Core.'}), 400
        
        typed_args = []
        for arg in args:
            try:                
                if isinstance(arg, str) and arg.isdigit():
                    typed_args.append(int(arg))
                else:
                    typed_args.append(arg)
            except ValueError:
                typed_args.append(arg)
        
        result = method(*typed_args)
        return jsonify({'result': result})
    except JSONRPCException as e:
        return jsonify({'error': f'Erro RPC: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': f'Erro inesperado: {str(e)}'}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
