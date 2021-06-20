import express from "express";
import http from "http";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

/** Helpers */
import config from "./config";

/** Routes */
import testRoute from "./routers/test";
import productsRoute from "./routers/products";
import userRouter from "./routers/users";
// import { importData } from "./import";
// importData()

const {
  server: { hostname, port },
} = config;

const router = express();

/** Connect to MongoDB */
mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then(() => {
    console.log("🔥 Connected to MongoDB");
  })
  .catch(() => {
    console.error("Error when conneting to MongoDB");
  });

router.use(morgan("dev"));

/** Parse requests */
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// /** Rules of API */
// router.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Contol-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );

//   if (req.method === "OPTIONS") {
//     res.header(
//       "Access-Control-Allow-Methods",
//       "GET, PATCH, DELETE, POST, PUT"
//     );
//     return res.status(200).json({ message: "options" });
//   }

//   return next();
// });

router.use(
  cors({
    exposedHeaders: "Authorization",
  })
);

/** Routes */
router.use("/api/test", testRoute);
router.use("/api/products", productsRoute);
router.use("/api/users", userRouter);

/** Error Handling */
router.use((_, res) => {
  const error = new Error("not found");

  return res.status(404).json({ message: error.message });
});

/** Create server */
const httpServer = http.createServer(router);

httpServer.listen(port, () => {
  console.log(`🚀 Server running on http://${hostname}:${port}`);
});
