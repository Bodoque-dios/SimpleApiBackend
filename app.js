const express = require("express");

const users = require("./users");

const cors = require("cors");

const app = express();
const port = 42069;

app.use(cors())
app.use(express.json());

app.use("/api/users", users);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("*", (req, res) => {
  res.status(404).send("Not Found");
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
