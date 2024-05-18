const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Software Project API." });
});

const PORT = process.env.PORT || 8093;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
