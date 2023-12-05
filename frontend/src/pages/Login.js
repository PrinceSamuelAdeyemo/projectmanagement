import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, addByToken, removeByToken } from '../redux/features/userAuthSliceReducer/userAuthSlice';

import { HelmetProvider, Helmet} from 'react-helmet-async'
import NavbarAnonymous from '../components/NavbarAnonymous'
import '../styles/css/todoapp.css';
import '../styles/css/login.css'
import jQuery from 'jquery';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
    let host = 'ws://127.0.0.1:8000/ws'
    

    const COOKIE_NAME = 'user_auth_cookie';
    var COOKIE_TOKENVALUE = null;
    var COOKIE_EXPIRES = (new Date(Date.now + 604800000)).toUTCString;
    const COOKIE_PATH = '/cookie/user_auth_cookie';

    const dispatch = useDispatch();
    useEffect(() => {
        
    }, [])

    // Redirecting to another page using useNavigate() function
    const navigate = useNavigate();
    const openPage = (page) =>{
        navigate(`/${page}`);
    };
    
    // Starting first with the react hooks, useState('')
    // For the personal or business form states, followed by the recording of the personal and business details in the states.
    const [clickedButton, setClickedButton] = useState('');
    const [loginButton, setLoginButton] = useState('personalLoginForm');
    const [personalLoginDetails, setPersonalLoginDetails] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    })

    const [businessLoginDetails, setBusinessLoginDetails] = useState({
        busername: '',
        businessemail: '',
        bpassword: '',
        bpassword2: '',
    })

    const [wrongcredential, SetWrongCrediential] = useState()

    // THis is the function that get the button click and update the state for the form to be displayed
    // The "clickedButton" works to get the button clicked and display the form accordingly.
    // The "LoginButton" works to get the form that was submitted and send the only submitted form to the server.
    const forPersonalForm = () => {
        setClickedButton('personal');
        setLoginButton('personalLoginForm');
    }
    const forBusinessForm = () => {
        setClickedButton('business');
        setLoginButton('businessLoginForm');
    }


    const updatePersonalDetails = (event) => {
        const {name, value} = event.target;
        setPersonalLoginDetails((prevValues) => (
            { ...prevValues, [name]:value}
            ))
        console.log(personalLoginDetails.username);
    }

    const updateBusinessDetails = (event) => {
        const {name, value} = event.target;
        setBusinessLoginDetails((prevValues) => (
            { ...prevValues, [name]:value}
            ))
    }

    // Get the status of the button clicked and then display the form accordingly.
    var PersonalorBusiness = (event) => {
        event.preventDefault();

        const personalLogin = document.getElementById('personalLoginForm')
        const businessLogin = document.getElementById('businessLoginForm');
    
        switch (clickedButton){
            case 'personal':
                businessLogin.style.display = 'none';
                personalLogin.style.display = 'block';
                break;

            case 'business':
                personalLogin.style.display = 'none';
                businessLogin.style.display = 'block';
                break;

            default:
                console.log('Invalid request from the Personal or Business Button');
                break;
        }
    }

    
    var submitLoginDetails = async (event) =>{
        //const personalSignup = document.getElementById('personalSignupForm')
        //const businessSignup = document.getElementById('businessSignupForm');
        
        event.preventDefault();
        switch (loginButton){
            case 'personalLoginForm':
                console.log('From personal form');
                if (personalLoginDetails.email !== '' && personalLoginDetails.password !== '') {
                    //setPersonalSignupDetails({password: personalSignupDetails.password});
                    await fetch('http://127.0.0.1:8000/api/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "sender": "personal",
                            //'user':
                            //'username': personalLoginDetails.username,
                            'email': personalLoginDetails.email,
                            'password': personalLoginDetails.password,},
                        )
                    })
                    .then((response) => {
                        return response.json()
                    })
                    .then((data) => {
                        if ("non_field_errors" in data){
                            console.log("Wrong details")
                            SetWrongCrediential("Invalid Details")
                        }
                        else{
                            console.log("Your data",data)
                            COOKIE_TOKENVALUE = data['token']
                            document.cookie = `${COOKIE_NAME} = ${COOKIE_TOKENVALUE}; COOKIE_EXPIRES = ${COOKIE_EXPIRES}; COOKIE_PATH = ${COOKIE_PATH}`;
                            dispatch(addByToken(COOKIE_TOKENVALUE))
                            const login_socket = new WebSocket(`${host}/login`)
                            login_socket.onopen = ((event) => {
                                login_socket.send(JSON.stringify({"token": COOKIE_TOKENVALUE}))
                            })
                            openPage('boards');
                            
                            login_socket.onmessage = ((event) => {
                                let user = JSON.parse(event.data)["user"]
                                if (user == "Authenticated"){
                                    console.log('Personal Registered');
                                }
                            })
                            
                        }
                        
                    })
                    .catch(error => console.log("error", error));

                }else{
                    //setPersonalSignupDetails({password: ''});
                    console.log(personalLoginDetails.password);
                    console.log(personalLoginDetails.password2);
                    console.log("Passwords don't match");
                }

                break;
            
            case 'businessLoginForm':
                console.log('From business form');
                if (businessLoginDetails.bpassword === businessLoginDetails.bpassword2) {
                    //setBusinessSignupDetails({bpassword: businessSignupDetails.bpassword});
                    fetch('http://127.0.0.1:8000/api/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "sender": "business",
                            'business_basicdetails': 
                            {'username': businessLoginDetails.busername,
                            //'username': businessSignupDetails.companyNameabbr,
                            'email': businessLoginDetails.businessemail,
                            'password': businessLoginDetails.bpassword,},
                    })
                    }).then((response) => {
                        if (!response.ok) {
                            console.log(response);
                            throw new Error('Not okay', {'cause': response});
                            
                        }else{
                            console.log('Proceed');
                        }
                    })
                    .then(data => {
                        console.log("Your data",data)
                        COOKIE_TOKENVALUE = data['token']
                        document.cookie = `${COOKIE_NAME} = ${COOKIE_TOKENVALUE}; COOKIE_EXPIRES = ${COOKIE_EXPIRES}; COOKIE_PATH = ${COOKIE_PATH}`;
                        dispatch(addByToken(COOKIE_TOKENVALUE))
                        console.log(businessLoginDetails.companyName);
                        /*
                        const login_socket = new WebSocket(`${host}/login`)
                        login_socket.onopen = ((event) => {
                            login_socket.send(COOKIE_TOKENVALUE)
                        })
                        */
                        console.log('Business Registered')
                        openPage('boards');

                        })
                    .catch(error => console.log(error));

                }else{
                    //setPersonalSignupDetails({password: ''});
                    console.log(businessLoginDetails.bpassword);
                    console.log(businessLoginDetails.bpassword2);
                    console.log("Passwords don't match");
                }

                break;
    
            default:
                console.log('Default is running');
                break; 
        }
    
    }
    
    const getUserToken = useSelector((state) => state.AUTH_TOKEN.token)
    console.log(getUserToken)


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

        <div>
            <div className="container-fluid p-0">

                <div className="all row">
                    <div className="text-login col-12 col-md-6">
                        <div className="text-login-subdiv">
                            <p className="">Project management software</p>
                            <h2 className='text-20'>Everything you need in one place.</h2>
                            <p className="">Manage your boards using Drag-n-Drop, create additional boards and tasks.</p>
                        </div>
                    </div>
                    <div className="input-login col-12 col-md-6">
                        <div className="input-login-subdiv pb-4">
                            
                            <form method="POST" onSubmit={PersonalorBusiness}>
                                {/* {% csrf_token %} */}
                                <div className="row">
                                    <div className="col-6">
                                        <button name="personallogintrigger" type="submit" className="btn float-end" id="personallogintrigger" onClick={forPersonalForm}>Personal</button>
                                    </div>
                                    
                                    <div className="col-6">
                                        <button name="businesslogintrigger" type="submit" className="btn" id="businesslogintrigger" onClick={forBusinessForm}>Company</button>
                                    </div>
                                </div>
                            </form>
                        
                            <form id="personalLoginForm" name="personalLoginForm" className="form" method="POST" onSubmit={(event) => submitLoginDetails(event, 'personalLoginForm')}>
                                {/* {% csrf_token %} */}
                                
                                <div className="personallogin" id="personallogin">
                                    <div className="form-group w-100 text-center">
                                        <label>{wrongcredential}</label>
                                    </div>
                                    <div className="form-group w-100">
                                        <label htmlFor="email" className="form-label">Email Address</label>
                                        <input id="email" name="email" type="email" className="form-control" placeholder="e.g personal@gmail.com" onChange={updatePersonalDetails} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input id="password" name="password" type="password" className="form-control" onChange={updatePersonalDetails} />
                                    </div>
                
                                    <button type="submit" name="personalSignin" id="personalSignin" className="btn btn-primary mt-2">Sign in</button>
                
                                    <div className="form-group text-center mt-2">
                                        <p className="form-control-plaintext">Don't have an account? <span><Link className="signup-link" to="/signup">Sign Up</Link></span></p>
                                    </div>
                                </div>
                            </form>
                            
                            {/* For business login  */}
                            <form id="businessLoginForm" name="businessLoginForm" className="form" method="POST" >   
                                {/* {% csrf_token %} */}
                                <div className="businesslogin" id="businesslogin">
                                    <div className="form-group w-100 text-center">
                                        <label>{wrongcredential}</label>
                                    </div>
                                    <div className="form-group w-100">
                                        <label htmlFor="businessemail" className="form-label">Email Address</label>
                                        <input id="businessemail" name="businessemail" type="email" className="form-control" placeholder="e.g company@company.com" onChange={updateBusinessDetails} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="businesspassword" className="form-label">Password</label>
                                        <input id="businesspassword" name="businesspassword" type="password" className="form-control" onChange={updateBusinessDetails} />
                                    </div>
                
                                    <button type="submit" name="businessSignin" id="businessSignin" className="btn btn-primary mt-2">Sign in</button>
                
                                    <div className="form-group text-center mt-2">
                                        <p className="form-control-plaintext">Haven't Registered? <span><Link className="signup-link" to="/signup">Sign Up</Link></span></p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>

    </HelmetProvider>
  )
}

export default Login