const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); // her ligger ipad.html

app.post("/ipad1", async (req, res) => {
  

  try {
    await fetch("http://127.0.0.1:5000/api/skjerm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        show: req.body.show
      })
    });

    res.redirect("/ipad.html");

  } catch (err) {
    console.error("Proxy-feil:", err);
    res.status(500).send("FEIL");
  }
});

app.listen(3000, () => {
  console.log("Node-proxy kjører på port 3000");
});
