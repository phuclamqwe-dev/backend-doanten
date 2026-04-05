const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const FILE = "data.json";

function readData() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE));
}

function writeData(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

app.post("/save-name", (req, res) => {
  const data = readData();
  data.push({
    ...req.body,
    date: new Date()
  });
  writeData(data);
  res.json({ ok: true });
});

app.get("/names", (req, res) => {
  res.json(readData());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server chạy"));