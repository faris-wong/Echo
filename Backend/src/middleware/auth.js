const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", msg: "no token found" });
  }

  // Bearer must have a space inside the string
  const token = req.headers["authorization"].replace("Bearer ", "");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      // the line below decodes the encryption done by jwt
      req.decoded = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        status: "error",
        msg: "not authorised",
      });
    }
  } else {
    return res.status(403).send({ status: "error", msg: "missing token" });
  }
};

const authAdmin = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", msg: "token required" });
  }

  const token = req.headers["authorization"].replace("Bearer ", "");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

      // additional role to create for admin account
      // admin mods are in front end
      if (decoded.role === "admin") {
        req.decoded = decoded;
        next();
      } else {
        throw new Error();
      }
    } catch (error) {
      return res.status(403).json({ status: "error", msg: "not authorised" });
    }
  } else {
    return res.status(403).json({ status: "error", msg: "forbidden" });
  }
};

module.exports = { auth, authAdmin };
