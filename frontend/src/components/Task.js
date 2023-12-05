import React, { useEffect, useMemo, useState } from 'react'
import '../styles/css/board.css'

const Task = (props) => {
    var card_id = props.cardID;
    var task_id = props.taskID;
    var task_name = props.taskName;
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

      var deleteBoardTask = (event) => {
        alert("Hello, World")
        }

  return (
    <div className='eachCardTask'>
        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>{task_name}</button>
        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
    </div>
  )
}

export default Task