import React, {useState, useEffect} from 'react';
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
  
  const [accordionStuffs, setAccordionStuffs] = useState({
    "Header1": "Content1",
    "Header2": "Content2",
    "Header3": "Content3",
    "Header4": "Content4",
    "Header5": "Content5"
                                                          })


/*
const [accordionStuffs, setAccordionStuffs] = useState([
  {"Header1": "Content1"},
  {"Header2": "Content2"},
  {"Header3": "Content3"},
  {"Header4": "Content4"},
  {"Header5": "Content5"} ])
*/
/*
const [accordionStuffs, setAccordionStuffs] = useState([
  {"Header": "Content1",
  "Header": "Content2",
  "Header": "Content3",
  "Header": "Content4",
  "Header": "Content5"} ])
*/
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
      setFirstName(data.first_name)
      setLastName(data.last_name)
      setFullName(firstName + " " + lastName);
      setUser_id(data.id)
    })
    .catch((error) => console.log(error))
    
  }

  var editProfile = (open) =>{
    
    if (open === "open"){
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
  /*
  var accordion_section = document.querySelectorAll(".accordion-section");
  //console.log(accordion_section.length)
  accordion_section.forEach(eachaccordion =>  {
    var eachaccordion_header = eachaccordion.querySelector(".accordion-header")
    eachaccordion_header.addEventListener("click", () => {
      //eachaccordion.classList.toggle("is-open");
      var accordion_content = eachaccordion.querySelector(".accordion-content")
      //var accordion_content = eachaccordion.getElementsByClassName("accordion-content");
      if ((accordion_content.style.display === "block")){
        //eachaccordion.classList.toggle("is-open");
        //accordion_section.forEach(item => item.classList.toggle("is-open"))
        //accordion_content.style.height = `${accordion_content.scrollHeight}px`;
        //accordion_content.style.height="10rem"
        console.log("formerly block, should be none now", accordion_content.style.display)
        console.log(accordion_content)
        eachaccordion.querySelector("i").classList.replace("fa-minus", "fa-plus");
        accordion_content.style.display = "none";
        
      }
      else{
        //accordion_content.style.height = "2rem"
        //accordion_section.forEach(item => item.classList.toggle("is-open"))
        console.log("formely none, should be block now", accordion_content.style.display)
        eachaccordion.querySelector("i").classList.replace("fa-plus", "fa-minus");
        accordion_content.style.display = "block";
      }
    })
  })
  */

  /*
  //var accordion_section = document.getElementsByClassName("accordion-section")
  var accordion_section = document.querySelectorAll(".accordion-section");
  for (var each_section = 0; each_section < accordion_section.length; each_section++){
    accordion_section[each_section].addEventListener("click", () => {
      this.classList.toggle("active");
      var accordion_content = each_section.querySelector(".accordion-content");
      if (accordion_content.style.display === "block"){
        accordion_content.style.display = "none"
      }else{
        accordion_content.style.display = "block"
      }
    })
  }
*/

  var requestAllBoardDetails = () =>{
    console.log("kkkkkk", cookie)
    allBoard_contents.send(JSON.stringify({
      "user": cookie,
    }))
  }

  
useEffect(() => {
  getUserProfile();
  if (allBoard_contents.readyState === WebSocket.OPEN){
    console.log("yyyyyyyyyyyyyyyyy\nyyyyyyyyyyyy\nyyyyyyyyyyyyy")
    requestAllBoardDetails();
  }else{
    allBoard_contents.onopen = (event) => {
      console.log("Had to open")
      requestAllBoardDetails();
    }
  }

  return () => {
    console.log("Cleanup the first useEffect")
  }
})

useEffect(() => {
  console.log("Second useEffect")
  
})

//

  
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
            <img id='profile-img' src={require('../images/sam_pic.png')} alt=''></img>
            <div className="profile-name-img">
              <div className='top-profile-design'>
                
              </div>
              <div className="profile-name-id">
                <p id='profile-name'>{fullName}</p>
                <p id='profile-id'>{user_id}</p>
              </div>
              <div className='profile-edit'>
                <button className='btn btn-dark' id='edit-profile' onClick={() => editProfile("open")}>Edit Profile</button>
                <button className='btn btn-dark' id='change-profile-img'>Change Avatar</button>
              </div>
            </div>
            
            <div className='task-show'>
              <p>Your tasks</p>
              <div className='accordion'>
                {Object.keys(accordionStuffs).map((accordion_stuff, index) => (
                  <Accordion key={index} order = {`passed_id${index}`} accordion_header={accordion_stuff} accordion_content={accordionStuffs[accordion_stuff]} />
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