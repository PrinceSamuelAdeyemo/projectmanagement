import React from 'react'
import '../styles/css/404.css'

const Error = () => {
  return (
    <div className='parent404div'>
      <div className='child404div'>
        <h1>Sorry! Page not found</h1>
        <p>Head homepage or use the search to find what you're looking for.</p>
        <button className='btn btn-info'>Back to Homepage</button>
      </div>
    </div>
  )
}

export default Error;