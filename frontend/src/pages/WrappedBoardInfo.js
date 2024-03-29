import React, { useEffect, useState, useCallback, useMemo } from 'react'
import Card from '../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';

import RequireAuthentication from '../components/RequireAuthentication';

// Styling
import '../styles/css/board.css'
import NavbarAnonymous from '../components/NavbarAnonymous';

let host = 'ws://127.0.0.1:8000/ws'

const BoardInfo = () => {
  const board_socket = new WebSocket(`${host}/board/boardID`);

  const [boardName, setBoardName] = useState('');
  const [boardDescription, setBoardDescription] = useState('');
  const [boardCards, setBoardCards] = useState({});
  const [cardTasks, setCardTasks] = useState([]);
  
  const [boardCardAssignedto, setBoardCardAssignedto] = useState([]);
  const [tempcardTask, settempCardTask] = useState('');

  const [tempcardName, settempCardName] = useState('');

  const [taskName, SetTaskName] = useState('');
  const [taskDescription, SetTaskDescription] = useState('')
  const [card_id, SetCard_id] = useState('')
  const { boardID } = useParams();

  const requestBoardCards = () => {
    board_socket.onopen = (event) => {
    console.log("Connection established")
    board_socket.send(JSON.stringify(
      {
        "title": "boardID",
        "boardID": `${boardID}`,
        }));
    }
  }

  const addBoardTask = async (event, card_id) => {
    event.preventDefault()
    var addTask = document.getElementById("editaddTask");
    var task_container = document.getElementById("task-container");
    var tempTaskName = document.getElementById("tempTaskName");
    var tempTaskDescription = document.getElementById("tempTaskDescription");
    addTask.style.backgroundColor = "transparent"
    var scrollPosition = window.scrollY || window.pageYOffset;
    document.body.style.overflow = "hidden"
    addTask.style.top = `${scrollPosition}px`
    addTask.style.display = "block";
    
    SetCard_id(card_id)
  }

  var createTask = async (event) => {
    event.preventDefault()
    console.log("updated")
    var tempTaskName = document.getElementById("tempTaskName");
    var tempTaskDescription = document.getElementById("tempTaskDescription");
    board_socket.send(JSON.stringify(
        {
            "title": "add_new_task",
            "task_name": tempTaskName.value,
            "task_description": tempTaskDescription.value,
            "task_parent": card_id,
            "board_id": boardID
        }));
    SetCard_id(card_id)
    requestBoardCards(boardID);
    
    closeTaskEdit();
    //requestBoardCards(boardID);
    /*
    if (Number(event.target.value) !== 0){
      
  
      /*
      if ((board_socket.CLOSED || board_socket.CLOSING) && (new_card_name != '')){
      console.log("closed")
      //board_socket.OPEN
      //const board_socket = new WebSocket(`${host}/board/boardID`);

      board_socket.onopen = async (event) =>{
          console.log("Opened")

          board_socket.send(JSON.stringify(
          {
              "title": "add_new_card",
              "card_name": new_card_name,
              "card_parent": `${boardID}`
          }));

          newcardNameInput.blur()
      }
      console.log("Should have opened")
      }
      else{
      board_socket.send(JSON.stringify(
          {
          "title": "add_new_card",
          "card_name": new_card_name,
          "card_parent": `${boardID}`
          }));

          newcardNameInput.blur()
      }
      *

      
  }
    else{
        alert("Cannot accept the input.")
    }
      
    /*
    await fetch("http://127.0.0.1:8000/api/tasks", {
      method: "POST",
      headers:{
        "content-Type": "application/json",
        "Authorization": `Token ${getUserToken}`
      },
      body: JSON.stringify({
        task_name: "Task1",
        task_description: "Task Description"
      })
    });*
*/
  }

  const board_data = useMemo(() =>{
    board_socket.onmessage = async (event) => {
      console.log("Received")
      let message = await JSON.parse(event.data);
      var all_card_tasks = message.all_card_tasks
      setBoardName(message.board_name);
      setBoardDescription(message.board_description);
      setBoardCards(message.card_details)
      setCardTasks(all_card_tasks)
      console.log(message.card_details)
      
      return board_socket.onmessage
    }
  }, [cardTasks])

const [me, setMe] = useState([])
  
  /*
  board_socket.onerror = (event) => {
    console.log(error)
  }

  board_socket.onclose = (event) => {
    console.log("Socket closed.")
  }
  */
  useEffect(() => {
    console.log("SAAAAAAAAAAAAAAAAAAAAAAAAAAM")
    console.log("parents", card_id)
    console.log("parents", taskName)
    window.history.scrollRestoration = 'auto';
    window.scrollTo(0,0)
    //board_socket.onopen = async (event) => {
    requestBoardCards(boardID);
  }, [board_data]);

  /*
  const updateCardTasks = (newTask) => {
    setCardTasks((newTask) => ({...cardTasks, newTask}))
  }
  */
  const navigate = useNavigate();
  
  /*
    
    const [boardTasks, setBoardTasks] = useState([]);

    const [boardTaskName, setBoardTaskName] = useState([]);
    const [boardTaskDescription, setBoardTaskDescription] = useState([]);
    const [boardTaskAssignedto, setBoardAssignedto] = useState([]);
  */  

    //const [boardList, setBoardList] = useState([]);
    
    
  let company = 'tesla';
  const getBoardInfoStuffs = useCallback(() =>{
    
  })

  const is_authenticated = useSelector((state) => state.USER_STATUS.status)
  const getUserToken = useSelector((state) => state.AUTH_TOKEN.token)
  console.log("Should give cookie", getUserToken)
  console.log(is_authenticated)
  console.log("Done here")

  const retrieveCardTasks = (card_id) => {
    //if (cardTasks != "" || cardTasks != undefined){
      if (card_id in cardTasks){
        var card_tasks = {[card_id]: cardTasks[card_id]}
  
        return card_tasks
      }
    //}
    
  }
  
  
  var closeTaskEdit = (event) => {
    document.body.style.overflow = "auto"
    var editaddTask = document.getElementById("editaddTask");
    var tempTaskName = document.getElementById("tempTaskName");
    var tempTaskDescription = document.getElementById("tempTaskDescription");
    
    editaddTask.style.display = "none";
    tempTaskName.textContent = '';
    tempTaskName.value = '';
    tempTaskDescription.textContent = '';
    tempTaskDescription.value = '';

  }
  
  var saveCard = async (event) => {
    //console.log(event.target.value)
    var newcardNameInput = document.getElementById("newcardNameInput");
    if ((event.type == "keydown" && event.key === "Enter") || (event.type === "dblclick")){
      if (Number(event.target.value) !== 0){
        console.log("card name",event.target.value, "card type", typeof(event.target.value, "card type convert", Number(typeof(event.target.value)) ))
        const new_card_name = event.target.value;
      
        /*
        if ((board_socket.CLOSED || board_socket.CLOSING) && (new_card_name != '')){
          console.log("closed")
          //board_socket.OPEN
          //const board_socket = new WebSocket(`${host}/board/boardID`);

          board_socket.onopen = async (event) =>{
            console.log("Opened")

            board_socket.send(JSON.stringify(
              {
                "title": "add_new_card",
                "card_name": new_card_name,
                "card_parent": `${boardID}`
              }));

              newcardNameInput.blur()
          }
          console.log("Should have opened")
        }
        else{
          board_socket.send(JSON.stringify(
            {
              "title": "add_new_card",
              "card_name": new_card_name,
              "card_parent": `${boardID}`
            }));

            newcardNameInput.blur()
        }
        */

        await board_socket.send(JSON.stringify(
          {
            "title": "add_new_card",
            "card_name": new_card_name,
            "card_parent": `${boardID}`
          }));
        newcardNameInput.value = ''
      }
      else{
        alert("Cannot accept the input.")
      }
      
    }
    
  }

  var updateCard = async (event) => {
    event.preventDefault()
    //var existingNameInput =
    console.log("updated") 
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

        <div className="container-fluid" id='containerFluid'>
            
            {/* {% include 'navbar-all.html' %} */}
            <div className="projectContainer">
              <div className='projectName'>
                
                <button className='btn d-inline' onClick={previousPage}><span className='pe-2'><i className="fa fa-angle-left"></i></span></button>
                <h2 className='d-inline'>{boardName}</h2>
              </div>
              <div className='editaddTask' id='editaddTask'>
                
                <div className='task-container' id='task-container'>
                  <button className='closeTaskEdit' onClick={closeTaskEdit}><span><i className='fa fa-xmark'></i></span></button>

                  <form className='task-set' id='task-set' onSubmit={createTask} encType='UTC-8' autoComplete='true' >
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
                      <button type='submit' className='m-2 px-3 bg-light' id='save-task'>Save</button>
                      <button type='reset' className='m-2 px-3'>Delete</button>
                    </div>
                  </form>
                  {/*<div className='board-color-picker'>
                    <p>Board Background Color</p>
                    <input type="color" name="boardcolor" defaultValue={"000000"} />
  </div> 
                  <div className='cancelTaskEdit'>
                    <button className='closeTaskEdit' onClick={closeTaskEdit}><span><i className='fa fa-xmark'></i></span></button>
                  </div> */}
                  <div className='clear'>

                  </div>
                </div>

              </div>
              <div className='projectDescription'>
                <p>{boardDescription}</p>
              </div>
              <div>
                <p id='kk'>Hello, World!</p>
              </div>
              <div className='row gx-4 boardParent'>

                { //cardTasks &&
                  Object.keys(boardCards).map((card) => (
                    <Card key = {card} cardID = {card} cardName = {boardCards[card]} boardId = {boardID} board_data={board_data} tasks = {retrieveCardTasks(card)} save_tasks = {createTask} addBoardTask = {addBoardTask} requestBoardCards = {requestBoardCards} saveCard={saveCard} updateCard={updateCard} />
                  ))
                }

                <div className='col-md-3 p-2'>
                  <div className='p-1 eachboard'>
                    <div className='eachboardsubdiv' id='eachboardsubdiv'>
                      <input className='newcardNameInput' id='newcardNameInput' type='text' placeholder='+ Add a card' onKeyDown={saveCard} onDoubleClick={saveCard}/>
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