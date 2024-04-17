// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Main from './components/Main.js';
import Login from './components/Login.js';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = (username, password) => {
    // Simulated user database
    const users = [
      { username: 'user1', password: '1' },
      { username: 'user2', password: '2' },
    ];

    // Check if the entered username and password match any user in the database
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      setLoggedIn(true);
      setUsername(username);
      console.log("Logging in with:", username, password);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={loggedIn ? <Navigate to="/main" /> : <Login onLogin={handleLogin} username={username} />} />
        <Route path="/main" element={loggedIn ? <Main onLogout={handleLogout} username={username}/> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
