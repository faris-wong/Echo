// const express = require("express");
// const router = express.Router();
// const {
//   getBikes,
//   patchBikes,
//   putBikes,
//   deleteBikes,
//   postBikes,
//   seedBikes,
// } = require("../controllers/bikes");

// const { checkBikeInputs } = require("../validators/bikes");
// const { checkErrors } = require("../validators/checkErrors");
// const { auth } = require("../middleware/auth");

// router.get("/bikes", auth, getBikes);

// router.post("/bikes", postBikes);

// router.put("/bikes", checkBikeInputs, checkErrors, putBikes);

// router.delete("/bikes/:id", deleteBikes);

// router.patch("/bikes/:id", patchBikes);

// router.use("/seed", seedBikes);
// module.exports = router;
