import React, { useState } from 'react';
import './Home.css';

function Home({ onLogout, userId }) { 
  const [inputCode, setInputCode] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/utente/${inputCode}/email`);
      if (!response.ok) {
        throw new Error('Errore durante la richiesta');
      }
      const data = await response.json();
      setEmail(data.email);
      setError('');
      setIsVisible(true); 
    } catch (error) {
      setEmail('');
      setError(error.message);
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="Home">

      <button id='Logout' onClick={handleLogout}>Logout</button>

      <div className="form">
        <h2>Inserisci ID</h2>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="inputCode">Codice:</label>
          <input
            type="text"
            id="inputCode"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            required
          />
          <button id='Search' type="submit">Cerca</button>
        </form>
        {email && <p id='Email'>Email corrispondente: {email}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
      <button id='showId' onClick={toggleVisibility}>Mostra il mio ID</button>
      {isVisible && <p id='Id'>ID utente: {userId}</p>} 
    </div>
  );
}

export default Home;
