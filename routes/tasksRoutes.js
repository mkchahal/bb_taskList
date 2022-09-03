const express = require("express");
const router = express.Router();
const { getAllTasks, addTask, getTask, editTask, deleteTask } = require("../controllers/tasks")

// @route GET /task
// @desc Get complete list of tasks
// @access Private

router
    .route("/")
    .get(getAllTasks)
    .post(addTask);

router
    .route("/:id")
    .get(getTask)
    .put(editTask)
    .delete(deleteTask);

module.exports = router;
