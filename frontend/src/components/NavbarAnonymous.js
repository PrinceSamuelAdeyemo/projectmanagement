import React from 'react';
import { Link } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';

// Importing bootstrap styles
import '../styles/css/bootstrap/css/bootstrap.css'



const NavbarAnonymous = () => {

  return (
    <HelmetProvider>
    <div>
        <Helmet>
            <script src="../customjs/js/jquery.js" type='text/jsx'></script>
            <script src="../customjs/js/todoapp.js" type='text/jsx'></script>
            <script src="../customjs/js/signup.js" type='text/jsx'></script>
            <script src="../customjs/js/navbar-login.js" type='text/jsx'></script>
            <script src="../customjs/js/login.js" type='text/jsx'></script>
        </Helmet>
    
        <nav className="navbar navbar-expand-md navbar-light">
        <div className="container-fluid" id="nav-container">
            <Link to="/" className="navbar-brand">Logo</Link>
            <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navigating-control"><span className="navbar-toggler-icon"></span></button>

            <div className="collapse navbar-collapse w-100 bg-white justify-content-md-center" id="navigating-control">
                <ul className="navbar-nav nav-topics ms-auto">
                    <li className="nav-item fs-5 mx-md-3"><Link to="/logout" type="button" className="navbar-link btn btn-default">About</Link></li>
                    <li className="nav-item fs-5 mx-md-3">
                        <div className="dropdown">
                            <button type="button" className="btn bg-info dropdown-toggle" data-bs-toggle="dropdown" id="Languages1">English</button>
                            <ul className="dropdown-menu" aria-labelledby="Languages1">
                                <li role="presentation">
                                    <Link to="" role="menuitem" className="dropdown-item">Francais</Link>
                                </li>
                                <li role="presentation">
                                    <Link to="" role="menuitem" className="dropdown-item">Spanish</Link>
                                </li>
                            </ul>
                        </div>
                        
                    </li>
                </ul>
                <ul className="navbar-nav d-md-flex ms-auto">
                    <li className="nav-item mx-md-3"><Link to='/login' id='login' className="navbar-link btn bg-white">Login</Link></li>
                    <li className="nav-item mx-md-3"><Link to="/signup" className="navbar-link btn btn-primary">Sign up</Link></li>
                </ul>
            </div>
        </div>
    </nav>
</div>
</HelmetProvider>


    /*
    <nav className="navbar navbar-expand-md navbar-light">
        <div className="container-fluid" id="nav-container">
            <Link to="/" className="navbar-brand">Logo</Link>
            <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navigating-control"><span className="navbar-toggler-icon"></span></button>

            <div className="collapse navbar-collapse w-100 bg-white justify-content-md-center" id="navigating-control">
                <ul className="navbar-nav nav-topics ms-auto">
                    <li className="nav-item fs-5 mx-md-3"><Link to="/logout" type="button" className="navbar-link btn btn-default">About</Link></li>
                    <li className="nav-item fs-5 mx-md-3">
                        <div className="dropdown">
                            <button type="button" className="btn bg-info dropdown-toggle" data-bs-toggle="dropdown" id="Languages1">English</button>
                            <ul className="dropdown-menu" aria-labelledby="Languages1">
                                <li role="presentation">
                                    <Link to="" role="menuitem" className="dropdown-item">Francais</Link>
                                </li>
                                <li role="presentation">
                                    <Link to="" role="menuitem" className="dropdown-item">Spanish</Link>
                                </li>
                            </ul>
                        </div>
                        
                    </li>
                </ul>
                <ul className="navbar-nav d-md-flex ms-auto">
                    <li className="nav-item mx-md-3"><Link to="#" id='login' className="navbar-link btn bg-white">Login</Link></li>
                    <li className="nav-item mx-md-3"><Link to="/signup" className="navbar-link btn btn-primary">Sign up</Link></li>
                </ul>
            </div>
        </div>
    </nav>
    */
  )
}

export default NavbarAnonymous