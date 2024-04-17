// Main.js
import React from 'react';
import '../styles/main.css'

function Main({ onLogout, username }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Welcome to Criminal Case Manager</h1>
        <div>
          <span>Welcome, {username}!</span><br></br>
          <button onClick={onLogout}>Logout</button>
        </div>
      </div>
      <input type="text" placeholder="Search..." />
      <button>Search</button>
    </div>
  );
}

export default Main;
