const { body } = require("express-validator");

const validateMessageData = [
  body("message", "cannot send empty text")
    .notEmpty()
    .isString()
    .isLength({ min: 1, max: 40 }),
];

module.exports = { validateMessageData };
