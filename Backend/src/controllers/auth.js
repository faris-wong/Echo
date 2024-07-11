const AuthModel = require("../models/Auth");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

// const getAllUsers = async (req, res) => {
//   //
//   try {
//     const users = await AuthModel.find();

//     const outputArray = [];
//     for (const user of users) {
//       outputArray.push({ email: user.email, role: user.role });
//     }
//     res.json(outputArray);
//   } catch (error) {
//     console.error(error.message);
//     res.status(400).json({ status: "error", msg: "error getting users" });
//   }
// };

const register = async (req, res) => {
  try {
    const auth = await AuthModel.findOne({ email: req.body.email });
    if (auth) {
      return res.status(400).json({ status: "error", msg: "duplicate email" });
    }
    // encryption of password, 12 times is exact. Balancing time & security
    // salting and encrypt 12 times. go look up salting online
    // there is no way at this point in time to decrypt this
    // length of password is better than complexity, recommended 18 characters and above
    // one way hashing only. password then hash
    // hashing makes individual characters of the string into more strings and sort them.
    const hash = await bcrypt.hash(req.body.password, 12);

    const createdAuth = await AuthModel.create({
      // create the new email body along with a hash of the password
      // note this is just a hash not the actual password
      email: req.body.email,
      hash,
      // user role is default
      role: req.body.role || "user",
    });
    res.json({ id: createdAuth._id });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "unable to make account" });
  }
};

const login = async (req, res) => {
  // account does not exist so it throws an error
  try {
    const auth = await AuthModel.findOne({ email: req.body.email });
    if (!auth) {
      return res.status(401).json({ status: "error", msg: "not authorised" });
    }
    // comparison of the hashed password with the created hash.
    const result = await bcrypt.compare(req.body.password, auth.hash);
    if (!result) {
      console.log("email or password error");
      return res.status(401).json({ status: "error", msg: "login failed" });
    }
    // technically this is a payload
    const claims = {
      email: auth.email,
      role: auth.role,
    };

    // jwt sign uses the claims and creates access secret with time that expires in 20minute
    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      // unique id assigned
      jwtid: uuidv4(),
    });

    // jwt uses the claims to make a refresh secret that expires in 30 days
    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    res.json({id: auth._id, access, refresh });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "unable to login" });
  }
};

const refresh = async (req, res) => {
  try {
    // using decoded to verify
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
    const claims = { email: decoded.email, role: decoded.role };

    // claims is payload
    // generating refresh token only
    const refresh = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    res.json({ refresh });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "refresh error" });
  }
};

module.exports = { register, login, refresh };
