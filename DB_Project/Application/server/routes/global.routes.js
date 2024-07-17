const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/countries', (req, res) => {
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

router.get('/cities/:countryId', (req, res) => {
  const q = `SELECT * FROM city WHERE country_id = ?`;

  db.query(q, [req.params.countryId], (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }

    res.json(result);
  });
});

router.get('/addresses/:cityId', (req, res) => {
  const q = `SELECT * FROM address WHERE city_id = ?`;

  db.query(q, [req.params.cityId], (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }
    res.json(result);
  });
});

module.exports = router;
