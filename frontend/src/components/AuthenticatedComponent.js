import React from 'react'

const AuthenticatedComponent = () => {
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
}

export default AuthenticatedComponent