import React, { useEffect, useState } from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async';

// Styling
import '../styles/css/board.css';
import '../styles/css/activities.css';




const Board = ({ boardName, boardDescription }) => {
  return (
            <div className="board">
                <div className="board-insight">
                    <div className="button-x-deletediv">
                        <button className="btn float-end button-x-delete">X</button>
                    </div>
                    
                    <div className="board-details">
                        <div>
                            <p>{boardName}</p>
                            <p>{boardDescription}</p>
                            
                        </div>
                        
                    </div>
                    <div className="p-1 text-center px-2 board-buttons">
                        <button className="btn board-openbutton me-2" >Open Board</button>
                        <button className="btn board-editbutton">Edit</button>
                    </div>
                </div>
            </div>
        
  )
}

export default Board