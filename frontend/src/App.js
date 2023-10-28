

import logo from './logo.svg';
import './App.css';

// Reactjs default component libraries
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';

import { HelmetProvider, Helmet } from 'react-helmet-async';

// Pages components
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Logout from './pages/Logout'
import Dashboard from './pages/Dashboard';
import Boards from './pages/Boards';
import Board from './pages/Board';
import CreateBoard from './pages/CreateBoard';
import Error from './pages/404';

// Other components
import NavbarAnonymous from './components/NavbarAnonymous';
import Footer from './components/Footer';


// Importing custom styling for the individual pages
import '../src/styles/css/homepage.css';
import '../src/styles/css/login.css';
import '../src/styles/css/todoapp.css';


// Importing bootstrap styles
import '../src/styles/css/bootstrap/css/bootstrap.css';
//import '../src/icons/bootstrap-icons-1.10.1'

// Importing icons from both bootstrap and fontawesome
import '../src/icons/bootstrap-icons-1.10.1/bootstrap-icons.css';


import '../src/icons/fontawesome-icons/css/all.css';
import '../src/icons/fontawesome-icons/css/fontawesome.css';


import $ from 'jquery'
import BoardRequest from './components/BoardRequest';


function App() {
  return (
    <HelmetProvider>

    <Helmet>
      
      <script src="../src/customjs/js/jquery.js" type='text/jsx'></script>
      <script src="../src/customjs/js/todoapp.js" type='text/jsx'></script>
      <script src="../src/customjs/js/signup.js" type='text/jsx'></script>
      <script src="../src/customjs/js/login.js" type='text/jsx'></script>
    </Helmet>
    <div>
    
    <Router>
      <div>
        <NavbarAnonymous/>
        <Routes>
          <Route path='/' exact element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          <Route path='/logout' element={<Logout />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/boards' element={<Boards />} />
          <Route path='/board' element={<Board />} />
          <Route path='/createboard' element={<CreateBoard />} />
          <Route path='/404' element={<Error />} />
        </Routes>
      </div>
    </Router>
    <Footer/>
    </div>
    
    </HelmetProvider>
    

    /*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    */
  );
}

export default App;
