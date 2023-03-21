
const express = require("express");

const PORT = process.env.PORT || 3001;

const server = express();

server.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
})

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});