import React, { useState } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Taskss from './Headers/Tasks.jsx';
import TaskApp from './Headers/Projects.jsx';
import NewComponent from './Headers/Home.jsx';
import Calendar from './Calendar.jsx'; // Assuming you have a Calendar component
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
      <img src="/assets/image.png" alt="Some Image" />
      <Calendar />
    </div>
  </div>
);

const LoginForm = ({ onLogin }) => {
  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic
    onLogin();
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="text" placeholder="User or Email" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Sign In</button>
    </form>
  );
};

const SignUpForm = ({ onSignUp }) => {
  const handleSignUp = (e) => {
    e.preventDefault();
    // Handle signup logic
    onSignUp();
  };

  return (
    <form onSubmit={handleSignUp}>
      <input type="text" placeholder="User or Email" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

const Headers = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="navbar">
        <NavLink to="/" className="main-button">Main</NavLink>
        <div className="auth-buttons">
          {isAuthenticated ? (
            <>
              <div className='navlink'>
                <NavLink to="/home" activeClassName="active">Home</NavLink>
                <NavLink to="/projects" activeClassName="active">Projects</NavLink>
                <NavLink to="/progress" activeClassName="active">Progress</NavLink>
              </div>
              <div className='flexdiv'>
                <div className='emailcss'><EmailShortener email="exampler@mail.com" /></div>
                <div className='loginc' onClick={handleLogout}>Logout</div>
              </div>
            </>
          ) : (
            <>
              <button onClick={() => setShowLogin(true)}>Log In</button>
              <button onClick={() => setShowLogin(false)}>Sign Up</button>
            </>
          )}
        </div>
      </div>

      {isAuthenticated ? (
        <>
          <Route path="/home" component={NewComponent} />
          <Route path="/projects" component={TaskApp} />
          <Route path="/progress" component={Taskss} />
        </>
      ) : (
        <div className="auth-form">
          {showLogin ? <LoginForm onLogin={handleLogin} /> : <SignUpForm onSignUp={handleLogin} />}
        </div>
      )}

      <Route exact path="/" component={Main} />
    </Router>
  );
};

export default Headers;