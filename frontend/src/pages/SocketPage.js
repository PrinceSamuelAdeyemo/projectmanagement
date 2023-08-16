import React, { useState, useEffect } from 'react'
import io from 'socket.io-client';


const SocketPage = () => {
  useEffect(() => {
    const socket = io.connect("http://localhost:8000/api/board");

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div>Board Component</div>;
};


export default SocketPage