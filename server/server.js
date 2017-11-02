const path = require("path");
const express = require("express");
const app = express();
const publicPath = path.join(__dirname, "..", "public");
// provided by Heroku
const port = process.env.PORT || 3000;

// Serve all assets from index.html
// Middleware: runs for each req
app.use(express.static(publicPath));

// Always serve index.html so browser router can handle routes
// Otherwise there's a 404 on refresh
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log("Server listening on ", port);
});
