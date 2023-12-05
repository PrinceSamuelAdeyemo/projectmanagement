import json
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async
from channels.auth import login, logout, get_user

from knox.models import AuthToken
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth.models import User

from .models import Board, Card, Task
from .serializers import BoardSerializer

import time

class LoginWS(AsyncWebsocketConsumer):
    async def connect(self):
        
        await self.accept()
    
    async def disconnect(self, close_code):
        await self.close()
    
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        token = text_data_json["token"]
        print("THe token ", token)
        try:
            user = await get_token_user(token)
            try:
                gg = await login(self.scope, user)
                print(gg)
                if gg is not None:
                    await database_sync_to_async(self.scope["session"].save)()
                    await self.send(json.dumps({"user": "Authenticated"}))
                else:
                    print('kkkkkk')
                
            except:
                await self.send(json.dumps({"user": "Unauthenticated"}))
            
            finally:
                print("From finally", self.scope["user"])
        except:
            pass
        lol = await get_user(self.scope)
        print("lola",lol)
        
@database_sync_to_async
def get_token_user(token):
    try:
        user = AuthToken.objects.get(token_key=token[:8]).user
    except:
        user = AnonymousUser()
        
    return user
        
        
        
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
    
class BoardListWS(AsyncWebsocketConsumer):
    async def connect(self):
        #await login(self.scope, user)
        #self.user = self.scope["user"]
        
        #print(self.user)
        lol = await get_user(self.scope)
        print("lol",lol)
        await self.accept()
    async def disconnect(self, close_code):
        await self.close()
        
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        user = text_data_json["user"]
        boards_dict = {}
        if (user == "boards"):
            #boards = database_sync_to_async(Board.objects.all())
            boards = await get_boards()
            boards_dict = json.dumps(boards)
            print(boards_dict)
            await self.send(text_data = json.dumps({"ee":f"{boards_dict}"}))
            print("sent")
            
            """
            for board in boards:
                current_board_dict = {"board_id": board[0], 
                                      "board_name": board[1], 
                                      "board_description": board[2],}
                boards_dict = {**boards_dict, **current_board_dict}
                
            boards_dict = {**boards_dict, **current_board_dict}
            print(boards_dict)
            boards_dict = json.dumps(boards_dict)
            await self.send(text_data = boards_dict)
            """
        
            #print(boards)
            
        
@database_sync_to_async
def get_boards():
    per = User.objects.get(username = "personal")
    all_boards= Board.objects.filter(board_owner=per)
    all_boards_dict = {}
    for board in all_boards:
        current_board_dict = {"board_id": board.board_id, "board_name": board.board_name,
                              "board_description": board.board_description, "board_owner": board.board_owner.username}
        all_boards_dict = {**all_boards_dict, **current_board_dict}
    
    all_boards_dict = {**all_boards_dict, **current_board_dict}
    #print(all_boards_dict)
    return all_boards_dict
    

    #all_boards = Board.objects.related_name("board_owner").all()
    
    
    #print(boards)

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
                    all_card_taskslist = {"all_card_tasks": all_card_tasks}
                    card_detailslist = {"card_details": card_details}
                    
                    message = {**board_details, **card_detailslist, **all_card_taskslist}
                    #print(message)
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
            await self.send(text_data=json.dumps({
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
    
    
class CardInfoWS(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        
    async def disconnect(self, close_code):
        await self.close()
        
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        card_id = text_data_json['cardID']
        
        """
        Get the tasks under the boards since the card details (card_id) will be sent one after the order
        It make sense to treat them as one entity per request/response
        """
        try:
            task_details = await self.get_tasks(card_id)
            print(task_details)
            await self.send(text_data=json.dumps(task_details))
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
                    
            #self.task_details = {**self.task_details}
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