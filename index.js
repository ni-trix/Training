const express = require('express');
const app = express();
const port = 3000;
const connection = require('./conf');

const bodyParser = require('body-parser');
// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

// QUETE EXPRESS 2 //

app.get('/api/movies', (req, res) => {
  connection.query('SELECT * from movie',
   (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des films');
    } else {
      res.json(results);
    }
  })
});

app.get('/api/movies/names', (req, res) => {
  connection.query('SELECT name from movie',
   (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des noms de films');
    } else {
      res.json(results);
    }
  })
});

// QUETE EXPRESS 3 //

app.post('/api/movies', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO movie SET ?',
   formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'un film");
    } else {
      res.sendStatus(200);
    }
  });
});


// QUETE EXPRESS 4 //

// Si l'ID est passé en tant que paramètre
app.put('/api/movies/:id', (req, res) => {
  const idMovie = req.params.id;
  const formData = req.body;
  connection.query('UPDATE movie SET ? WHERE id = ?',
   [formData, idMovie], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la modification d'un film");
    } else {
      res.sendStatus(200);
    }  });
});

// Si l'ID est passé en tant que donnée
app.put('/api/movies', (req, res) => {
  const idMovie = req.body.id;
  const formData = req.body;
  connection.query('UPDATE movie SET ? WHERE id = ?',
   [formData, idMovie], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la modification d'un film");
    } else {
      res.sendStatus(200);
    }  });
});



// LISTEN //

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is listening on ${port}`);
});