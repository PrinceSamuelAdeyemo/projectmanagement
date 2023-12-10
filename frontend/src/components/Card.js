import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Task from './Task';
import '../styles/css/board.css'

let host = 'ws://127.0.0.1:8000/ws'
const Card = (props) => {
    const [cardTasks, setCardTasks] = useState({});
    //const card_socket = new WebSocket(`${host}/card/cardID`);
    const [allCardTasks, SetAllCardTasks] = useState({})
    var card_id = props.cardID;
    var card_name = props.cardName;
    var card_tasks = props.tasks

    //SetAllCardTasks({[card_id]: card_tasks[card_id]})
    //var all_card_tasks = useState({[card_id]: card_tasks[card_id]})
    //console.log(all_card_tasks)
    /*
    var all_card_task = {}
    const memoizedcard_tasks = useMemo(() => {
        card_socket.onmessage = async (event) => {
            console.log("Received for the cards")
            var card_task = await JSON.parse(event.data)
            //console.log(card_tasks)
            all_card_task = {...all_card_task, ...card_task}
            //console.log("The stuffs", all_card_tasks)
            //setCardTasks(all_card_tasks)
            //setCardTasks((card_tasks) => ({...all_card_tasks, ...card_tasks}) )
            setCardTasks(card_tasks)
            return card_socket
        }
    }, [card_socket.onmessage])
    //console.log("The usestate stuff ",cardTasks)
    useEffect(() => {
        requestCardInfo();
    })
    */
    
    const navigate = useNavigate();
    var saveCard = (event) => {
        console.log(event.target.value)
        //var cardNameInput = document.getElementById("cardNameInput");
        //console.log(cardNameInput.value)
    }
    
    /*
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
    */
    

    var previousPage = () => {
    navigate(-1);
    }
    //Removed cardName in this function
    const addBoardTask = (event) => {
        var addTask = document.getElementById("editaddTask");
        var tempTaskName = document.getElementById("tempTaskName");
        var tempTaskDescription = document.getElementById("tempTaskDescription");
        tempTaskName.value = '';
        tempTaskDescription.value = '';
        addTask.style.display = "block";

        
      }
      

  return (
    <div className='col-md-3 p-2'>
        <div className='p-1 eachboard'>
        <div className='eachboardsubdiv' id='eachboardsubdiv'>
            <input className='cardNameInput' id='cardNameInput' type='text' placeholder='+ Add a card' defaultValue={card_name} onBlur={saveCard} />
            <button className='deleteCard'><span><i className='fa fa-xmark'></i></span></button>
        </div>
        <div className='boardTasks' id='boardTasks'>
            
            {Object.keys(card_tasks[card_id]).map((taskID) => (// allCardTasks.map((task, index) => (
                <Task key={taskID} cardID={card_id} taskID={taskID} taskName={card_tasks[card_id][taskID]} /> 
            ))}

            <div className='eachCard_addTask p-1'>
            <button className='addTask' onClick={(event) => addBoardTask(event, )}>+ Add Task</button>
            </div>
        </div>
        
        </div>
    </div>
  )
}

export default Card