const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

// CORS configuration
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Set static folder
app.use(express.static(path.join(__dirname, "dist")));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use API, all APIs are stored in src/api folder
app.use("/api/country", require("./src/api/country"));
app.use("/api/airline", require("./src/api/airline"));
app.use("/api/airport", require("./src/api/airport"));

// Serve the Vue.js frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`app is listening on port: ${port}`);
});
