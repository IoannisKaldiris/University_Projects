const express = require('express');
const db = require('../db');

const router = express.Router();

router.post('/validate', (req, res) => {
  const q = `
  SELECT id, first_name, last_name, sub_type
  FROM customer WHERE email = ?
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
        isCustomer: true,
        uid: result[0]['id'],
        firstName: result[0]['first_name'],
        lastName: result[0]['last_name'],
        subType: result[0]['sub_type'],
      })
      .status(200)
      .end();
  });
});

router.get('/:id', (req, res) => {
  const q = `
  SELECT c.id, c.first_name, c.last_name, c.email, c.created_at,
  c.sub_type, c.address_id, c2.id AS city_id, c2.country_id
  FROM customer c
  LEFT JOIN address a on c.address_id = a.id
  LEFT JOIN city c2 on a.city_id = c2.id
  WHERE c.id = ?
  `;

  db.query(q, [req.params.id], (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }

    if (result.length !== 1) {
      res.status(404).end();
      return;
    }

    res.json(result[0]);
  });
});

router.get('/:id/history', (req, res) => {
  const q = `
  SELECT r.*, s.title, s.episode_no, s.is_film, ss.season_no,
  sg.name AS series_name, p.amount FROM rental r
  LEFT JOIN inventory i on r.inventory_id = i.id
  LEFT JOIN \`show\` s on i.show_id = s.id
  LEFT JOIN show_season ss on s.show_season_id = ss.id
  LEFT JOIN show_group sg on ss.show_group_id = sg.id
  LEFT JOIN payment p on r.id = p.rental_id
  WHERE r.customer_id = ?
  ORDER BY r.created_at DESC
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

router.put('/rental', (req, res) => {
  const q1 = `SELECT id FROM inventory WHERE show_id = ?`;
  const q2 = `INSERT INTO rental (customer_id, inventory_id) VALUES (?, ?)`;

  db.query(q1, [req.body.showId], (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }

    db.query(q2, [req.body.customerId, result[0]['id']], (err2) => {
      if (err2) {
        console.error(err2.message);
        res.status(500).end();
        return;
      }
      res.status(200).end();
    });
  });
});

router.put('/profile', (req, res) => {
  const q = `
  UPDATE customer SET first_name = ?, last_name = ?,
  sub_type = ?, address_id = ? WHERE id = ?
  `;

  db.query(
    q,
    [
      req.body.firstName,
      req.body.lastName,
      req.body.subType,
      req.body.addressId,
      req.body.id,
    ],
    (err, result) => {
      if (err) {
        console.error(err.message);
        res.status(500).end();
        return;
      }

      res.status(200).end();
    }
  );
});

module.exports = router;
