const express = require("express");
// const serveStatic = require("serve-static");
const path = require("path");

const app = express();

// const { Pool } = require("pg");
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });
// const pool = new Pool({
//   connectionString:
//     process.env.DATABASE_URL || "postgresql://postgres:Teobeo25021999@localhost:5432/database",
//   ssl: process.env.DATABASE_URL ? true : false,
// });

//Set static folder
// app.use("/", serveStatic(path.join(__dirname, "/dist")));
app.use(express.static(path.join(__dirname, "dist")));

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//use api
app.use('/api/country', require("./src/api/country"));
app.use('/api/airline', require("./src/api/airline"));

// app.get("/api/db", async (req, res) => {
//   try {
//     const client = await pool.connect();
//     const result = await client.query("SELECT * FROM countries_table");
//     const results = { results: result ? result.rows : null };
//     res.send(results);
//     client.release();
//   } catch (err) {
//     console.error(err);
//     res.send("Error " + err);
//   }
// });

// //get time test
// app.get("/times", (req, res) => res.send(showTimes()));
// function showTimes() {
//   let result = "";
//   const times = process.env.TIMES || 5;
//   for (let i = 0; i < times; i++) {
//     result += i + " ";
//   }
//   return result;
// };

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`app is listening on port: ${port}`);
