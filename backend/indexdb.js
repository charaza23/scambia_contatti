const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3001;

// Configurazione della connessione al database
const db = mysql.createConnection({
  host: 'db4free.net',
  user: 'charaza23',
  password: 'Ahmedranjha23.',
  database: 'scambiacontatti'
});

// Connessione al database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
  // Creazione della tabella `users` se non esiste
  db.query(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
  )`, (err) => {
    if (err) {
      throw err;
    }
    console.log('Users table created');
    // Inserimento di due utenti di esempio
    const users = [
      { username: 'utente1', password: 'password1', email: 'utente1@email.com' },
      { username: 'uutente2', password: 'password2', email: 'utente2@example.com' }
    ];
    users.forEach((user, index) => {
      const userId = 'u' + ('0000' + (index + 1)).slice(-5); // Creazione dell'ID come u00001, u00002, ...
      db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [user.username, user.password, user.email], (err) => {
        if (err) {
          throw err;
        }
        console.log(`User ${userId} added`);
      });
    });
  });
});

app.use(bodyParser.json());

// Gestione della richiesta di login
app.post('/api/login', (req, res) => {
  console.log('Login request received');
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Server error' });
      throw err;
    }
    if (results.length > 0) {
      res.json({ success: true, userId: results[0].id });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

// Gestione della richiesta di registrazione
app.post('/api/registrazione', (req, res) => {
  console.log('Registration request received');
  const { username, password, email } = req.body;
  db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, password, email], (err, result) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Server error' });
      throw err;
    }
    res.json({ success: true, userId: result.insertId });
  });
});

// Ottenere l'email di un utente
app.get('/api/utente/:id/email', (req, res) => {
  const { id } = req.params;
  db.query('SELECT email FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Server error' });
      throw err;
    }
    if (results.length > 0) {
      res.json({ success: true, email: results[0].email });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  });
});

// Avvio del server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
