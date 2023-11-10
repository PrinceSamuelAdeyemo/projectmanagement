import React, { useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import '../styles/css/activities.css';

//import '../components/NavbarAnonymous';
import Board from '../components/Board';



const Boards = () => {
    const [boards, setBoards] = useState([
        {
            "boardName": "Package",
            "boardDescription": "Sets targets and objectives and actively works towards them, whilst raising the quality of your outcomes.",
            "boardBgColor": "red",
            "boardID": 1,
        },
        
        {
            "boardName": "Deals App",
            "boardDescription": "Goes out of their way to help the physical, mental, or emotional pains of another and themselves.",
            "boardBgColor": "orange",
            "boardID": 2,
        },
    
        {
            "boardName": "Brochure products",
            "boardDescription": "Conscious and aware of their own character, feelings and behaviour.",
            "boardBgColor": "red",
            "boardID": 3,
        },
    
        {
            "boardName": "Static printing",
            "boardDescription": "Do what they and say what they do. They bring their whole self to work.",
            "boardBgColor": "violet",
            "boardID": 4,
        },
    
        {
            "boardName": "Article",
            "boardDescription": "Accept and crave responsibility; owns their actions and commit to getting things done.",
            "boardBgColor": "indigo",
            "boardID": "10c37205-2870-48ab-8eb2-b29b9f5cb7f24",
        },
    
        {
            "boardName": "Deals App",
            "boardDescription": "Goes out of their way to help the physical, mental, or emotional pains of another and themselves.",
            "boardBgColor": "green",
            "boardID": 6,
        },
    ]);
    
    /*
    const [boards, setBoards] = [
        {
            "boardName": "Package",
            "boardDescription": "Sets targets and objectives and actively works towards them, whilst raising the quality of your outcomes.",
            "board_BgColor": "blue",
            "boardID": 1,
        },
        
        {
            "boardName": "Deals App",
            "boardDescription": "Goes out of their way to help the physical, mental, or emotional pains of another and themselves.",
            "board_BgColor": "blue",
            "boardID": 2,
        },

        {
            "boardName": "Brochure products",
            "boardDescription": "Conscious and aware of their own character, feelings and behaviour.",
            "board_BgColor": "blue",
            "boardID": 3,
        },

        {
            "boardName": "Static printing",
            "boardDescription": "Do what they and say what they do. They bring their whole self to work.",
            "board_BgColor": "blue",
            "boardID": 4,
        },

        {
            "boardName": "Article",
            "boardDescription": "Accept and crave responsibility; owns their actions and commit to getting things done.",
            "board_BgColor": "blue",
            "boardID": 5,
        },

        {
            "boardName": "Deals App",
            "boardDescription": "Goes out of their way to help the physical, mental, or emotional pains of another and themselves.",
            "board_BgColor": "blue",
            "boardID": 6,
        },
    ];
    */
   
    let openBoard = () =>{
        console.log(this);
    }


  return (
    <HelmetProvider>
        <Helmet>
            <meta charset="UTF-8" />
            <meta name="author" content="Samuel Adeyemo" />
            <meta name="application-name" content="My todo app" />
            <meta name="description" content="A simple to do app" />
            <meta name="keywords" content="todo, app, Simple, task management program" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            
            
            <title></title>
        </Helmet>

        <div className="container-fluid p-0">
            
            {/* {% include 'navbar-all.html' %} */}

            <div className="container-body">
                <div className="project-n-search w-100">
                    
                    <div className="row px-5 w-100">
                        <div className="col-6">
                            <h3 className="d-md-inline fw-bold" id="totalproject-count">Projects ({boards.length})</h3>
                        </div>
                        <div className=" col-6">
                            <input type="search" className="search_board mt-2 float-end" placeholder='Search Board...' />
                        </div>
                        
                    </div>
                    
                    
                </div>
                <div className="projects-and-boards">
                    <div className="project">
                        <div className="project-boards ">

                            {boards.map((board) => (
                                <Board key={`${board.boardID}`} boardID={board.boardID} boardName={board.boardName} boardDescription={board.boardDescription} boardBgColor={board.boardBgColor} />
                            ))}


                            <div className="board">
                                <div className="board-button-div text-center">             
                                    <button className="btn btn-primary" id="create-board">Create a board</button>
                                </div>
                            </div>
                            
                        </div>  
                        {/*<!--  
                        <div className="d-inline">
                            <button className="btn btn-primary" id="create-board">Create a board</button>
                        </div>
                    -->*/}
                    </div>



                </div>

                
                
                
            </div>
        </div>

    </HelmetProvider>
  )
}

export default Boards