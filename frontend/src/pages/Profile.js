import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import { HelmetProvider } from 'react-helmet-async'

import RequireAuthentication from '../components/RequireAuthentication'

import { useSelector } from 'react-redux'

import "../styles/css/profile.css"

const Profile = () => {
  const profileUrl = "http://127.0.0.1:8000/api/return_user"

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('')
  const [user_id, setUser_id] = useState('')
  

  const cookie = useSelector((state) => state.AUTH_TOKEN.token)
  const getUserProfile = async() =>{
    await fetch(profileUrl, {
      method: 'GET',
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Token ${cookie}`
      },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("the cookie sent", cookie);
      console.log("got this",data);
      console.log(data.first_name)
      setFirstName(data.first_name);
      setLastName(data.last_name)
      setFullName(firstName + " " + lastName);
      setUser_id(data.id)
    })
    .catch((error) => console.log(error))
    
  }
  
  
  getUserProfile();
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

        <div className='container-fluid'>
          <div className='profile-page-container'>
            <img id='profile-img' src={require('../images/sam_pic.png')}></img>
            <div className="profile-name-img">
              <div className='top-profile-design'>
                
              </div>
              <div className="profile-name-id">
                <p id='profile-name'>{fullName}</p>
                <p id='profile-id'>{user_id}</p>
              </div>
              <div className='profile-edit'>
                <button className='btn btn-dark' id='edit-profile'>Edit Profile</button>
                <button className='btn btn-dark' id='change-profile-img'>Change Avatar</button>
              </div>
            </div>
            
            <div className='task-show'>
              <p>Your tasks</p>
              <p>You currently have no assigned tasks</p>
            </div>
          </div>
            
        </div>

    </HelmetProvider>
  )
}

const WrappedProfile = RequireAuthentication(Profile)
export default WrappedProfile