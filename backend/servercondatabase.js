const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'your_host',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
  });
  
  // Connessione al database
  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Connesso al database MySQL');
  });

  // Login
app.post('/api/login', (req, res) => {
  console.log('Richiesta di login ricevuta');
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Errore del server' });
      throw err;
    }
    if (results.length > 0) {
      res.json({ success: true, userId: results[0].id });
    } else {
      res.status(401).json({ success: false, message: 'Credenziali non valide' });
    }
  });
});

// Registrazione
app.post('/api/registrazione', (req, res) => {
  console.log('Richiesta di registrazione ricevuta');
  const { username, password, email } = req.body;
  db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, results) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Errore del server' });
      throw err;
    }
    if (results.length > 0) {
      res.status(400).json({ success: false, message: 'Utente già registrato con questo username o email' });
    } else {
      const newUser = { username, password, email };
      db.query('INSERT INTO users SET ?', newUser, (err, result) => {
        if (err) {
          res.status(500).json({ success: false, message: 'Errore del server' });
          throw err;
        }
        res.json({ success: true, userId: result.insertId });
      });
    }
  });
});

// Ottenere l'email di un utente
app.get('/api/utente/:id/email', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Errore del server' });
      throw err;
    }
    if (results.length > 0) {
      res.json({ success: true, email: results[0].email });
    } else {
      res.status(404).json({ success: false, message: 'Utente non trovato' });
    }
  });
});
