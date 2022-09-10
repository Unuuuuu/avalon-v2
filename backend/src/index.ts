import express from "express";
import { createServer } from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const port = process.env.PORT ?? 8080;

io.on("connection", (socket) => {
  console.log("Connect", socket.id);
});

app.get("/status", (req, res) => {
  res.send("Hello World!");
});

app.use(express.static(path.join(__dirname, "../../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
});

httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
