const express = require("express");
const router = express.Router();

const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.VUE_APP_DATABASE_URL,
  ssl: process.env.VUE_APP_DATABASE_URL ? { rejectUnauthorized: false } : false,
});

//Country data is static so no need to put,post and delete
//Get all airports
router.get("/", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM countries_table");
    const results = { results: result ? result.rows : null };
    res.json(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

module.exports = router;
