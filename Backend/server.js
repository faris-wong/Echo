require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const auth = require("./src/routers/auth");
const profile = require("./src/routers/profile");

const connectDB = require("./src/database/database");
const Messages = require("./src/routers/Messages");
const limiter = rateLimit({
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

//put all api router routes here below the top line 20 to 24
app.use("/auth", auth);
<<<<<<< Updated upstream
app.use("/profile", profile);
=======
app.use("/messages", Messages);
>>>>>>> Stashed changes

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
