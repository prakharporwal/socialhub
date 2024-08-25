const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const proxy = require("express-http-proxy");

app.use(cors());

app.use(express.static(path.join(__dirname, "../view")));
app.use(
  "/api/*",
  proxy("http://localhost:8080", {
    proxyReqPathResolver: function (req) {
      return req.originalUrl;
    },
    proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
      // Copy all headers from the original request
      proxyReqOpts.headers = { ...srcReq.headers };

      // Ensure cookies are passed along
      if (srcReq.headers.cookie) {
        proxyReqOpts.headers.cookie = srcReq.headers.cookie;
      }

      return proxyReqOpts;
    },
  })
);

app.use(async (req, res, next) => {
  res.sendFile(path.join(__dirname, "../view", "index.html"));
});

app.get("/health", (req, res) => {
  console.log("up and running");
  res.status(200).send({ lol: "lolo" });
});

app.get("/", (req, res) => {
  console.log("up and running");
  res.status(200).send({ lol: "lnameolo" });
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
