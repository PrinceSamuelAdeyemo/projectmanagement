import { TimeToLeaveRounded } from '@material-ui/icons';
import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getToken, addByToken, removeByToken } from '../redux/features/userAuthSliceReducer/userAuthSlice';

import Login from '../pages/Login';
import { render } from 'react-dom';

const RequireAuthentication = (Component) => {
    const RequireAuthentication = (props) => {
      // May not be needed
      let username = "Personal";
      let host = 'ws://127.0.0.1:8000/ws'
      let COOKIE_NAME, COOKIE_VALUE, COOKIE_EXPIRES, COOKIE_PATH;
      COOKIE_NAME = 'user_auth_cookie';
      //COOKIE_VALUE = getUserToken;
      COOKIE_EXPIRES = (new Date(Date.now + 604800000)).toUTCString;
      COOKIE_PATH = '/cookie/user_auth_cookie'
      ///

      const [isAuthenticated, SetIsAuthenticated] = useState(false);
      // Function to check if cookies are enabled
      if (navigator.cookieEnabled == true){
        console.log("Cookies enabled")
        console.log(document.cookie)
        
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
          return derived_cookie;
      }
      else{
        console.log("Authentication cookie not found!")
      }
    }
      //const authenticate = useSelector((state) => state)
      const dispatch = useDispatch();
      
      //useCallback(() => {dispatch({type: addByToken("123456")})})
      let getUserToken = useSelector((state) => state.AUTH_TOKEN.token)
      
      //if (document.cookie)
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
            console.log({"Your data": data});
        })
        .catch(error =>{
          console.log(error)
        });
      }

      
      useEffect(() =>{
        //dispatch({type: addByToken("6789")})
        //readCookie()
        //requestUserStatus();
        //console.log("About to initiate fetch")
        userStatus();
        //console.log("Initiated")
        //console.log({"YOUR TOKEN": getUserToken})
        //console.log({"Hey": getToken()})
      }, []);
      let mytoken = () =>{
        dispatch(addByToken('70'))
      }
      var renderedComponent = (isAuthenticated) =>{
        if (isAuthenticated == true){
          return <Component {...props} />
        } else{
          return (
          <div>
            <p>"Please login to continue"</p>
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

  return RequireAuthentication;
}

export default RequireAuthentication;