import json
from channels.generic.websocket import WebsocketConsumer

class Data(WebsocketConsumer):
    def connect(self):
        self.accept()
        
    def disconnect(self, close_code):
        self.close()
        
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