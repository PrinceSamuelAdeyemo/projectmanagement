import React, {useState, useEffect, useMemo} from 'react';
import { Helmet } from 'react-helmet';
import { HelmetProvider } from 'react-helmet-async'

import RequireAuthentication from '../components/RequireAuthentication'

import Accordion from "../components/Accordion"

import { useSelector } from 'react-redux'

import "../styles/css/profile.css"

import EditProfile from '../components/EditProfile';

const host = 'ws://127.0.0.1:8000/ws'
const Profile = () => {
  const profileUrl = "http://127.0.0.1:8000/api/return_user";
  const allBoard_contents = new WebSocket(`${host}/all_board_contents_user`);

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('')
  const [user_id, setUser_id] = useState('')
  
  const [accordionOpen, setAccordioOpen] = useState(false);
  
  const [accordionStuffs, setAccordionStuffs] = useState({})
  const [editProfileOpen, SetEditProfileOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState("");

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
      setUsername(data.username)
      setFirstName(data.first_name)
      setLastName(data.last_name)
      
      setUser_id(data.id)
    })
    .catch((error) => console.log(error))
    
  }

  var aboutEditProfile = () => {
    setScrollPosition(window.scrollY || window.pageYOffset);
    console.log(scrollPosition)
  }
  var editProfile = () =>{
    setScrollPosition(window.scrollY || window.pageYOffset);
    console.log("Scroll position: ", scrollPosition);
    if (editProfileOpen === true){
      document.body.style.overflow = "auto";
      
      SetEditProfileOpen(false);
    }
    else{
      document.body.style.overflow = "hidden";
     // var show_editProfile = document.getElementById("showeditprofile");
      ///show_editProfile.style.top = scrollPosition+"px"
      SetEditProfileOpen(true);
    }
  }

  var requestAllBoardDetails = () =>{
    allBoard_contents.send(JSON.stringify({
      "user": cookie,
    }))
  }
  
  const boardsListMemo = useMemo(() => {
    allBoard_contents.onmessage = async (event) => {
      var message = JSON.parse(event.data);
      setAccordionStuffs(message)
    }

    return allBoard_contents.onmessage;
  }, [accordionStuffs])
  
  useEffect(() => {
    getUserProfile();
    if (allBoard_contents.readyState === WebSocket.OPEN){
      requestAllBoardDetails();
    }else{
      allBoard_contents.onopen = (event) => {
        requestAllBoardDetails();
      }
    }
    return () => {
    }

  }, boardsListMemo)

  useEffect(() => {
    setFullName(firstName + " " + lastName);
  }, [firstName, lastName])

  
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
            {/*<img id='profile-img' src={require('../images/sam_pic.png')} alt=''></img>*/}
            <div className="profile-name-img">
              <div className='top-profile-design' >
                <img id='profile-img' src={require('../images/sam_pic.png')} alt=''></img>
              </div>
              
                
                <EditProfile username = {username} first_name = {firstName} last_name = {lastName} full_name = {fullName} visibility={editProfileOpen} editMyProfile={editProfile} scrollPosition={scrollPosition} />
              

              <div className="profile-name-id">
                <p id='profile-name'>{fullName}</p>
                <p id='profile-id'>{user_id}</p>
              </div>
              <div className='profile-edit'>
                <button className='btn btn-dark' id='edit-profile' onMouseOver={aboutEditProfile} onClick={editProfile}>Edit Profile</button>
                <button className='btn btn-dark' id='change-profile-img'>Change Avatar</button>
              </div>
            </div>
            
            <div className='task-show'>
              <p>Your tasks</p>
              <div className='accordion'>
                {Object.keys(accordionStuffs).map((accordion_stuff, index) => (
                  <Accordion key={index} order = {`passed_id${index}`} accordion_header={accordion_stuff} accordion_content={Object.entries(accordionStuffs[accordion_stuff])} accordion_tasks = {Object.values(accordionStuffs[accordion_stuff])} />
                ))}

              </div>
            </div>
          </div>
            
        </div>

    </HelmetProvider>
  )
}

const WrappedProfile = RequireAuthentication(Profile)
export default WrappedProfile