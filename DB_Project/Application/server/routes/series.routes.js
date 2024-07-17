const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/all', (req, res) => {
  const q = `
  SELECT sg.id, sg.name, sg.poster_path FROM inventory i
  LEFT JOIN \`show\` s ON i.show_id = s.id
  LEFT JOIN show_season ss on s.show_season_id = ss.id
  LEFT JOIN show_group sg on ss.show_group_id = sg.id
  WHERE s.is_film = FALSE
  GROUP BY sg.id;
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

router.get('/:id', (req, res) => {
  const q = `SELECT name, poster_path, release_date FROM show_group WHERE id = ?`;

  db.query(q, [req.params.id], (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }
    if (result.length === 0) {
      res.status(404).end();
      return;
    }
    res.json(result[0]);
  });
});

router.get('/:id/seasons', (req, res) => {
  const q = `
  SELECT DISTINCT ss.id, ss.season_no FROM inventory
  LEFT JOIN \`show\` s ON inventory.show_id = s.id
  LEFT JOIN show_season ss ON s.show_season_id = ss.id
  WHERE ss.show_group_id = ?
  `;

  db.query(q, [req.params.id], (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }
    res.json(result);
  });
});

router.get('/:id/episodes', (req, res) => {
  const q = `
  SELECT s.id, s.title, s.episode_no, ss.season_no FROM inventory
  LEFT JOIN \`show\` s ON inventory.show_id = s.id
  LEFT JOIN show_season ss ON s.show_season_id = ss.id
  WHERE ss.show_group_id = ?
  `;

  db.query(q, [req.params.id], (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }

    res.json(result);
  });
});

router.get('/episodes/:id', (req, res) => {
  const q = `
  SELECT s.*, ss.season_no, l.name AS original_language FROM \`show\` s
  LEFT JOIN language l on s.original_language_id = l.id
  LEFT JOIN show_season ss on s.show_season_id = ss.id
  WHERE s.id = ?
  `;

  db.query(q, [req.params.id], (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }
    if (result.length === 0) {
      res.status(404).end();
      return;
    }
    res.json(result[0]);
  });
});

router.get('/episodes/:id/categories', (req, res) => {
  const q = `
  SELECT c.name FROM show_category sc
  LEFT JOIN \`show\` s on sc.show_id = s.id
  LEFT JOIN category c on sc.category_id = c.id
  WHERE s.id = ?
  `;

  db.query(q, [req.params.id], (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }
    res.json(result);
  });
});

router.get('/episodes/:id/languages', (req, res) => {
  const q = `
  SELECT l.name FROM show_language sl
  LEFT JOIN \`show\` s on sl.show_id = s.id
  LEFT JOIN language l on sl.language_id = l.id
  WHERE s.id = ?
  `;

  db.query(q, [req.params.id], (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }
    res.json(result);
  });
});

router.get('/episodes/:id/actors', (req, res) => {
  const q = `
  SELECT a.first_name, a.last_name FROM show_actor sa
  LEFT JOIN \`show\` s on sa.show_id = s.id
  LEFT JOIN actor a on sa.actor_id = a.id
  WHERE s.id = ?
  `;

  db.query(q, [req.params.id], (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }
    res.json(result);
  });
});

module.exports = router;
