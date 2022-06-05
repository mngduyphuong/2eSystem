const express = require("express");
const router = express.Router();

const { Pool } = require("pg");
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres:Teobeo25021999@localhost:5432/database",
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

//Get all airports
router.get("/", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM airports_table ORDER BY id ASC");
    const results = { results: result ? result.rows : null };
    res.json(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

//Adding airports
router.post("/", async (req, res) => {
  try {
    const client = await pool.connect();
    await client.query(
        `INSERT INTO airports_table (name, country, location, airlines) VALUES ('${req.body.name}','${JSON.stringify(req.body.country)}',
            '${JSON.stringify(req.body.location)}', '${JSON.stringify(req.body.airlines)}');`
    );
    res.send("Added new airline")
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

//Update airports
router.put("/:id", async (req, res) => {
  try {
    const client = await pool.connect();
    await client.query(
      `UPDATE airports_table SET name = '${req.body.name}', country = '${JSON.stringify(req.body.country)}', 
        location = '${JSON.stringify(req.body.location)}', airlines = '${JSON.stringify(req.body.airlines)}'
        WHERE id = ${req.params.id};`
    );
    res.send("Updated airline")
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

//Delete airports
router.delete("/:id", async (req, res) => {
  try {
    const client = await pool.connect();
    await client.query(
      `DELETE FROM airports_table WHERE id = ${req.params.id};`
    );
    res.send("Deleted airline")
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});
module.exports = router;
