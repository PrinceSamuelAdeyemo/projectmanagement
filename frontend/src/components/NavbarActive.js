import React from 'react'
import { Link } from 'react-router-dom'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'

const NavbarActive = () => {

    const token = useSelector((state) => state.AUTH_TOKEN.token)
    const logout = async () =>{
        await fetch('http://127.0.0.1:8000/api/logout', {
            method: 'POST',
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        })
    }
  return (
    <nav className="navbar navbar-expand-md">
    <div className="container-fluid" id="nav-container">
        <Link to = "/" className="navbar-brand btn btn-default">Logo</Link>
        <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navigating-control"><span className="navbar-toggler-icon"></span></button>

        <div className="collapse navbar-collapse w-100 d-md-flex justify-content-md-center" id="navigating-control">
            <ul className="navbar-nav d-md-flex ms-auto">
                <li className="nav-item mx-md-3"><Link to = "/" className="navbar-link btn btn-default">Projects</Link></li>
                <li className="nav-item mx-md-3"><Link to = "/" className="navbar-link btn btn-default">Profile</Link></li>
                <li className="nav-item mx-md-3"><Link to = "/" className="navbar-link btn btn-default">Search</Link></li>
                <li className="nav-item mx-md-3"><Link to = "/" className="navbar-link btn btn-default">About</Link></li>
                <li className="nav-item mx-md-3"><Link to = "/" className="navbar-link btn btn-default">English</Link></li>
                
                
            </ul>
            <ul className="navbar-nav d-md-flex ms-auto">
                <li className="nav-item"><button href="" className="navbar-link btn" onClick={logout}>Logout</button></li>
            </ul>
            
        </div>
    </div>
</nav>
  )
}

export default NavbarActive