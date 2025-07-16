
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();

app.use(cors());
app.use(express.json());

const SECRET = "codveda_secret_key";
const users = [];

app.get('/', (req, res) => {
  res.send('✅ Codveda Task 3 API is running successfully');
});

// Signup
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const existing = users.find(u => u.email === email);
  if (existing) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ name, email, password: hashedPassword });
  res.json({ message: "User registered successfully" });
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });
  res.json({ message: "Login successful", token });
});

// Protected Route
app.get('/dashboard', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, SECRET);
    res.json({ message: "Welcome to the dashboard!" });
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
