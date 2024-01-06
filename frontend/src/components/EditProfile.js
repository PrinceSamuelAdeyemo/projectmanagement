import React from 'react'

import "../styles/css/editprofile.css"

const EditProfile = () => {
  return (
    <div className='editprofile-container' id='editprofile-container'>
        <form className='editprofile-form' method='POST' encType='utf-8' role='form'>
            <button>X</button>
            <p className='w-100'>Edit Profile</p>
            <div className='form-group'>
                <label for="full_name">Name</label>
                <input className='w-100' id='full_name'></input>
            </div>
            <div className='form-group'>
                <label className='form-label' for="login_username">Login (Username)</label>
                <input className='w-100' id='login_username'></input>
            </div>
            <div>
                <label for="password">Password</label>
                <input className='w-100' id='password'></input>
            </div>
            <div className='form-group text-center'>
                <button>Accept changes</button>
            </div>
            
        </form>
    </div>
  )
}

export default EditProfile