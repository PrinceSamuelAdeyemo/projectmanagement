import React, { useEffect, useState,  } from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';

// Styling
import '../styles/css/board.css'

const Test = () => {
    const navigate = useNavigate();
    const [boardName, setBoardName] = useState('');
    const [boardDescription, setBoardDescription] = useState('');
    const [boardCard, setBoardCard] = useState([]);
    
  let host = 'ws://127.0.0.1:8000/ws'
  const socket = new WebSocket(`${host}/test`);
  socket.onopen = (event) => {
    console.log("Connection established");
    /*
    socket.send(JSON.stringify(
        {
          "title": "error",
          "boardID": "a79544b2-5ae9-4f40-8bdb-e0fbdfecf4f9",
          }));
          */
    
    socket.send(JSON.stringify({"message": "work"}))
    console.log("Sent")
  }
  
    var mymessage;
    
    useEffect((event) => {
        socket.onmessage = async (event) => {
            var message = await JSON.parse(event.data);
            console.log(message.message)
            console.log("A")
            console.log("B")
            console.log("C")
            //setBoardName("Name")
            console.log('\n')
      }
        setBoardName("Board Name")
        setBoardDescription("Board Description")
        setBoardCard({A: "b"})

        return () => socket.close()
    }, [])
  
  socket.onerror = (event) => {
    console.log("Error at websocket")
  }

  socket.onclose = () => console.log("Connection was closed")
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
  
  var previousPage = () => {
    navigate(-1);
  }

  return (
    
    <HelmetProvider>
        <Helmet>
            
        </Helmet>

        <div className="container-fluid">
            <div className="projectContainer">
              <div className='projectName'>
                
                <button className='btn d-inline'><span className='pe-2'><i className="fa fa-angle-left"></i></span></button>
                <h2 className='d-inline'>{boardName}</h2>
              </div>
              
              <div className='projectDescription'>
                <p>{boardDescription}</p>
              </div>
            </div>
        </div>

    </HelmetProvider>
    
  )
}

//const WrappedBoardInfo = RequireAuthentication(BoardInfo)
export default Test