from dotenv import load_dotenv
import os
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
model = os.getenv("GEMINI_MODEL")

print("API KEY LOADED:", bool(api_key))
print("MODEL:", model)

client = genai.Client(
    api_key=api_key,
    http_options={"timeout": 30000}
)

try:
    print("Sending request...")

    response = client.models.generate_content(
        model=model,
        contents="Reply with exactly: Gemini is working."
    )

    print("SUCCESS!")
    print(response.text)

except Exception as e:
    print("ERROR TYPE:", type(e).__name__)
    print("ERROR:", e)