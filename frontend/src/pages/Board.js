import React, { useEffect, useState } from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async';

// Styling
import '../styles/css/board.css'
import NavbarAnonymous from '../components/NavbarAnonymous';

const Board = () => {

    const [boardName, setBoardName] = useState('');
    const [boardDescription, setBoardDescription] = useState('');
    const [boardTasks, setBoardTasks] = useState([]);

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

        <div class="container-fluid">
            
            {/* {% include 'navbar-all.html' %} */}
            <div className="projectContainer">
              <div className='projectName'>
                <p>Back <b>Board Name</b></p>
              </div>
              <div className='projectDescription'>
                <p>This is a safe space for the project description</p>
              </div>
              <div className='boardTasks'>
                <div className='boardTaskName'>
                  <p>Task Name</p>
                  <div className='subTasks'>
                    <p>For Subtask</p>
                  </div>
                </div>
              </div>
            </div>
        </div>

    </HelmetProvider>
  )
}

export default Board