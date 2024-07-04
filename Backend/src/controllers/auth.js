const Auth = require("../models/auth");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const auth = await Auth.findOne({ email: req.body.email });
    if (auth) {
      return res.status(400).json({ status: "error", msg: "duplicate email" });
    }
    // encryption of password, 12 times is exact. Balancing time & security
    // salting and encrypt 12 times. go look up salting online
    // there is no way at this point in time to decrypt this
    // length of password is better than complexity, recommended 18 characters and above
    // one way hashing only. password then hash
    const hash = await bcrypt.hash(req.body.password, 12);

    await Auth.create({
      // create the new email body along with a hash of the password
      // note this is just a hash not the actual password
      email: req.body.email,
      hash,
    });
    res.json({ status: "ok", msg: "auth created" });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "unabale to make account" });
  }
};

const login = async (req, res) => {
  // account does not exist so it throws an error
  try {
    const auth = await Auth.findOne({ email: req.body.email });
    if (!auth) {
      return res.status(400).json({ status: "error", msg: "not authorised" });
    }

    const result = await bcrypt.compare(req.body.password, auth.hash);
    if (!result) {
      console.log("email or password error");
      return res.status(401).json({ status: "error", msg: "login failed" });
    }
    const claims = {
      email: auth.email,
    };
    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    res.json({ access, refresh });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "unabale to login" });
  }
};

module.exports = { register, login };
