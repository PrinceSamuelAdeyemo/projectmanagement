import React from 'react';
import { useSelector } from 'react-redux';

import "../styles/css/editprofile.css"

const EditProfile = (props) => {
    var username = props.username;
    var first_name = props.first_name;
    var last_name = props.last_name;
    var full_name = props.full_name;

    var visibility = props.visibility;
    var editProfile = props.editMyProfile;
    var scrollPosition = props.scrollPosition;

    var token = useSelector((state) => state.AUTH_TOKEN.token);

    const changeProfileDetails = async (event) => {
        event.preventDefault();
        await fetch(("http://127.0.0.1:8000/api/"), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        })
    }

    
    const displayEditProfile = {
        //top: "50%",
        top : `${scrollPosition}px`,
        left: "50%",
        transform: "translate(-20%, 20%)",
        display: visibility? "block": "none",
        height: "100%",
        backgroundColor: "brown",
        //position: visibility? "absolute": "unset",
        //top: visibility? "20rem": 0,
        //"z-index": visibility ? "2": -1
    }

  return (

        
        <div className='editprofile-container' id='editprofile-container' style={displayEditProfile}>
            <form className='editprofile-form' onSubmit={(event) => changeProfileDetails} encType='utf-8'>
                <button type='button' onClick={editProfile}>X</button>
                <p className='w-100'>Edit Profile</p>
                <div className='form-group'>
                    <label for="full_name">Name</label>
                    <input className='w-100' id='full_name' value={full_name}></input>
                </div>
                <div className='form-group'>
                    <label className='form-label' for="login_username">Login (Username)</label>
                    <input className='w-100' id='login_username' value={username}></input>
                </div>
                <div>
                    <label for="password">Password</label>
                    <input className='w-100' id='password'></input>
                </div>
                <div className='form-group text-center'>
                    <button type='submit'>Accept changes</button>
                </div>
                
            </form>
        </div>
    
    
  )
}

export default EditProfile