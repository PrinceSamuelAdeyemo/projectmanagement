import React, { useEffect, useState } from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';

import RequireAuthentication from '../components/RequireAuthentication';

// Styling
import '../styles/css/board.css'
import NavbarAnonymous from '../components/NavbarAnonymous';
import { error } from 'jquery';

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
    const [boardCards, setBoardCards] = useState([]);
    const [boardCardAssignedto, setBoardCardAssignedto] = useState([]);

    const [cardNames, setCardNames] = useState([]);
    const [cardTasks, setCardTasks] = useState([]);

    const [tempcardTask, settempCardTask] = useState('');

    const [tempcardName, settempCardName] = useState('');

  let company = 'tesla';
  let host = 'ws://127.0.0.1:8000/ws'
  const socket = new WebSocket(`${host}/board/boardID`);
  socket.onopen = (event) => {
    //console.log("Socket opened")
    socket.send(JSON.stringify(
      {
        "title": "boardID",
        "boardID": "10c37205-2870-48ab-8eb2-b29b9f5cb7f2",
        }));

    //console.log('Sent');
  }

  socket.onmessage = (event) => {
    let message = JSON.parse(event.data);
    /*
    console.log(message);
    console.log(message.board_name);
    console.log(message.board_description);
    */
    setBoardName(message.board_name);
    setBoardDescription(message.board_description);
  }

  
  
  socket.onerror = (event) => {
    //console.log(error)
  }
  

  socket.onclose = (event) => {
    //console.log("Socket closed.")
  }


  useEffect(() => {
    window.history.scrollRestoration = 'auto';
    window.scrollTo(0,0)
  });

  

    const addBoardTask = (event, cardName) => {
      var addTask = document.getElementById("editaddTask");
      var tempTaskName = document.getElementById("tempTaskName");
      var tempTaskDescription = document.getElementById("tempTaskDescription");
      tempTaskName.value = '';
      tempTaskDescription.value = '';
      addTask.style.display = "block";

    }

    const editBoardTask = (event) => {
      var editaddTask = document.getElementById("editaddTask");
      var tempTaskName = document.getElementById("tempTaskName");
      var tempTaskDescription = document.getElementById("tempTaskDescription");

      tempTaskName.textContent = event.target.value;
      tempTaskName.value = event.target.value;
      editaddTask.style.display = "block";
      console.log(event);
      //tempTaskDescription.textContent = this.value;
      //tempTaskDescription.value = this.value;
    }

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

                <div className='col-md-3 p-2'>
                  <div className='p-1 eachboard'>
                    <div className='eachboardsubdiv' id='eachboardsubdiv'>
                      <input className='cardNameInput' id='cardNameInput' type='text' placeholder='+ Add a card' onBlur={(event) => saveCard()} />
                      <button className='deleteCard'><span><i className='fa fa-xmark'></i></span></button>
                    </div>
                    <div className='boardTasks' id='boardTasks'>

                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Proof of Concept</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>

                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Regression Test</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>

                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Setup monitoring and controlling process</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      
                      <div className='eachCardTask'>
                        <button className='eachCardTaskName' onClick={editBoardTask}>Requirement analysis completed</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      <div className='eachCard_addTask p-1'>
                        <button className='addTask' onClick={(event) => addBoardTask(event, )}>+ Add Task</button>
                      </div>
                    </div>
                    
                  </div>
                </div>

                <div className='col-md-3 p-2'>
                  <div className='p-1 eachboard'>
                    <div className='eachboardsubdiv' id='eachboardsubdiv'>
                      <input className='cardNameInput' id='cardNameInput' type='text' placeholder='+ Add a card' onBlur={(event) => saveCard()} />
                      <button className='deleteCard'><span><i className='fa fa-xmark'></i></span></button>
                    </div>
                    <div className='boardTasks' id='boardTasks'>

                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Proof of Concept</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      
                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Regression Test</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>

                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Setup monitoring and controlling process</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      
                      <div className='eachCardTask'>
                        <button className='eachCardTaskName' onClick={editBoardTask}>Requirement analysis completed</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      <div className='eachCard_addTask p-1'>
                        <button className='addTask' onClick={(event) => addBoardTask(event, )}>+ Add Task</button>
                      </div>
                    </div>
                    
                  </div>
                </div>

                <div className='col-md-3 p-2'>
                  <div className='p-1 eachboard'>
                    <div className='eachboardsubdiv' id='eachboardsubdiv'>
                      <input className='cardNameInput' id='cardNameInput' type='text' placeholder='+ Add a card' onBlur={(event) => saveCard()} />
                      <button className='deleteCard'><span><i className='fa fa-xmark'></i></span></button>
                    </div>
                    <div className='boardTasks' id='boardTasks'>

                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Proof of Concept</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      
                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Regression Test</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>

                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Setup monitoring and controlling process</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      
                      <div className='eachCardTask'>
                        <button className='eachCardTaskName' onClick={editBoardTask}>Requirement analysis completed</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      <div className='eachCard_addTask p-1'>
                        <button className='addTask' onClick={(event) => addBoardTask(event, )}>+ Add Task</button>
                      </div>
                    </div>
                    
                  </div>
                </div>

                <div className='col-md-3 p-2'>
                  <div className='p-1 eachboard'>
                    <div className='eachboardsubdiv' id='eachboardsubdiv'>
                      <input className='cardNameInput' id='cardNameInput' type='text' placeholder='+ Add a card' onBlur={(event) => saveCard()} />
                      <button className='deleteCard'><span><i className='fa fa-xmark'></i></span></button>
                    </div>
                    <div className='boardTasks' id='boardTasks'>

                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Proof of Concept</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      
                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Regression Test</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>

                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Setup monitoring and controlling process</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      
                      <div className='eachCardTask'>
                        <button className='eachCardTaskName' onClick={editBoardTask}>Requirement analysis completed</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      <div className='eachCard_addTask p-1'>
                        <button className='addTask' onClick={(event) => addBoardTask(event, )}>+ Add Task</button>
                      </div>
                    </div>
                    
                  </div>
                </div>

                <div className='col-md-3 p-2'>
                  <div className='p-1 eachboard'>
                    <div className='eachboardsubdiv' id='eachboardsubdiv'>
                      <input className='cardNameInput' id='cardNameInput' type='text' placeholder='+ Add a card' onBlur={(event) => saveCard()} />
                      <button className='deleteCard'><span><i className='fa fa-xmark'></i></span></button>
                    </div>
                    <div className='boardTasks' id='boardTasks'>

                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Proof of Concept</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      
                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Regression Test</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>

                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Setup monitoring and controlling process</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      
                      <div className='eachCardTask'>
                        <button className='eachCardTaskName' onClick={editBoardTask}>Requirement analysis completed</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      <div className='eachCard_addTask p-1'>
                        <button className='addTask' onClick={(event) => addBoardTask(event, )}>+ Add Task</button>
                      </div>
                    </div>
                    
                  </div>
                </div>

                <div className='col-md-3 p-2'>
                  <div className='p-1 eachboard'>
                    <div className='eachboardsubdiv' id='eachboardsubdiv'>
                      <input className='cardNameInput' id='cardNameInput' type='text' placeholder='+ Add a card' onBlur={(event) => saveCard()} />
                      <button className='deleteCard'><span><i className='fa fa-xmark'></i></span></button>
                    </div>
                    <div className='boardTasks' id='boardTasks'>

                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Proof of Concept</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      
                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Regression Test</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>

                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Setup monitoring and controlling process</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      
                      <div className='eachCardTask'>
                        <button className='eachCardTaskName' onClick={editBoardTask}>Requirement analysis completed</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      <div className='eachCard_addTask p-1'>
                        <button className='addTask' onClick={(event) => addBoardTask(event, )}>+ Add Task</button>
                      </div>
                    </div>
                    
                  </div>
                </div>
                
                <div className='col-md-3 p-2'>
                  <div className='p-1 eachboard'>
                    <div className='eachboardsubdiv' id='eachboardsubdiv'>
                      <input className='cardNameInput' id='cardNameInput' type='text' placeholder='+ Add a card' onBlur={(event) => saveCard()} />
                      <button className='deleteCard'><span><i className='fa fa-xmark'></i></span></button>
                    </div>
                    <div className='boardTasks' id='boardTasks'>

                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Proof of Concept</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      
                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Regression Test</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>

                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Setup monitoring and controlling process</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      
                      <div className='eachCardTask'>
                        <button className='eachCardTaskName' onClick={editBoardTask}>Requirement analysis completed</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      <div className='eachCard_addTask p-1'>
                        <button className='addTask' onClick={(event) => addBoardTask(event, )}>+ Add Task</button>
                      </div>
                    </div>
                    
                  </div>
                </div>

                <div className='col-md-3 p-2'>
                  <div className='p-1 eachboard'>
                    <div className='eachboardsubdiv' id='eachboardsubdiv'>
                      <input className='cardNameInput' id='cardNameInput' type='text' placeholder='+ Add a card' onBlur={(event) => saveCard()} />
                      <button className='deleteCard'><span><i className='fa fa-xmark'></i></span></button>
                    </div>
                    <div className='boardTasks' id='boardTasks'>

                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Proof of Concept</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      
                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Regression Test</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>

                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Setup monitoring and controlling process</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      
                      <div className='eachCardTask'>
                        <button className='eachCardTaskName' onClick={editBoardTask}>Requirement analysis completed</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      <div className='eachCard_addTask p-1'>
                        <button className='addTask' onClick={(event) => addBoardTask(event, )}>+ Add Task</button>
                      </div>
                    </div>
                    
                  </div>
                </div>

                <div className='col-md-3 p-2'>
                  <div className='p-1 eachboard'>
                    <div className='eachboardsubdiv' id='eachboardsubdiv'>
                      <input className='cardNameInput' id='cardNameInput' type='text' placeholder='+ Add a card' onBlur={(event) => saveCard()} />
                      <button className='deleteCard'><span><i className='fa fa-xmark'></i></span></button>
                    </div>
                    <div className='boardTasks' id='boardTasks'>

                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Proof of Concept</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      
                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Regression Test</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>

                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Setup monitoring and controlling process</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      
                      <div className='eachCardTask'>
                        <button className='eachCardTaskName' onClick={editBoardTask}>Requirement analysis completed</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      <div className='eachCard_addTask p-1'>
                        <button className='addTask' onClick={(event) => addBoardTask(event, )}>+ Add Task</button>
                      </div>
                    </div>
                    
                  </div>
                </div>

                <div className='col-md-3 p-2'>
                  <div className='p-1 eachboard'>
                    <div className='eachboardsubdiv' id='eachboardsubdiv'>
                      <input className='cardNameInput' id='cardNameInput' type='text' placeholder='+ Add a card' onBlur={(event) => saveCard()} />
                      <button className='deleteCard'><span><i className='fa fa-xmark'></i></span></button>
                    </div>
                    <div className='boardTasks' id='boardTasks'>

                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Proof of Concept</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      
                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Regression Test</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>

                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Setup monitoring and controlling process</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      
                      <div className='eachCardTask'>
                        <button className='eachCardTaskName' onClick={editBoardTask}>Requirement analysis completed</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      <div className='eachCard_addTask p-1'>
                        <button className='addTask' onClick={(event) => addBoardTask(event, )}>+ Add Task</button>
                      </div>
                    </div>
                    
                  </div>
                </div>

                <div className='col-md-3 p-2'>
                  <div className='p-1 eachboard'>
                    <div className='eachboardsubdiv' id='eachboardsubdiv'>
                      <input className='cardNameInput' id='cardNameInput' type='text' placeholder='+ Add a card' onBlur={(event) => saveCard()} />
                      <button className='deleteCard'><span><i className='fa fa-xmark'></i></span></button>
                    </div>
                    <div className='boardTasks' id='boardTasks'>

                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Proof of Concept</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      
                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Regression Test</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>

                      <div className='eachCardTask'>
                        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>Setup monitoring and controlling process</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      
                      <div className='eachCardTask'>
                        <button className='eachCardTaskName' onClick={editBoardTask}>Requirement analysis completed</button>
                        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      <div className='eachCard_addTask p-1'>
                        <button className='addTask' onClick={(event) => addBoardTask(event, )}>+ Add Task</button>
                      </div>
                    </div>
                    
                  </div>
                </div>

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

const WrappedBoardInfo = RequireAuthentication(BoardInfo)
export default WrappedBoardInfo