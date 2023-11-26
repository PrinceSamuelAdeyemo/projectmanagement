import React, { useEffect, useState, useCallback } from 'react'
import Card from '../components/Card';

import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';

import RequireAuthentication from '../components/RequireAuthentication';

// Styling
import '../styles/css/board.css'
import NavbarAnonymous from '../components/NavbarAnonymous';
import { error } from 'jquery';

let host = 'ws://127.0.0.1:8000/ws'
const socket = new WebSocket(`${host}/board/boardID`);
const BoardInfo = () => {

  
  const { boardID } = useParams();
  const navigate = useNavigate();
  
  /*
    
    const [boardTasks, setBoardTasks] = useState([]);

    const [boardTaskName, setBoardTaskName] = useState([]);
    const [boardTaskDescription, setBoardTaskDescription] = useState([]);
    const [boardTaskAssignedto, setBoardAssignedto] = useState([]);
  */  

    //const [boardList, setBoardList] = useState([]);
    const [boardName, setBoardName] = useState('');
    const [boardDescription, setBoardDescription] = useState('');
    const [boardCard, setBoardCard] = useState({});
    const [boardCards, setBoardCards] = useState([]);
    const [boardCardAssignedto, setBoardCardAssignedto] = useState([]);

    
    const [cardTasks, setCardTasks] = useState([]);

    const [tempcardTask, settempCardTask] = useState('');

    const [tempcardName, settempCardName] = useState('');

  let company = 'tesla';
  const getBoardInfoStuffs = useCallback(() =>{
    
  })
  socket.onopen = (event) => {
    console.log("Connection established")
    socket.send(JSON.stringify(
      {
        "title": "boardID",
        "boardID": "a79544b2-5ae9-4f40-8bdb-e0fbdfecf4f9",
        }));
  }

  socket.onmessage = async (event) => {
    let message = await JSON.parse(event.data);
    console.log(message.card_details)
    setBoardName(message.board_name);
    setBoardDescription(message.board_description);
    setBoardCard(message.card_details)
  }

  for (let card in boardCard){
    console.log(boardCard)
    //console.log({card: card[id]})
  }
  

  socket.onerror = (event) => {
    console.log(error)
  }

  socket.onclose = (event) => {
    console.log("Socket closed.")
  }
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
  

  //socket.OPEN
  useEffect(() => {
    
    //requestBoardCards();

    window.history.scrollRestoration = 'auto';
    window.scrollTo(0,0)
  });

  

  var closeTaskEdit = (event) => {
    var editaddTask = document.getElementById("editaddTask");
    var tempTaskName = document.getElementById("tempTaskName");
    var tempTaskDescription = document.getElementById("tempTaskDescription");

    editaddTask.style.display = "none";
    tempTaskName.textContent = '';
    tempTaskName.value = '';
    tempTaskDescription.textContent = '';
    tempTaskDescription.value = '';
  }

  var saveCard = (event) => {
    var cardNameInput = document.getElementById("cardNameInput");
    console.log(cardNameInput.value)
  }

  var deleteBoardTask = (event) => {
    alert("Hello, World")
  }

  var previousPage = () => {
    navigate(-1);
  }

  return (
    <HelmetProvider>
        <Helmet>
            <meta charset="UTF-8" />
            <meta name="author" content="Samuel Adeyemo" />
            <meta name="application-name" content="My todo app" />
            <meta name="description" content="A simple to do app" />
            <meta name="keywords" content="todo, app, Simple, task management program" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            
            <script src="{% static 'assets/js/jquery.js'%} "></script>
            <script src="{% static 'assets/js/activity.js'%} "></script>

            <title></title>
        </Helmet>

        <div className="container-fluid">
            
            {/* {% include 'navbar-all.html' %} */}
            <div className="projectContainer">
              <div className='projectName'>
                
                <button className='btn d-inline' onClick={previousPage}><span className='pe-2'><i className="fa fa-angle-left"></i></span></button>
                <h2 className='d-inline'>{boardName}</h2>
              </div>
              <div className='editaddTask' id='editaddTask'>
                <button className='closeTaskEdit' onClick={closeTaskEdit}><span><i className='fa fa-xmark'></i></span></button>
                <div className=''>
                  
                  <h3>Task</h3>
                  <p>Name</p>
                  <input id="tempTaskName" className='w-100' type='text' />
                  <p>Description</p>
                  <textarea id="tempTaskDescription" className='w-100'></textarea>
                  <p>Assigned to</p>
                  <select role='switch' aria-checked="false" className='w-100'>
                    <option>Red</option>
                    <option>Orange</option>
                    <option>Yellow</option>
                    <option>Green</option>
                    <option>Blue</option>
                    <option>Indigo</option>
                    <option>Violet</option>
                  </select>
                  <div className='text-center'>
                    <button className='m-2 px-3 bg-light'>Save</button>
                    <button className='m-2 px-3'>Delete</button>
                  </div>
                </div>

              </div>
              <div className='projectDescription'>
                <p>{boardDescription}</p>
              </div>
              
              <div className='row gx-4 boardParent'>

                <Card/>

                <div className='col-md-3 p-2'>
                  <div className='p-1 eachboard'>
                    <div className='eachboardsubdiv' id='eachboardsubdiv'>
                      <input className='cardNameInput' id='cardNameInput' type='text' placeholder='+ Add a card' onBlur={(event) => saveCard()} />
                      <button className='deleteCard'><span><i className='fa fa-xmark'></i></span></button>
                    </div>
                    
                    
                  </div>
                </div>

              </div>

            </div>
        </div>

    </HelmetProvider>
  )
}

//const WrappedBoardInfo = RequireAuthentication(BoardInfo)
export default BoardInfo