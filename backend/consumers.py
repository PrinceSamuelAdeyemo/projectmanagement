import json
from channels.generic.websocket import WebsocketConsumer
from channels.generic.websocket import AsyncWebsocketConsumer

class Data(AsyncWebsocketConsumer):
    def connect(self):
        print("Connected")
        self.accept()
        return  'hello, there'
        
    def disconnect(self, close_code):
        self.close()
        print("Disconnected")
        
    def receive(self, text_data): 
        text_data_json = json.loads(text_data) 
        message = text_data_json['message'] 
        
        self.send(text_data=message.dumps({"message": message}))
"""        
        try: 
            result = eval(message) 
        except Exception as e: 
            result = "Invalid Expression"
        self.send(text_data=json.dumps({ 
            'result': result 
        })) 
        """
    