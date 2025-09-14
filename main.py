from fastapi import FastAPI
from pydantic import BaseModel
from uuid import uuid4
from datetime import datetime
from notion_client import Client
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()
NOTION_TOKEN = os.getenv("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")
VERDICT_DB_ID = os.getenv("25e70788ec6380768974000c1ed8249d")

# Initialize Notion client
notion = Client(auth=NOTION_TOKEN)

# Initialize FastAPI app
app = FastAPI(title="📈 Trade API Online")

# Define request model
class TradeRequest(BaseModel):
    symbol: str
    action: str
    capital: float
    entry: float
    exit: float
    stop: float
    hold: str
    verdict: str
    date: str  # ISO format: "2025-08-30T02:00:00"

# Root endpoint
@app.get("/")
def read_root():
    return {"status": "📈 Trade API Online"}

# Verdict push endpoint
@app.post("/id")
def push_verdict(trade: TradeRequest):
    verdict_id = str(uuid4())
    timestamp = trade.date if trade.date else datetime.utcnow().isoformat()

    try:
        notion.pages.create(
            parent={"database_id": VERDICT_DB_ID},
            properties={
                "Symbol": {"title": [{"text": {"content": trade.symbol}}]},
                "Action": {"select": {"name": trade.action}},
                "Capital": {"number": trade.capital},
                "Entry": {"number": trade.entry},
                "Exit": {"number": trade.exit},
                "Stop": {"number": trade.stop},
                "Hold": {"rich_text": [{"text": {"content": trade.hold}}]},
                "Verdict": {"select": {"name": trade.verdict}},
                "VerdictID": {"rich_text": [{"text": {"content": verdict_id}}]},
                "Timestamp": {"date": {"start": timestamp}}
            }
        )
        print(f"✅ Verdict pushed: {verdict_id}")
        return {
            "verdict_id": verdict_id,
            "status": "✅ Verdict pushed to Notion",
            "symbol": trade.symbol,
            "verdict": trade.verdict
        }
    except Exception as e:
        print(f"❌ Notion push failed: {e}")
        return {
            "status": "❌ Failed to push verdict",
            "error": str(e)
        }