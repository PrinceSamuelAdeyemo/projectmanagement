import React from 'react';
import Homepage from './Homepage';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/css/404.css';

const Error = () => {
  const navigate = useNavigate();
    const openPage = (page) =>{
        navigate(`/${page}`);
    };


  return (
    <div className='parent404div'>
      <div className='child404div'>
        <h1>Sorry! Page not found</h1>
        <p>Head homepage or use the search to find what you're looking for.</p>
        <button className='btn btn-info' onClick={() => openPage('')}>Back to Homepage</button>
      </div>
    </div>
  )
}

export default Error;