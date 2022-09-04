const express = require("express");
const router = express.Router();
const { getAllTasks, addTask, getTask, editTask, deleteTask } = require("../controllers/task")


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
