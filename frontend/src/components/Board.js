import React, { useEffect, useState } from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

// Styling
import '../styles/css/board.css';
import '../styles/css/activities.css';
import WrappedBoardInfo from '../pages/WrappedBoardInfo';




const Board = ({ boardID,  boardName, boardDescription, boardBgColor }) => {
    const navigate = useNavigate();

    const colors = {
        "red": [255, 0, 0],
        "orange": [255, 165, 0],
        "yellow": [255, 255, 0],
        "green": [0, 128, 0],
        "blue": [0, 0, 255],
        "indigo": [75, 0, 130],
        "violet": [238, 130, 238]
    }

    //let rgb = colors[boardBgColor].join(',')
    let backgroundOptions = {background: `linear-gradient(to bottom, rgba((255,0,0,) 0.7), #ffffff 80%), \
    linear-gradient(to bottom, rgba((255,0,0), 1), #ffffff 85%)`, 
                            backgroundClip: 'padding-box, border-box', 
                            backgroundOrigin: 'padding-box, border-box' }
    
    const openBoard = (company, boardID) => {
        boardID = `/board/tesla/a79544b2-5ae9-4f40-8bdb-e0fbdfecf4f}`
        window.history.scrollRestoration = 'manual'
        //<Link to="2" />
        navigate(`/board/${company}/${boardID}`);
        //return <WrappedBoardInfo />
        //navigate(`/board/tesla/4`);
    }
    

    useEffect(() => {
        
    });

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
                        <Link className="btn board-openbutton me-2" to={`/board/tesla/${boardID}`}>Open Board</Link>
                        <button className="btn board-editbutton">Edit</button>
                    </div>
                </div>
            </div>
        
  )
}

export default Board