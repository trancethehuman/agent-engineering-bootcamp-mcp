from litellm import completion
import os
from dotenv import load_dotenv

load_dotenv()

response = completion(
       model="openai/gpt-4o",
       messages=[{"content": "Hello, how are you?", "role": "user"}]
   )

print(response.choices[0].message.content)