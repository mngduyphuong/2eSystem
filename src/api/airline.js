const express = require("express");
const router = express.Router();

const { Pool } = require("pg");
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres:Teobeo25021999@localhost:5432/database",
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

//Get all airlines
router.get("/", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM airlines_table ORDER BY id ASC");
    const results = { results: result ? result.rows : null };
    res.json(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

//Adding airlines
router.post("/", async (req, res) => {
  try {
    const client = await pool.connect();
    await client.query(
      `INSERT INTO airlines_table (name, country) VALUES ('${req.body.name}','${JSON.stringify(req.body.country)}');`
    );
    res.send("Added new airline")
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

//Update airlines
router.put("/:id", async (req, res) => {
  try {
    const client = await pool.connect();
    await client.query(
      `UPDATE airlines_table SET name = '${req.body.name}', country = '${JSON.stringify(req.body.country)}' WHERE id = ${req.params.id};`
    );
    res.send("Updated airline")
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

//Delete airlines
router.delete("/:id", async (req, res) => {
  try {
    const client = await pool.connect();
    await client.query(
      `DELETE FROM airlines_table WHERE id = ${req.params.id};`
    );
    res.send("Deleted airline")
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});
module.exports = router;
