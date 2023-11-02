import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import '../styles/css/activities.css';

//import '../components/NavbarAnonymous';
import Board from '../components/Board';

const Boards = () => {
    

    const [boards, setBoards] = [
        {
            "boardTitle": "Package",
            "boardDescription": "Sets targets and objectives and actively works towards them, whilst raising the quality of your outcomes.",
            "board_BgColor": "blue",
        },
        
        {
            "boardTitle": "Deals App",
            "boardDescription": "Goes out of their way to help the physical, mental, or emotional pains of another and themselves.",
            "board_BgColor": "blue",
        },

        {
            "boardTitle": "Brochure products",
            "boardDescription": "Conscious and aware of their own character, feelings and behaviour.",
            "board_BgColor": "blue",
        },

        {
            "boardTitle": "Static printing",
            "boardDescription": "Do what they and say what they do. They bring their whole self to work.",
            "board_BgColor": "blue",
        },

        {
            "boardTitle": "Article",
            "boardDescription": "Accept and crave responsibility; owns their actions and commit to getting things done.",
            "board_BgColor": "blue",
        },

        {
            "boardTitle": "Deals App",
            "boardDescription": "Goes out of their way to help the physical, mental, or emotional pains of another and themselves.",
            "board_BgColor": "blue",
        },
    ];

    let openBoard = () =>{
        console.log(this);
    }

    let boardLists = () => {
        //let allBoards = 
    };

  return (
    <HelmetProvider>
        <Helmet>
            <meta charset="UTF-8" />
            <meta name="author" content="Samuel Adeyemo" />
            <meta name="application-name" content="My todo app" />
            <meta name="description" content="A simple to do app" />
            <meta name="keywords" content="todo, app, Simple, task management program" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            
            
            {/*<script src="{% static 'assets/js/jquery.js'%} "/>
            <script src="{% static 'assets/js/activity.js'%} "></script>*/}

            <title></title>
        </Helmet>

        <div class="container-fluid p-0">
            
            {/* {% include 'navbar-all.html' %} */}

            <div class="container-body">
                <div class="project-n-search w-100">
                    
                    <div class="row px-5 w-100">
                        <div class="col-6">
                            <h3 class="d-md-inline fw-bold" id="totalproject-count">Projects (5)</h3>
                        </div>
                        <div class=" col-6">
                            <input type="search" class="search_board mt-2 float-end" placeholder='Search Board...' />
                        </div>
                        
                    </div>
                    
                    
                </div>
                <div class="projects-and-boards">
                    <div class="project">
                        <div class="project-boards ">

                            {boards.map((board) => (
                                <Board board={board} />
                            ))}

                            <div className="board">
                                <div className="board-insight">
                                    <div className="button-x-deletediv">
                                        <button className="btn float-end button-x-delete">X</button>
                                    </div>
                                    
                                    <div className="board-details">
                                        <div>
                                            <p>name</p>
                                            <p>Description</p>
                                            
                                        </div>
                                        
                                    </div>
                                    <div className="p-1 text-center px-2 board-buttons">
                                        <button className="btn board-openbutton me-2" >Open Board</button>
                                        <button className="btn board-editbutton">Edit</button>
                                    </div>
                                </div>
                            </div>
                            <div className="board">
                                <div className="board-insight">
                                    <div className="button-x-deletediv">
                                        <button className="btn float-end button-x-delete">X</button>
                                    </div>
                                    
                                    <div className="board-details">
                                        <div>
                                            <p>name</p>
                                            <p>Description</p>
                                            
                                        </div>
                                        
                                    </div>
                                    <div className="p-1 text-center px-2 board-buttons">
                                        <button className="btn board-openbutton me-2" >Open Board</button>
                                        <button className="btn board-editbutton">Edit</button>
                                    </div>
                                </div>
                            </div>
                            <div className="board">
                                <div className="board-insight">
                                    <div className="button-x-deletediv">
                                        <button className="btn float-end button-x-delete">X</button>
                                    </div>
                                    
                                    <div className="board-details">
                                        <div>
                                            <p>name</p>
                                            <p>Description</p>
                                            
                                        </div>
                                        
                                    </div>
                                    <div className="p-1 text-center px-2 board-buttons">
                                        <button className="btn board-openbutton me-2" >Open Board</button>
                                        <button className="btn board-editbutton">Edit</button>
                                    </div>
                                </div>
                            </div>

                            <Board />

                            <div class="board">
                                <div class="board-button-div text-center">             
                                    <button class="btn btn-primary" id="create-board">Create a board</button>
                                </div>
                            </div>
                            
                        </div>  
                        {/*<!--  
                        <div class="d-inline">
                            <button class="btn btn-primary" id="create-board">Create a board</button>
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