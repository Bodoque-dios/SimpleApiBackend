const express = require("express");
const app = express.Router();
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

app.use(express.json());

const db = new sqlite3.Database("./main.db");


app.post("/login", (req, res) => {
  console.log("llego");
  const username = req.body.username;
  const password = req.body.password;

  const sql = "SELECT * FROM Users WHERE Username = ?";

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

          const insertSessionSql =
            "INSERT INTO Sessions (UserID, Token, DateExpires) VALUES (?, ?, ?)";
          const date = new Date();
          const dateExpires = date.setDate(date.getDate() + 1);

          db.run(
            insertSessionSql,
            [row.UserID, token, dateExpires],
            (insertErr) => {
              if (insertErr) {
                return console.error(insertErr.message);
              }
              res.status(200).send({ token: token });
            }
          );
        } else {
          res.status(401).send({ response: "Incorrect password" });
        }
      });
    } else {
      res.status(404).send({ response: "User not found" });
    }
  });
});

app.post("/register", (req, res) => {
  var exit = false;
  console.log("Registro");
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userType = req.body.userType;

  db.get("SELECT * FROM Users WHERE Username = ?", [username], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(row);
    if (row) {
      res.status(500).send({ response: "User already exists" });
      exit = true;
      return console.error("User already exists");
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return console.error(err.message);
        }

        const sql =
          "INSERT INTO Users (Username, Password, Email, FirstName, LastName, UserType, DateCreated, LastLogin, Active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        const date = new Date();

        db.run(
          sql,
          [username, hash, email, firstName, lastName, userType, date, date, 1],
          (insertErr) => {
            if (insertErr) {
              res.status(500).send({ response: "Error creating user" });
              return console.error(insertErr.message);
            }
            res.status(200).send({ response: "User created" });
          }
        );
      });
    }
  });
});

module.exports = app;
