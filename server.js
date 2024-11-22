const express = require("express");
const path = require("path");
const ethiopianRegions = require("./regions");

const app = express();
const PORT = 3000;

// Ethiopian Regions

// Serve the list of regions
app.get("/api/flags", (req, res) => {
  res.json(ethiopianRegions);
});

// Serve a specific flag image based on region code
app.get("/api/flags/:code", (req, res) => {
  const { code } = req.params;
  const region = ethiopianRegions.find((r) => r.code === code.toUpperCase());

  if (!region) {
    return res.status(404).json({ error: "Region not found" });
  }

  const flagPath = path.join(__dirname, "assets", `${code.toUpperCase()}.png`);
  res.sendFile(flagPath, (err) => {
    if (err) {
      res.status(404).json({ error: "Flag image not found" });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
