import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import { HelmetProvider } from 'react-helmet-async'

import RequireAuthentication from '../components/RequireAuthentication'

import { useSelector } from 'react-redux'

import "../styles/css/profile.css"

import EditProfile from '../components/EditProfile';

const Profile = () => {
  const profileUrl = "http://127.0.0.1:8000/api/return_user"

  const [username, setUsername] = useState('');
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
      setUsername(data.username)
      setFirstName(data.first_name);
      setLastName(data.last_name)
      setFullName(firstName + " " + lastName);
      setUser_id(data.id)
    })
    .catch((error) => console.log(error))
    
  }

  var editProfile = (open) =>{
    
    if (open == "open"){
      console.log("edit profile should show")
      profile_edit_placeholder = (
        <div>
          <EditProfile username = {username} first_name = {firstName} last_name = {lastName} full_name = {fullName} />
        </div>
        )
      return profile_edit_placeholder;
    }
    else{
      profile_edit_placeholder = "lol"
    }
  }

  var profile_edit_placeholder = editProfile("open");

  // For accordion
  var accordion_section = document.querySelectorAll(".accordion-section");

  accordion_section.forEach(eachaccordion =>  {
    var get_eachaccordion = eachaccordion.querySelector(".accordion-header")
    get_eachaccordion.addEventListener("click", () => {
      console.log("Clicked")
      eachaccordion.classList.toggle("is-open");
      var accordion_content = eachaccordion.querySelector(".accordion-content")
      if (eachaccordion.classList.contains("is-open")){
        //accordion_content.style.height = `${accordion_content.scrollHeight}px`;
        accordion_content.style.height = "4px"
        eachaccordion.querySelector("i").classList.replace("fa-plus", "fa-minus")
      }
      else{
        accordion_content.style.height = "0"
        eachaccordion.querySelector("i").classList.replace("fa-plus", "fa-minus")

      }
    })
  })
  

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
                <button className='btn btn-dark' id='edit-profile' onClick={profile_edit_placeholder}>Edit Profile</button>
                <button className='btn btn-dark' id='change-profile-img'>Change Avatar</button>
              </div>
            </div>
            
            <div className='task-show'>
              <p>Your tasks</p>
              <div className='accordion bg-primary'>
                
                <div className='accordion-section bg-danger'>
                  <header className='accordion-header'>
                    <p>Accordion Header</p>
                    <span><i className='fa fa-plus'></i></span>
                  </header>
                  <section className='accordion-content'>
                    <p>Accordion Contentj pjjjjjjj j pj jj j  ijjpppppppppp jjjjjjjjjjjjjjj  ijjjjjjjjjjjj jjjjjjjdndd djdjddddddddd dkdjjd  e0w0ie0eu2 0e0eu2 e30e du30d3 d0ju dw d0wddj0jd3d 30j30eojcoeje eojeode d ed0edejf e ejfef ejjjjj</p>
                  </section>
                </div>

                <div className='accordion-section bg-info'>
                  <header className='accordion-header'>
                    <p>Accordion Header</p>
                    <span><i className='fa fa-plus'></i></span>
                  </header>
                  <section className='accordion-content'>
                    <p>Accordion Content</p>
                  </section>
                </div>
              </div>
            </div>
          </div>
            
        </div>

    </HelmetProvider>
  )
}

const WrappedProfile = RequireAuthentication(Profile)
export default WrappedProfile