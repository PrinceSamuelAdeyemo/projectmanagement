import React, { useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/css/todoapp.css';
import '../styles/css/createboard.css';
import NavbarAnonymous from '../components/NavbarAnonymous';

const CreateBoard = () => {
    // Navigation function to redirect to other pages
    const navigate = useNavigate();
    const openPage = (pagename) => {
        navigate(`/${pagename}`);
    }
    

    //Registering Project, board and tasks
    const [projectName, setProjectName] = useState('');
    const [boardName, setBoardName] = useState('');
    const [boardDescription, setBoardDescription] = useState('')
    const [tasks, setTasks] = useState([]);
    // The tempTask is for receiving the keyprompt of the tasks to be added
    const [tempTask, setTempTask] = useState('')

    // Board details in the project
    const [status, setStatus] = useState('notyetstarted');
    const [priority, setPriority] = useState('low');
    
    
    

    // Receiving and saving the project name
    var projectNamecreate = (event) => {
        let value = event.target.value;
        setProjectName(value);
    }
    // Receiving and saving the board name
    var boardNamecreate = (event) => {
        let value = event.target.value;
        setBoardName(value);
    }
    // Receiving and saving the board description
    var boardDescriptioncreate = (event) => {
        let value = event.target.value;
        setBoardDescription(value);
    }

    // Removing tasks from the board before adding it
    var discardTask = () => {
        //var taskNamesList = document.getElementsByClassName('taskNamesList');
        //var taskNames = document.getElementsByClassName('taskNames');
        var taskNames = document.querySelectorAll('.taskNames:checked')
        if (taskNames.length > 0) {
            taskNames.forEach((taskName) => {
                taskName.checked? taskName.parentNode.remove() : console.log('none to remove')
            });
        }else{
            console.log('Nothing to remove');
        }
    }


    // Receiving the list of tasks for each board
    var taskListcreate = (event) => {
        // Note: THe temp task is set in the onchange attr at the input section
        if (tempTask !== ''){
            const newListArray = [...tasks, tempTask]
            setTasks(newListArray)
            // Clear the value of the text input and clear the memory of the temp task
            let taskinput = document.getElementById('taskinput');
            taskinput.value = '';
            setTempTask('');
        }
        
    }

    // Display the project page
    const switchPage = (event, page) => {
        switch (page){
            case 'afterprojectchosen':
                var chooseproject = document.getElementsByClassName('chooseproject');
                var newprojectpage = document.getElementsByClassName('afterprojectchosen');
                chooseproject[0].style.display = 'none';
                newprojectpage[0].style.display = 'block';
                
                break;

            case 'chooseproject':
                var chooseproject = document.getElementsByClassName('chooseproject');
                var newprojectpage = document.getElementsByClassName('afterprojectchosen');
                newprojectpage[0].style.display = 'none';
                chooseproject[0].style.display = 'block';

                break;

            default:
                console.log('Something went wrong!')

                break;
        }
    }

    // This is the function for changing the project name for the board being created
    var changeProjectName = (event) => {
        const{ name, value} = event.target;
        
    }

    /*Function for creating boards and submitting the project in which the board will be added unto, 
    but if no project name is added. The board becomes a free board which doesn't have a project 
    but rather a side temporary project within the account or organization. */
    
    const createboard = async (event) => {
        event.preventDefault();

        let response = await fetch('http://127.0.0.1:8000/api/createboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                'project_name': projectName,
                'board_name': boardName,
                'board_description': boardDescription,
                'tasks': tasks,
            }
        }).then((response) => {
            if (!response.ok){
                throw new Error('Something is wrong with posting of either the project name, board name etc.', {'cause': response})
            }
            else{
                console.log('Data sent')
            }
        })
        .then(data=>console.log('This is the data sent', {'Data': data}))
        .catch(error => console.log('Encountered error when trying to submit the details', {'Error': error}))
    }


    var changeBoardStatus = (event, statustype) => {
        var previousStatus = status;

        setStatus(statustype.toLowerCase())
        var statusValue = document.getElementById('progress-status');
        statusValue.textContent = statustype;
        statusValue.classList.remove(`btn-${previousStatus.toLowerCase()}`);
        statusValue.classList.add(`btn-${statustype.toLowerCase()}`);
        
    };

    var changeBoardPriority = (event, priority_type) => {
        var previousPriority = priority;
        // Set the priority value to the setPriority-- all in lowercase
        setPriority(priority_type.toLowerCase());
        // Ensure to get the current priority from the frontend, 
        var priority_value = document.getElementById('priority-value');
        priority_value.textContent = priority_type;
        priority_value.classList.remove(`btn-${previousPriority.toLowerCase()}priority`)
        priority_value.classList.add(`btn-${priority_type.toLowerCase()}priority`)
        
    };

    var changeBoardDueDate = () => {
        
    }

    var dropdownfunc = (event) => {

        event.stopPropagation();
        var dropdiv = document.getElementById('my-dropdiv');
        var lildropdiv = document.getElementById('lildropdiv');
        var dropdownbutton = document.getElementById('dropdownbutton');
        
        if (dropdiv.active == true){
            //dropdiv.active;
            lildropdiv.style.display = 'block';
        }
        
        /*
        if (lildropdiv.style.display = 'none') {
            lildropdiv.style.display = 'block';
        } else {
             lildropdiv.style.display = 'none';
        };    
        */    
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
            <title></title>
        </Helmet>

        <div className="container-fluid">

            <div className="project-panel" id="project-panel">

                <div className="chooseproject">
                    <button type="button" className="btn cancelprojectpage" id="cancelprojectpage"><span><i className="fa fa-angle-left fs-1 text-white bg-dark"></i></span></button>
                    <div className="">
                        <p>List is here</p>
                        <input type="text" className="w-100" id="projectname" onChange={projectNamecreate} />
                        <button type="button" className="btn btn-primary" id="create-a-project" onClick={(event) => (switchPage(event, 'afterprojectchosen'))}>Create a new project</button>
                        
                        <div className="choosefromprojectdiv dropdown d-inline">
                            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" id="choosefromproject">Choose Project</button>
                            <ul className="dropdown-menu" aria-labelledby="choosefromproject">
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hi</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hello</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hi</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hello</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hi</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hello</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hi</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hello</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hi</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hello</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hi</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hello</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hi</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hello</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hi</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hello</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hi</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hello</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hi</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hello</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hi</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hello</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hi</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hello</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hi</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hello</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hi</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hello</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hi</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hello</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hi</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hello</a>
                                </li>

                            </ul>
                        </div>
                        <div className="assigndepartmentdiv dropdown d-inline">
                            <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" id="assigndepartmentbutton">Assign department</button>
                            <ul className="dropdown-menu" aria-labelledby="assigndepartmentbutton">
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hi</a>
                                </li>
                                <li role="presentation" className="w-100">
                                    <a href="" role="menu-item" className="dropdown-item w-100">Hello</a>
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                </div>

                <div className="afterprojectchosen">
                    <div className="forprojectabsolute"> 
                        <button type="button" className="btn cancelboardpage" id="cancelboardpage" onClick={(event) => (switchPage(event, 'chooseproject'))}><span><i className="fa fa-angle-left fs-1 text-white bg-dark"></i></span></button>

                        {/* {% if user.is_authenticated %} */}
                        <form className="form-panel-output" name="form-panel-ouput" id="form-panel-output" method="POST" encType="multipart/form-data">
                            {/* {% csrf_token %} */}
                            <div className="form-panel-outputdiv">
                                <div className="board-panel-output">
            
                                    <div className="row m-3">
                                        <div className="col col-md-7">
                                            { boardName != '' ?
                                                <p className="d-inline"><span className="fw-bold" id="project-name-topleft">{projectName}/{boardName}</span></p>
                                                :
                                                <p className="d-inline"><span className="fw-bold" id="project-name-topleft">{projectName}/Create a board</span></p>
                                            }
                                        </div>
            
                                        <div className=" col col-md-5 d-inline">
                                            <label htmlFor="#shareprojectprivacy">Public</label>
                                            
                                            <div className="form-check form-switch d-inline">
                                                <input type="checkbox" className="form-check-input custom-switch ccc" id="shareprojectprivacy" role="switch" />
                                            </div>
                                            <div className="d-inline">
                                                <button type="button" className="btn"><span><i className="bi bi-link"></i></span></button>
                                                <button type="button" className="btn"><span><i className="bi bi-camera"></i></span></button>
                                                
                                            </div>
                                        </div>
                                    </div>
            
                                    <div className="main-supercreate col-12 bg-green w-100">
            
                                        <div className="main-create">
                                            <h2 className="board_name_inputcon"><input type="text" name="board_name" id="board_name" placeholder="Board Name" className="board_name_input w-100" onChange={boardNamecreate} autoFocus required /></h2>
                                            <div className="describeOrPreview">
                                                <button type="button" className="btn p-1 btn-for-white fw-bold">Description</button>
                                                <button type="button" className="btn p-1">Preview</button>
                                            </div>
                                            <div className="bg-white ee">
                                                <textarea className="dd w-100" name="board_description" id="board_description" onChange={boardDescriptioncreate} placeholder="Enter Description"></textarea>
                                                <div className="bg-white">
                                                    
                                                    <div id="for-fileinput" className="">
                                                        <input type="file" className="" id="main-fileinput" multiple />
                                                        <div id="for-fakefileinput" className="">
                                                            <button type="button" className="btn"><span><i className="fa fa-link"></i></span></button>
                                                        </div>
                                                    </div>
                                                        {/*<!--<button type="button" className="btn d-inline float-left"><span><i className="bi bi-image"></i></span></button>--> */}
            
                                                    <div id="for-fileinput" className="">
                                                        <input type="file" className="" id="main-fileinput" accept="image/*" multiple />
                                                        <div id="for-fakefileinput" className="">
                                                            <button type="button" className="btn"><span><i className="bi bi-image"></i></span></button>
                                                        </div>
                                                    </div>
                                                    <div id="aaa" className="aaa">
                                                        <button type="button" className="btn aaa"><span><i className="bi bi-emoji-smile"></i></span></button>
                                                    </div>
                                                    
                                                    
                                                    <p className="d-inline float-end">Text Formatting</p>
                                                    
                                                    <div className="clear"></div>
                                                </div>
                                            </div>
                                            <div className="mt-5">
                                                <p>TASKS</p>
                                                <p><b id="taskerror"></b></p>
                                                <div className="m-0">
                                                    <div className="taskcontainer m-1" id="taskcontainer">
                                                        <ul className="taskitems" id="taskitems">
                                                            {/* <!--<li><span><i className="bi bi-list-board"></i></span><input className="mx-1" type="checkbox" id="task">Sub board 1</li>--> */}
                                                        </ul>
                                                        <p className="" id="taskArrayP" hidden></p>
                                                    </div>
                                                    
                                                </div>
                                                <div className="m-0">
                                                    <p><input type="text" id="taskinput" className="form-control" placeholder="tasks here..." onChange={(event => setTempTask(event.target.value))} /></p>
                                                    <ul>
                                                        {tasks.map((task, index) => (
                                                            <li className='taskNamesList' key={index}><input type="checkbox" className='taskNames' role="checkbox" /> {task}</li>
                                                        ))}
                                                    </ul>
                                                    
                                                    <button type="button" name="discardtask" id="discardtask" className="btn p-0" onClick={discardTask}>Discard</button>
                                                    <button type="button" name="savetask" id="savetask" className="btn text-success p-0" onClick={taskListcreate}>Save task</button>
                                                </div>
                                            </div>
            
                                            <div>
                                                
                                                <div id="for-fileinput" className="me-4">
                                                    <input type="file" className="" id="main-fileinput" multiple>
                                                    {/* <!--
                                                    <div id="for-fakefileinput" className="">
                                                        <button type="button" className="btn bg-white px-2 py-1"><span><i className="fa fa-file-export m-1"></i></span>Attachment</button>
                                                    </div>
                                                --> */}</input>
                                                </div>
                                                <button type="button" className="btn bg-white px-2 py-1"><span><i className="fa fa-file-export m-1"></i></span>Attachment</button>
                                                <button type="button" className="btn bg-white px-2 py-1"><span><i className="bi bi-alarm m-1"></i></span>Relationship</button>
                                                <button type="button" className="btn bg-white px-2 py-1"><span><i className="bi bi-alarm m-1"></i></span>Alert</button>
                                                <button type="button" className="btn bg-white px-2 py-1"><span><i className="bi bi-three-dots m-2"></i></span>More</button>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
            
                                <div className="project-status p-3">
                                    <div className="project-status_subdiv">
                                        <div className="dropdown">
                                            <button type="button" className="btn w-100 text-start project-selectionbtn dropdown-toggle" data-bs-toggle="dropdown" id="projectlist" name='Select a project' onClick={changeProjectName}><span><i className="fa fa-chevron-down me-5"></i></span><span><i className="bi bi-menu-app me-3"></i></span><span className="me-5">Select a project</span></button>
                                            <ul className="dropdown-menu w-100 text-center" aria-labelledby="projectlist">
                                                <li role="presentation" className="w-100">
                                                    <button role="menu-item" type='button' className="dropdown-item w-100" onClick={changeProjectName}>Hi</button>
                                                </li>
                                                <li role="presentation" className="w-100">
                                                    <button role="menu-item" type='button' className="dropdown-item w-100" onClick={changeProjectName}>Hello</button>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="mt-3">
                                            <p>ATTRIBUTES</p>
                                        </div>
                                        <div>
                                            <table className="projectTags">
                                                <tbody>
                                                <tr>
                                                    <td>Status</td>
                                                    <td>
                                                        <div className="dropdown">
                                                            <button type="button" className="btn btn-notyetstarted dropdown-toggle progress-status" data-bs-toggle="dropdown" id="progress-status" onClick={(event) => changeBoardStatus(event, status)}><span><i className="bi bi-stop-circle-fill me-2"></i></span>Not yet started</button>
                                                            <ul className="dropdown-menu" aria-labelledby="progress-status">
                                                                <li role="presentation" className="w-100">
                                                                    <button type="button" className="btn btn-notyetstarted" onClick={ (event) => changeBoardStatus(event, 'notyetstarted')}><span><i className="bi bi-stop-circle-fill me-2"></i></span>Not yet started</button>     {/*<!--<a href="" role="menu-item" className="dropdown-item w-100">Hello</a>--> */}
                                                                </li>
                                                                <li role="presentation" className="w-100">
                                                                    <button type="button" className="btn btn-inprogress" onClick={ (event) => changeBoardStatus(event, 'inprogress')}><span><i className="bi bi-stop-circle-fill me-2"></i></span>In progress</button>
                                                                    {/*<!--<a href="" role="menu-item" className="dropdown-item w-100">Hi</a>--> */}
                                                                </li>
                                                                <li role="presentation" className="w-100">
                                                                    <button type="button" className="btn btn-completed" onClick={ (event) => changeBoardStatus(event, 'completed')}><span><i className="bi bi-stop-circle-fill me-2"></i></span>Completed</button>     {/*<!--<a href="" role="menu-item" className="dropdown-item w-100">Hello</a>--> */}
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        {/*<!--<button type="button" className="btn btn-in-progress" ><span><i className="bi bi-stop-circle-fill me-2"></i></span>In progress</button>--> */}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Priority</td>
                                                    <td>
                                                        
                                                        <div className="dropdown d-inline">
                                                            <button type="button" className="btn btn-lowpriority dropdown-toggle" data-bs-toggle="dropdown" id="priority-value" onClick={ (event) => (changeBoardPriority(event, priority))}><span><i className="bi bi-exclamation-circle me-2"></i></span>{priority}</button>
                                                            <ul className="dropdown-menu" aria-labelledby="priority-value">
                                                                <li role="presentation" className="w-100">
                                                                    <button type="button" className="btn btn-lowpriority" onClick={ (event) => (changeBoardPriority(event, 'Low'))}><span><i className="bi bi-exclamation-circle me-2"></i></span>Low</button>
                                                                    {/* <!--<a href="" role="menu-item" className="dropdown-item w-100">Hi</a>--> */}
                                                                </li>
                                                                <li role="presentation" className="w-100">
                                                                    <button type="button" className="btn btn-mediumpriority" onClick={ (event) => (changeBoardPriority(event, 'Medium'))}><span><i className="bi bi-exclamation-circle me-2"></i></span>Medium</button>
                                                                    {/* <!--<a href="" role="menu-item" className="dropdown-item w-100">Hi</a>--> */}
                                                                </li>
                                                                <li role="presentation" className="w-100">
                                                                    {/* <!--<a href="" role="menu-item" className="dropdown-item w-100">Hello</a>--> */}
                                                                    <button type="button" className="btn btn-highpriority" onClick={ (event) => (changeBoardPriority(event, 'High'))}><span><i className="bi bi-exclamation-circle me-2"></i></span>High</button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Assignee</td>
                                                    <td><button type="button" className="btn bg-white whitebtn-border" >Samuel Adeyemo</button></td>
                                                </tr>
                                                <tr>
                                                    <td>Due Date</td>
                                                    <td>
                                                        <button type="button" className="btn whitebtn-border calendar-date"  onClick={changeBoardDueDate}>27/11/2022
                                                            <div className='calender-datechild'>
                                                                <p>Hello, this div is supposed to give calendar object</p>
                                                            </div>
                                                        </button>
                                                        
                                                    </td>
                                                </tr>
                                                </tbody>
                                                
                                            </table>
                                            <button type="button" className="btn">+ Add Attribute</button>
                                        </div>
            
                                        <div className="cancelOrCreated w-100">
                                            <button type="reset" className="bg-danger">Cancel</button>
                                            <button type="button" name="create-a-board" id="create-a-board" className="bg-success" onClick={createboard}>+ Create</button>
                                        </div>
                                    </div>
                                    
                                </div>

                                

                                <div className="clear py-5">

                                </div>

                            </div>
                        </form>
                        {/* {% endif %} */}
                    </div>
                </div>
            </div>


            <div>
                <div className='my-dropdiv' id='my-dropdiv'>
                    <button type='button' id='dropdownbutton' onClick= {(event) => (dropdownfunc(event))}>Button drop</button>
                    <div className='lildropdiv' id='lildropdiv'>
                        <button>First drop</button>
                        <button>Second drop</button>
                    </div>
                </div>
            </div>


        </div>

    </HelmetProvider>
  )
}

export default CreateBoard;