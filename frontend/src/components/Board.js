import React, { useEffect, useState } from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async';

// Styling
import '../styles/css/board.css';
import '../styles/css/activities.css';




const Board = ({ boardName, boardDescription, boardBgColor }) => {
    const colors = {
        "red": [255, 0, 0],
        "orange": [255, 165, 0],
        "yellow": [255, 255, 0],
        "green": [0, 128, 0],
        "blue": [0, 0, 255],
        "indigo": [75, 0, 130],
        "violet": [238, 130, 238]
    }

    let rgb = colors[boardBgColor].join(',')
    let backgroundOptions = {background: `linear-gradient(to bottom, rgba(${rgb}, 0.7), #ffffff 80%), \
    linear-gradient(to bottom, rgba(${rgb}, 1), #ffffff 85%)`, 
                            backgroundClip: 'padding-box, border-box', 
                            backgroundOrigin: 'padding-box, border-box' }
    
    

    useEffect(() => {
        let getBgColor = document.getElementsByClassName('board-insight');
        let getBgColorArray = Array.from(getBgColor);
        
    }, []);

  return (
            <div className="board">
                <div className="board-insight" style={backgroundOptions} >
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