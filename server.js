const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");

const app = express();

const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
console.log(pool);

//here we are configuring dist to serve app files
app.use("/", serveStatic(path.join(__dirname, "/dist")));

// this * route is to serve project on different page routes except root `/`
// app.get(/.*/, function (req, res) {
//   res.sendFile(path.join(__dirname, "/dist/index.html"));
// });
app.get("/db", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM test_table");
    const results = { results: result ? result.rows : null };
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

//get time test
app.get("/times", (req, res) => res.send(showTimes()));
function showTimes() {
  let result = "";
  const times = process.env.TIMES || 5;
  for (let i = 0; i < times; i++) {
    result += i + " ";
  }
  return result;
};

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`app is listening on port: ${port}`);
