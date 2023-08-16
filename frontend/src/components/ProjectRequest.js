import React, { useState } from 'react'

// States for projects, boards and tasks


// Retrieving all the projects, the boards and all the tasks from the server for the particular account.
const projectOnlyRequest = async (request_type) => {
    //event.preventDefault();
    switch(request_type){
        case 'get':
            let response = await fetch('http://127.0.0.1:8000/api/projectsrequest');
            let data = response.json;
            let setProject = ProjectRequest.setProject
            setProject(data);

            break;
        case 'post':
            let request = await fetch('http://127.0.0.1:8000/api/projectsrequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: 'pass',

            }).then((response) => {
                if (!response.ok){
                    console.log('Something went wrong while posting project details');
                    throw new Error('Not Okay', {'Cause': response})
                }else{
                    console.log('Project details successfully created!')
                }
            })
            .then(data => console.log('Project has been registered', {'Project': data}))
            .catch(error => console.log("Encountered error while trying to register project", {"Error encountered": error}))

            break;

        default:
            console.log("Cannot register user's project actions");

            break;
    }
};

const BoardOnlyRequest = async (request_type) => {
    
    //event.preventDefault();
    switch(request_type){
        case 'get':
            //let response = await fetch('http://127.0.0.1:8000/api/boardsrequest');
            //let data = response.json;
            //let setBoard = ProjectRequest();
            setBoard(100);

            break;
        case 'post':
            let request = await fetch('http://127.0.0.1:8000/api/boardsrequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: 'pass',

            }).then((response) => {
                if (!response.ok){
                    console.log('Something went wrong while posting board details');
                    throw new Error('Not Okay', {'Cause': response})
                }else{
                    console.log('Board details successfully created!')
                }
            })
            .then(data => console.log('Board has been registered', {'Board': data}))
            .catch(error => console.log("Encountered error while trying to register board", {"Error encountered": error}))

            break;

        default:
            console.log("Cannot register user's board actions");

            break;
    }

    return (
        <></>
    )
    
};

const taskOnlyRequest = async (event, request_type) => {
    event.preventDefault();
    switch(request_type){
        case 'get':
            let response = await fetch('http://127.0.0.1:8000/api/tasksrequest');
            let data = response.json;
            let setTask = ProjectRequest.setTask
            setTask(data);

            break;
        case 'post':
            let request = await fetch('http://127.0.0.1:8000/api/tasksrequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: 'pass',

            }).then((response) => {
                if (!response.ok){
                    console.log('Something went wrong while posting task details');
                    throw new Error('Not Okay', {'Cause': response})
                }else{
                    console.log('Task details successfully created!')
                }
            })
            .then(data => console.log('Task has been registered', {'Task(s)': data}))
            .catch(error => console.log("Encountered error while trying to register task", {"Error encountered": error}))

            break;

        default:
            console.log("Cannot register user's task actions");

            break;
    }
    
}

const ProjectRequest = () => {

    const [project, setProject] = useState()
    const [board, setBoard] = useState()
    const [task, setTask] = useState([])

  return (
    <>
    <boardOnlyRequest />
    </>
  )
}

export { projectOnlyRequest, boardOnlyRequest, taskOnlyRequest, ProjectRequest };