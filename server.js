const express = require("express");
// const serveStatic = require("serve-static");
const path = require("path");

const app = express();

//Set static folder
app.use(express.static(path.join(__dirname, "dist")));

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Use API, all APIs are stored in src/api folder
app.use("/api/country", require("./src/api/country"));
app.use("/api/airline", require("./src/api/airline"));
app.use("/api/airport", require("./src/api/airport"));

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`app is listening on port: ${port}`);
