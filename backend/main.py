from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import time

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for demo purposes
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sample data that will be emitted
active_nodes = [
    {"node_id": 1, "status": "active"},
    {"node_id": 2, "status": "inactive"},
]

# Function to generate threat data
async def emit_threat_data(websocket: WebSocket):
    await websocket.accept()
    while True:
        timestamp = time.strftime('%Y-%m-%d %H:%M:%S', time.gmtime())
        global_threat_level = "Moderate"
        recent_logs = [
            "Detected phishing attempt.",
            "Malware scan completed.",
            "Unusual login detected.",
        ]
        threat_data = {
            "timestamp": timestamp,
            "active_nodes": active_nodes,
            "global_threat_level": global_threat_level,
            "recent_logs": recent_logs,
        }
        await websocket.send_json(threat_data)
        await asyncio.sleep(0.5)  # Emit every 500ms

@app.websocket('/stream')
async def stream(websocket: WebSocket):
    await emit_threat_data(websocket)
