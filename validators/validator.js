const { body, param, validationResult } = require('express-validator');

exports.validateReqBody = [
  body("title", "Please enter a task title.").not().isEmpty(),
  body("content", "Please enter a task content.").not().isEmpty(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ Errors: errors.array() });
    next();
  },
];