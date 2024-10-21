const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection (ensure this is before db.connect)
const db = mysql.createConnection({
    host: 'localhost',         // Replace with your MySQL host
    user: 'your_mysql_user',    // Replace with your MySQL username
    password: 'your_password',  // Replace with your MySQL password
    database: 'actual_db_name'  // Replace with the actual database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Subscribe route
app.post('/subscribe', (req, res) => {
    const email = req.body.email;  // Change from 'name' to 'email'
    const sql = 'INSERT INTO subscribers (email) VALUES (?)';  // Change to email column

    db.query(sql, [email], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error saving to database' });
        res.status(200).json({ message: 'Subscription successful' });
    });
});




// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
