# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import threading
import hashlib
import hmac
import time
import requests
from websockets.sync.client import connect

app = Flask(__name__)
CORS(app)

# Config (通过Render环境变量设置)
ACCESS_KEY_ID = "3MnVONPTIDbllv7GF3BZZyqc"
ACCESS_KEY_SECRET = "S8LzntySLUHygXQcH79oPoAL1AHLSI"
APP_ID = 1741373428785

@app.route('/start', methods=['POST'])
def start_connection():
    # ...之前提供的完整后端代码...
    return jsonify({"status": "成功"})  # 输出只保留关键字段

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
