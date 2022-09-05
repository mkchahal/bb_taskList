const { check, validationResult } = require('express-validator');

exports.validateBody = [
    check("title", "Please enter a task title.").not().isEmpty(),
    check("content", "Please enter a task content.").not().isEmpty(),

    (req, res, next) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty())
        return res.status(400).json({ Errors: errors.array() });
      next();
    },
  ];
  