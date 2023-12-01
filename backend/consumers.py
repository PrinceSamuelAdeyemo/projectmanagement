import json
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async

from .models import Board, Card, Task

import time

class Data(WebsocketConsumer):
    def connect(self):
        self.accept()
        #message = "From server"
        #self.send(text_data=json.dumps({"message": message}))
        
    def disconnect(self, close_code):
        self.close()
        
    def receive(self, text_data): 
        text_data_json = json.loads(text_data) 
        message = f"From server: {text_data_json['message']}"
        
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
    
class BoardInfoWS(AsyncWebsocketConsumer):
    # connect, disconnect and recieve functions are below
    async def connect(self):
        #self.send(text_data={"connect_status": "Connected"})
        await self.accept()
            
    async def disconnect(self, close_code):
        await self.close()
    
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        messagetitle = text_data_json['title']
        
        if (messagetitle == "boardID"):
            board_id = text_data_json[messagetitle]
            #card_id = board_id
            #task_id = None
            board_details = await self.get_board(board_id)
            card_details = await self.get_cards(board_id)
            all_card_tasks = {}
            try:
                if board_details["board_name"] and board_details["board_description"]:
                    for card_id in card_details.keys():
                        task_details = await self.get_tasks(card_id)
                        current_card_task = task_details
                        all_card_tasks = {**all_card_tasks, **current_card_task}
                    print(all_card_tasks)
                    card_detailslist = {"card_details": card_details}
                    
                    message = {**board_details, **card_detailslist}
                    
                    await self.send(text_data=json.dumps(message))
                    
                #self.card_details = board_details["board_cards"]
                     
            except Exception as e:
                print(e)
                """
                message = board_details["error"]
                self.send(text_data=json.dumps({
                    "board_name": message,
                    "board_description": message
                }))
                """
        else:
            print(messagetitle)
            self.send(text_data=json.dumps({
                "error": "Not requesting for boardID as supposed to."})
            )
        
  
    # Custom functions
    @database_sync_to_async
    def get_board(self, boardID):
        self.boardID = boardID
        try:
            Board.objects.filter(board_id = self.boardID).exists()
            self.board = Board.objects.get(board_id = self.boardID)
                
            #self.get_cards(boardID=self.boardID, cardID=)
            self.board_name = self.board.board_name
            self.board_desc = self.board.board_description
             
            return {
                "board_name": self.board_name,
                "board_description": self.board_desc,
                #"board_cards": self.card_details
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
    
    @database_sync_to_async
    def get_cards(self, boardID):
        self.board = Board.objects.get(board_id = boardID)
        self.card_details = {}
        try:
            Card.objects.filter(card_parent=self.board).exists()
            self.cards = Card.objects.filter(card_parent=self.board).all()
            cards = self.cards
            
            for self.card in self.cards:
                self.card_details_current = {
                    f"{self.card.card_id}": f"{self.card.card_name}",
                }
                self.card_details = {**self.card_details, **self.card_details_current}
                    
            self.card_details = {**self.card_details}
            return self.card_details
            
        except:
            pass
    
    @database_sync_to_async
    def get_tasks(self, cardID):
         
        self.card = Card.objects.get(card_id = cardID)
        try:
            Task.objects.filter(task_parent=self.card).exists()
            self.tasks = Task.objects.filter(task_parent=self.card).all()
        
            self.task_details = {}
            for self.task in self.tasks:
                self.task_details_current = {
                    f"{self.task.task_id}": f"{self.task.task_name}",
                }
                self.task_details = {**self.task_details, **self.task_details_current}
                    
            self.task_details = {**self.task_details}
            
            return ({f"{cardID}" : self.task_details})
            
        except:
            pass
    
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