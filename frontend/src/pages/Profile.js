import React from 'react'
import { Helmet } from 'react-helmet'
import { HelmetProvider } from 'react-helmet-async'

import RequireAuthentication from '../components/RequireAuthentication'

import "../styles/css/profile.css"

const Profile = () => {

  
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
                <p id='profile-name'>Samuel Adeyemo</p>
                <p id='profile-id'>Id goes here</p>
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