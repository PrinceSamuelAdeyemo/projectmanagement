import json
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from asgiref.sync import async_to_sync, sync_to_async
from channels.db import database_sync_to_async
from channels.auth import login, logout, get_user

from knox.models import AuthToken
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import AnonymousUser, User

from .models import Board, Card, Task
from .serializers import BoardSerializer, CreateCardSerializer


class LoginWS(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
    
    async def disconnect(self, close_code):
        await self.close()
    
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        token = text_data_json["token"]
        print("THe token ", token)
        
        user = await self.get_token_user(token)
        #await login(self.scope, user)
        #await database_sync_to_async(self.scope["session"].save)()
        print(self.scope)
        await self.send(text_data=json.dumps({"user": "Authenticated"}))
        
        
    @database_sync_to_async
    def get_token_user(self, token):
        try:
            user = AuthToken.objects.get(token_key=token[:8]).user
            return user
        except:
            user = AnonymousUser()
            return user
            
        #return user
        
        
        
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
        print(self.scope["url_route"]["kwargs"])
        await self.accept()
    async def disconnect(self, close_code):
        await self.close()
        
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        user_token = text_data_json["user"]
        try:
            boards = await self.list_boards(user_token)
            boards_listdict = {"boards_data":boards}
            await self.send(text_data=json.dumps(boards_listdict))
            
        except:
            pass
            
    @database_sync_to_async
    def list_boards(self, token):
        self.user = AuthToken.objects.get(token_key=token[:8]).user
        all_boards= Board.objects.filter(board_owner=self.user).all()
        all_boards_list = list()
        
        for i in range(len(all_boards)):
            current_board_dict = {
                "board_id": str(all_boards[i].board_id), "board_name": all_boards[i].board_name,
                "board_description": all_boards[i].board_description, "board_bgColor": all_boards[i].board_color,
                "board_owner": all_boards[i].board_owner.username}
            
            all_boards_list.append(current_board_dict)
        return all_boards_list
    
 
class BoardInfoWS(AsyncWebsocketConsumer):
    # connect, disconnect and recieve functions are below
    async def connect(self):
        await self.accept()
            
    async def disconnect(self, close_code):
        await self.close()
    
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        messagetitle = text_data_json['title']
        
        if (messagetitle == "boardID"):
            board_id = text_data_json[messagetitle]
            
            board_details = await self.get_board(board_id)
            card_details = await self.get_cards(board_id)
            all_card_tasks = {}
            try:
                if board_details["board_name"]:
                    for card_id in card_details.keys():
                        task_details = await self.get_tasks(card_id)
                        current_card_task = task_details
                        
                        all_card_tasks = {**all_card_tasks, **current_card_task}
                    all_card_taskslist = {"all_card_tasks": all_card_tasks}
                    card_detailslist = {"card_details": card_details}
                    
                    message = {**board_details, **card_detailslist, **all_card_taskslist}
                    await self.send(text_data=json.dumps(message))
                    
                else:
                    message = {"me": "you"}
                    await self.send(text_data=json.dumps(message))
                                         
            except Exception as e:
                print(e)
                """
                message = board_details["error"]
                self.send(text_data=json.dumps({
                    "board_name": message,
                    "board_description": message
                }))
                """
                
        elif (messagetitle == "add_new_card"):
            card_name = text_data_json["card_name"]
            card_parent_id = text_data_json["card_parent"]
            
            card_add_status = await self.add_card(card_name, card_parent_id)
            if card_add_status == "saved":
                board_details = await self.get_board(card_parent_id)
                card_details = await self.get_cards(card_parent_id)
                all_card_tasks = {}
                try:
                    if board_details["board_name"]:
                        for card_id in card_details.keys():
                            task_details = await self.get_tasks(card_id)
                            current_card_task = task_details
                            
                            all_card_tasks = {**all_card_tasks, **current_card_task}
                        all_card_taskslist = {"all_card_tasks": all_card_tasks}
                        card_detailslist = {"card_details": card_details}
                        
                        message = {**board_details, **card_detailslist, **all_card_taskslist}
                        await self.send(text_data=json.dumps(message))
                        
                    else:
                        message = {"me": "you"}
                        await self.send(text_data=json.dumps(message))
                                            
                except Exception as e:
                    print(e)
                    
                    
                    """
                    message = board_details["error"]
                    self.send(text_data=json.dumps({
                        "board_name": message,
                        "board_description": message
                    }))
                    """
                    
            #await self.send(text_data=json.dumps(message))
        
        elif (messagetitle == "add_new_task"):
            task_name = text_data_json["task_name"]
            task_description = text_data_json["task_description"]
            task_parent = text_data_json["task_parent"]
            board_id = text_data_json["board_id"]
            
            task_add_status = await self.add_task(task_name, task_description, task_parent)
            if task_add_status == "saved":
                
                
                board_details = await self.get_board(board_id)
                card_details = await self.get_cards(board_id)
                all_card_tasks = {}
                try:
                    if board_details["board_name"]:
                        for card_id in card_details.keys():
                            task_details = await self.get_tasks(task_parent)
                            current_card_task = task_details
                            
                            all_card_tasks = {**all_card_tasks, **current_card_task}
                        all_card_taskslist = {"all_card_tasks": all_card_tasks}
                        card_detailslist = {"card_details": card_details}
                        
                        message = {**board_details, **card_detailslist, **all_card_taskslist}
                        print(message)
                        await self.send(text_data=json.dumps(message))
                        
                    else:
                        message = {"me": "you"}
                        await self.send(text_data=json.dumps(message))
                                            
                except Exception as e:
                    print(e)
                    
                    
                    """
                    message = board_details["error"]
                    self.send(text_data=json.dumps({
                        "board_name": message,
                        "board_description": message
                    }))
                    """
                    
        
        """
        elif (messagetitle == "add_new_card"):
        
            card_data = {
                "card_name": text_data_json["card_name"],
                "card_parent": text_data_json["card_parent"]
            }
            card = await sync_to_async(self.processCard)(card_data)
            # Had to convert the card_parent id to a string since it is receiving the board instance from the serializer, and then automatically converting it to UUID which cannot be parsed by json
            new_card_details ={ "new_card": 
                {"card_name": card["card_name"], "card_id": card["card_id"], "card_parent": f"{card['card_parent']}"}}
            await self.send(text_data=json.dumps(new_card_details))
        
        else:
            print("Message title not recognised ", messagetitle)
            await self.send(text_data=json.dumps({
                "error": "Not requesting for boardID as supposed to."})
            )
            
    @staticmethod
    def processCard(card_data):
        serializer = CreateCardSerializer(data = card_data)
        if serializer.is_valid():
            serializer.save()
            
            return serializer.data
        else:   print("not valid")
        # 
    """
    
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
    
    @database_sync_to_async
    def add_card(self, cardName, boardID):
        self.card_parent = Board.objects.get(board_id = boardID)
        self.card = Card.objects.create(card_name = cardName, card_parent=self.card_parent)
        if (self.card):
            return "saved"
        else:
            return "not saved"
        
        
    @database_sync_to_async
    def add_task(self, task_name, task_desc, cardID):
        self.task_parent = Card.objects.get(card_id=cardID)
        self.task = Task.objects.create(task_name = task_name, task_description=task_desc, task_parent=self.task_parent)
        if (self.task):
            return "saved"
        else:
            return "not saved"        
        
    def send_board():
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
    