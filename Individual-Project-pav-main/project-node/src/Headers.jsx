import React, { useState } from 'react';
import { BrowserRouter as Router, Route, NavLink, Redirect, useHistory } from 'react-router-dom';
import Taskss from './Headers/Tasks.jsx';
import TaskApp from './Headers/Projects.jsx';
import NewComponent from './Headers/Home.jsx';
import Calendar from './Calendar.jsx';
import './Css/Headers.css';

const EmailShortener = ({ email }) => {
  const [isShortened, setIsShortened] = useState(true);

  const toggleEmail = () => {
    setIsShortened(!isShortened);
  };

  const renderEmail = () => {
    if (isShortened) {
      const [username] = email.split('@');
      return `${username.slice(0, 5)}...`;
    } else {
      return email;
    }
  };

  return (
    <span className='emailcol' onClick={toggleEmail}>{renderEmail()}</span>
  );
};

const Main = () => (
  <div className="main-page">
    <div className="content">

      <Calendar />
    </div>
  </div>
);

const LoginForm = ({ onLogin }) => {
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    // Handle login logic
    onLogin(email);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const SignUpForm = ({ onSignUp }) => {
  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    // Handle signup logic
    onSignUp(email);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSignUp}>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <input type="password" placeholder="Confirm Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

const Headers = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const history = useHistory();

  const handleLogin = (email) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    setShowLogin(false);
    setShowSignUp(false);
    history.push(`/${email}`);
  };

  const handleLogout = () => {
    if (window.confirm("Do you want to leave this site?")) {
      setIsAuthenticated(false);
      setUserEmail('');
      history.push('/');
    }
  };


  return (
    <Router>
      <div className="navbar">
        {isAuthenticated ? (
          <>
            <div className='navlink'>
              <NavLink to="/home" activeClassName="active">Home</NavLink>
              <NavLink to="/projects" activeClassName="active">Task</NavLink>
              <NavLink to="/progress" activeClassName="active">Progress</NavLink>
            </div>
            <div className='flexdiv'>
              <div className='emailcss'><EmailShortener email={userEmail} /></div>
              <div className='loginc' onClick={handleLogout}>Logout</div>
            </div>
          </>
        ) : (
          <>
            <NavLink to="/" className="main-button">Main</NavLink>
            <div className="auth-buttons">
              <button className='black-btr' onClick={() => { setShowLogin(true); setShowSignUp(false); }}>Log In</button>
              <button className='black-btr' onClick={() => { setShowLogin(false); setShowSignUp(true); }}>Register</button>
            </div>
          </>
        )}
      </div>

      <Route exact path="/" component={Main} />

      {!isAuthenticated && showLogin && <LoginForm onLogin={handleLogin} />}
      {!isAuthenticated && showSignUp && <SignUpForm onSignUp={handleLogin} />}

      {isAuthenticated && (
        <>
          <Route path="/home" component={NewComponent} />
          <Route path="/projects" component={TaskApp} />
          <Route path="/progress" component={Taskss} />
          <Route path={`/${userEmail}`} render={() => (
            <Redirect to="/home" />
          )} />
        </>
      )}
    </Router>
  );
};

export default Headers;
