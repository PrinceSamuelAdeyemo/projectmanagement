from django.urls import re_path

from . import consumers
websocket_urlpatterns = [ 
    #re_path(r'ws//127.0.0.1/ws/$', consumers.Data.as_asgi()), 
    re_path(r'ws/$', consumers.Data.as_asgi()), 
] 