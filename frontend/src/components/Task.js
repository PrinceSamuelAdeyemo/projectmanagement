import React, { useEffect, useMemo, useState } from 'react'
import '../styles/css/board.css'

const Task = (props) => {
    var card_id = props.cardID;
    var task_id = props.taskID;
    var task_name = props.taskName;
    const editBoardTask = (event) => {
        document.body.style.overflow = "hidden"
        var editaddTask = document.getElementById("editaddTask");
        var tempTaskName = document.getElementById("tempTaskName");
        var tempTaskDescription = document.getElementById("tempTaskDescription");
        const scrollPosition = window.scrollY || window.pageYOffset
        const screenHeight = window.screen.height
  
        tempTaskName.textContent = event.target.value;
        tempTaskName.value = event.target.value;
        
        editaddTask.style.top = `${scrollPosition+100}px`
        editaddTask.style.display = "block";
        
        //tempTaskDescription.textContent = this.value;
        //tempTaskDescription.value = this.value;
      }

      var deleteBoardTask = (event) => {
        alert("Hello, World")
        }

      useEffect(() => {

      }, [props])

    /*
    window.addEventListener('scroll', () => {
      const neweditTask = document.getElementById("editaddTask")
      const scrollPosition = window.scrollY || window.pageYOffset
      
      neweditTask.style.top = `${scrollPosition}px`
        })    
    */

  return (
    <div className='eachCardTask'>
        <button type='button' className='eachCardTaskName' onClick={(event) => editBoardTask(event)}>{task_name}</button>
        <button className='eachCardTaskCancel' onClick={deleteBoardTask}><span><i className='fa fa-xmark'></i></span></button>
    </div>
  )
}

export default Task