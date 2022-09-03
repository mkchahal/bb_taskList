const taskModel = require("../models/task");

const getAllTasks = async (_req, res) => {
  const tasks = await taskModel.find();
  res.json(tasks);
};

const addTask = (req, res) => {
  const { title, content } = req.body;
  taskModel.create();
};

const getTask = (req, res) => {};

const editTask = (req, res) => {};

const deleteTask = (req, res) => {};

module.exports = { getAllTasks, addTask, getTask, editTask, deleteTask };
