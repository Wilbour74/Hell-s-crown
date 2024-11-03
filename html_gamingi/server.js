const express = require('express');
const path = require('path');

const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, 'public')));

// Route principale
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/scene', 'index.html'));
});

app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/scene', 'game.html'))
})

app.get('/settings', (req, res)=> {
  res.sendFile(path.join(__dirname, 'public/scene', 'settings.html'))
})
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
