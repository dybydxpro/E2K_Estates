from django.urls import path
from E2K_WebApi.Controllers.OpenAIController import OpenAIController

urlpatterns = [
    path('OpenAI', OpenAIController.as_view({'post': 'generate_gpt_response'}), name='OpenAIController')
]