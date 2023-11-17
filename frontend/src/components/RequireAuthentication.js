import { TimeToLeaveRounded } from '@material-ui/icons';
import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getToken, addByToken, removeByToken } from '../redux/features/userAuthSliceReducer/userAuthSlice';

const RequireAuthentication = (Component) => {
    const RequireAuthentication = (props) => {
      //const authenticate = useSelector((state) => state)
      const dispatch = useDispatch();
      
      //useCallback(() => {dispatch({type: addByToken("123456")})})
      
      
      let getUserToken = useSelector((state) => state.AUTH_TOKEN.token)
    
    console.log("Here is it", getUserToken)
    
      let username = "Personal";
      let token = "c6f334cb569cf956fc76d3f6ddaa0cb354fb4072b0be7c147d150bec7f4582bb8e712fecf3368a8ce7a8865283a6a9a6b93c48b5684a2c7879fa5a22ac4a1dd1"
      let host = 'ws://127.0.0.1:8000/ws'
      let COOKIE_NAME, COOKIE_VALUE, COOKIE_EXPIRES, COOKIE_PATH;
      COOKIE_NAME = 'user_auth_cookie';
      COOKIE_VALUE = getUserToken;
      COOKIE_EXPIRES = (new Date(Date.now + 604800000)).toUTCString;
      COOKIE_PATH = '/cookie/user_auth_cookie'
      //document.cookie = `${COOKIE_NAME} = ${COOKIE_VALUE}; COOKIE_EXPIRES = ${COOKIE_EXPIRES}; COOKIE_PATH = ${COOKIE_PATH}`
      console.log(document.cookie)
      const requestUserStatus = (event) => {
        const socket = new WebSocket(`${host}/auth_token`);
        socket.onopen = ((event) => {
          socket.send(JSON.stringify({
            "user_auth": {
              "username": username,
              "token": token,
            }
          }))
          socket.onmessage = (event) => {
            /*
            if (event.origin === (`${host}/auth_token`) && event.data === "auth_token"){

            };
            */
           console.log("Socket response", event.origin, event.data)
          };
        })

        console.log("SOCKET SENT")
      }
      

      let userStatus = async() =>{
        await fetch('http://127.0.0.1:8000/api/userstatus', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Token ${token}`
          },
          //credentials: 'include',
          //mode: 'cors'
          
        })
        .then((response) => response.json())
        .then(data => {
            console.log({"data": data});
        })
        .catch(error =>{
          console.log(error)
        });
      }
      useEffect(() =>{
        //dispatch({type: addByToken("6789")})
        
        requestUserStatus();
        //console.log("About to initiate fetch")
        //userStatus();
        //console.log("Initiated")
        //console.log({"YOUR TOKEN": getUserToken})
        //console.log({"Hey": getToken()})
      }, []);
      let mytoken = () =>{
        dispatch(addByToken('70'))
      }

      console.log("Take", getUserToken)

   
      return (
        <div>
          <p>Hello</p>
          <button onClick={mytoken}>press</button>
          <p>{getUserToken}</p>

          <p>World</p>
          <Component {...props} />
        </div>
        
      )
      

  }

  return RequireAuthentication;
}

export default RequireAuthentication;