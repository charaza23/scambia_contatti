const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// id è del tipo u00001

let nextUserId = 1;
const users = [
  { id: `u${String(nextUserId).padStart(5, '0')}`, username: 'utente1', password: 'password1', email: 'utente1@email.com' },
  { id: `u${String(++nextUserId).padStart(5, '0')}`, username: 'utente2', password: 'password2', email: 'utente2@email.com' }
];

app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
  console.log('Richiesta di login ricevuta');
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true, userId: user.id });
  } else {      
    res.status(401).json({ success: false, message: 'Credenziali non valide' });
  }
});

app.post('/api/registrazione', (req, res) => {
  console.log('Richiesta di registrazione ricevuta');
  const { username, password, email } = req.body;
  const existingUser = users.find(u => u.username === username || u.email === email);
  if (existingUser) {
    res.status(400).json({ success: false, message: 'Utente già registrato con questo username o email' });
  } else {
    const newUserId = `u${String(++nextUserId).padStart(5, '0')}`; // Genera il nuovo ID utente
    const newUser = { id: newUserId, username, password, email };
    users.push(newUser);
    res.json({ success: true, userId: newUserId });
  }
});

app.get('/api/utente/:id/email', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);
  if (user) {
    res.json({ success: true, email: user.email });
  } else {
    res.status(404).json({ success: false, message: 'Utente non trovato' });
  }
});

app.listen(port, () => {
  console.log(`Il server ascolta al http://localhost:${port}`);
});
