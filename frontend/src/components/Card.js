import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Task from './Task';
import '../styles/css/board.css'

let host = 'ws://127.0.0.1:8000/ws'
const Card = (props) => {
    //const board_socket = new WebSocket(`${host}/board/boardID`);
    const card_socket = new WebSocket(`${host}/card/cardID`);
    const [cardTasks, setCardTasks] = useState({});
    
    const [allCardTasks, SetAllCardTasks] = useState({})
    var card_id = props.cardID;
    var card_name = props.cardName;
    var card_tasks = props.tasks

    var board_id = props.boardId
    var board_data = props.board_data

    var updateCardTasks = props.updateCardTasks
    var addBoardTask = props.addBoardTask
    var saveBoardTask = props.save_tasks
    var createTask = props.createTask
    var requestBoardCards = props.requestBoardCards
    var saveCard = props.saveCard
    var updateCard = props.updateCard;

    const getUserToken = useSelector((state) => state.AUTH_TOKEN.token)

    //SetAllCardTasks({[card_id]: card_tasks[card_id]})
    //var all_card_tasks = useState({[card_id]: card_tasks[card_id]})
    //console.log(all_card_tasks)
    document.getElementById("kk").value = "Lmao"
    
    const card_data = useMemo(() => {
        var all_card_tasks = {}
        card_socket.onmessage = async (event) => {
            console.log("Received for the cards")
            var card_tasks = await JSON.parse(event.data)
            console.log(card_tasks)
            var all_card_task = {card_tasks}
            console.log("The stuffs", all_card_task)
            //setCardTasks(all_card_tasks)
            //setCardTasks((card_tasks) => ({...all_card_tasks, ...card_tasks}) )
            //setCardTasks(card_tasks)
            document.getElementById("tt").textContent ="fuf" //document.getElementById("tempTaskName").value //"allCardTasks.card_tasks"
            return card_socket.onmessage
        }
    }, [cardTasks])
    
     useEffect(() => {
        console.log(card_name, "CARD IS RENDERED")
        //requestBoardCards(board_id);
        console.log("Done requesting for the card details")

        requestCardInfo();
        return card_socket.onmessage;
    }, [card_data])
    //card_socket.addEventListener("message", console.log("at last"))
    
    const navigate = useNavigate();
    /*
    var saveCard = (event) => {
        console.log(event.target.value)
        //var cardNameInput = document.getElementById("cardNameInput");
        //console.log(cardNameInput.value)
    }
    */
    const requestCardInfo = () =>{
        card_socket.onopen = (event) => {
            console.log("Card Connection established")
            card_socket.send(JSON.stringify(
              {
                "title": "cardID",
                "cardID": `${card_id}`,
                }));
          }
    }
    
    console.log("The usestate stuff ",cardTasks)

    var previousPage = () => {
    navigate(-1);
    }
    //console.log("The usestate stuff ",cardTasks)
    //Removed cardName in this function
    /*
    const addBoardTask = async (event) => {
        /*
        var addTask = document.getElementById("editaddTask");
        var task_container = document.getElementById("task-container");
        var tempTaskName = document.getElementById("tempTaskName");
        var tempTaskDescription = document.getElementById("tempTaskDescription");
        tempTaskName.value = '';
        tempTaskDescription.value = '';
        addTask.style.backgroundColor = "red"
        document.body.style.overflow = "hidden"
        addTask.style.display = "block";
        *
       

      }
      */

  return (
    <div className='col-md-3 p-2'>
        
        <div className='p-1 eachboard'>
        <div className='eachboardsubdiv' id='eachboardsubdiv'>
            <input className='cardNameInput' id='cardNameInput' type='text' placeholder='+ Add a card' defaultValue={card_name} onBlur={updateCard} />
            <button className='deleteCard'><span><i className='fa fa-xmark'></i></span></button>
        </div>
        <div className='boardTasks' id='boardTasks'>
            
            {Object.keys(card_tasks[card_id]).map((taskID) => (
                <Task key={taskID} cardID={card_id} taskID={taskID} taskName={card_tasks[card_id][taskID]} updateCardTasks={updateCardTasks} /> 
            ))}
            <p id='tt'></p>
            <h1>hihj</h1>
            <div className='eachCard_addTask p-1'>
            <button className='addTask' onClick={(event) => {addBoardTask(event, card_id)}}>+ Add Task</button>
            </div>
        </div>
        
        </div>
    </div>
  )
}

export default Card