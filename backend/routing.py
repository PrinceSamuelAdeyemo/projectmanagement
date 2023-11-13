from django.urls import re_path

from . import consumers
websocket_urlpatterns = [
    re_path(r'ws/test', consumers.Data.as_asgi()), 
    re_path(r'ws/board/boardID', consumers.BoardInfoWS.as_asgi()),
    re_path(r'ws/auth_token', consumers.UserStatus.as_asgi())
] 