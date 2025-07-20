const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const ADMIN_USER = process.env.ADMIN_USER || "Corex24";
const ADMIN_PASS = process.env.ADMIN_PASS || "Desirecorex_2410";

// Create database pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "database",
  user: "root",
  password: "corex",
  database: "pterodactyl",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Admin login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if(username === ADMIN_USER && password === ADMIN_PASS) {
    res.json({ status: "success", message: "ADMIN_AUTH_OK" });
  } else {
    res.status(403).json({ status: "error", message: "Invalid credentials" });
  }
});

// Create server
app.post('/create-server', async (req, res) => {
  const { username, servername, plan } = req.body;
  
  try {
    // Create server record
    const [result] = await pool.execute(
      `INSERT INTO servers (name, description, owner_id, memory, disk, cpu, swap, io, image, allocation_id, nest_id, egg_id) 
       VALUES (?, ?, 1, ?, ?, 0, 0, 500, 'ghcr.io/pterodactyl/yolks:nodejs-18', 1, 1, 1)`,
      [
        servername,
        `CoreX Server - ${username}`,
        plan === 'unlimited' ? 999999 : 308,  // RAM
        plan === 'unlimited' ? 999999 : 716   // Disk
      ]
    );

    // Create user record
    await pool.execute(
      `INSERT INTO users (username, email, password, root_admin) 
       VALUES (?, ?, ?, 0)`,
      [username, `${username}@corex-hosting.com`, 'TEMPORARY_PASSWORD']
    );

    res.json({
      status: "success",
      message: "✅ Account Created!",
      details: {
        username: username,
        password: "TEMPORARY_PASSWORD",
        server: servername,
        resources: plan === 'unlimited' ? "Unlimited" : "Free",
        panel_url: "http://localhost:8080"
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Database operation failed" });
  }
});

app.listen(3000, () => {
  console.log("CoreX Admin running on port 3000");
});
