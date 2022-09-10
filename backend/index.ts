import express from "express";
import path from "path";

const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.use(express.static(path.join(__dirname, "../../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
});
