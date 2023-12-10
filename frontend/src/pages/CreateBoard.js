import React from 'react'
import { useState } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import '../styles/css/createboard.css';

const CreateBoard = () => {

  const user_token = useSelector((state) => state.USER_STATUS.token)
  const navigate = useNavigate();

    //Registering Project, board and tasks
    const [boardName, setBoardName] = useState('');
    const [boardDescription, setBoardDescription] = useState('')
    const [tasks, setTasks] = useState([]);
    // The tempTask is for receiving the keyprompt of the tasks to be added
    const [tempTask, setTempTask] = useState('')

    // Board details in the project
    const [status, setStatus] = useState('notyetstarted');
    const [priority, setPriority] = useState('low');

    // After the board is created
    
    //const navigate = useNavigation();

    const readCookie = () =>{
      if (document.cookie.includes("user_auth_cookie")) {
        let starting_position = document.cookie.indexOf("user_auth_cookie=") + 17; // plus 17 is the index of "=" in "user_auth_cookies="
        var derived_cookie = ''
        for (let i = starting_position; i < (starting_position + 64); i++){
          derived_cookie += document.cookie[i];
        }
        
        return derived_cookie;
      }
      else{
        console.log("Authentication cookie not found!")
      }
    }
    console.log(readCookie())
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

    /*Function for creating boards and submitting the project in which the board will be added unto, 
    but if no project name is added. The board becomes a free board which doesn't have a project 
    but rather a side temporary project within the account or organization. */
    
    const createboard = async (event) => {
      //event.preventDefault();
      if (boardName != ''){
        await fetch('http://127.0.0.1:8000/api/createboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${readCookie()}`
            },
            body: JSON.stringify({
                'board_name': boardName,
                'board_description': boardDescription,
                'tasks': tasks,
                'user_token': `${readCookie()}`
            })
        }).then((response) => {
            if (!response.ok){
                throw new Error('Something is wrong with posting of either the project name, board name etc.', {'cause': response}, response.json)
            }
            else{
                console.log('Data sent')
                return response.json()
            }
        })
        .then((data)=>{
            var board_id = data["board_id"]
            
            navigate(`/board/tesla/${board_id}`)
        })
        .catch(error => console.log('Encountered error when trying to submit the details', {'Error': error}))
      }
    }

    //console.log(tasks)

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

  return (
    <div className="afterprojectchosen">
        <div className="forprojectabsolute"> 
            <button type="button" className="btn cancelboardpage" id="cancelboardpage"><span><i className="fa fa-angle-left fs-1 text-white bg-dark"></i></span></button>

            {/* {% if user.is_authenticated %} */}
            <form className="form-panel-output" name="form-panel-ouput" id="form-panel-output" method="POST" encType="multipart/form-data">
                {/* {% csrf_token %} */}
                <div className="form-panel-outputdiv">
                    <div className="board-panel-output">

                        <div className="row m-3">
                            <div className="col col-md-7">
                                { boardName != '' ?
                                    <p className="d-inline"><span className="fw-bold" id="project-name-topleft">/{boardName}</span></p>
                                    :
                                    <p className="d-inline"><span className="fw-bold" id="project-name-topleft">/Create a board</span></p>
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
                                    <textarea className="textareadd w-100" name="board_description" id="board_description" onChange={boardDescriptioncreate} placeholder="Enter Description"></textarea>
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
                                
                                <div>
                                    
                                    <div id="for-fileinput" className="me-4">
                                        <input type="file" className="" id="main-fileinput" multiple />
                                        {/* <!--
                                        <div id="for-fakefileinput" className="">
                                            <button type="button" className="btn bg-white px-2 py-1"><span><i className="fa fa-file-export m-1"></i></span>Attachment</button>
                                        </div>
                                    --> */}
                                    </div>
                                    <div className='button-extras'>
                                        <button type="button" className="btn bg-white px-2 py-1"><span><i className="fa fa-file-export m-1"></i></span>Attachment</button>
                                        <button type="button" className="btn bg-white px-2 py-1"><span><i className="bi bi-alarm m-1"></i></span>Relationship</button>
                                        <button type="button" className="btn bg-white px-2 py-1"><span><i className="bi bi-alarm m-1"></i></span>Alert</button>
                                        <button type="button" className="btn bg-white px-2 py-1"><span><i className="bi bi-three-dots m-2"></i></span>More</button>
                                    
                                    </div>
                                    
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>

                    <div className="project-status p-3">
                        <div className="project-status_subdiv">
                            

                            <div className="mt-3">
                                <p>ATTRIBUTES</p>
                            </div>
                            <div className='for-attributes'>
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
                            

                            <div className="cancelOrCreated">
                                <button type="reset" className="bg-danger">Cancel</button>
                                <button type="button" name="create-a-board" id="create-a-board" className="bg-success" onClick={createboard}>+ Proceed</button>
                            </div>
                        </div>
                        
                    </div>

                    

                    <div className="clear py-5">

                    </div>

                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateBoard