const express = require("express");
const router = express.Router();
const { validateBody } = require("../validators/validator")

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
    .post(validateBody, addTask);

router
    .route("/:id")
    .get(getTask)
    .put(validateBody, editTask)
    .delete(deleteTask);

module.exports = router;