import json
import base64
import aiohttp
from dotenv import load_dotenv
import os

from .DomService import DomService
from .GptScriptService import GptScriptService;

load_dotenv()

class OpenAIService():
    def __init__(self):
        self.gptScriptService = GptScriptService()
        self.domService = DomService()
        self.gptModelUrl = os.getenv('OPENAI_URL', '')
        self.gptModelModel = os.getenv('OPENAI_MODEL', '')
        self.gptModelMaxTokens = int(os.getenv('OPENAI_MAX_TOKEN', 1000))
        self.gptTemperature = int(os.getenv('OPENAI_TEMPERATURE', 0))
        self.apiKey = self.__base64_decode(os.getenv('OPENAI_API_KEY', ''))

    async def chat_bot(self, msg_list):
        try:
            res = await self.generate_gpt_response(msg_list)
            soup = await self.domService.update_dom(res.get('description'))
            res["description"] = str(soup)
            return res
        except Exception as err:
            raise err

    async def generate_gpt_response(self, msg_list):
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + self.apiKey,
        }

        body = {
            "model": self.gptModelModel,
            "messages": self.__generate_msg_list(msg_list),
            "max_tokens": self.gptModelMaxTokens,
            "temperature": self.gptTemperature,
            "response_format": {"type": "json_object"},
        }

        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(self.gptModelUrl, headers=headers, json=body) as response:
                    response.raise_for_status()
                    response_data = await response.json()
                    res = response_data["choices"][0]["message"]["content"]
                    return json.loads(res.replace("\n", "").replace("ngmodel", "ngModel"))
        except Exception as err:
            print(err)
            raise err

    def __generate_msg_list(self, messages):
        msg_list = []
        for i, message in enumerate(messages):
            if i == 0:
                msg_list.append({"role": 'system', "content": self.gptScriptService.getGptInstructions() + " " + self.gptScriptService.getConfigResponse()})

            if message["ownerType"] == 1:
                msg_list.append({"role": 'system', "content": message["text"]})
            else:
                msg_list.append({"role": 'user', "content": self.gptScriptService.getConfigResponse() + " " + message["text"]})
        return msg_list

    def __base64_decode(self, encoded_text):
        try:
            decoded_bytes = base64.b64decode(encoded_text.encode("utf-8"))
            return decoded_bytes.decode("utf-8")
        except Exception as e:
            return ""