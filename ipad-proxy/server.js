app.post("/ipad1", async (req, res) => {
  const show = req.body.show || null;

  try {
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
      await sendToApi(show);
    }

    res.redirect("/ipad.html");

  } catch (err) {
    console.error("Proxy-feil:", err);
    res.status(500).send("FEIL");
  }




});
