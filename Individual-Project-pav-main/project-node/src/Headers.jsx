import React, { useState } from 'react';
import { BrowserRouter as Router, Route, NavLink, Redirect, useHistory } from 'react-router-dom';
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
    const email = e.target.elements.email.value;
    // Handle login logic
    onLogin(email);
  };
   // Здесь добавить axios для авторизации
      // const response = await axios.post('http://localhost:8080/api/login', { email, password });
      // if (response.status === 200) {
      //   onLogin(email);
      // } else {
      //   alert('Login failed');
      // }

  return (
    <form onSubmit={handleLogin}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

const SignUpForm = ({ onSignUp }) => {
  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    // Handle signup logic
    onSignUp(email);
  };
  // Здесь добавить axios для регистрации
      // const response = await axios.post('http://localhost:8080/api/register', { email, password });
      // if (response.status === 201) {
      //   onSignUp(email);
      // } else {
      //   alert('Registration failed');
      // }

  return (
    <form onSubmit={handleSignUp}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <input type="password" placeholder="Confirm Password" required />
      <button type="submit">Register</button>
    </form>
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
    // получения списка пользователей
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8080/api/useremail/employees');
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error('Error fetching users:', error);
  //     }
  //   };
  //   fetchUsers();
  // }, []);

  return (
    <Router>
      <div className="navbar">
        {isAuthenticated ? (
          <>
            <div className='navlink'>
              <NavLink to="/home" activeClassName="active">Home</NavLink>
              <NavLink to="/projects" activeClassName="active">Projects</NavLink>
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
              <button onClick={() => { setShowLogin(true); setShowSignUp(false); }}>Log In</button>
              <button onClick={() => { setShowLogin(false); setShowSignUp(true); }}>Register</button>
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