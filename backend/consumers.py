import json
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async

from .models import Board

class Data(WebsocketConsumer):
    def connect(self):
        self.accept()
        message = "From server"
        self.send(text_data=json.dumps({"message": message}))
        
    def disconnect(self, close_code):
        self.close()
        
    def receive(self, text_data): 
        text_data_json = json.loads(text_data) 
        message = "From server: "+text_data_json["message"]
        
        self.send(text_data=json.dumps({"message": message}))
        """        
        try: 
            result = eval(message) 
        except Exception as e: 
            result = "Invalid Expression"
        self.send(text_data=json.dumps({ 
            'result': result 
        })) 
        """
    
class BoardInfoWS(WebsocketConsumer):
  
    # connect, disconnect and recieve functions are below
    def connect(self):
        
        self.accept()
        #self.send(text_data=json.dumps({"message": "Hello"}))
    
    def disconnect(self, close_code):
        self.close()
    
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        messagetitle = text_data_json['title']
        
        if (messagetitle == "boardID"):
            board_id = text_data_json[messagetitle]
            self.board_details = self.get_board(board_id)
            
            try:
                message = self.board_details["error"]
                self.send(text_data=json.dumps({
                    "board_name": message,
                    "board_description": message
                }))
                
            except:
                self.board_name = self.board_details["board_name"]
                self.board_desc = self.board_details["board_desc"]
                
                self.send(text_data=json.dumps({
                    "board_name": self.board_name,
                    "board_description": self.board_desc
                }))
            
        else:
            self.send(
                text_data=json.dumps({"error": "Not requesting for boardID as supposed to."})
            )
        
  
    # Custom functions
    def get_board(self, boardID):
        self.boardID = boardID
        try:
            Board.objects.filter(board_id = self.boardID).exists()
            self.board = Board.objects.get(board_id = self.boardID)
            self.board_name = self.board.board_name
            self.board_desc = self.board.board_description
            
            return {
                "board_name": self.board_name,
                "board_desc": self.board_desc
            }
            
        except KeyError:
            return {"error": "The board ID does not exist in the database."}
            """
            self.send(
                text_data=json.dumps({"error": "The board ID does not exist in the database."})
            )
            """
        except:
            return {"error": "A unknown error occurred."}
        
class UserStatus(WebsocketConsumer):
    def connect(self):
        self.accept()
    
    def disconnect(self, close_code):
        self.close()
    
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        
        user_auth = text_data_json["user_auth"]
        username = user_auth["username"]
        token = user_auth["token"]
        user_details = {
            "USERNAME": username,
            "TOKEN": token
        }
        self.send(text_data=json.dumps(user_details))
    
    #def send(self, text_data):
    #    pass  