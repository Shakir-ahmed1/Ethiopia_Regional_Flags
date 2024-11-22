const express = require("express");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");
const ethiopianRegions = require("./regions");

const app = express();
const PORT = 3000;

// Serve the list of regions
app.get("/api/flags", (req, res) => {
  res.json(ethiopianRegions);
});

// Serve a specific flag image with optional resizing
app.get("/api/flags/:code", async (req, res) => {
  const { code } = req.params;
  const { width, height } = req.query; // Dimensions passed as query parameters
  const region = ethiopianRegions.find((r) => r.code === code.toUpperCase());

  if (!region) {
    return res.status(404).json({ error: "Region not found" });
  }

  const flagPath = path.join(__dirname, "assets", `${code.toUpperCase()}.png`);

  if (!fs.existsSync(flagPath)) {
    return res.status(404).json({ error: "Flag image not found" });
  }

  // Serve resized image if dimensions are provided
  if (width || height) {
    const resizeOptions = {};
    if (width) resizeOptions.width = parseInt(width, 10);
    if (height) resizeOptions.height = parseInt(height, 10);

    try {
      const resizedImage = await sharp(flagPath)
        .resize(resizeOptions)
        .toBuffer();
      res.type("image/png").send(resizedImage);
    } catch (err) {
      res.status(500).json({ error: "Error processing image" });
    }
  } else {
    // Serve the original image
    res.sendFile(flagPath);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
