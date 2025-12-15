# agents/utils/json_parser.py
import json
import re

def extract_json(text: str) -> dict:
    if not text:
        raise ValueError("Empty LLM response")

    # Try direct parse
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    # Extract JSON block
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if not match:
        raise ValueError("No JSON object found")

    return json.loads(match.group())
