import express from "express";
import http from "http";
import loggers from "./utils/loggers";
import config from "./config";
import testRoute from "./routers/test";

const {
  server: { hostname, port },
} = config;

const NAMESPACE = "Server";

const router = express();

/** Logging requests */
router.use((req, res, next) => {
  loggers.info(
    NAMESPACE,
    `[${req.method}] [${req.url}][${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    loggers.info(
      NAMESPACE,
      `[${req.method}] [${req.url}][${req.socket.remoteAddress}][${res.statusCode}]`
    );
  });

  return next();
});

/** Parse requests */
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

/** Rules of API */
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Contol-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "GET PATCH DELETE POST PUT"
    );
    return res.status(200).json({ message: "options" });
  }

  return next();
});

/** Routes */
router.use("/test", testRoute);

/** Error Handling */
router.use((_, res) => {
  const error = new Error("not found");

  return res.status(404).json({ message: error.message });
});

/** Create server */
const httpServer = http.createServer(router);

httpServer.listen(port, () => {
  loggers.info(
    NAMESPACE,
    `⚡️ Server running on http://${hostname}:${port}`
  );
});
