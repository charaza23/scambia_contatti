import React, { useState } from 'react';
import './Login.css';

const Login = ({ onRegistratiClick, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        onLogin(data.userId); 
        throw new Error('Credenziali non valide');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="Login">
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Non hai un account? <button onClick={onRegistratiClick}>Registrati</button></p>
    </div>
  );
};

export default Login;
