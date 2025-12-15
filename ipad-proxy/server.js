const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // ipad.html ligger her

let synlig = false;
let resetTimeout = null;

app.post("/ipad1", async (req, res) => {
  const show = req.body.show || null;

  try {
    // toggle-logikk kun for timeplan
    if (show === "timeplan") {
      synlig = !synlig;

      if (synlig) {
        await sendToApi("timeplan");

        if (resetTimeout) clearTimeout(resetTimeout);
        resetTimeout = setTimeout(async () => {
          synlig = false;
          await sendToApi(null);
          resetTimeout = null;
        }, 120000);
      } else {
        await sendToApi(null);
      }
    } else {
      await sendToApi(show); // andre knapper
    }

    // send tilbake ipad.html
    res.redirect("/ipad.html");

  } catch (err) {
    console.error("Proxy-feil:", err);
    res.status(500).send("FEIL");
  }
});

async function sendToApi(value) {
  await fetch("http://127.0.0.1:5000/api/skjerm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ show: value })
  });
}

app.listen(3000, () => {
  console.log("Node-proxy kjører på port 3000");
});
