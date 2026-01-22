const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const usersFile = path.join(__dirname, "data/users.json");

// ===== Signup API =====
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  let users = [];
  if (fs.existsSync(usersFile)) users = JSON.parse(fs.readFileSync(usersFile));

  if (users.find(u => u.username === username)) {
    return res.json({ status: "error", msg: "Username already exists!" });
  }

  users.push({ username, password });
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

  res.json({ status: "success" });
});

// ===== Login API =====
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  let users = [];
  if (fs.existsSync(usersFile)) users = JSON.parse(fs.readFileSync(usersFile));

  let user = users.find(u => u.username === username && u.password === password);

  if (user) res.json({ status: "success" });
  else res.json({ status: "error", msg: "Invalid username or password!" });
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});