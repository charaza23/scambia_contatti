import React, { useState } from 'react';
import './App.css';
import Login from './componenti/Login';
import Registrazione from './componenti/Registrazione';
import Home from './componenti/Home';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [userId, setUserId] = useState(null); 

  const handleLogin = (userId) => { 
    setCurrentPage('home');
    setUserId(userId); 
  };

  const handleRegistrazione = () => {
    setCurrentPage('registrazione');
  };

  const handleLogout = () => {
    setCurrentPage('login');
    setUserId(null); // Resetta l'ID dell'utente dopo il logout
  };

  const handleGotoLogin = () => {
    setCurrentPage('login');
  }

  return (
    <div className="App">
      {currentPage === 'login' && <Login onLogin={handleLogin} onRegistratiClick={handleRegistrazione} />}
      {currentPage === 'registrazione' && <Registrazione onLoginClick={handleGotoLogin} />}
      {currentPage === 'home' && <Home onLogout={handleLogout} userId={userId} />} 
    </div>
  );
}

export default App;
