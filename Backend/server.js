require("dotenv").config();

const express = require("express");
const path = require("path");
const connectDB = require("./src/database/database");
const router = require("./src/routers/auth");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  // limiting to 15min and 100 times for trying to login
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

connectDB();

const app = express();

app.use(cors());
app.use(helmet());
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// absolute path to the directory double underscore
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/api", echo);
app.use("/auth", router);

// global way of catching any error
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.log(err);
    return res.status(400).send({ status: 400, msg: "An error has occured" });
  }
  next();
});

app.listen(5001);

// if (process.env.NODE_ENV === "test") {
//   module.exports = app;
// }
