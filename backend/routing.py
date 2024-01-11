from django.urls import re_path

from . import consumers
websocket_urlpatterns = [
    re_path(r'ws/test', consumers.Data.as_asgi()),
    re_path(r'ws/login', consumers.LoginWS.as_asgi()),
    re_path(r'ws/all_board_contents_user', consumers.AllBoardListDetails.as_asgi()),
    re_path(r'ws/boardlist', consumers.BoardListWS.as_asgi()),
    re_path(r'ws/board/boardID', consumers.BoardInfoWS.as_asgi()),
    re_path(r'ws/card/cardID', consumers.CardInfoWS.as_asgi()),
    re_path(r'ws/auth_token', consumers.UserStatus.as_asgi())
] 