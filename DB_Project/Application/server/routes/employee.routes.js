const express = require('express');
const db = require('../db');

const router = express.Router();

router.post('/validate', (req, res) => {
  const q = `
  SELECT id, first_name, last_name, is_admin
  FROM employee WHERE email = ?
  `;

  db.query(q, [req.body.email], (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }

    if (result.length !== 1) {
      res.status(404).end();
      return;
    }

    res
      .json({
        loggedIn: true,
        isCustomer: false,
        uid: result[0]['id'],
        firstName: result[0]['first_name'],
        lastName: result[0]['last_name'],
        isAdmin: !!result[0]['is_admin'],
      })
      .status(404)
      .end();
  });
});

router.get('/films/stats/:amount', (req, res) => {
  const q = `CALL shows_with_most_rentals('m', ?, DATE_SUB(NOW(), INTERVAL 1 MONTH), NOW())`;

  db.query(q, [req.params.amount], (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }

    res.json(result);
  });
});

router.get('/series/stats/:amount', (req, res) => {
  const q = `CALL shows_with_most_rentals('s', ?, DATE_SUB(NOW(), INTERVAL 1 MONTH), NOW())`;

  db.query(q, [req.params.amount], (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }

    res.json(result);
  });
});

router.get('/data/countries', (req, res) => {
  const q = `SELECT * FROM country`;

  db.query(q, (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }

    res.json(result);
  });
});

router.get('/data/cities', (req, res) => {
  const q = `
  SELECT city.*, country.id AS country_id,
  country.name AS country_name FROM city LEFT JOIN country
  ON city.country_id = country.id
  `;

  db.query(q, (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }

    res.json(result);
  });
});

router.get('/data/addresses', (req, res) => {
  const q = `
  SELECT a.*, c.name AS city_name, c.country_id AS country_id,
  c2.name AS country_name FROM address a
  LEFT JOIN city c ON a.city_id = c.id
  LEFT JOIN country c2 ON c.country_id = c2.id
  `;

  db.query(q, (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }

    res.json(result);
  });
});

router.get('/data/actors', (req, res) => {
  const q = `SELECT * FROM actor`;

  db.query(q, (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }

    res.json(result);
  });
});

router.get('/data/languages', (req, res) => {
  const q = `SELECT * FROM language`;

  db.query(q, (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }

    res.json(result);
  });
});

router.get('/data/categories', (req, res) => {
  const q = `SELECT * FROM category`;

  db.query(q, (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }

    res.json(result);
  });
});

router.get('/data/episodes', (req, res) => {
  const q = `
  SELECT s.id, s.title, ss.season_no, sg.name FROM \`show\` s
  LEFT JOIN show_season ss ON s.show_season_id = ss.id
  LEFT JOIN show_group sg ON sg.id = ss.show_group_id
  WHERE s.is_film = FALSE
  `;

  db.query(q, (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }

    res.json(result);
  });
});

router.get('/data/seasons', (req, res) => {
  const q = `
  SELECT ss.*, sg.name FROM show_season ss
  LEFT JOIN show_group sg ON ss.show_group_id = sg.id
  `;

  db.query(q, (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }

    res.json(result);
  });
});

router.get('/data/series', (req, res) => {
  const q = `SELECT * FROM show_group`;

  db.query(q, (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }

    res.json(result);
  });
});

router.get('/data/films', (req, res) => {
  const q = `
  SELECT s.id, s.title FROM \`show\` s
  WHERE s.is_film = TRUE
  `;

  db.query(q, (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }

    res.json(result);
  });
});

module.exports = router;
