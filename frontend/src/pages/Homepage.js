import React, { useEffect } from 'react';
import { HelmetProvider, Helmet} from 'react-helmet-async';

import RequireAuthentication from '../components/RequireAuthentication';
import NavbarAnonymous from '../components/NavbarAnonymous';
import NavbarActive from '../components/NavbarActive';

import { getStatus, userAuthenticated } from '../redux/features/userAuthSliceReducer/userStatusSlice';

import Dashboard from './Dashboard';

import jQuery from 'jquery';

// Redux stuffs
import { useSelector, useDispatch } from 'react-redux';

const jquery = require("jquery");
/*
jQuery(function($){

    var $taskCompleted = $('#taskCompleted');
    var $taskInProgress = $('#taskInProgress');

    var getTask = () => {
        
        
        $.ajax({
            type: 'GET',
            //data: None,
            //url: "{% url 'bb' %}",
            //url: "http://127.0.0.1:8000/api/",
            //dataType: "json",
            success: function(response){
                //console.log(response);
                // To get the current task completed from the server to ajax and then from ajax to the client side.
                if (response.user_activities_completed.length > 1) {
                    $taskCompleted.text(response.user_activities_completed.length + ' ' + 'Tasks');
                }
                else{
                    $taskCompleted.text(response.user_activities_completed.length + ' ' + 'Task');
                }


                // To get the current task inprogress from the server to ajax and then from ajax to the client side.
                if (response.user_activities_progress.length > 1) {
                    $taskInProgress.text(response.user_activities_progress.length + ' ' + 'Tasks');
                }
                else{
                    $taskInProgress.text(response.user_activities_progress.length + ' ' + 'Task');
                }

                /*
                // To get the current task not yet started from the server to ajax and then from ajax to the client side.
                if (response.user_activities_progress.length > 1) {
                    $taskInProgress.text(response.user_activities_progress.length + ' ' + 'Tasks');
                }
                else{
                    $taskInProgress.text(response.user_activities_progress.length + ' ' + 'Task');
                }
                *
            },
            error: function(response){
                alert('Wrong!')
                
            },
        });

        
        
    };

    setInterval(getTask, 100000000);


    var getProjects = () => {
            window.location.href = '/activities';
    };

    $('#projectpage').on('click', function(){
        $.ajax({
            type: 'GET',
            url: '/authuser',
            success: function(response){
                if (response.user === 'is_not_authenticated'){
                    window.location.href = '/login';
                    console.log('Not logged in');
                    
                }
                else if (response.user === 'is_authenticated'){
                    window.location.href = '/activities';
                    console.log('Logged in');
                }
                else{
                    alert('Not receiving a valid response');
                    console.log(response);
                }
                
            },
            error: function(response){
                console.log('Not responding');
                console.log(response);
            }
        })
    });


var xArray = ["", "Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
var yArray = [3,7,8,8,9,9,9,10,];
//console.log(yArray.length)

// Define Data
var data = [{
x: xArray,
y: yArray,
mode: "lines",
type: "scatter",
line: {
    color: 'rgb(248, 212, 9)'
}
}];

// Define Layout
var layout = {
xaxis: {range: [], title: ""},
yaxis: {range: [5, 16], title: ""},
title: "",
plot_bgcolor: 'rgba(33, 101, 156, 0.854)',
//paper_bgcolor: '#2c405b',
paper_bgcolor: 'rgba(33, 101, 156, 0.854)',
font: {
    color: 'gray',
    family: 'Open Sans',
    size: 10,
},
colorway: '#d62728',
autosize: false,
width: 600,
height: 250,

margin: {
    l: 15,
    r: 15,
    b: 15,
    t: 15,

    color: 'blue',
    
},

calendar: 'chinese',
};

// Display using Plotly
})
*/


var launchcreateproject = () => {
    
    if (window.fetch){
        fetch('http:127.0.0.1:8000/api/get_loginstatus')
        .then(response => response.json())
        .then(data => {
            if ( data.someProperty == "is_authenticated"){
                return <Dashboard />
            }
        })
    }
}



const Homepage = () => {

    const is_authenticated = useSelector((state) => state.USER_STATUS)
    console.log(is_authenticated)
    console.log("Done")
    useEffect(() => {
        console.log(is_authenticated)
    })
    
    

    var navbar;
    if (is_authenticated == true){
        navbar = <NavbarActive />
    }
    else{
        navbar = <NavbarAnonymous />
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

            
            
            <script src="../customjs/js/todoapp.js" type='text/jsx'></script>
            <script src="../customjs/js/signup.js" type='text/jsx'></script>
            <script src="../customjs/js/login.js" type='text/jsx'></script>
            
            <link rel="stylesheet" href="css/todoapp.css" />
            <link rel="stylesheet" href="css/login.css" />
            <link rel="stylesheet" href="css/homepage.css" />

            
            {/*
            <script defer src="../styles/css/Jquery/jquery.js"></script>
            <script src="{% static 'assets/css/bootstrap/js/bootstrap.bundle.js' %}"></script>
            
            <script src="{% static 'assets/js/jquery.js'%} "></script>
            <script src="{% static 'assets/js/navbar-login.js'%} "></script>
            <script src="{% static 'assets/js/login.js'%} "></script>
            */}

            
            
            <title></title>
        </Helmet>

        <div>
            <div>
                {navbar}
            </div>
            <div className="container-fluid p-0 m-0">
                <main>
                    <div className="headline">
                        <div className="headline-child center-text">
                            <p className="fw-bold mt-md-5">Project Management App</p>
                            <h1><p className="">Collaborate and build faster, together.</p></h1>
                            <p className="m-auto w-60">Create, share, and get feedbacks with collaborative boards for rapid development.</p>
                            <div className="mt-md-2">
                                <button id='launchcreateproject' className="btn btn-info text-white" onClick={launchcreateproject}>Create Project board</button>
                            </div>
                        </div>
                    </div>

                    <div className="aim-div">
                        <div className="aim-subdiv row">
                            <div className="three-divs integrate-div col-12 col-md-4">
                                <div className="three-subdivs">
                                    <p className="fw-bold">Integrate</p>
                                    <p>The ability to quickly set up and customize workflows for just about anything.</p>
                                </div>
                            </div>

                            <div className="three-divs collaborate-div col-12 col-md-4">
                                <div className="three-subdivs">
                                    <p className="fw-bold">Collaborate</p>
                                    <p>Manage projects, organize tasks and build team spirit--all in one place.</p>
                                </div>
                                
                            </div>
                            <div className="three-divs succeed-div col-12 col-md-4">
                                <div className="three-subdivs">
                                    <p className="fw-bold">Succeed</p>
                                    <p>Every single part of your task can be managed, traced, and shared with teammates.</p>
                                </div>
                                
                            </div>
                        </div>

                    </div>

                    <div className="website-content">
                        
                        <div className="workflow-contents row pt-5">
                            <div className="workflow-text col-md-5 pt-md-5">
                                <p>Universal</p>
                                <p className='text-30'>Build the workflow you want.</p>
                                <p>Manage your boards using Drag-n-Drop, create additional boards and tasks.</p>
                            </div>
                            <div className="workflow-img contentpic-div col-md-7">
                                <img src={require('../images/project pic 1.png')} alt="Just an image, you know?" className="contentpic" />
                            </div>
                        </div>

                        <div className="package-contents row pt-5">
                            <div className="package-img contentpic-div text-end col-md-7">
                                <img src={require('../images/project pic 2.png')} alt="Just an image, you know?" className="contentpic" />
                            </div>
                            <div className="package-text col-md-5 pt-md-5">
                                <p>Optimized</p>
                                <p className='text-30'>Everything you need in one place.</p>
                                <p>You can specify info in task description and assign users.</p>
                            </div>
                            
                        </div>

                        <div className="limitation-contents row pt-5">
                            <div className="limitation-text col-md-5 pt-md-5">
                                <p>Unlimited</p>
                                <p className='text-30'>No limits for all users.</p>
                                <p>Unlimited different boards, columns and tasks.</p>
                            </div>
                            <div className="limitation-img contentpic-div col-md-7">
                                <img src={require('../images/project pic 3.png')} alt="Just an image, you know?" className="contentpic" />
                            </div>
                        </div>
                    </div>

                    <div className="text-center p-3">
                        <button type="button" className="btn btn-primary">Get Started</button>
                    </div>
                </main>
            </div>
        </div>
    </HelmetProvider>
        
        

    
  )
}

//const WrappedHomepage = RequireAuthentication(Homepage);
//export default WrappedHomepage
export default Homepage