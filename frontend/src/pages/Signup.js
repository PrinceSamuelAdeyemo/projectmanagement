import React,{ useState } from 'react'
import { HelmetProvider, Helmet} from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/css/todoapp.css';
import '../styles/css/login.css'
import jQuery from 'jquery';

import NavbarAnonymous from '../components/NavbarAnonymous'

// The functional component of the Signup page.
const Signup = () => {

    // Starting first with the react hooks, useNavigate and useState('')
    const navigate = useNavigate();
    const openPage = (page) =>{
        navigate(`/${page}`)
    };

    // For the personal or business form states, followed by the recording of the personal and business details in the states.
    const [clickedButton, setClickedButton] = useState('');
    const [signupButton, setSignupButton] = useState('personalSignupForm');
    const [personalSignupDetails, setPersonalSignupDetails] = useState({
        username: '',
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        password: '',
        password2: ''
    })

    const [businessSignupDetails, setBusinessSignupDetails] = useState({
        busername: '',
        companyName: '',
        companyNameabbr: '',
        businessemail: '',
        bpassword: '',
        bpassword2: '',
    })

    // THis is the function that get the button click and update the state for the form to be displayed
    // The "clickedButton" works to get the button clicked and display the form accordingly.
    // The "SignupButton" works to get the form that was submitted and send the only submitted form to the server.
    const forPersonalForm = () => {
        setClickedButton('personal');
        setSignupButton('personalSignupForm');
    }
    const forBusinessForm = () => {
        setClickedButton('business');
        setSignupButton('businessSignupForm');
    }


    const updatePersonalDetails = (event) => {
        const {name, value} = event.target;
        setPersonalSignupDetails((prevValues) => (
            { ...prevValues, [name]:value}
            ))
        console.log(personalSignupDetails.username);
    }

    const updateBusinessDetails = (event) => {
        const {name, value} = event.target;
        setBusinessSignupDetails((prevValues) => (
            { ...prevValues, [name]:value}
            ))
    }

    // Get the status of the button clicked and then display the form accordingly.
    var PersonalorBusiness = (event) => {
        event.preventDefault();

        const personalSignup = document.getElementById('personalSignupForm')
        const businessSignup = document.getElementById('businessSignupForm');
    
        switch (clickedButton){
            case 'personal':
                businessSignup.style.display = 'none';
                personalSignup.style.display = 'block';
                break;

            case 'business':
                personalSignup.style.display = 'none';
                businessSignup.style.display = 'block';
                break;

            default:
                console.log('Invalid request from the Personal or Business Button');
                break;
        }
    }

    var submitSignupDetails = (event) =>{
        //const personalSignup = document.getElementById('personalSignupForm')
        //const businessSignup = document.getElementById('businessSignupForm');
        
        event.preventDefault();
        switch (signupButton){
            case 'personalSignupForm':
                console.log('From personal form');
                if (personalSignupDetails.password === personalSignupDetails.password2) {
                    //setPersonalSignupDetails({password: personalSignupDetails.password});
                    fetch('http://127.0.0.1:8000/api/signup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "sender": "personal",
                            'user':
                            {'username': personalSignupDetails.username,
                            'first_name': personalSignupDetails.firstName,
                            'last_name': personalSignupDetails.lastName,
                            'email': personalSignupDetails.email,
                            'password': personalSignupDetails.password,},
                            'middle_name': personalSignupDetails.middleName,
                            'country': 'Nigeria',
                        })
                    }).then((response) => {
                        if (!response.ok) {
                            console.log(response);
                            throw new Error('Not okay', {'cause': response});
                            
                        }else{
                            console.log('Proceed');
                            
                            
                        }
                    })
                    //openPage('boards')
                    .then((data) => {
                        //console.log('Personal Registered');
                        openPage('boards');
                    })
                    .catch(error => console.log(error));

                }else{
                    //setPersonalSignupDetails({password: ''});
                    console.log(personalSignupDetails.password);
                    console.log(personalSignupDetails.password2);
                    console.log("Passwords don't match");
                }

                break;
            
            case 'businessSignupForm':
                console.log('From business form');
                if (businessSignupDetails.bpassword === businessSignupDetails.bpassword2) {
                    //setBusinessSignupDetails({bpassword: businessSignupDetails.bpassword});
                    fetch('http://127.0.0.1:8000/api/signup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "sender": "business",
                            'business_basicdetails': 
                            {'username': businessSignupDetails.busername,
                            //'username': businessSignupDetails.companyNameabbr,
                            'email': businessSignupDetails.businessemail,
                            'password': businessSignupDetails.bpassword,},
                            'business_name': businessSignupDetails.companyName,
                            'business_country': 'Nigeria',
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
                        console.log(businessSignupDetails.companyName);
                        console.log('Business Registered')})
                    .catch(error => console.log(error));

                }else{
                    //setPersonalSignupDetails({password: ''});
                    console.log(businessSignupDetails.password);
                    console.log(businessSignupDetails.password2);
                    console.log("Passwords don't match");
                }

                break;
    
            default:
                console.log('Default is running');
                break; 
        }
    
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

            {/*
            <link rel="stylesheet" href="{% static 'assets/css/bootstrap/css/bootstrap.css' %}" />
            <link rel="stylesheet" href="{% static 'assets/bootstrap-icons-1.3.0/bootstrap-icons.css' %}" />

            <link rel="stylesheet" href="{% static 'assets/css/todoapp.css' %}" />
            <link rel="stylesheet" href="{% static 'assets/css/login.css' %}" />

            
            <script src="{% static 'assets/js/jquery.js'%} "></script>
            <script src="{% static 'assets/js/signup.js'%} "></script>

            */}
            
            <title></title>
        </Helmet>

    <div>
        <div className="container-fluid p-0">
            {/* {% include 'navbar-login.html' %} */}

            <div className="all row">
                <div className="text-login col-12 col-md-6">
                    <div className="text-login-subdiv">
                        <p className="">Project management software</p>
                        <h2 className='text-20'>Everything you need in one place.</h2>
                        <p className="">Manage your boards using Drag-n-Drop, create additional boards and tasks.</p>
                    </div>
                </div>
                <div className="input-signup col-12 col-md-6">
                    <div className="input-signup-subdiv">
                        
                        <form onSubmit={PersonalorBusiness} method="POST">
                            {/* {% csrf_token %} */}
                            <div className="row">
                                <div className="col-6">
                                    <button name="personalSignupTrigger" id="personalSignupTrigger" type="submit" onClick={forPersonalForm} className="btn float-end">Personal</button>
                                </div>
                                
                                <div className="col-6">
                                    <button name="businessSignupTrigger" id="businessSignupTrigger" type="submit" onClick={forBusinessForm} className="btn">Company</button>
                                </div>
                            </div>
                        </form>
                    
                        {/* <!-- For Personal Signup --> */}
                        <form className="form" name='personalSignupForm' id="personalSignupForm" onSubmit={(event) => submitSignupDetails(event, "personalSignupForm")} role="form" method="POST">
                            {/* {% csrf_token %} */}
                            <div className="personalSignup" id="personalSignup">
                                <div className="form-group">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input id="username" className="form-control" name="username" onChange={updatePersonalDetails} type="text" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="first-name" className="form-label">First Name</label>
                                    <input id="first-name" className="form-control" name="firstName" onChange={updatePersonalDetails} type="text" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="middle-name" className="form-label">Middle Name</label>
                                    <input id="middle-name" className="form-control" name="middleName" onChange={updatePersonalDetails} type="text" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="last-name" className="form-label">Last Name</label>
                                    <input id="last-name" className="form-control" name="lastName" onChange={updatePersonalDetails} type="text" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input id="email" className="form-control" name="email" onChange={updatePersonalDetails} type="email" />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input id="password" className="form-control" name="password" onChange={updatePersonalDetails} type="password" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password2" className="form-label">Confirm Password</label>
                                    <input id="password2" className="form-control" name="password2" onChange={updatePersonalDetails} type="password" />
                                </div>
                    
                                <button type="submit" id="personalSignupSubmit" className="btn btn-primary" name="personalSignupSubmit">Submit</button>
                            </div>
                        </form>
                        
                        {/* <!-- For Business Signup --> */}
                        <form className="form" name='businessSIgnupForm' id="businessSignupForm" onSubmit={(event => submitSignupDetails(event, 'businessSignupForm'))} role="form" method="POST">
                            {/* {% csrf_token %} */}
                            <div className="businessSignup" id="businessSignup">
                                <div className="form-group">
                                    <label htmlFor="username" className="form-label">Business Username</label>
                                    <input id="busername" className="form-control col-12" name="busername" onChange={updateBusinessDetails} type="text" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="companyName" className="form-label">Company Name</label>
                                    <input id="companyName" className="form-control" name="companyName" onChange={updateBusinessDetails} type="text" />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="companyNameabbr" className="form-label">Company Name (abbreviated)</label>
                                    <input id="companyNameabbr" className="form-control" name="companyNameabbr" onChange={updateBusinessDetails} type="text" />
                                </div>
                    
                                <div className="form-group">
                                    <label htmlFor="businessemail" className="form-label">Email Address</label>
                                    <input id="businessemail" className="form-control" name="businessemail" onChange={updateBusinessDetails} type="email" />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input id="bpassword" className="form-control" name="bpassword" onChange={updateBusinessDetails} type="password" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password2" className="form-label">Confirm Password</label>
                                    <input id="bpassword2" className="form-control" name="bpassword2" onChange={updateBusinessDetails} type="password" />
                                </div>
                    
                                <button type="submit" name="businessSignupSubmit" id="businessSignupSubmit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                        
                        
                        <br />
                    </div>
                </div>
                
            </div>
        </div>
    </div>

    </HelmetProvider>
  )
}

export default Signup