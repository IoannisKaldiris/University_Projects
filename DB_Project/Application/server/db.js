const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rentomatic',
});

connection.connect((err) => {
  if (err) console.error(err);
});

module.exports = connection;
