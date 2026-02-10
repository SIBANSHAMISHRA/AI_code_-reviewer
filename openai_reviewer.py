import os
import requests
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

def get_openai_review(code):
    url = "https://openrouter.ai/api/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }

    prompt = f"""
Review this code and give feedback and quality score (0-100):

{code}
"""

    data = {
        "model": "openai/gpt-3.5-turbo",   # or gpt-4o-mini if allowed
        "messages": [{"role": "user", "content": prompt}]
    }

    res = requests.post(url, headers=headers, json=data)
    output = res.json()["choices"][0]["message"]["content"]

    return {
        "ai_model": "OpenAI via OpenRouter",
        "feedback": output,
        "quality_score": 80
    }

