import os
import json
from dotenv import load_dotenv
from langchain_groq import ChatGroq

load_dotenv()

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY")
)

def get_ai_response(message):

    prompt = f"""
You are an HCP CRM assistant.

Read the conversation and extract these fields.

Return ONLY valid JSON.

If the conversation does not mention the value,
make a reasonable inference where possible.

Rules:
- interactionType must be one of:
  "In-person visit", "Phone Call", "Email", "Virtual meeting","conference"
- If the date is not mentioned,
 return today's actual date in DD-MM-YYYY format.
-If the time is not mentioned,
 return the current time in hh:mm AM/PM format.

- sentiment should be Positive, Neutral or Negative.
- summary should be a short summary.
- Never return null.

Return exactly this JSON format:

{{
  "hcpName":"",
  "interactionType":"",
  "date":"",
  "time":"",
  "attendees":"",
  "topics":"",
  "materials":"",
  "samples":"",
  "sentiment":"",
  "outcomes":"",
  "followUp":"",
  "summary":""
}}

Conversation:

{message}
"""

    response = llm.invoke(prompt)

    text = response.content.strip()

    # Remove markdown if AI adds it
    text = text.replace("```json", "")
    text = text.replace("```", "")
    text = text.strip()

    return text