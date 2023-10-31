import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import '../styles/css/activities.css';

import '../components/NavbarAnonymous'

const Boards = () => {
  return (
    <HelmetProvider>
        <Helmet>
            <meta charset="UTF-8" />
            <meta name="author" content="Samuel Adeyemo" />
            <meta name="application-name" content="My todo app" />
            <meta name="description" content="A simple to do app" />
            <meta name="keywords" content="todo, app, Simple, task management program" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            
            <script src="{% static 'assets/js/jquery.js'%} "></script>
            <script src="{% static 'assets/js/activity.js'%} "></script>

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
                        <div class="project-boards row row-cols-4 g-1">
                            <div class="board">
                                <div class="board-insight">
                                    <div class="button-x-deletediv">
                                        <button class="btn float-end button-x-delete">X</button>
                                    </div>
                                    
                                    <div class="board-details">
                                        <div>
                                            <p>Package</p>
                                            <p>Sets targets and objectives and actively works towards them, whilst raising the quality of your outcomes.</p>
                                        </div>
                                        
                                    </div>
                                    <div class="p-1 text-center px-2 board-buttons">
                                        <button class="btn board-openbutton me-2">Open Board</button>
                                        <button class="btn board-editbutton">Edit</button>
                                    </div>
                                </div>
                            </div>
                            <div class="board">
                                <div class="board-insight">
                                    <div class="button-x-deletediv">
                                        <button class="btn float-end button-x-delete">X</button>
                                    </div>
                                    
                                    <div class="board-details">
                                        <div>
                                            <p>Deals App</p>
                                            <p>Goes out of their way to help the physical, mental, or emotional pains of another and themselves.</p>
                                        </div>
                                        
                                    </div>
                                    <div class="p-1 text-center px-2 board-buttons">
                                        <button class="btn board-openbutton me-2">Open Board</button>
                                        <button class="btn board-editbutton">Edit</button>
                                    </div>
                                </div>
                            </div>
                            <div class="board">
                                <div class="board-insight">
                                    <div class="button-x-deletediv">
                                        <button class="btn float-end button-x-delete">X</button>
                                    </div>
                                    <div class="board-details">
                                        <div>
                                            <p>Brochure products</p>
                                            <p>Conscious and aware of their own character, feelings and behaviour.</p>
                                        </div>
                                        
                                    </div>
                                    <div class="p-1 text-center px-2 board-buttons">
                                        <button class="btn board-openbutton me-2">Open Board</button>
                                        <button class="btn board-editbutton">Edit</button>
                                    </div>
                                </div>
                            </div>
                            <div class="board">
                                <div class="board-insight">
                                    <div class="button-x-deletediv">
                                        <button class="btn float-end button-x-delete">X</button>
                                    </div>
                                    
                                    <div class="board-details">
                                        <div>
                                            <p>Static printing</p>
                                            <p>Do what they and say what they do. They bring their whole self to work.</p>
                                        </div>
                                        
                                    </div>
                                    <div class="p-1 text-center px-2 board-buttons">
                                        <button class="btn board-openbutton me-2">Open Board</button>
                                        <button class="btn board-editbutton">Edit</button>
                                    </div>
                                </div>
                            </div>
                            <div class="board">
                                <div class="board-insight">
                                    <div class="d-block mb-2 bg-primary w-100">
                                        <button class="btn float-end">X</button>
                                    </div>
                                    
                                    <div class="board-details p-3 pt-1">
                                        <p>Article</p>
                                        <p>Accept and crave responsibility; owns their actions and commit to getting things done.</p>
                                    </div>
                                    <div class="p-1 text-center px-2 board-buttons">
                                        <button class="btn btn-info me-2">Open board</button>
                                        <button class="btn btn-info">Edit</button>
                                    </div>
                                </div>
                            </div>
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