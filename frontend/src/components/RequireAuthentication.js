import React, { useEffect } from 'react';
//import { useSelector, useDispatch } from 'react-redux';
//import { viewToken,addByToken, removeByToken } from '../redux/features/authentication/authenticationReducer';

const RequireAuthentication = (Component) => {
    const RequireAuthentication = (props) => {
      //const authenticate = useSelector((state) => state.token.value)
      //const dispatch = useDispatch();

      let username = "Personal";
      let token = "c6f334cb569cf956fc76d3f6ddaa0cb354fb4072b0be7c147d150bec7f4582bb8e712fecf3368a8ce7a8865283a6a9a6b93c48b5684a2c7879fa5a22ac4a1dd1"
      let host = 'ws://127.0.0.1:8000/ws'
      const requestUserStatus = (event) => {
        const socket = new WebSocket(`${host}/auth_token`);
        socket.onopen((event) => {
          socket.send(JSON.stringify({
            "user_auth": {
              "username": username,
              "token": token,
            }
          }))
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
        requestUserStatus();
        console.log("About to initiate fetch")
        userStatus();
        console.log("Initiated")
      }, []);
   
      return <Component {...props} />
  }

  return RequireAuthentication;
}

export default RequireAuthentication;