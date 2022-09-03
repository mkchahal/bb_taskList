const Task = require("../models/task");

const getAllTasks = async (_req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(400).json({Error: error.message});
  }
};

const addTask = async (req, res) => {
const { title } = req.body;

  if (!title) return res.status(400).json({Error: "Incorrect request body. Title required."})

  try {
    const task = await new Task(req.body).save();
    res.status(201).json(task)
  } catch (error) {
    res.status(400).json({Error: error.message});
  }

};

const getTask = (req, res) => {};

const editTask = (req, res) => {};

const deleteTask = (req, res) => {};

module.exports = { getAllTasks, addTask, getTask, editTask, deleteTask };
