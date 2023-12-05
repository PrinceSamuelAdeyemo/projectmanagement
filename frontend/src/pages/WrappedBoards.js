import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/css/activities.css';

//import '../components/NavbarAnonymous';
import RequireAuthentication from '../components/RequireAuthentication';
import Board from '../components/Board';

import { useSelector, useDispatch } from 'react-redux';
import { getToken, addByToken } from '../redux/features/userAuthSliceReducer/userAuthSlice';



const Boards = () => {
    //console.log(auth_cookie)
    let host = 'ws://127.0.0.1:8000/ws'
    const boardlist_socket = new WebSocket(`${host}/boardlist`);

    const is_authenticated = useSelector((state) => state.USER_STATUS.status)
    const getUserToken = useSelector((state) => state.AUTH_TOKEN.token)
    console.log("Should give cookie", getUserToken)
    console.log(is_authenticated)
    console.log("Done")

    const navigate = useNavigate();
    const [boards, setBoards] = useState([]);

    

    useEffect(() => {
        
        boardlist_socket.onopen = (event) => {
            let board_request = JSON.stringify({"user": `${getUserToken}`})
            boardlist_socket.send(board_request)
        }
        
    })

    const boardData = useMemo(() => {
        boardlist_socket.onmessage = async (event) => {
            let lol = await JSON.parse(event.data).boards_data
            console.log(lol)
            await setBoards(lol)            
        }

        return boardlist_socket
    }, [boardlist_socket.onmessage])

    let openBoard = () =>{
        console.log(this);
    }

    let openPage = (page) =>{
        navigate(`/${page}`);
    }

    const requestBoards = () => {

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
                                <Board key={`${board.board_id}`} boardID={board.board_id} boardName={board.board_name} boardDescription={board.board_description} boardBgColor={board.board_color} />
                            ))}


                            <div className="board">
                                <div className="board-button-div text-center">             
                                    <Link className="btn btn-primary" id="create-board" >Create a board</Link>
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

const WrappedBoards = RequireAuthentication(Boards)

export default WrappedBoards