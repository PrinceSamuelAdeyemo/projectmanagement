import React, { useCallback, useEffect } from 'react';
import Homepage from './Homepage';
import { Link, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import '../styles/css/404.css';

const Error = () => {
  const navigate = useNavigate();
    const openPage = (page) =>{
        navigate(`/${page}`);
    };
    const is_authenticated = useSelector((state) => state.USER_STATUS.status)
    const me = is_authenticated
    console.log(is_authenticated)
    if (is_authenticated == true){
      console.log("Done ooooooooooo")
    }

  useEffect(() => {
    
  })
  
  const requestBoardCards = () =>{
    //if (socket.OPEN){
    socket.send(JSON.stringify(
      {
        "title": "boardID",
        "boardID": "a79544b2-5ae9-4f40-8bdb-e0fbdfecf4f9",
        }));

      //socket.close(3000)
    console.log('Sent');
    //}
    
  }

  let host = 'ws://127.0.0.1:8000/ws'
  const socket = new WebSocket(`${host}/board/boardID`);
  socket.onopen = (event) => {
  console.log("Connection established")
  //requestBoardCards();
    }


  return (
    <div className='parent404div'>
      <div className='child404div'>
        
        <h1>Sorry! Page not found</h1>
        <p>Head homepage or use the search to find what you're looking for.</p>
        <button className='btn btn-info' onClick={() => openPage('')}>Back to Homepage</button>
      </div>
    </div>
  )
}

export default Error;