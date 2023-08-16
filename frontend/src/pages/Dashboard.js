import React, { useState, useEffect } from 'react';
import { Link, useNavigate, redirect, useFetcher } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async'


//import ProjectRequest from '../components/ProjectRequest';
import BoardRequest from '../components/BoardRequest';

//import { BoardOnlyRequest } from '../components/ProjectRequest'

import '../styles/css/todoapp.css'

import '../styles/css/activities.css'
import '../styles/css/activity.css'

import socketIOClient from 'socket.io-client';



/*
<script></script>
    <script src="{% static 'assets/js/jquery.js'%} "></script>
    <script src="{% static 'assets/js/plotly-2.16.1.min.js'%} "></script>
*/

const Dashboard = () => {
    
    // Function responsible for opening/navigating to another page through button
    const navigate = useNavigate();
    const openPage = (pagename) => {
        navigate(`/${pagename}`);
    }

    // States for projects, boards and tasks
    const [project, setProject] = useState()
    const [board, setBoard] = useState(0)
    const [task, setTask] = useState([])
    //const [dataReceived, setDataReceived] = useState('');
    //const socket = socketIOClient('http://127.0.0.1:8000/api/boardsrequest');
    
    /*
    // Retrieving all the projects, the boards and all the tasks from the server for the particular account.
    var projectsRequest = async (event, request_type) => {
        event.preventDefault();
        switch(request_type){
            case 'get':
                let response = await fetch('http://127.0.0.1:8000/api/projectsrequest');
                let data = response.json;
                setProject(data);

                break;
            case 'post':
                let request = await fetch('http://127.0.0.1:8000/api/projectsrequest', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: 'pass',

                }).then((response) => {
                    if (!response.ok){
                        console.log('Something went wrong while posting project details');
                        throw new Error('Not Okay', {'Cause': response})
                    }else{
                        console.log('Project details successfully created!')
                    }
                })
                .then(data => console.log('Project has been registered', {'Project': data}))
                .catch(error => console.log("Encountered error while trying to register project", {"Error encountered": error}))

                break;

            default:
                console.log("Cannot register user's project actions");

                break;
        }
        
    }

    var boardsRequest = async (event, request_type) => {
        event.preventDefault();
        switch(request_type){
            case 'get':
                let response = await fetch('http://127.0.0.1:8000/api/boardsrequest');
                let data = response.json;
                setBoard(data);

                break;
            case 'post':
                let request = await fetch('http://127.0.0.1:8000/api/boardsrequest', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: 'pass',

                }).then((response) => {
                    if (!response.ok){
                        console.log('Something went wrong while posting board details');
                        throw new Error('Not Okay', {'Cause': response})
                    }else{
                        console.log('Board details successfully created!')
                    }
                })
                .then(data => console.log('Board has been registered', {'Board': data}))
                .catch(error => console.log("Encountered error while trying to register board", {"Error encountered": error}))

                break;

            default:
                console.log("Cannot register user's board actions");

                break;
        }
        
    }

    var tasksRequest = async (event, request_type) => {
        event.preventDefault();
        switch(request_type){
            case 'get':
                let response = await fetch('http://127.0.0.1:8000/api/tasksrequest');
                let data = response.json;
                setTask(data);

                break;
            case 'post':
                let request = await fetch('http://127.0.0.1:8000/api/tasksrequest', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: 'pass',

                }).then((response) => {
                    if (!response.ok){
                        console.log('Something went wrong while posting task details');
                        throw new Error('Not Okay', {'Cause': response})
                    }else{
                        console.log('Task details successfully created!')
                    }
                })
                .then(data => console.log('Task has been registered', {'Task(s)': data}))
                .catch(error => console.log("Encountered error while trying to register task", {"Error encountered": error}))

                break;

            default:
                console.log("Cannot register user's task actions");

                break;
        }
        
    }
    */

    var getBoard = async (request_type) =>{
        //event.preventDefault();
        switch(request_type){
            case 'get':
                await fetch('http://127.0.0.1:8000/api/boardsrequest')
                .then(response => response.json())
                .then(data => setBoard(data))
                .catch(error => console.log(`This is an error ${error}`));
                //setBoard(data);
                //setBoard(100);

                break;
            case 'post':
                let request = await fetch('http://127.0.0.1:8000/api/boardsrequest', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: 'pass',

                }).then((response) => {
                    if (!response.ok){
                        console.log('Something went wrong while posting board details');
                        throw new Error('Not Okay', {'Cause': response})
                    }else{
                        console.log('Board details successfully created!')
                    }
                })
                .then(data => console.log('Board has been registered', {'Board': data}))
                .catch(error => console.log("Encountered error while trying to register board", {"Error encountered": error}))

                break;

            default:
                console.log("Cannot register user's board actions");

                break;
        }

    }

    var stopsocket = () =>{
        //var socket = io.connect('http://localhost:8000/', {'reconnection': false});
        //socket.close()
    }

    
    useEffect(()=>{
        //getBoard('get');
        

        const socket = socketIOClient('http://localhost:8000');
        socket.on('boards-data', (data) => {
            console.log('Socket is on')
            //setTotalCount(data.total_count);
        });

    return () => {
      socket.disconnect();
    };
    }, [board])

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
        <body className='dashboard-body'>
            <div className="container-fluid for-allbg">
                <div className="row rows">
                    <div className="user_navigation p-3">
                        <div className="d-flex flex-column user_navsub h-100 for-round-border">
                            <h6 className="w-100 mt-3"><a href="" className="btn nav-link text-start grey-link w-100 yellow-icon"><i className="bi bi-border-style homepageicon me-3" aria-hidden="true"></i><span className="d-none d-sm-inline-flex yellow-icon">Tasky Manage</span></a></h6>
                            <ul className="nav nav-pills flex-column navigating-bars h-100">
                                <li className="nav-item w-100 mt-4">
                                    <button onClick={() => openPage('dashboard')} className="btn nav-link text-start w-100 turnsyellow">
                                        <i className="fa fa-table me-4"></i>
                                        <span className="turnsviolet">Dashboard</span>
                                    </button>
                                </li>
                                <li className="nav-item w-100 mt-4"><button onClick={() => openPage('team')} className="btn nav-link text-start w-100 turnsyellow" id="activitypagebutton"><i className="fa fa-people-group me-4"></i><span className="">Team</span></button></li>
                                <li className="nav-item w-100 mt-4"><button onClick={() => openPage('boards')} className="btn nav-link text-start w-100 turnsyellow" id="projectpage"><i className="fa fa-diagram-project me-4"></i><span className="">Projects</span></button></li>
                                <li className="nav-item w-100 mt-4"><button onClick={() => openPage('projectplan')} className="btn nav-link text-start w-100 turnsyellow"><i className="fa fa-list me-4"></i><span className="">Project Plan</span></button></li>
                                <li className="nav-item w-100 mt-4"><button onClick={() => openPage('messages')} className="btn nav-link text-start w-100 turnsyellow"><i className="fa fa-message me-4"></i><span className="">Messages</span></button></li>
                                <li className="nav-item w-100 mt-4"><button onClick={() => openPage('calendar')} className="btn nav-link text-start w-100 turnsyellow"><i className="fa fa-calendar-days me-4"></i><span className="">Calendar</span></button></li>
                                <li className="nav-item w-100 mt-4"><button onClick={() => openPage('setting')} className="btn nav-link text-start w-100 turnsyellow"><i className="fa fa-user-gear me-4"></i><span className="">Settings</span></button></li>
                                <li className="nav-item w-100 navigating-bar"><button onClick={() => openPage('logout')} className="btn nav-link text-start w-100 turnsyellow"><i className="bi bi-box-arrow-right me-4"></i><span className="turnsred">Log out</span></button></li>
                            </ul>
                        </div>
                    </div>

                    <div className="center_view">
                        <div className="main-contents p-3">
                            {/* {% block content %} */}
                            <div className="title-and-navs row mt-4">
                                <div className="title mb-3 col-6">
                                    <h4 className="text-white">Dashboard</h4>
                                </div>
                                <div className="uppernavs col-6 w-50">
                                    
                                    <div className="uppernav w-75 px-4">
                                        <button className="btn btn-warning create-new-project little-dark-bold" id="openProjectPage" onClick={() => openPage('createboard')}>+ New Project</button>
                                        <button className="notifications" onClick={() => openPage('notifications')}><i className="bi bi-bell"></i></button>
                                        
                                        <img className="profile-image" src="{% static 'assets/the houses/AvatarMaker_1.png' %}" alt="" />
                                    </div>
                                    
                                </div>
                            </div>

                            <div className="tasks row g-2 mt-1">
                                <div className="col-6 p-3">
                                    <div className="upper-dark for-round-border row p-3 me-1">
                                        <div className="float-left col-2 m-0 p-0 text-white">
                                            <button className="btn fs-4 p-0 ms-4" onClick={stopsocket}><i className="bi bi-calendar-fill icon-turnsyellow"></i></button>
                                        </div>
                                        <div className="col-6">
                                            <p className="little-white-bold d-inline" id="boardCompleted">{board} Boards</p>
                                            <p className="grey-text">Completed</p>
                                        </div>
                                        <div className="col-4">
                                            <p className="fw-bold">Pie chart</p>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="col-6 p-3">
                                    <div className="upper-dark for-round-border row p-3 ms-1">
                                        <div className="float-end col-2 p-0">
                                            <button className="btn fs-4"><i className="bi bi-calendar-fill icon-turnsyellow"></i></button>
                                        </div>
                                        <div className="col-6">
                                            
                                            
                                            <p className="little-white-bold d-inline" id="boardInProgress">Board</p>
                                            
                                            <p className="grey-text">In Progress</p>
                                            
                                            
                                        </div>
                                        <div className="col-4">
                                            <p className="fw-bold">Pie chart</p>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>

                            <div className="overview mt-3">
                                <div className="overview-tab upper-dark for-round-border p-4">
                                    <p className="text-start little-white-bold d-inline">Overview</p>
                                    <button className="btn little-white-bold" style={{float:"right"}}><i className="bi bi-three-dots"></i></button>
                                    <div className="mt-3" id="tester">

                                    </div>
                                    <div style={{float:"clear"}}>

                                    </div>
                                </div>
                            </div>

                            <div className="today-task mt-3">
                                <div className="overview-tab upper-dark for-round-border p-4">
                                    <p className="text-start little-white-bold d-inline">Today's Task</p>
                                    <button className="btn little-white-bold pt-0" style={{float:"right"}}>...</button>
                                    <div style={{float:"clear"}}>
                                        
                                    </div>
                                    <div className="mt-3">
                                        <div className="mb-1">
                                            <label className="minute-white" htmlFor="task1">Redesign mobile app.</label>
                                            <input className="makeit" type="checkbox" id="task1" />
                                        </div>

                                        <div className="mb-1">
                                            <label className="minute-white" htmlFor="task1">Attend team meeting.</label>
                                            <input className="makeit" type="checkbox" id="task1" />
                                        </div>
                                        <div className="mb-1">
                                            <label className="minute-white" htmlFor="task1">Redesign mobile app.</label>
                                            <input className="makeit" type="checkbox" id="task1" />
                                        </div>

                                        <div className="mb-1">
                                            <label className="minute-white" htmlFor="task1">Attend team meeting.</label>
                                            <input className="makeit" type="checkbox" id="task1" />
                                        </div>
                                        <div className="mb-1">
                                            <label className="minute-white" htmlFor="task1">Redesign mobile app.</label>
                                            <input className="makeit" type="checkbox" id="task1" />
                                        </div>

                                        <div className="mb-1">
                                            <label className="minute-white" htmlFor="task1">Attend team meeting.</label>
                                            <input className="makeit" type="checkbox" id="task1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* {% endblock %} */}
                        </div>
                    </div>

                    <div className="calendars_and_offers p-1">
                        <div className="innercalendars_and_offers">
                            <div className="calendar mb-5">
                            {/* <!--<iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Africa%2FLagos&src=Y3Jvd25wcmluY2VzYW11ZWxhYWRleWVtb0BnbWFpbC5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZDc2ODJlOTkzOGU4NWU2OTRiYzE0NDg3Yjk1MzJmOTBlNWJiMWNiMGU4MDk0OTllNzNjMzBiOTI4M2M5OTVjZEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y2xhc3Nyb29tMTAxMjEyNTIwNDczODcxMjc2NjkzQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=ZW4ubmcjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTEzMjI1MDU1NTA0NjczNDc2ODAyQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTE1ODM2NDYyMTU2NTQxMzc3NTU2QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%2333B679&color=%23EF6C00&color=%23174ea6&color=%230B8043&color=%23b80672&color=%23202124" style="border:solid 1px #777" frameborder="0" scrolling="no"></iframe>--> */}
                            {/* <iframe src="https://calendar.google.com/calendar/embed?height=100&wkst=1&bgcolor=%23ffffff&ctz=Africa%2FLagos&src=ZDc2ODJlOTkzOGU4NWU2OTRiYzE0NDg3Yjk1MzJmOTBlNWJiMWNiMGU4MDk0OTllNzNjMzBiOTI4M2M5OTVjZEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23EF6C00" style="border:solid 1px #777" width="300" height="150" frameBorder="0" scrolling="no"></iframe> */}
                            </div>
                            <div className="offers for-round-border bg-light mt-1">
                                <div className="d-flex flex-column bg-light for-round-border">
                                    <ul className="nav nav-pills flex-column">
                                        <li className="nav-item w-100 mb-1">
                                            <div className="offer-items">
                                                <a href="" className="nav-link text-start black-link w-100"><i className="fa fa-calculator me-3"></i><span className="text-start">Calculator</span></a>
                                                <a href="" className="grey-link-normal me-5"><i className="me-5"></i>Arithmetic</a>
                                            </div>
                                        </li>
                                            
                                        
                                        <li className="nav-item w-100 mb-1">
                                            <div className="offer-items">
                                                <a href="" className="nav-link text-start black-link w-100"><i className="fa fa-mail-forward me-3"></i><span className="text-start">Send email</span></a>
                                                <a href="" className="grey-link-normal me-5"><i className="me-5"></i>Messages</a>
                                            </div>
                                        </li>
                                        
                                        <li className="nav-item w-100 mb-1">
                                            <div className="offer-items">
                                                <a href="" className="nav-link text-start black-link w-100"><i className="fa fa-contact-book me-3"></i><span className="text-start">Contact team</span></a>
                                                <a href="" className="grey-link-normal me-5"><i className="me-5"></i>Contacts</a>
                                            </div>
                                        </li>
                                        
                                        <li className="nav-item w-100 mb-1">
                                            <div className="offer-items">
                                                <a href="" className="nav-link text-start black-link w-100"><i className="fa fa-coins me-3"></i><span className="text-center">Cryptocurrency exchange</span></a>
                                                <a href="" className="grey-link-normal me-5"><i className="me-5"></i>Blockchain and Web3</a>
                                            </div>
                                        </li>

                                        <li className="nav-item w-100 my-2">
                                            <div className="unlock-items">
                                                <div className="upp">
                                                    {/*<img className="upgrade-crown" src="{% static 'assets/font-awesome-icons/crown-solid.svg'%}" alt="" />*/}
                                                    <a className='h1'><i className='fa fa-crown'></i></a>
                                                </div>

                                                <div className="center-upgrade-elements align-items-center justify-items-center text-center">
                                                    <p className="text-white">Get more features with Pro</p>
                                                    <button className="btn fw-bold bg-light w-100 mb-3">Upgrade plan</button>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    </HelmetProvider>
    
  )
}

export default Dashboard;