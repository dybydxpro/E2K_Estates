from rest_framework import status
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import action
import json
from E2K_WebApi.Services.OpenAIService import OpenAIService
import asyncio


class OpenAIController(viewsets.ViewSet):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.openAIService = OpenAIService()

    @action(detail=False, methods=['post'])
    def generate_gpt_response(self, request):
        try:
            response_data = asyncio.run(self.openAIService.chat_bot(request.data))
            if isinstance(response_data, dict):
                response_data = json.dumps(response_data)
            return Response(json.loads(response_data), status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)