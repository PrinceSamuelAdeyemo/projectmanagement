import React from 'react'

const CreateBoard = () => {
  return (
    <div>
        <p>Board Name</p>
        <input name='boardName' type='text' />

        <p>Board Description</p>
        <input name='boardName' type='text' />

        <button className='btn btn-default'>+ Create Board</button>
    </div>
  )
}

export default CreateBoard