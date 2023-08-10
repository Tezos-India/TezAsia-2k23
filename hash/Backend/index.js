const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create a MySQL connection pool (replace with your database credentials)
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'your_database_hostname',
  user: 'your_database_username',
  password: 'your_database_password',
  database: 'your_database_name',
});

// Middleware to parse JSON data from the request body
app.use(bodyParser.json());

// Serve the login page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Handle login form submission
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validate email and password (you can add more validation if needed)
  if (!email || !password) {
    return res.status(400).send('Email and password are required.');
  }

  // Query the database to check if the user exists
  pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, result) => {
    if (err) {
      console.error('Error executing the query:', err);
      return res.status(500).send('Internal server error.');
    }

    if (result.length === 1) {
      // If a user is found with the provided email and password, redirect to the userpage.html with user details as URL parameters
      const user = result[0];
      return res.redirect(`/userpage.html?name=${user.name}&email=${user.email}&otherInfo=${user.otherInfo}`);
    } else {
      // Incorrect email or password
      return res.status(401).send('Invalid email or password.');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
