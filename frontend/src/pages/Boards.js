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

            <div class="p-2">
                <div class="project-n-search w-100">
                    
                    <div class="row px-5 w-100">
                        <div class="col-6">
                            <h3 class="d-md-inline fw-bold" id="totalproject-count">Projects (5)</h3>
                        </div>
                        <div class=" col-6">
                            <input type="search" class="mt-2 float-end" placeholder='Search Board...' />
                        </div>
                        
                    </div>
                    
                    
                </div>
                <div class="projects-and-boards">
                    <div class="project">
                        <div class="project-boards row row-cols-4 g-1 w-100">
                            <div class="board p-1">
                                <div class="board-insight">
                                    <div class="d-block mb-2 bg-primary w-100">
                                        <button class="btn float-end">X</button>
                                    </div>
                                    
                                    <div class="board-details p-1">
                                        <p>Board title</p>
                                        <p>Board Description  n  fvn vno vvrn ovn fvnfvrp pfv vvfijvfv invvnf vfvpn rfhfihr irhrf rifrf rirf rirr rirjfr rirjr riff rirr rfrjfrr firferf frfjri.</p>
                                    </div>
                                    <div class="p-1 text-center px-2 board-buttons">
                                        <button class="btn btn-info me-2">Open board</button>
                                        <button class="btn btn-info">Edit</button>
                                    </div>
                                </div>
                            </div>
                            <div class="board p-1">
                                <div class="board-insight">
                                    <div class="d-block mb-2 bg-primary w-100">
                                        <button class="btn float-end">X</button>
                                    </div>
                                    
                                    <div class="board-details p-1">
                                        <p>Board title</p>
                                        <p>Board description</p>
                                    </div>
                                    <div class="p-1 text-center px-2 board-buttons">
                                        <button class="btn btn-info me-2">Open board</button>
                                        <button class="btn btn-info">Edit</button>
                                    </div>
                                </div>
                            </div>
                            <div class="board p-1">
                                <div class="board-insight">
                                    <div class="d-block mb-2 bg-primary w-100">
                                        <button class="btn float-end">X</button>
                                    </div>
                                    
                                    <div class="board-details p-1">
                                        <p>Board title</p>
                                        <p>Board description. Anything goes here. Even though I don't know what it may be</p>
                                    </div>
                                    <div class="board-buttons">
                                        <button class="btn btn-info me-2">Open board</button>
                                        <button class="btn btn-info">Edit</button>
                                    </div>
                                </div>
                            </div>
                            <div class="board p-1">
                                <div class="board-insight">
                                    <div class="d-block mb-2 bg-primary w-100">
                                        <button class="btn float-end">X</button>
                                    </div>
                                    
                                    <div class="board-details p-1">
                                        <p>Board title</p>
                                        <p>Board description</p>
                                    </div>
                                    <div class="p-1 text-center px-2 board-buttons">
                                        <button class="btn btn-info me-2">Open board</button>
                                        <button class="btn btn-info">Edit</button>
                                    </div>
                                </div>
                            </div>
                            <div class="board p-1">
                                <div class="board-insight">
                                    <div class="d-block mb-2 bg-primary w-100">
                                        <button class="btn float-end">X</button>
                                    </div>
                                    
                                    <div class="board-details p-1">
                                        <p>Board title</p>
                                        <p>Board Description  n  fvn vno vvrn ovn fvnfvrp pfv vvfijvfv invvnf vfvpn rfhfihr irhrf rifrf rirf rirr rirjfr rirjr riff rirr rfrjfrr firferf frfjri.</p>
                                    </div>
                                    <div class="p-1 text-center px-2 board-buttons">
                                        <button class="btn btn-info me-2">Open board</button>
                                        <button class="btn btn-info">Edit</button>
                                    </div>
                                </div>
                            </div>
                            <div class="board p-1">
                                <div class="board-button-div text-center p-5">             
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