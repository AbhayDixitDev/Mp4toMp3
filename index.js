

const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");

const app = express();
app.use(cors());
app.use(express.json());

// Serve React build files
app.use(express.static(path.join(__dirname, "public")));

// Upload folder setup
const upload = multer({ dest: "uploads/" });

// Ensure 'converted' folder exists
const convertedDir = path.join(__dirname, "converted");
if (!fs.existsSync(convertedDir)) {
  fs.mkdirSync(convertedDir);
}

// Example API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from MERN Fullstack Server!" });
});

// MP4 to MP3 Conversion Route
app.post('/api/convert', upload.single('audio'), (req, res) => {
  const inputPath = req.file.path;
  const outputFilename = `converted_${Date.now()}.mp3`;
  const outputPath = `converted/${outputFilename}`;

  ffmpeg(inputPath)
    .toFormat('mp3')
    .save(outputPath)
    .on('end', () => {
      fs.unlinkSync(inputPath); // delete original uploaded file
      res.json({ downloadUrl: `${process.env.API_URL}/${outputFilename}` });
    })
    .on('error', (err) => {
      console.error(err);
      res.status(500).send('Conversion failed');
    });
});

app.use(express.static('converted'));

// Fallback: React app ka index.html serve karega for any unknown route
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// Server listen
const PORT =  10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

