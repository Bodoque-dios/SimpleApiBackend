const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');


const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.post('/api/users/login', (req, res) => {
  const db = new sqlite3.Database('./main.db');

  const username = req.body.username;
  const password = req.body.password;

  const sql = 'SELECT * FROM Users WHERE Username = ?';

  db.get(sql, [username], (err, row) => {
    if (err) {
      return console.error(err.message);
    }

    if (row) {
      // Compare hashed password
      bcrypt.compare(password, row.Password, (bcryptErr, bcryptRes) => {
        if (bcryptErr) {
          return console.error(bcryptErr.message);
        }

        if (bcryptRes) {
          const token = uuidv4();

          const insertSessionSql = 'INSERT INTO Sessions (UserID, Token, DateExpires) VALUES (?, ?, ?)';
          const date = new Date();
          const dateExpires = date.setDate(date.getDate() + 1);

          db.run(insertSessionSql, [row.UserID, token, dateExpires], (insertErr) => {
            if (insertErr) {
              return console.error(insertErr.message);
            }
            res.status(200).send(token);
          });
        } else {
          res.status(401).send('Incorrect password');
        }
      });
    } else {
      res.status(404).send('User not found');
    }
  });
});

app.post('/api/users/register', (req, res) => {
  const db = new sqlite3.Database('./main.db');

  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userType = req.body.userType;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return console.error(err.message);
    }

    const sql = 'INSERT INTO Users (Username, Password, Email, FirstName, LastName, UserType, DateCreated, LastLogin, Active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    //TODO: Sanitize inputs
    
    const date = new Date();

    db.run(sql, [username, hash, email, firstName, lastName, userType, date, date, 1], (insertErr) => {
      if (insertErr) {
        res.status(500).send('Error creating user');
        return console.error(insertErr.message);
      }
      res.status(200).send('User created');
    });
  });


});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

