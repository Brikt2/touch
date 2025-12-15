const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TEST-endepunkt
app.post("/proxy", (req, res) => {
  console.log("Fikk data fra iPad:", req.body);

  // Her kan du senere sende videre til ekte API
  res.json({ ok: true });
});

app.listen(3000, () => {
  console.log("Server kjører på port 3000");
});
