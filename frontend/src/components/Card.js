import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/css/board.css'


const Card = (props) => {

    const navigate = useNavigate();
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

    
  

  return (
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
  )
}

export default Card