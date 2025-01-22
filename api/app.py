import os
import subprocess
from flask import Flask, request, jsonify
from flask_cors import CORS
from bitcoinrpc.authproxy import AuthServiceProxy, JSONRPCException

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

RPC_USER = os.getenv("RPC_USER", "user")
RPC_PASSWORD = os.getenv("RPC_PASSWORD", "pass")
RPC_HOST = os.getenv("RPC_HOST", "bitcoin-regtest")
RPC_PORT = os.getenv("RPC_PORT", "18443")

# RPC connect
def get_rpc_connection():
    url = f"http://{RPC_USER}:{RPC_PASSWORD}@{RPC_HOST}:{RPC_PORT}"
    return AuthServiceProxy(url)

# Test connection
@app.route('/api/test-regtest', methods=['GET'])
def test_regtest():
    try:
        rpc = get_rpc_connection()
        blockchain_info = rpc.getblockchaininfo()
        if blockchain_info.get("chain") == "regtest":
            return jsonify({"status": "success", "message": "Connected to the Bitcoin node in regtest mode!", "info": blockchain_info})
        else:
            return jsonify({"status": "error", "message": "The node is not in regtest mode!"}), 400
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# Blocks
@app.route('/api/block/generate', methods=['POST'])
def generate_blocks():
    try:
        num_blocks = request.json.get('num_blocks')
        address = request.json.get('address')

        if not num_blocks or not address:
            return jsonify({"status": "error", "message": '"num_blocks" and "address" parameters are required!'}), 400

        rpc = get_rpc_connection()
        block_hashes = rpc.generatetoaddress(num_blocks, address)
        return jsonify({"status": "success", "message": "Blocks generated successfully!", "block_hashes": block_hashes})
    except JSONRPCException as e:
        return jsonify({"status": "error", "message": f'RPC error: {str(e)}'}), 400

@app.route('/api/block/count', methods=['GET'])
def get_block_count():
    try:
        rpc = get_rpc_connection()
        block_count = rpc.getblockcount()
        return jsonify({"status": "success", "message": "Block count retrieved successfully!", "block_count": block_count})
    except JSONRPCException as e:
        return jsonify({"status": "error", "message": f'RPC error: {str(e)}'}), 400

@app.route('/api/block/<int:block_number>', methods=['GET'])
def get_block_by_number(block_number):
    try:
        rpc = get_rpc_connection()
        block_hash = rpc.getblockhash(block_number)
        block = rpc.getblock(block_hash)
        return jsonify({"status": "success", "message": "Block retrieved successfully!", "block": block})
    except JSONRPCException as e:
        return jsonify({"status": "error", "message": f'RPC error: {str(e)}'}), 400

# Wallets
@app.route('/api/wallet/newaddress', methods=['GET'])
def get_new_address():
    try:
        rpc = get_rpc_connection()
        address = rpc.getnewaddress()
        return jsonify({"status": "success", "message": "New address generated successfully!", "address": address})
    except JSONRPCException as e:
        return jsonify({"status": "error", "message": f'RPC error: {str(e)}'}), 400

@app.route('/api/wallet/details/<string:wallet_name>', methods=['GET'])
def get_wallet_details(wallet_name):
    try:
        rpc = get_rpc_connection()
        loaded_wallets = rpc.listwallets()
        if wallet_name not in loaded_wallets:
            rpc.loadwallet(wallet_name)
        details = rpc.getwalletinfo()
        return jsonify({"status": "success", "message": "Wallet details retrieved successfully!", "details": details})
    except JSONRPCException as e:
        return jsonify({"status": "error", "message": f'RPC error: {str(e)}'}), 400

@app.route('/api/wallet/create', methods=['POST'])
def create_wallet():
    try:
        wallet_name = request.json.get('wallet_name')
        if not wallet_name:
            return jsonify({"status": "error", "message": "Wallet name is required!"}), 400

        rpc = get_rpc_connection()
        result = rpc.createwallet(wallet_name)
        return jsonify({"status": "success", "message": "Wallet created successfully!", "result": result})
    except JSONRPCException as e:
        return jsonify({"status": "error", "message": f'RPC error: {str(e)}'}), 400

@app.route('/api/wallet/count', methods=['GET'])
def get_wallet_count():
    try:
        rpc = get_rpc_connection()
        wallets = rpc.listwallets()
        wallet_count = len(wallets)
        return jsonify({"status": "success", "message": "Wallet count retrieved successfully!", "wallet_count": wallet_count, "wallets": wallets})
    except JSONRPCException as e:
        return jsonify({"status": "error", "message": f'RPC error: {str(e)}'}), 400

@app.route('/api/wallet/balance', methods=['GET'])
def get_wallet_balance():
    try:
        rpc = get_rpc_connection()
        balance = rpc.getbalance()
        return jsonify({"status": "success", "message": "Wallet balance retrieved successfully!", "balance": balance})
    except JSONRPCException as e:
        return jsonify({"status": "error", "message": f'RPC error: {str(e)}'}), 400

@app.route('/api/transaction/send', methods=['POST'])
def send_transaction():
    try:
        address = request.json.get('address')
        amount = request.json.get('amount')

        if not address or not amount:
            return jsonify({"status": "error", "message": '"address" and "amount" parameters are required!'}), 400

        rpc = get_rpc_connection()
        txid = rpc.sendtoaddress(address, amount)
        return jsonify({"status": "success", "message": "Transaction sent successfully!", "txid": txid})
    except JSONRPCException as e:
        return jsonify({"status": "error", "message": f'RPC error: {str(e)}'}), 400
    
@app.route('/api/transaction/<string:txid>', methods=['GET'])
def get_transaction_by_hash(txid):
    try:
        rpc = get_rpc_connection()
        transaction = rpc.getrawtransaction(txid, True)
        return jsonify({"status": "success", "message": "Transaction retrieved successfully!", "transaction": transaction})
    except JSONRPCException as e:
        return jsonify({"status": "error", "message": f'RPC error: {str(e)}'}), 400

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

        return jsonify({"status": "success", "message": "Transaction count retrieved successfully!", "transaction_count": total_tx_count})
    except JSONRPCException as e:
        return jsonify({"status": "error", "message": f'RPC error: {str(e)}'}), 400

@app.route('/api/transactions/list', methods=['GET'])
def list_transactions():
    try:
        wallet_name = request.args.get('wallet_name', '')
        count = int(request.args.get('count', 10))
        skip = int(request.args.get('skip', 0))

        rpc = get_rpc_connection()
        
        if wallet_name:
            loaded_wallets = rpc.listwallets()
            if wallet_name not in loaded_wallets:
                rpc.loadwallet(wallet_name)
     
        transactions = rpc.listtransactions("*", count, skip)
        return jsonify({"status": "success", "message": "Transactions retrieved successfully!", "transactions": transactions})
    except JSONRPCException as e:
        return jsonify({"status": "error", "message": f'RPC error: {str(e)}'}), 400
    except Exception as e:
        return jsonify({"status": "error", "message": f'Unexpected error: {str(e)}'}), 500


# RPC remote commands terminal
@app.route('/api/rpc-command', methods=['POST'])
def execute_rpc_command():
    try:
        command = request.json.get('command')
        args = request.json.get('args', [])

        if not command:
            return jsonify({"status": "error", "message": 'Empty command is not allowed!'}), 400

        rpc = get_rpc_connection()

        method = getattr(rpc, command, None)
        if not method:
            return jsonify({"status": "error", "message": f'Command "{command}" not recognized by Bitcoin Core!'}), 400

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
        return jsonify({"status": "success", "message": "Command executed successfully!", "result": result})
    except JSONRPCException as e:
        return jsonify({"status": "error", "message": f'RPC error: {str(e)}'}), 400
    except Exception as e:
        return jsonify({"status": "error", "message": f'Unexpected error: {str(e)}'}), 500

# RPC remote commands terminal
# @app.route('/api/rpc-command', methods=['POST'])
# def execute_rpc_command():
#     try:        
#         command = request.json.get('command')
#         args = request.json.get('args', [])

#         if not command:
#             return jsonify({'error': 'Comando vazio não é permitido.'}), 400

#         rpc = get_rpc_connection()

#         method = getattr(rpc, command, None)
#         if not method:
#             return jsonify({'error': f'Comando {command} não reconhecido pelo Bitcoin Core.'}), 400
        
#         typed_args = []
#         for arg in args:
#             try:                
#                 if isinstance(arg, str) and arg.isdigit():
#                     typed_args.append(int(arg))
#                 else:
#                     typed_args.append(arg)
#             except ValueError:
#                 typed_args.append(arg)
        
#         result = method(*typed_args)
#         return jsonify({'result': result})
#     except JSONRPCException as e:
#         return jsonify({'error': f'Erro RPC: {str(e)}'}), 400
#     except Exception as e:
#         return jsonify({'error': f'Erro inesperado: {str(e)}'}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
