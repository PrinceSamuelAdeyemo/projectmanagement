import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getToken, addByToken, removeByToken } from '../redux/features/userAuthSliceReducer/userAuthSlice';
import { getStatus, setStatus, userAuthenticated } from '../redux/features/userAuthSliceReducer/userStatusSlice';

import Login from '../pages/Login';
import { render } from 'react-dom';
import NavbarActive from './NavbarActive';
import NavbarAnonymous from './NavbarAnonymous';

const RequireAuthentication = (Component) => {
    const ComponenentRenderer = (props) => {

      //const authenticate = useSelector((state) => state)
      const dispatch = useDispatch();
      const is_authenticated = useSelector((state) => state.USER_STATUS.status)
      console.log(is_authenticated);
      //let userAuthenticate = useSelector(userAuthenticated)
      //console.log("User auth", userAuthenticate)
      
      // May not be needed
      let username = "Personal";
      let host = 'ws://127.0.0.1:8000/ws';
      let COOKIE_NAME, COOKIE_VALUE, COOKIE_EXPIRES, COOKIE_PATH;
      COOKIE_NAME = 'user_auth_cookie';
      //COOKIE_VALUE = getUserToken;
      COOKIE_EXPIRES = (new Date(Date.now + 604800000)).toUTCString;
      COOKIE_PATH = '/cookie/user_auth_cookie';
      //

      const [isAuthenticated, SetIsAuthenticated] = useState(false);
      // Function to check if cookies are enabled.
      if (navigator.cookieEnabled == true){
        
      } else{
        console.log("Cookies not enabled.")
      }
      // This is the function to get/read cookies
      const readCookie = () =>{
        if (document.cookie.includes("user_auth_cookie")) {
          let starting_position = document.cookie.indexOf("user_auth_cookie=") + 17; // plus 17 is the index of "=" in "user_auth_cookies="
          var derived_cookie = ''
          for (let i = starting_position; i < (starting_position + 64); i++){
            derived_cookie += document.cookie[i];
          }
          SetIsAuthenticated(true);
          dispatch(setStatus(true));
          
          return derived_cookie;
        }
        else{
          console.log("Authentication cookie not found!")
        }
      }
    
      
      /*
      const requestUserStatus = (event) => {
        const socket = new WebSocket(`${host}/auth_token`);
        socket.onopen = ((event) => {
          socket.send(JSON.stringify({
            "user_auth": {
              "username": username,
              //"token": token,
            }
          }))
          socket.onmessage = (event) => {
            /*
            if (event.origin === (`${host}/auth_token`) && event.data === "auth_token"){

            };
            *
           console.log("Socket response", event.origin, event.data)
          };
        })

        //console.log("SOCKET SENT")
      }
      */

      var userStatus = async() =>{
        await fetch('http://127.0.0.1:8000/api/userstatus', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${readCookie()}`
          },
          //credentials: 'include',
          //mode: 'cors'
        })
        .then((response) => response.json())
        .then(data => {
        })
        .catch(error =>{
          console.log(error)
        });
      }

      
      useEffect(() =>{
        //requestUserStatus();
        console.log("Parent oo")
        userStatus();
        //console.log({"YOUR TOKEN": getUserToken})
        //console.log({"Hey": getToken()})
      });
      
      
      var renderedComponent = (isAuthenticated) =>{
        if (isAuthenticated == true){
          return (
          <div>
            <NavbarActive />
            <Component {...props} />
          </div>  
          )
        } else{
            return (
            <div>
              <NavbarAnonymous />
              <p>Please login to continue</p>
              <Login />
            </div>)
        }
      } 
      
      return (
        <div>
        {renderedComponent(isAuthenticated)}
        </div>
        
      )
      

  }

  return React.memo(ComponenentRenderer);
}

export default RequireAuthentication;