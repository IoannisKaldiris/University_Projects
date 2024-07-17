const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/customers', (req, res) => {
  const q = `SELECT * FROM customer`;

  db.query(q, (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }

    res.json(result);
  });
});

router.get('/employees/:adminId', (req, res) => {
  const q = `SELECT * FROM employee WHERE id != ?`;

  db.query(q, [req.params.adminId], (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }

    res.json(result);
  });
});

router.post('/employees/adminStatus', (req, res) => {
  const q = `UPDATE employee SET is_admin = ? WHERE id = ?`;

  db.query(q, [req.body.isAdmin, req.body.id], (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }

    res.status(200).end();
  });
});

router.delete('/customers/:id', (req, res) => {
  const q = `DELETE FROM customer WHERE id = ?`;

  db.query(q, [req.params.id], (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }

    res.status(200).end();
  });
});

router.delete('/employees/:id', (req, res) => {
  const q = `DELETE FROM employee WHERE id = ?`;

  db.query(q, [req.params.id], (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }

    res.status(200).end();
  });
});

router.put('/customer', (req, res) => {
  const q = `
  INSERT INTO customer (first_name, last_name, email, sub_type, address_id)
  VALUES (?)
  `;

  db.query(
    q,
    [
      [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.subType,
        req.body.addressId,
      ],
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

router.put('/employee', (req, res) => {
  const q = `
  INSERT INTO employee (first_name, last_name, email, is_admin, address_id)
  VALUES (?)
  `;

  db.query(
    q,
    [
      [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.isAdmin,
        req.body.addressId,
      ],
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

router.get('/sales', (req, res) => {
  const q = `CALL sales_per_month()`;

  db.query(q, (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }

    res.json(result);
  });
});

router.get('/prices', (req, res) => {
  const q = `SELECT * FROM price ORDER BY created_at DESC`;

  db.query(q, (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }

    res.json(result);
  });
});

router.put('/prices', (req, res) => {
  const q = `INSERT INTO price (sub_type, show_type, amount) VALUES (?)`;

  db.query(
    q,
    [[req.body.subType, req.body.showType, req.body.amount]],
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

router.get('/logs/:offset/:limit', (req, res) => {
  const q = `SELECT * FROM customer_log ORDER BY created_at DESC LIMIT ?, ?`;

  db.query(
    q,
    [Number(req.params.offset), Number(req.params.limit)],
    (err, result) => {
      if (err) {
        console.error(err.message);
        res.status(500).end();
        return;
      }

      res.json(result);
    }
  );
});

router.get('/logs/both/:customerId/:tableName/:offset/:limit', (req, res) => {
  const q = `
  SELECT * FROM customer_log
  WHERE customer_id = ? AND \`table\` = ?
  ORDER BY created_at DESC LIMIT ?, ?
  `;

  db.query(
    q,
    [
      req.params.customerId,
      req.params.tableName,
      Number(req.params.offset),
      Number(req.params.limit),
    ],
    (err, result) => {
      if (err) {
        console.error(err.message);
        res.status(500).end();
        return;
      }

      res.json(result);
    }
  );
});

router.get('/logs/customer/:id/:offset/:limit', (req, res) => {
  const q = `
  SELECT * FROM customer_log
  WHERE customer_id = ?
  ORDER BY created_at DESC LIMIT ?, ?
  `;

  db.query(
    q,
    [req.params.id, Number(req.params.offset), Number(req.params.limit)],
    (err, result) => {
      if (err) {
        console.error(err.message);
        res.status(500).end();
        return;
      }

      res.json(result);
    }
  );
});

router.get('/logs/table/:name/:offset/:limit', (req, res) => {
  const q = `
  SELECT * FROM customer_log
  WHERE \`table\` = ?
  ORDER BY created_at DESC LIMIT ?, ?
  `;

  db.query(
    q,
    [req.params.name, Number(req.params.offset), Number(req.params.limit)],
    (err, result) => {
      if (err) {
        console.error(err.message);
        res.status(500).end();
        return;
      }

      res.json(result);
    }
  );
});

router.get('/logs/customerIds', (req, res) => {
  const q = `SELECT DISTINCT customer_id FROM customer_log`;

  db.query(q, (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).end();
      return;
    }

    res.json(result);
  });
});

router.get('/logs/tableNames', (req, res) => {
  const q = `SELECT DISTINCT \`table\` FROM customer_log`;

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
