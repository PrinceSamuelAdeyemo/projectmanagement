import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/css/board.css'

let host = 'ws://127.0.0.1:8000/ws'
const Card = (props) => {
    const card_socket = new WebSocket(`${host}/card/cardID`);

    var card_id = props.cardID;
    var card_name = props.cardName;
    const memoizedcard_tasks = useMemo(() => {
        card_socket.onmessage = async (event) => {
            console.log("Received for the cards")
            var card_tasks = await JSON.parse(event.data)
            console.log(card_tasks)
            setCardTasks(card_tasks)
            //setCardTasks((prevCardTasks) => ({prevCardTasks, ...card_tasks}) )
            console.log(cardTasks)
            return card_socket
        }
    }, [card_socket.onmessage])

    useEffect(() => {
        requestCardInfo();
    })

    const [cardTasks, setCardTasks] = useState({});
    const navigate = useNavigate();
    var saveCard = (event) => {
        console.log(event.target.value)
        //var cardNameInput = document.getElementById("cardNameInput");
        //console.log(cardNameInput.value)
    }
    
    const requestCardInfo = () =>{
        console.log("About to send")
        card_socket.onopen = (event) => {
            console.log("Card Connection established")
            card_socket.send(JSON.stringify(
              {
                "title": "cardID",
                "cardID": `${card_id}`,
                }));
          }
    }

    var deleteBoardTask = (event) => {
    alert("Hello, World")
    }

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

    
  

  return (
    <div className='col-md-3 p-2'>
        <div className='p-1 eachboard'>
        <div className='eachboardsubdiv' id='eachboardsubdiv'>
            <input className='cardNameInput' id='cardNameInput' type='text' placeholder='+ Add a card' defaultValue={card_name} onBlur={saveCard} />
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
  )
}

export default Card