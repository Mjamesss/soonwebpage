const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_mysql_user',
    password: 'your_mysql_password',
    database: 'your_database_name'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Subscribe route
app.post('/subscribe', (req, res) => {
    const name = req.body.name;
    const sql = 'INSERT INTO subscribers (name) VALUES (?)';
    db.query(sql, [name], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error saving to database' });
        res.status(200).json({ message: 'Subscription successful' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
