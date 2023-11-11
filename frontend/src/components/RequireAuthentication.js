import React from 'react'

const RequireAuthentication = (Component) => {
  class RequireAuthentication extends React.Component{
    
    constructor(){
      this.state = {
        token: null
      }

      
      fetch('http:127.0.0.1:8000/api/user-status', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': `Token ${token}`
        },
        credentials: 'include',
        mode: 'cors'
        
      })
      .then(response => response.json())
      .then(data => {
          if ( data.someProperty == "is_authenticated"){
              return "h"
          }
      })
    }

    

    componentDidMount(){
      console.log(`Component: This`);
    }

    render(){
      return <Component {...this.props} />
    }
  }

  return RequireAuthentication;

/*
    const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const loginStatus = async() =>{
    let response = await fetch(`${"http:127.0.0.1:8000"}`, {
      "method": "GET",
      "headers": "application/json",
      "credentials": "include",
      "Authorization": `Token ${token}`
    })
    .then(response => response.json)
    .then(user => setUser(user))
    .catch(error => console.log({"Error: ": error}))

    //.log("http:127.0.0.1:8000");
  }
  return (
    <div>AuthenticatedComponent</div>
  )

  */
}

export default RequireAuthentication