import React, { useState } from 'react';
import './Registrazione.css';

const Registrazione = ({ onLoginClick, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(null); 
  const [error, setError] = useState('');

  const handleRegistrazione = async () => {
    try {
      setError(''); 
      setUserId(null); 

      const response = await fetch('/api/registrazione', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserId(data.userId); 
      } else {
        throw new Error('Errore durante la registrazione');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="Registrazione">
      <h2>Registrazione</h2>
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
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button onClick={handleRegistrazione}>Registrati</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userId !== null && <p>ID Utente: {userId}</p>} 
      <p>Hai già un account? <button onClick={onLoginClick}>Login</button></p>
    </div>
  );
};

export default Registrazione;
