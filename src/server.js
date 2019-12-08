require("dotenv").config();
import next from "next";
import http from "http";
//import server from "./server.conf";
import express from 'express';

const dev = process.env.NODE_ENV !== "production";

const app = next({
  dev,
  dir: "./"
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // handling everything else with Next.js
  const server = express();
  server.get("*", handle);
  http
    .createServer(server)
    .listen(process.env.PORT, () =>
      console.log(`listening on port ${process.env.PORT}`)
    );
});
