import os
import requests
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

def get_openai_review(code):

    if not OPENROUTER_API_KEY:
        return "API key not found in .env file"

    url = "https://openrouter.ai/api/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "HTTP-Referer": "http://localhost:5000",  # REQUIRED by OpenRouter
        "X-Title": "AI Code Reviewer",            # REQUIRED by OpenRouter
        "Content-Type": "application/json"
    }

    payload = {
        "model": "openai/gpt-3.5-turbo",
        "messages": [
            {
                "role": "user",
                "content": f"Review this Python code and give feedback:\n\n{code}"
            }
        ]
    }

    try:
        response = requests.post(url, headers=headers, json=payload)

        if response.status_code != 200:
            return f"AI Error: {response.text}"

        result = response.json()
        return result["choices"][0]["message"]["content"]

    except Exception as e:
        return f"AI Exception: {str(e)}"
