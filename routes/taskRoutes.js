const express = require("express");
const router = express.Router();
const { validateReqBody } = require("../validators/validator")

const {
  getAllTasks,
  addTask,
  getTask,
  editTask,
  deleteTask,
} = require("../controllers/task");

router
    .route("/")
    .get(getAllTasks)
    .post(validateReqBody, addTask);

router
    .route("/:id")
    .get(getTask)
    .put( editTask)
    .delete(deleteTask);

module.exports = router;