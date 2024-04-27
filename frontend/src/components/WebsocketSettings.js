import React from 'react';
import { useState, useEffect } from 'react';

const WebsocketSettings = (url) => {
    const [socket, SetSocket] = useState(null);
    const ws = new WebSocket(url);
    SetSocket(ws);
    useEffect(() => {
        //const ws = new WebSocket(url);
        //SetSocket(ws);

        return () =>  {
            //ws.close();
        };
    }, [url]);
    
  return socket;
}

export default WebsocketSettings;