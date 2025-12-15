const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); // HTML-skjema for iPad

// Proxy-endepunkt
app.post("/ui", async (req, res) => {
  try {
    // Send videre til Flask
    await fetch("http://127.0.0.1:5000/api/skjerm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    // Bekreft til iPad
    res.send("OK");
  } catch (e) {
    console.error("Feil i proxy:", e);
    res.status(500).send("FEIL");
  }
});

app.listen(3000, () => console.log("Proxy kjører på port 3000"));
