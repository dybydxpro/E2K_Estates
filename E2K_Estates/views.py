from django.conf import settings
from django.shortcuts import redirect, render
from django.views.generic import TemplateView

class IndexView(TemplateView):
    def get(self, request, *args, **kwargs):
        if settings.DEBUG:
            # Redirect to Angular dev server in development mode
            return redirect("http://localhost:4200")
        # Serve the Angular build's index.html in production
        return render(request, "index.html")