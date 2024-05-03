const express= require('express');
const bodyParser=require('body-parser');
const handler= require('./routes/handler.js');
const mysql = require('mysql');
const cors = require('cors');

const app=express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', handler);
app.use(cors()); // Add cors middleware

const PORT=4000;

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}.`);
});


const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  });
  
  // Connect to MySQL database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      process.exit(1); // Exit the process if unable to connect
    }
    console.log('Connected to MySQL database');
  
    // Create 'authentication' database if it doesn't exist
    connection.query('CREATE DATABASE IF NOT EXISTS authentication', (err, result) => {
      if (err) {
        console.error('Error creating authentication database:', err);
        process.exit(1); // Exit the process if database creation fails
      }
      console.log('Authentication database created');
      // After creating the database, switch to it
      connection.changeUser({ database: 'authentication' }, (err) => {
        if (err) {
          console.error('Error switching to authentication database:', err);
          process.exit(1); // Exit the process if unable to switch databases
        }
        console.log('Switched to authentication database');
        
        // Create users table
        const createUserTableQuery = `
          CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            country VARCHAR(255),
            email VARCHAR(255),
            password VARCHAR(255)
          )
        `;
        connection.query(createUserTableQuery, (err, result) => {
          if (err) {
            console.error('Error creating users table:', err);
            process.exit(1); // Exit the process if table creation fails
          }
          console.log('Users table created');
        });
      });
    });
  });
  

// Register a new user
app.post('/register', (req, res) => {
  const { name, country, email, password } = req.body;
  const createUserQuery = `INSERT INTO users (name, country, email, password) VALUES (?, ?, ?, ?)`;
  connection.query(createUserQuery, [name, country, email, password], (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ message: 'Error registering user' });
    } else {
      console.log('User registered successfully');
      res.status(200).json({ message: 'User registered successfully' });
    }
  });
});

// Login user
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const getUserQuery = `SELECT * FROM users WHERE email = ? AND password = ?`;
  connection.query(getUserQuery, [email, password], (err, result) => {
    if (err) {
      console.error('Error logging in:', err);
      res.status(500).json({ message: 'Error logging in' });
    } else if (result.length === 0) {
      res.status(401).json({ message: 'Invalid email or password' });
    } else {
        console.log('User logged in successfully');
      res.status(200).json({ message: 'Login successful' });
    }
  });
});

