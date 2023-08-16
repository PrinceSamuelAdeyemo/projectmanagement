import React, { useState } from 'react';

const BoardRequest = async (request_type) => {
    const [board, setBoard] = useState();
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

    
};


export default BoardRequest