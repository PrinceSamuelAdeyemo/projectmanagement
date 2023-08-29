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
                <p><span className='pe-2'><i className="fa fa-arrow-left"></i></span>Board Name</p>
              </div>
              <div className='projectDescription'>
                <p>This is a safe space for the project description</p>
              </div>
              <div className='row gx-4 boardParent'>

                <div className='col-md-3'>
                  <div className='p-1 eachboard'>
                    <div className='eachboardsubdiv'>
                      <input className='boardNameInput' type='text' />
                      <button className='deleteBoard'><span><i className='fa fa-xmark'></i></span></button>
                    </div>
                    <div className='boardTasks'>
                      <div className='eachboardTask'>
                        <p>Proof Of Concept</p>
                      </div>
                      <div className='eachboardTask'>
                        <p>Regression Test</p>
                      </div>
                      <div className='eachboardTask'>
                        <p>Setup monitoring and controlling process</p>
                      </div>
                      <div className='eachboardTask'>
                        <p>Requirement analysis completed</p>
                      </div>
                      <div className='eachboard_addTask p-1'>
                        <button>+ Add Task</button>
                      </div>
                    </div>
                    
                  </div>
                </div>

                <div className='col-md-3'>
                  <div className='p-1 eachboard'>
                    <div className='eachboardsubdiv'>
                      <input className='boardNameInput' type='text' />
                      <button className='deleteBoard'><span><i className='fa fa-xmark'></i></span></button>
                    </div>
                    <div className='boardTasks'>
                      <div className='eachboardTask'>
                        <p>Proof Of Concept</p>
                      </div>
                      <div className='eachboardTask'>
                        <p>Regression Test</p>
                      </div>
                      <div className='eachboardTask'>
                        <p>Setup monitoring and controlling process</p>
                      </div>
                      <div className='eachboardTask'>
                        <p>Requirement analysis completed</p>
                      </div>
                      <div className='eachboard_addTask p-1'>
                        <button>+ Add Task</button>
                      </div>
                    </div>
                    
                  </div>
                </div>

                <div className='col-md-3'>
                  <div className='p-1'>
                    <div className='eachboard'>
                      <div className='eachboardsubdiv'>
                        
                        <input className='boardNameInput' type='text' />
                        <button className='deleteBoard'><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      <div className='boardTasks'>
                        <div className='eachboardTask'>
                          <p>Proof Of Concept</p>
                        </div>
                        <div className='eachboardTask'>
                          <p>Regression Test</p>
                        </div>
                        <div className='eachboardTask'>
                          <p>Setup monitoring and controlling process</p>
                        </div>
                        <div className='eachboardTask'>
                          <p>Requirement analysis completed</p>
                        </div>
                        <div className='eachboard_addTask p-1'>
                          <button>+ Add Task</button>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-md-3'>
                  <div className='p-1'>
                    <div className='eachboard'>
                      <div className='eachboardsubdiv'>
                        
                        <input className='boardNameInput' type='text' />
                        <button className='deleteBoard'><span><i className='fa fa-xmark'></i></span></button>
                      </div>
                      <div className='boardTasks'>
                        <div className='eachboardTask'>
                          <p>Proof Of Concept</p>
                        </div>
                        <div className='eachboardTask'>
                          <p>Regression Test</p>
                        </div>
                        <div className='eachboardTask'>
                          <p>Setup monitoring and controlling process</p>
                        </div>
                        <div className='eachboardTask'>
                          <p>Requirement analysis completed</p>
                        </div>
                        <div className='eachboard_addTask p-1'>
                          <button>+ Add Task</button>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-md-3 p-0'>
                  <div className='p-1 eachboard'>
                    <div className='eachboardsubdiv'>
                      <input className='boardNameInput' type='text' />
                      <button className='deleteBoard'><span><i className='fa fa-xmark'></i></span></button>
                    </div>
                    <div className='boardTasks'>
                      <div className='eachboardTask'>
                        <p>Proof Of Concept</p>
                      </div>
                      <div className='eachboardTask'>
                        <p>Regression Test</p>
                      </div>
                      <div className='eachboardTask'>
                        <p>Setup monitoring and controlling process</p>
                      </div>
                      <div className='eachboardTask'>
                        <p>Requirement analysis completed</p>
                      </div>
                      <div className='eachboard_addTask p-1'>
                        <button>+ Add Task</button>
                      </div>
                    </div>
                    
                  </div>
                  
                </div>

              </div>

            </div>
        </div>

    </HelmetProvider>
  )
}

export default Board